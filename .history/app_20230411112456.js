const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

// Thông số người dùng nhập vào
const margin = 20; // kích thước lề margin
const bgColor = "rgba(0, 0, 0, 0)"; // màu nền transparent

// URL thư mục ảnh
const inputUrl = "https://www.k8oms.net/drive-folders/image-folder";

// Tên thư mục output để lưu các ảnh mới
const outputFolder = "./outputDir";

// Tạo thư mục output nếu chưa tồn tại
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Tải ảnh từ URL và thêm nền transparent và lề margin
async function addBackground(imageUrl) {
  const image = await loadImage(imageUrl);
  const canvas = createCanvas(
    image.width + margin * 2,
    image.height + margin * 2
  );
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, margin, margin);
  return canvas;
}

// Lấy danh sách các tệp tin ảnh trong thư mục từ URL
async function getImagesFromFolder(inputUrl) {
  const response = await fetch(inputUrl);
  const text = await response.text();
  const html = new DOMParser().parseFromString(text, "text/html");
  const images = html.querySelectorAll(
    'a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]'
  );
  const imageUrls = Array.from(images).map(
    (image) => inputUrl + image.getAttribute("href")
  );
  return imageUrls;
}

// Thực hiện tải và thêm nền cho tất cả các ảnh trong thư mục
async function processFolder(inputUrl) {
  const imageUrls = await getImagesFromFolder(inputUrl);
  for (const imageUrl of imageUrls) {
    const canvas = await addBackground(imageUrl);
    const fileName = path.basename(imageUrl);
    const outputPath = path.join(outputFolder, fileName);
    const stream = canvas.createPNGStream();
    const out = fs.createWriteStream(outputPath);
    stream.pipe(out);
    console.log("Saved:", fileName);
  }
}

processFolder(inputUrl);
