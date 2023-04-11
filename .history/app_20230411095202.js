const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = process.argv[2];
const outputDir = process.argv[3];

// Đọc danh sách tệp trong thư mục đầu vào
const files = fs.readdirSync(inputDir);

// Lặp qua từng tệp và xử lý
files.forEach((file) => {
  // Đường dẫn đầy đủ đến tệp ảnh
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  // Kiểm tra xem tệp có phải là ảnh PNG không
  if (path.extname(file).toLowerCase() !== ".png") {
    console.log(`Skipping non-PNG file: ${file}`);
    return;
  }

  // Đọc ảnh từ tệp đầu vào
  const image = sharp(inputPath);

  // Thêm một lớp màu trắng bên dưới ảnh
  image.flatten({ background: "#ffffff" });

  // Lưu ảnh vào tệp đầu ra
  image
    .toFile(outputPath)
    .then(() => {
      console.log(`Processed file: ${file}`);
    })
    .catch((error) => {
      console.error(`Error processing file: ${file}`, error);
    });
});
