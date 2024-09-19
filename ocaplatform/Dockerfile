# Sử dụng Node.js phiên bản 18 (LTS)
FROM node:20.17.0-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json để cài đặt dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn của ứng dụng vào container
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Khởi động ứng dụng
CMD ["npm", "run", "start"]
