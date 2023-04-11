const readline = require("readline");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Nhập đường dẫn của thư mục ảnh: ", (path) => {
  rl.question("Nhập kích thước lề margin (số > 0): ", (margin) => {
    rl.question("Nhập mã màu của nền (ví dụ: #FFFFFF): ", (bgColor) => {
      // Gọi hàm xử lý ảnh với các thông tin vừa nhập
      processImages(path, Number(margin), bgColor);
      rl.close();
    });
  });
});

async function processImages(inputPath, margin, backgroundColor) {
  // create output directory
  const outputPath = path.join(path.dirname(inputPath), "output");
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  // process each image in the directory
  const files = fs.readdirSync(inputPath);
  for (const file of files) {
    const extname = path.extname(file).toLowerCase();
    if (extname === ".jpg" || extname === ".jpeg" || extname === ".png") {
      const inputFile = path.join(inputPath, file);
      const outputFile = path.join(outputPath, file);
      await sharp(inputFile)
        .extend({
          top: margin,
          bottom: margin,
          left: margin,
          right: margin,
          background: backgroundColor,
        })
        .toFile(outputFile);
    }
  }
}
