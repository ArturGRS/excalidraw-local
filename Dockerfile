FROM node:18 AS builder

WORKDIR /opt/node_app

COPY . .

# Install dependencies
RUN yarn install --network-timeout 600000

# Build
ENV NODE_ENV=production
RUN yarn build:packages
RUN yarn --cwd ./excalidraw-app build

# Server setup
FROM node:18-alpine

WORKDIR /app

# Copy server files
COPY file-server ./file-server
COPY --from=builder /opt/node_app/excalidraw-app/build ./excalidraw-app/build

# Install server dependencies
WORKDIR /app/file-server
RUN npm install --production

# Create projects directory
WORKDIR /app
RUN mkdir projects

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "file-server/index.js"]
