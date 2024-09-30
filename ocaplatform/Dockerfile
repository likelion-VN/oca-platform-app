# Build stage
FROM node:20.17.0-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm ci

# Copy source files and build
COPY . .
RUN npm run build

# Production stage
FROM node:20.17.0-alpine
WORKDIR /app

# Copy production dependencies and build output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Use node to run the Vite preview command
CMD ["node", "node_modules/vite/bin/vite.js", "preview", "--host", "--port", "3000"]
