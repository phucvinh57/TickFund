# Build from typescript src to javascript src
FROM node:16-alpine AS development
WORKDIR /usr/src/app/auth_service
COPY . .
RUN npm i && npm run build
COPY .env package*.json dist/

# Build from javascript src
FROM node:16-alpine AS staging
WORKDIR /usr/src/app/auth_service
COPY --from=development /usr/src/app/auth_service/dist .
RUN npm ci --omit=dev
RUN npm i --location=global @vercel/ncc
RUN ncc build index.js -o dist
COPY .env public/ dist/

# Production
FROM node:16-alpine
WORKDIR /usr/src/app/auth_service
COPY --from=staging /usr/src/app/auth_service/dist/ .
CMD ["node", "index.js"]