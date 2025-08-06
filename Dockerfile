# Stage 1: Build React app
# ================================
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# Stage 2: Serve with Nginx
# ================================
# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

====================================================================
# Base image
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from Vite (dist) to nginx html folder
COPY dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
