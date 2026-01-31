# 🍰 Tiệm Bánh Minh Tuấn - Website

Website bán bánh kem online được xây dựng với **HTML, CSS, JavaScript thuần**. Dự án này được deploy hoàn toàn trên **GitHub Pages** - không cần backend!

## 🎯 Tính năng chính

| Tính năng | Mô tả |
|-----------|-------|
| 🛍️ Catalog | Hiển thị 8+ loại bánh với ảnh, giá, đánh giá |
| 🔍 Tìm kiếm | Tìm bánh theo tên, danh mục, sắp xếp |
| 🎠 Slide | Xem chi tiết từng bánh qua slide interactif |
| 🔥 Khuyến mãi | Hiển thị bánh được giảm giá (Rose Wedding -15%) |
| 🛒 Giỏ hàng | Thêm/xóa sản phẩm, tính tiền tự động |
| ❤️ Yêu thích | Lưu danh sách bánh yêu thích |
| 🎨 Tự thiết kế | Chọn size, vị kem, lớp phủ với giá cập nhật |
| 💳 Thanh toán | COD, Chuyển khoản (QR code), MoMo |
| 👤 Tài khoản | Đăng ký/Đăng nhập quản lý profile |
| ⭐ Đánh giá | Khách để lại feedback ngay trên trang |
| 📞 Liên hệ | Form liên hệ trực tiếp với cửa hàng |

## 📋 Cấu trúc dự án

```
web-banh-kem-fake/
├── index.html              # Trang HTML chính
├── styles.css              # Toàn bộ CSS (750+ dòng)
├── script.js               # Toàn bộ logic JavaScript (800+ dòng)
├── README.md               # File hướng dẫn này
├── .nojekyll               # Config GitHub Pages
└── assets/                 # Thư mục ảnh sản phẩm
    ├── strawberry.jpg
    ├── chocolate.jpg
    ├── wedding.jpg
    ├── matcha.jpg
    ├── cupcake.jpg
    ├── blueberry.jpg
    ├── opera.jpg
    ├── peach.jpg
    ├── custom.jpg
    └── bank.jpg
```

## 🚀 Cách sử dụng

### ⚡ Chạy locally

**Option 1: Python (khuyên dùng)**
```bash
python3 -m http.server 8000
# Mở: http://localhost:8000
```

**Option 2: Node.js**
```bash
npx http-server
```

**Option 3: VS Code Live Server**
- Cài extension "Live Server"
- Right-click `index.html` → "Open with Live Server"

### 🌐 Deploy trên GitHub Pages

**Bước 1**: Tạo repository GitHub
```bash
git init
git add .
git commit -m "Initial commit: Tiệm Bánh Minh Tuấn"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/web-banh-kem-fake.git
git push -u origin main
```

**Bước 2**: Bật GitHub Pages
1. Vào **Settings** → **Pages**
2. Chọn Branch: `main`
3. Folder: `/ (root)`
4. Click **Save**

**Bước 3**: Truy cập website
```
https://YOUR_USERNAME.github.io/web-banh-kem-fake
```

## 💾 Quản lý dữ liệu

Toàn bộ dữ liệu lưu trên **client-side** (không cần server):

| Dữ liệu | Lưu trữ | Ghi chú |
|---------|---------|--------|
| Giỏ hàng | `localStorage` | Tự động lưu khi thêm bánh |
| Yêu thích | `localStorage` | Danh sách bánh yêu thích |
| Tài khoản | `localStorage` | Đơn giản cho demo |
| Đánh giá | `localStorage` | Lưu trong session |
| Sản phẩm | Hardcoded | 8 bánh mẫu trong code |

⚠️ **Ghi chú bảo mật**: Đây là demo. Trong production cần:
- Backend API để lưu database
- Mã hóa mật khẩu (bcrypt)
- JWT authentication
- HTTPS

