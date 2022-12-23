FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/reception-bot

WORKDIR /usr/src/reception-bot

COPY package.json /usr/src/reception-bot

RUN npm install

COPY . /usr/src/reception-bot

# Start the bot.
CMD ["node", "index.js"]