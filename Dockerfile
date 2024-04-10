# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Install zip and other necessary system packages
RUN apt-get update && apt-get install -y \
    zip \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
#RUN npm run build

# You can define the command to run your application here
CMD ["npm", "run", "build"]
