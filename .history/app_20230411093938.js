const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

// Lấy đường dẫn đến thư mục chứa ảnh gốc
const inputDir = process.argv[2];

// Lấy đường dẫn đến thư mục đầu ra
const outputDir = process.argv[3];

// Tạo một canvas mới
const canvas = createCanvas();

// Đọc tất cả các tệp PNG trong thư mục đầu vào
fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    // Kiểm tra xem tệp có phải là PNG hay không
    if (path.extname(file).toLowerCase() === ".png") {
      const filePath = path.join(inputDir, file);
      loadImage(filePath).then((image) => {
        // Thiết lập kích thước cho canvas
        canvas.width = image.width;
        canvas.height = image.height;

        // Vẽ ảnh gốc lên canvas
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        // Vẽ nền xám lên canvas
        ctx.fillStyle = "#808080";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Lưu ảnh mới với nền được đắp thêm
        const newFilePath = path.join(outputDir, file);
        const writeStream = fs.createWriteStream(newFilePath);
        const stream = canvas.createPNGStream();
        stream.pipe(writeStream);
      });
    }
  });
});
