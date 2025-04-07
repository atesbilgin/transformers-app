FROM node:18-alpine
WORKDIR /app

# Install dependencies and build
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Install serve globally to serve static files
RUN npm install -g serve

# Use serve to serve the production build
CMD ["serve", "-s", "build", "-l", "3000"]
