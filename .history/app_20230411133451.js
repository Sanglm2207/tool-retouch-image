const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { createCanvas, loadImage } = require('canvas');

// tạo interface cho module readline để yêu cầu người dùng nhập đường dẫn
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// yêu cầu người dùng nhập đường dẫn thư mục ảnh
rl.question('Nhập đường dẫn thư mục ảnh: ', async (inputDir) => {
  // kiểm tra đường dẫn có tồn tại không
  if (!fs.existsSync(inputDir)) {
    console.error(`Thư mục ${inputDir} không tồn tại.`);
    rl.close();
    return;
  }

  // yêu cầu người dùng nhập kích thước lề margin
  rl.question('Nhập kích thước lề margin (> 0): ', async (marginSize) => {
    marginSize = parseInt(marginSize);
    if (isNaN(marginSize) || marginSize <= 0) {
      console.error(`Kích thước lề margin không hợp lệ.`);
      rl.close();
      return;
    }

    // yêu cầu người dùng nhập màu nền transparent
    rl.question('Nhập màu nền transparent (vd: rgba(0, 0, 0, 0)): ', async (bgColor) => {
      // kiểm tra màu nền có hợp lệ không
      if (!/^rgba?\(\d+,\s*\d+,\s*\d+,\s*(0(\.\d+)?|1(\.0+)?)\)$/.test(bgColor)) {
        console.error(`Màu nền transparent không hợp lệ.`);
        rl.close();
        return;
      }

      // tạo thư mục output nếu chưa tồn tại
      const outputDir = path.join(inputDir, 'output');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }

      // đọc danh sách file trong thư mục input
      const files = fs.readdirSync(inputDir);
      for (const file of files) {
        // đường dẫn file input
        const inputPath = path.join(inputDir, file);

        // đọc ảnh từ file input
        const image = await loadImage(inputPath);

        // tạo ảnh mới với kích thước lề margin và màu nền transparent
        const canvas = createCanvas(image.width + 2 * marginSize, image.height + 2 * marginSize);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = bgColor;
           ctx.fillRect(0, 0, canvas.width, canvas.height);

    // vẽ lại ảnh lên canvas để đảm bảo màu nền transparent được áp dụng
    ctx.drawImage(image, marginSize, marginSize);

    // lưu ảnh mới vào file trong thư mục output
    const outputPath = path.join(outputDir, file);
    const out = fs.createWriteStream(outputPath);

    // ghi dữ liệu từ canvas vào file output
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    console.log(`Đã tạo ảnh mới ${outputPath}`);
  }

  rl.close();
});
