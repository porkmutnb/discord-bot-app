FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/discord-manager-bot

WORKDIR /usr/src/discord-manager-bot

COPY package.json /usr/src/discord-manager-bot

RUN npm install

COPY . /usr/src/discord-manager-bot

# Start the bot.
CMD ["node", "server.js"]