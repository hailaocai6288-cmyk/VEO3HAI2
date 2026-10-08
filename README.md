# Siêu AI · Veo 3.1 Standalone HTML Runner

Ứng dụng mô phỏng video 9:16 (Canvas HTML5) — chạy hoàn toàn trên trình duyệt, không cần cài đặt hay backend.

## Cấu trúc

```
├── index.html       # Giao diện
├── style.css        # Giao diện CSS
├── app.js           # Logic mô phỏng (canvas, hạt, ánh sáng, điều khiển)
├── assets/image.png # Ảnh nền của cảnh
├── standalone.html  # Bản gốc 1 file duy nhất (ảnh nhúng base64)
├── run.bat          # Windows: mở bằng Chrome
├── run.sh           # macOS/Linux: chạy server cục bộ
└── .gitignore
```

## Chạy cục bộ

- **Cách nhanh nhất:** double-click `index.html` (hoặc `run.bat` trên Windows) để mở bằng Chrome.
- **Qua server cục bộ (khuyên dùng):** `python -m http.server 8080` rồi mở `http://localhost:8080`.
- **Bản 1 file:** mở thẳng `standalone.html`.

## Đẩy lên GitHub

```bash
git init
git add .
git commit -m "Siêu AI Veo 3.1 runner"
git branch -M main
git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
git push -u origin main
```

## Chạy online bằng GitHub Pages

Repo → **Settings → Pages → Deploy from a branch → `main` / `(root)`** → Save.
Sau ít phút trang chạy tại `https://<tai-khoan>.github.io/<ten-repo>/`.

## Tùy chỉnh nhanh

Trong `app.js`: `duration` (giây), `fps`, `isWater` / `isRain` (đổi hiệu ứng hạt). Thay ảnh nền bằng cách ghi đè `assets/image.png` (nên dùng tỉ lệ 9:16).
