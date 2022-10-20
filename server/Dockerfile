FROM node:16-alpine

# Create Working Directory
WORKDIR /app

# Install app dependencies
COPY ./ ./

# Install Modules
RUN npm install && npm install forever -g

# Check 
RUN ls

# Bundle app source
COPY . .

RUN forever start ./src/index.js --spinSleepTime 10000

EXPOSE 6464
