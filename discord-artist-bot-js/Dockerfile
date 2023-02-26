FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/discord-artist-bot

WORKDIR /usr/src/discord-artist-bot

COPY package.json /usr/src/discord-artist-bot

RUN npm install

COPY . /usr/src/discord-artist-bot

# Start the bot.
CMD ["node", "index.js"]