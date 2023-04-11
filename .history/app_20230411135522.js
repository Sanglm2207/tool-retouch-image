const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { createCanvas, loadImage } = require("canvas");
const Jimp = require("jimp");

// // Tạo interface cho module readline để yêu cầu người dùng nhập đường dẫn
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Yêu cầu người dùng nhập đường dẫn thư mục ảnh
// rl.question("Nhập đường dẫn thư mục ảnh: ", async (inputDir) => {
//   // Kiểm tra đường dẫn có tồn tại không
//   if (!fs.existsSync(inputDir)) {
//     console.error(`Thư mục ${inputDir} không tồn tại.`);
//     rl.close();
//     return;
//   }

//   // Yêu cầu người dùng nhập kích thước lề margin
//   rl.question("Nhập kích thước lề margin (> 0): ", async (marginSize) => {
//     marginSize = parseInt(marginSize);
//     if (isNaN(marginSize) || marginSize <= 0) {
//       console.error(`Kích thước lề margin không hợp lệ.`);
//       rl.close();
//       return;
//     }

//     // Yêu cầu người dùng nhập màu nền transparent
//     rl.question('Nhập màu nền (vd: "#ffffff"): ', async (bgColor) => {
//       // Kiểm tra màu nền có hợp lệ không
//       if (!/^#[0-9A-Fa-f]{6}$/.test(bgColor)) {
//         console.error(`Màu nền không hợp lệ.`);
//         rl.close();
//         return;
//       }

//       // Tạo thư mục output nếu chưa tồn tại
//       const outputDir = path.join(inputDir, "output");
//       if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir);
//       }

//       // Đọc danh sách file trong thư mục input
//       const files = fs.readdirSync(inputDir);
//       for (const file of files) {
//         // Đường dẫn file input
//         const inputPath = path.join(inputDir, file);

//         // Đọc ảnh từ file input
//         const image = await loadImage(inputPath);

//         // Tạo ảnh mới với kích thước lề margin và màu nền
//         const canvas = createCanvas(
//           image.width + 2 * marginSize,
//           image.height + 2 * marginSize
//         );
//         const ctx = canvas.getContext("2d");
//         ctx.fillStyle = bgColor;
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(image, marginSize, marginSize);

//         // Lưu ảnh mới vào file output
//         const outputFileName = `margin_${marginSize}_${file}`;

//         // ghi ảnh mới ra file output
//         const outputPath = path.join(outputDir, file);
//         const out = fs.createWriteStream(outputPath);
//         const stream = canvas.createPNGStream();
//         stream.pipe(out);
//         out.on("finish", () => console.log(`Đã tạo ảnh mới: ${outputPath}`));
//       }

//       // đóng interface readline
//       rl.close();
//     });
//   });
// });


// lấy thông tin từ người dùng
const inputPath = "/path/to/input/folder"; // đường dẫn đến thư mục ảnh đầu vào
const marginSize = 10; // kích thước lề margin
const backgroundColor = 0xffffffff; // màu nền

// tạo thư mục output
const outputPath = inputPath + "/output"; // đường dẫn đến thư mục ảnh đầu ra
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

// duyệt qua từng file ảnh trong thư mục đầu vào
fs.readdirSync(inputPath).forEach(async (file) => {
  if (file.endsWith(".jpg") || file.endsWith(".png")) {
    const imagePath = inputPath + "/" + file;

    // tạo đối tượng Jimp từ file ảnh
    const image = await Jimp.read(imagePath);

    // tính toán kích thước mới của ảnh
    const newWidth = image.getWidth() + marginSize * 2;
    const newHeight = image.getHeight() + marginSize * 2;

    // tạo ảnh mới với kích thước và màu nền đã cho
    const newImage = await new Jimp(newWidth, newHeight, backgroundColor);

    // chèn ảnh gốc vào ảnh mới với lề margin
    newImage.composite(image, marginSize, marginSize);

    // lưu ảnh mới vào thư mục đầu ra
    const newImagePath = outputPath + "/" + file;
    newImage.write(newImagePath);
  }
});
