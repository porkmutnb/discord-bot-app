FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/manager-bot

WORKDIR /usr/src/manager-bot

COPY package.json /usr/src/manager-bot

RUN npm install

COPY . /usr/src/manager-bot

# Start the bot.
CMD ["node", "index.js"]