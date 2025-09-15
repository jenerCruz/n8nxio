FROM node:lts-alpine

# Versión de n8n
ARG N8N_VERSION=1.39.1

# Instala dependencias necesarias
RUN apk add --update graphicsmagick tzdata

# Usuario root para instalación
USER root

# Crea carpeta de trabajo
WORKDIR /data

# Copia el package.json con los 200 nodos comunitarios
COPY package.json ./

# Instala n8n y nodos comunitarios
RUN apk --update add --virtual build-dependencies python3 build-base && \
    npm_config_user=root npm install --location=global n8n@${N8N_VERSION} && \
    npm install && \
    apk del build-dependencies

# Usuario seguro
USER node

# Entrypoint
CMD ["n8n"]