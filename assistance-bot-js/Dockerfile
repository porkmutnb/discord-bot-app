FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/assistance-bot

WORKDIR /usr/src/assistance-bot

COPY package.json /usr/src/assistance-bot

RUN npm install

COPY . /usr/src/assistance-bot

# Start the bot.
CMD ["node", "index.js"]