FROM node:current-alpine as build

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install
ADD ./ ./
RUN yarn build

FROM nginx:stable-alpine AS nginx

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]