## 🛠️ Công nghệ sử dụng

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, Animation, Gradient
- **JavaScript ES6+**: Classes, Promises, Arrow functions
- **LocalStorage API**: Client-side storage
- **SVG**: Tạo hình ảnh động (QR code placeholder)
- **GitHub Pages**: Hosting miễn phí

## 📱 Responsive Design

✅ Tối ưu cho tất cả thiết bị:
- 📱 Mobile: < 600px
- 📱 Tablet: 600px - 900px  
- 💻 Desktop: > 900px

## 🎨 Thiết kế

- **Màu chủ đạo**: Hồng (`#f15b8c`)
- **Font**: Inter, Segoe UI
- **Border radius**: Smooth 16-24px
- **Spacing**: Grid system 12px

## ⚙️ Customization

### Thêm bánh mới
Sửa trong `script.js`:
```javascript
const products = [
  {
    id: 9,
    name: "Bánh mới",
    category: "sinh-nhat",
    price: 350000,
    rating: 4.8,
    weight: "600g",
    serves: "8 người",
    image: "assets/new.jpg",
  },
  // ...
];
```

### Đổi màu
Sửa trong `styles.css`:
```css
:root {
  --primary: #f15b8c;        /* Thay đổi màu chính */
  --primary-dark: #d94876;
  --secondary: #fff4f7;
}
```

### Cập nhật thông tin
- **Hotline**: Trong `index.html` dòng 30
- **Email**: Trong `index.html` dòng 250
- **Địa chỉ**: Trong `index.html` dòng 245

## 📊 Performance

- ⚡ Tải nhanh: < 1 giây
- 🎯 Mobile First: Responsive từ 280px
- 🔒 No cookies needed
- 🚀 No external APIs (static hosting)

## 🐛 Troubleshooting

**Q**: Ảnh không tải?
- A: Kiểm tra đường dẫn trong `script.js` hoặc `index.html`

**Q**: Dữ liệu mất sau reload?
- A: Bình thường! LocalStorage lưu per domain, xóa cache sẽ mất

**Q**: GitHub Pages không cập nhật?
- A: Chờ 5 phút hoặc vào Settings → Pages → Rebuild

**Q**: CORS errors?
- A: GitHub Pages hỗ trợ CORS. Nếu lỗi, dùng localhost để test

## 📝 Danh sách sản phẩm

1. ✅ Strawberry Cloud (390k)
2. ✅ Chocolate Velvet (420k)
3. ✅ Rose Wedding (1.2M) **-15%**
4. ✅ Chocolate Garden (320k)
5. ✅ Cupcake Party Box (260k)
6. ✅ Blueberry Mousse (360k)
7. ✅ Classic Opera (410k)
8. ✅ Peach Blossom (980k)

## 📞 Thông tin liên hệ

```
Tiệm Bánh Minh Tuấn

📞 Hotline: 0345 794 449
📱 Zalo: https://zalo.me/0963881573
📧 Email: mingcofficial@gmail.com
🔗 Facebook: https://www.facebook.com/cong.minh.338794
📍 Địa chỉ: 25 Nguyễn Huệ, Q.1, TP.HCM
⏰ Giờ phục vụ: 7:00 - 22:00 hàng ngày
```

## 🎓 Học hỏi từ dự án

Dự án này là một ví dụ hoàn chỉnh về:
- ✅ Single Page Application (SPA) thuần
- ✅ State management với JavaScript
- ✅ DOM manipulation
- ✅ Event handling
- ✅ LocalStorage API
- ✅ Responsive CSS Grid/Flexbox
- ✅ GitHub Pages deployment

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa

## 🙏 Cảm ơn

Cảm ơn bạn đã ghé thăm website Tiệm Bánh Minh Tuấn!

---

**Tạo bởi**: Minh Tuấn (GitHub Copilot assist)  
**Phiên bản**: 1.0.0  
**Cập nhật**: 31/01/2026  
**Framework**: Pure HTML/CSS/JS (No dependencies)  
**Hosting**: GitHub Pages (Static)
