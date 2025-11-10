# Dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the app port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
