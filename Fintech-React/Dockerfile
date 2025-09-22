# ---------- build stage ----------
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- run stage ----------
FROM nginx:alpine AS runtime
COPY --from=build /app/build /usr/share/nginx/html
# optional custom Nginx config:
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]