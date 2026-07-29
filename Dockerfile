# Stage 1: Build Vite project
FROM node:18-alpine AS builder
WORKDIR /app

# 🎯 Coolify থেকে Env পাস করার জন্য এই ARG এবং ENV ব্লকটি যুক্ত করুন
ARG VITE_apiKey
ARG VITE_authDomain
ARG VITE_projectId
ARG VITE_storageBucket
ARG VITE_messagingSenderId
ARG VITE_appId

ENV VITE_apiKey=$VITE_apiKey
ENV VITE_authDomain=$VITE_authDomain
ENV VITE_projectId=$VITE_projectId
ENV VITE_storageBucket=$VITE_storageBucket
ENV VITE_messagingSenderId=$VITE_messagingSenderId
ENV VITE_appId=$VITE_appId

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]