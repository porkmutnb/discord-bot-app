FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/artist-bot

WORKDIR /usr/src/artist-bot

COPY package.json /usr/src/artist-bot

RUN npm install

COPY . /usr/src/artist-bot

# Start the bot.
CMD ["node", "index.js"]