const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const { createCanvas, loadImage } = require("canvas");

// Lấy đường dẫn đến thư mục đầu vào và đầu ra từ dòng lệnh
const inputDir = process.argv[2];
const outputDir = process.argv[3];

fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  files.forEach(async (file) => {
    const inputPath = `${inputDir}/${file}`;
    const outputPath = `${outputDir}/${file}`;

    const image = await loadImage(inputPath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ff0000"; // Màu sắc mà bạn muốn đắp lên ảnh
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 0, 0);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outputPath, buffer);
  });
});
