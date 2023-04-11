const readline = require("readline");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Nhập đường dẫn của thư mục ảnh: ", (inputPath) => {
  rl.question(
    "Nhập kích thước lề margin ở phía trái (số > 0): ",
    (marginLeft) => {
      rl.question(
        "Nhập kích thước lề margin ở phía phải (số > 0): ",
        (marginRight) => {
          rl.question(
            "Nhập kích thước lề margin ở phía trên (số > 0): ",
            (marginTop) => {
              rl.question(
                "Nhập kích thước lề margin ở phía dưới (số > 0): ",
                (marginBottom) => {
                  // Gọi hàm xử lý ảnh với các thông tin vừa nhập
                  processImages(
                    inputPath,
                    marginLeft,
                    marginRight,
                    marginTop,
                    marginBottom
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

// async function processImages(inputPath, margin, bgColor) {
//   // create output directory
//   const outputPath = path.join(path.dirname(inputPath), "output");
//   if (!fs.existsSync(outputPath)) {
//     fs.mkdirSync(outputPath);
//   }

//   // process each image in the directory
//   const files = fs.readdirSync(inputPath);
//   let totalFiles = 0;
//   let unsupportedFiles = 0;
//   let successfulFiles = [];

//   for (const file of files) {
//     const extname = path.extname(file).toLowerCase();
//     if (extname === ".jpg" || extname === ".jpeg" || extname === ".png") {
//       totalFiles++;
//       const inputFile = path.join(inputPath, file);
//       const outputFile = path.join(outputPath, file);
//       try {
//         await sharp(inputFile)
//           .extend({
//             top: margin,
//             bottom: margin,
//             left: margin,
//             right: margin,
//             background: bgColor,
//           })
//           .toFile(outputFile);
//         successfulFiles.push(file);
//       } catch (err) {
//         unsupportedFiles++;
//       }
//     } else {
//       unsupportedFiles++;
//     }
//   }

//   console.log(`Tổng số file trong thư mục: ${totalFiles}`);
//   console.log(`Số file không hỗ trợ định dạng: ${unsupportedFiles}`);
//   console.log(`Số file đã xử lý thành công: ${successfulFiles.length}`);
//   console.log(
//     `Danh sách các file đã xử lý thành công: ${successfulFiles.join(", ")}`
//   );
// }
