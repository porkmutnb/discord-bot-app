FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/discord-assistant-bot

WORKDIR /usr/src/discord-assistant-bot

COPY package.json /usr/src/discord-assistant-bot

RUN npm install

COPY . /usr/src/discord-assistant-bot

# Start the bot.
CMD ["node", "server.js"]