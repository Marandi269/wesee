FROM node:18 as builder
WORKDIR /app
COPY package.json /app
RUN yarn install

COPY . /app
RUN yarn build

FROM caddy:2.4.5-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /app

