const readline = require("readline");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Nhập đường dẫn đến thư mục chứa ảnh (vd: /path/to/folder): ",
  (inputPath) => {
    margin = parseInt(margin);
    rl.question("Nhập độ dài mở rộng ảnh phía trên (số > 0): ", (top) => {
      top = parseInt(top);
      rl.question("Nhập độ dài mở rộng ảnh phía dưới (số > 0): ", (bottom) => {
        bottom = parseInt(bottom);
        rl.question("Nhập độ dài mở rộng ảnh phía trái (số > 0): ", (left) => {
          left = parseInt(left);
          rl.question(
            "Nhập độ dài mở rộng ảnh phía phải (số > 0): ",
            (right) => {
              right = parseInt(right);
              processImages(inputPath, top, bottom, left, right);
              rl.close();
            }
          );
        });
      });
    });
  }
);

async function processImages(
  inputPath,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom
) {
  // create output directory
  const outputPath = path.join(path.dirname(inputPath), "output");
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  // process each image in the directory
  const files = fs.readdirSync(inputPath);
  for (const file of files) {
    const extname = path.extname(file).toLowerCase();
    if (extname === ".png") {
      const inputFile = path.join(inputPath, file);
      const outputFile = path.join(outputPath, file);
      await sharp(inputFile)
        .extend({
          top: marginTop,
          bottom: marginBottom,
          left: marginLeft,
          right: marginRight,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .toFile(outputFile);
    }
  }
}
