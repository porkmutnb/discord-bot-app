FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/discord-music-bot

WORKDIR /usr/src/discord-music-bot

COPY package.json /usr/src/discord-music-bot

RUN npm install

COPY . /usr/src/discord-music-bot

# Start the bot.
CMD ["node", "index.js"]