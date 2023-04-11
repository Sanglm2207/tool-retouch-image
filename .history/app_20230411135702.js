const readline = require("readline");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Nhập đường dẫn của thư mục ảnh: ", (path) => {
  rl.question("Nhập kích thước lề margin (số > 0): ", (margin) => {
    rl.question("Nhập mã màu của nền (ví dụ: #FFFFFF): ", (bgColor) => {
      // Gọi hàm xử lý ảnh với các thông tin vừa nhập
      processImages(path, Number(margin), bgColor);
      rl.close();
    });
  });
});

function processImages(path, margin, bgColor) {
  // TODO: Xử lý ảnh
  console.log(
    `Xử lý ảnh trong thư mục ${path} với margin là ${margin} và màu nền là ${bgColor}`
  );
}
