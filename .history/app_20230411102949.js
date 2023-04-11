const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

const url =
  "https://www.google.com/search?q=%E1%BA%A3nh+png&rlz=1C5CHFA_enVN1049VN1049&sxsrf=APwXEddOJFJLcenzCZgTVXpVlAq8f1jpIw:1681183768617&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiCiNLK8aD-AhULRd4KHW1XC6MQ_AUoAXoECAEQAw&biw=1269&bih=710&dpr=2"; // ví dụ link ảnh trên mạng
// Lấy đường dẫn đến thư mục đầu vào và đầu ra từ dòng lệnh
const inputDir = process.argv[2];
const outputDir = process.argv[3];

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

const canvas = createCanvas();
const ctx = canvas.getContext("2d");

// Load ảnh vào canvas
loadImage(url).then((image) => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  // Vẽ nền
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Lưu ảnh mới vào thư mục output
  const output = fs.createWriteStream(`${outputDir}/newImage.png`);
  const stream = canvas.createPNGStream();
  stream.pipe(output);
});
