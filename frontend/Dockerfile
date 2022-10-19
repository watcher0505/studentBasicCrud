# specify parent image with node in this version: 16.16.0-alpine
FROM node:16-alpine3.15

# Specify working directory.
WORKDIR /app

# Copy source files inthis directory to a new folder called app.
COPY package*.json .

# Specify command npm install to add all dependencies.
RUN npm install --location=global npm@8.19.1
RUN npm install

# Copy everything to /app after installi0ng dependencies.
COPY . .

# expose a port to use in the container
EXPOSE 3000

# Run command in cmd. example" npm start
CMD ["npm", "start"]