FROM node:16.13.0-bullseye-slim

ENV TZ Asia/Tokyo

COPY ./docker/dev/app/files /
RUN install -m 755 -o node -g node -d /var/app

USER node
WORKDIR /var/app

# Install dependencies
COPY --chown=node:node package*.json .
RUN npm ci

COPY --chown=node:node . .

CMD [ "docker-entrypoint.sh" ]
