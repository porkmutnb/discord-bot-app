FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/discord-information-bot

WORKDIR /usr/src/discord-information-bot

COPY package.json /usr/src/discord-information-bot

RUN npm install

COPY . /usr/src/discord-information-bot

# Start the bot.
CMD ["node", "server.js"]