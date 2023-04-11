const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const { createCanvas, loadImage } = require("canvas");

// Đường dẫn đầy đủ đến thư mục đầu vào và đầu ra
const inputPath = path.resolve(inputDir);
const outputPath = path.resolve(outputDir);

// Định dạng màu cho nền (ở đây là màu trắng)
const backgroundColor = 0xffffffff;

// Duyệt qua tất cả các tệp trong thư mục đầu vào
Jimp.read(inputPath)
  .then((images) => {
    images.forEach((image) => {
      // Đọc ảnh và chuyển nền trong suốt thành màu nền được chỉ định
      image.background(backgroundColor);
      // Lưu ảnh mới với nền đã được fill vào thư mục đầu ra
      image.writeAsync(`${outputPath}/${image.getBaseName()}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
