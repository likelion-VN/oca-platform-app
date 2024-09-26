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
COPY --from=builder /app/.next ./.next

# Copy configuration files
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/tsconfig.json ./

# Install production dependencies
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "run", "start"]
