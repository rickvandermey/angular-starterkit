# Specify hash to prevent hijacking attacks
FROM node:10-alpine

# Set Explicit timezone
RUN apk add --no-cache tzdata
ENV TZ=Europe/Amsterdam

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package*.json ./
RUN npm ci

# Bundle add app source, using the dockerignore to prevent unwanted files to be copied
COPY ./ .

# Expose mock server port
EXPOSE 443 3999 4000

# Start mock server
ENTRYPOINT npm run watch
