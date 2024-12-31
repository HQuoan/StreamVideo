# Bước 1: Sử dụng image Node.js để build ứng dụng
FROM node:16 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào image
COPY . .

# Build ứng dụng
RUN npm run build

# Bước 2: Sử dụng Nginx để phục vụ ứng dụng
FROM nginx:alpine

# Sao chép files build vào thư mục Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở port 80
EXPOSE 80
