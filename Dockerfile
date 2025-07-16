FROM node:18 AS builder

WORKDIR /app
COPY . .
ENV NODE_ENV=production

RUN npm ci

FROM node:18-alpine AS runtime

RUN apk add --no-cache tini

COPY --from=builder /app /app
WORKDIR /app

RUN mkdir -p /app/cache && chown -R 1000:1000 /app/cache

# Environment variables
ENV NODE_ENV=production
ENV CACHE_DIR=/app/cache
VOLUME /app/cache

USER 1000

EXPOSE 8080
CMD [ "tini", "--", "npm", "run", "start-local" ]
