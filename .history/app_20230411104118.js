const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

const url =
  "https://e7.pngegg.com/pngimages/429/181/png-clipart-minion-illustration-minions-desktop-1080p-minion-heroes-photography.png"; // ví dụ link ảnh trên mạng
// Lấy đường dẫn đến thư mục đầu vào và đầu ra từ dòng lệnh
const inputDir = process.argv[2];
// const outputDir = process.argv[3];

// fs.readdir(inputDir, (err, files) => {
//   if (err) throw err;

//   files.forEach(async (file) => {
//     const inputPath = `${inputDir}/${file}`;
//     const outputPath = `${outputDir}/${file}`;

//     const image = await loadImage(inputPath);
//     const canvas = createCanvas(image.width, image.height);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#ff0000"; // Màu sắc mà bạn muốn đắp lên ảnh
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.drawImage(image, 0, 0);

//     const buffer = canvas.toBuffer("image/png");
//     fs.writeFileSync(outputPath, buffer);
//   });
// });

const createNewImage = async (
  imageUrl,
  outputDir,
  backgroundColor = "#FFFFFF"
) => {
  const img = await loadImage(imageUrl);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  // Fill background with given color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw image on top of background
  ctx.drawImage(img, 0, 0);

  // Save new image to output directory
  const out = fs.createWriteStream(outputDir);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
};

const imageUrl = "https://example.com/image.png";
const outputDir = "./output/newImage.png";
const backgroundColor = "#CCCCCC";

createNewImage(url, outputDir, backgroundColor);
