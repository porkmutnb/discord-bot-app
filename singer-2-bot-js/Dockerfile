FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/singer-bot

WORKDIR /usr/src/singer-bot

ENV PORT 9007

COPY package.json /usr/src/singer-bot

RUN npm install

COPY . /usr/src/singer-bot

# Start the bot.
CMD ["node", "index.js"]