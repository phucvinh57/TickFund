# Build from javascript src
FROM node:16-alpine AS development
WORKDIR /usr/src/app/file_service
COPY . .
RUN npm ci --omit=dev
RUN npm i --location=global @vercel/ncc
RUN ncc build server.js -o dist
COPY .env dist

# Production
FROM node:16-alpine
WORKDIR /usr/src/app/file_service
COPY --from=development /usr/src/app/file_service/dist/ .
CMD ["node", "index.js"]