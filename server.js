const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");


const products = [
  { id: "1", name: "پرفروش ترین", description: "گوشی هوشمند آیفون", price: 80000000 , image: "https://res.cloudinary.com/dl2s1wqgl/image/upload/v1740955351/apple.jpg_h1ath0.webp" },
  { id: "2", name: "جدیدترین", description: "گوشی هوشمند سامسونگ", price: 60000000 , image: "https://res.cloudinary.com/dl2s1wqgl/image/upload/v1740955356/samsung.jpg_mdmiuf.jpg" },
  { id: "3", name: "محبوب ترین", description: "گوشی هوشمند شیائومی", price: 30000000 , image: "https://res.cloudinary.com/dl2s1wqgl/image/upload/v1740955358/xiaomi.jpg_hw50an.jpg"},
  { id: "4", name: "پرفروش ترین", description: "لپ‌تاپ کدنویسی", price: 25000000 , image: "https://res.cloudinary.com/dl2s1wqgl/image/upload/v1740955484/laptop1.jpg_tzkras.jpg" },
  { id: "5", name: "جدیدترین", description: "لپ‌تاپ اپل", price: 75000000 , image: "https://res.cloudinary.com/dl2s1wqgl/image/upload/v1740955423/laptop2.jpg_yiv8kg.jpg" },
  { id: "6", name: "محبوب ترین", description: "لپ‌تاپ حرفه‌ای", price: 85000000 , image: "https://res.cloudinary.com/dl2s1wqgl/image/upload/v1740992635/1_psmpva.jpg" },
  { id: "7", name: "پرفروش ترین", description: "هدفون نویز کنسلینگ", price: 25000000 , image: "https://res.cloudinary.com/dl2s1wqgl/image/upload/v1740955564/headphone.jpg_e3mhdl.jpg" },
  { id: "8", name: "جدیدترین", description: "هدفون نویز کنسلینگ", price: 50000000 , image: "https://res.cloudinary.com/dl2s1wqgl/image/upload/v1740955455/headphone2.jpg_ceb4vr.jpg" },
  { id: "9", name: "محبوب ترین", description: "هدفون نویز کنسلینگ", price: 35000000 , image: "https://res.cloudinary.com/dl2s1wqgl/image/upload/v1740955421/headphone1.jpg_p3hyfg.jpg"},
];

app.use(cors());
app.use('/images', express.static('public/images'));



app.get("/api/products", (req, res) => {
    console.log("Products count:", products.length);
    res.json(products);
  });  


app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "محصول یافت نشد" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});