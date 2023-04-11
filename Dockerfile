# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Expose the ports your application uses (3000 for backend, 4000 for frontend)
EXPOSE 3000 4000

# Start the application
CMD ["node", "server.js"]
