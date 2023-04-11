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
