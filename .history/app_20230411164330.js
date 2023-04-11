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
    let marginTop, marginBottom, marginLeft, marginRight;

    rl.question("Nhập kích thước lề phía trên (số > 0): ", (marginTopInput) => {
      marginTop = parseInt(marginTopInput);
      if (marginTop < 0) marginTop = 0;
      rl.question(
        "Nhập kích thước lề phía dưới (số > 0): ",
        (marginBottomInput) => {
          marginBottom = parseInt(marginBottomInput);
          if (marginBottom < 0) marginBottom = 0;
          rl.question(
            "Nhập kích thước lề phía trái (số > 0): ",
            (marginLeftInput) => {
              marginLeft = parseInt(marginLeftInput);
              if (marginLeft < 0) marginLeft = 0;
              rl.question(
                "Nhập kích thước lề phía phải (số > 0): ",
                (marginRightInput) => {
                  marginRight = parseInt(marginRightInput);
                  processImages(
                    inputPath,
                    marginTop,
                    marginBottom,
                    marginLeft,
                    marginRight
                  );
                  rl.close();
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
  marginTop,
  marginBottom,
  marginLeft,
  marginRight
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
          // background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .toFile(outputFile);
    }
  }
}
