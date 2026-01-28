# Blog Management System

**Họ tên:** Đỗ Việt Hoàng  
**MSSV:** 2011061534

## Mô tả dự án
Hệ thống quản lý blog với các tính năng:
- ✅ Xóa mềm (Soft Delete) cho posts và comments với trường `isDeleted`
- ✅ Hiển thị posts/comments đã xóa với gạch ngang
- ✅ ID tự tăng (Auto-increment) dạng chuỗi (String) - maxId + 1
- ✅ CRUD đầy đủ cho posts (Create, Read, Update, Delete)
- ✅ CRUD đầy đủ cho comments (Create, Read, Update, Delete)
- ✅ Giao diện web hiện đại với HTML, CSS, JavaScript
- ✅ Sử dụng JSON Server làm backend API

## Cài đặt

```bash
npm install
```

## Chạy ứng dụng

### 1. Chạy JSON Server (Backend)
```bash
npx json-server --watch db.json
```
Server sẽ chạy tại: `http://localhost:3000`

### 2. Mở giao diện web
Mở file `index.html` trong trình duyệt web

Hoặc chạy local server:
```bash
npx http-server
```

## Tính năng chính

### Posts Management
- **Create:** Tạo post mới với title, views (ID tự động tăng)
- **Read:** Xem danh sách tất cả posts
- **Update:** Chỉnh sửa title, views của post
- **Delete:** Xóa mềm post (đánh dấu isDeleted = true)
- **Restore:** Khôi phục post đã xóa mềm

### Comments Management
- **Create:** Tạo comment mới với postId, text (ID tự động tăng)
- **Read:** Xem danh sách tất cả comments
- **Update:** Chỉnh sửa nội dung comment
- **Delete:** Xóa mềm comment
- **Restore:** Khôi phục comment đã xóa mềm

## Cấu trúc dữ liệu

### Posts
```json
{
  "id": "1",
  "title": "Post title",
  "views": 100,
  "isDeleted": false
}
```

### Comments
```json
{
  "id": "1",
  "text": "Comment text",
  "postId": "1",
  "isDeleted": false
}
```

## File chính
- `index.html` - Giao diện web (HTML + CSS)
- `script.js` - Logic CRUD và xử lý API
- `db.json` - Database JSON Server
- `package.json` - Dependencies

## Công nghệ sử dụng
- HTML5
- CSS3
- JavaScript (Vanilla)
- JSON Server
- REST API

## Ghi chú
- ID được lưu dưới dạng chuỗi (String) trong database
- Xóa mềm không xóa dữ liệu thực sự, chỉ đánh dấu isDeleted = true
- Các item đã xóa mềm vẫn được hiển thị nhưng có gạch ngang
- Tất cả thao tác CRUD không yêu cầu refresh trang