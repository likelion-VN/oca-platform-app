# Build stage
FROM node:20.17.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20.17.0-alpine
WORKDIR /app

# Copy package files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Copy build output
COPY --from=builder /app/dist ./dist

# Install production dependencies
RUN npm ci --production

EXPOSE 5173

CMD ["npm", "run", "preview"]
