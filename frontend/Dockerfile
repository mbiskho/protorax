# Fetching the latest node image on alpine linux
FROM node:alpine

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package*.json /app

RUN npm install

RUN npm install -g serve

# Copying all the files in our project
COPY . .

EXPOSE 80

# Starting our application
CMD ["serve","-s","build","-l","80"]