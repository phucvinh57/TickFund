# Build from javascript src
FROM node:16-alpine AS development
WORKDIR /usr/src/app/tickfund_application
COPY . .
RUN npm install
RUN npm run build

# Production
FROM node:16-alpine
WORKDIR /usr/src/app/tickfund_application
RUN npm i --location=global serve
COPY --from=development /usr/src/app/tickfund_application/build/ .
CMD serve -s . -l 3000