FROM node:10-alpine

# Create the app directory
RUN mkdir -p /src/app

# Set app directory as work director
WORKDIR /src/app

# Copy in the package.json file
COPY package.json /src/app

# Install app dependencies
RUN npm install
RUN npm i sequelize-cli@^5.5.1 -g
RUN npm run build

# Copy in remaining development files
COPY . /src/app

# Start server
# CMD [ "nodemon", "--inspect", "./server.js" ]
CMD ["node", "./main.js"]

