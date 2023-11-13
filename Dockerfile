FROM node:20.9.0-alpine AS final

WORKDIR /app
ENV NODE_ENV production
RUN npm install elastic-apm-node --production

# NOTE: Create Dockerfile variables
ARG APPLICATION_NAME
ENV APP=$APPLICATION_NAME

COPY ./dist/apps/$APPLICATION_NAME /app/dist/apps/$APPLICATION_NAME

EXPOSE 8080
USER node

# Load the Elastic APM script before loading the application
ENTRYPOINT [ "sh", "-c", "node --enable-source-maps -r elastic-apm-node/start /app/dist/apps/${APP}/server/main.js" ]

HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost:8080/healthcheck || exit 1
