# Use Node.js LTS version as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose port 80
EXPOSE 3000

# Command to start the React app
# CMD ["npm", "run", "prod"]
CMD ["npm", "start"]
# CMD ["npm","run","start:both"]
