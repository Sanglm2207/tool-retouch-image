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
    let margin, top, bottom, left, right;
    rl.question("Nhập kích thước lề margin (số > 0): ", (marginInput) => {
      margin = parseInt(marginInput);
      rl.question(
        "Nhập độ dài mở rộng ảnh phía trên (số > 0): ",
        (topInput) => {
          top = parseInt(topInput);
          rl.question(
            "Nhập độ dài mở rộng ảnh phía dưới (số > 0): ",
            (bottomInput) => {
              bottom = parseInt(bottomInput);
              rl.question(
                "Nhập độ dài mở rộng ảnh phía trái (số > 0): ",
                (leftInput) => {
                  left = parseInt(leftInput);
                  rl.question(
                    "Nhập độ dài mở rộng ảnh phía phải (số > 0): ",
                    (rightInput) => {
                      right = parseInt(rightInput);
                      processImages(
                        inputPath,
                        top,
                        bottom,
                        left,
                        right,
                        margin
                      );
                      rl.close();
                    }
                  );
                }
              );
            }
          );
        }
      );
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
  console.log("inputPath: ", inputPath);

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
