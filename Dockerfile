#node block
FROM node:alpine3.18 as nodework
WORKDIR /telemart-erp
COPY package.json .
RUN yarn
COPY . .
RUN yarn build



#nginx block
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /telemart-erp/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]