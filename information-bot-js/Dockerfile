FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/information-bot

WORKDIR /usr/src/information-bot

COPY package.json /usr/src/information-bot

RUN npm install

COPY . /usr/src/information-bot

# Start the bot.
CMD ["node", "index.js"]