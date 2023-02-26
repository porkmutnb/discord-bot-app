FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/discord-greeting-bot

WORKDIR /usr/src/discord-greeting-bot

COPY package.json /usr/src/discord-greeting-bot

RUN npm install

COPY . /usr/src/discord-greeting-bot

# Start the bot.
CMD ["node", "index.js"]