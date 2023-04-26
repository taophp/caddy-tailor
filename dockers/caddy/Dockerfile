FROM caddy:builder-alpine AS builder
RUN xcaddy build master
FROM caddy:alpine

COPY --from=builder /usr/bin/caddy /usr/bin/caddy