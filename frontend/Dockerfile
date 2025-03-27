# Stage 1: Builder
FROM node:22.12-alpine3.20 AS builder

WORKDIR /build

# Copy package.json and lock files
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Runner
FROM node:22.12-alpine3.20 AS runner

WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json
COPY --from=builder /build/package-lock.json ./package-lock.json
COPY --from=builder /build/.next ./.next
COPY --from=builder /build/public ./public

# Set the command to start the application
CMD ["npm", "start"]