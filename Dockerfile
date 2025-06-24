# Sử dụng image Node.js chính thức
FROM node:20

# Tạo thư mục app và copy code vào
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Expose cổng ứng dụng
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"] 