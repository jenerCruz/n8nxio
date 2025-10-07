# syntax=docker/dockerfile:1
FROM node:lts-alpine

ARG N8N_VERSION=1.113.3

RUN apk add --no-cache graphicsmagick tzdata \
  && apk add --no-cache --virtual .build-deps build-base python3 \
  && npm_config_user=root npm install --location=global n8n@${N8N_VERSION} \
  && apk del .build-deps

WORKDIR /home/node/.n8n
RUN mkdir -p /home/node/.n8n && chown -R node:node /home/node/.n8n

EXPOSE 5678

ENV N8N_HOST=0.0.0.0
ENV N8N_PORT=5678
ENV N8N_TRUST_PROXY=true
ENV GENERIC_TIMEZONE="America/Mexico_City"

USER node

CMD ["n8n", "start"]
