# Use the latest Node.js image as the base
FROM --platform=linux/amd64 node:lts-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy all files from the current directory to the /app directory in the container
COPY . /app

# Install dependencies (assuming package.json and package-lock.json are present)
RUN npm install

# Ignore the node_modules folder
COPY .dockerignore /app/.dockerignore

# Run the command to start the application
CMD ["npm", "run", "start"]
