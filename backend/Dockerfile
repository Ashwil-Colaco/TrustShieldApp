# Use Node LTS
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including nodemon
RUN npm install

# Copy all backend files (index.js, services folder, etc.)
COPY . .

# Expose port your backend uses
EXPOSE 3000

# Run with nodemon
CMD ["npx", "nodemon", "--legacy-watch", "index.js"]