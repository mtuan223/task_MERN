# Sử dụng Node.js image
FROM node:18

# Set working directory bên trong container
WORKDIR /app

# Copy package.json và package-lock.json (nếu có)
# Vì context là ./backend, nên ta dùng ./ để lấy file ngay tại đó
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ code còn lại của backend vào /app
COPY . .

# Mở port 8000
EXPOSE 8000

# Chạy ứng dụng
CMD ["npm", "start"]