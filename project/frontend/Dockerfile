# JSAQ

# Use an official Node runtime as a parent image
FROM node

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Run build & install dependencies
RUN NODE_ENV=development npm install \
  && npm run build \
  && rm -rf `ls -a .|egrep -v '(^\.\.?$|build|public|server|epm-ui-boot.config.js|LICENSE|package.json|package-lock.json)'` \
  && NODE_ENV=production npm install \
  && npm cache verify

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define NODE_ENV environment variable
ENV NODE_ENV production

# Run npm start when the container launches
CMD [ "npm", "start" ]