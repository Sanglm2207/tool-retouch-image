const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const { createCanvas, loadImage } = require("canvas");

// Lấy đường dẫn đến thư mục đầu vào và đầu ra từ dòng lệnh
const inputPath = process.argv[2];
const outputPath = process.argv[3];

fs.readdir(inputPath, function (err, files) {
  if (err) throw err;

  files.forEach(function (file) {
    if (!file.endsWith(".png")) return;
    const inputFilePath = `${inputPath}/${file}`;
    const outputFilePath = `${outputPath}/${file}`;

    Jimp.read(inputFilePath, function (err, image) {
      if (err) throw err;
      image.background(0xffffffff).write(outputFilePath);
    });
  });
});
