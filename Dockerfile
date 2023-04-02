# Use official Node.js image as base image
FROM node:latest

# Set environment variables
ENV NODE_ENV=production

# Create app directory and set it as the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn

# Copy the source code to the container
COPY . .

# Expose the port that the bot listens on
EXPOSE 8000

# Start the bot using the start:prod script
RUN yarn start:prod
