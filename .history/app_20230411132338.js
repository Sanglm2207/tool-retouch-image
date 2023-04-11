const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

// Thông số người dùng nhập vào
const marginSize = 20;const bgColor = "rgba(0, 0, 0, 0)"; // màu nền transparent

// URL thư mục ảnh
const inputUrl = "https://www.k8oms.net/drive-folders/image-folder";

// Tên thư mục output để lưu các ảnh mới
const outputFolder = "./outputDir";



// tạo thư mục output nếu chưa tồn tại
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// đọc danh sách file trong thư mục input
fs.readdir(inputDir, async (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  // lặp qua từng file và tạo ảnh mới
  for (const file of files) {
    // đường dẫn file input
    const inputPath = `${inputDir}/${file}`;

    // đọc ảnh từ file input
    const image = await loadImage(inputPath);

    // tạo ảnh mới với kích thước lề margin và màu nền transparent
    const canvas = createCanvas(image.width + 2 * marginSize, image.height + 2 * marginSize);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, marginSize, marginSize);

    // đường dẫn file output
    const outputPath = `${outputDir}/${file}`;

    // ghi ảnh mới vào file output
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log(`File ${file} saved.`));
  }
});