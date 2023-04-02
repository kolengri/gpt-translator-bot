# Telegram Translator Bot

This is a Telegram bot that uses OpenAI to provide translation services. The bot is built using Node.js and TypeScript.

# Installation

To install the dependencies for the project, run:

```
  npm install
```

or

```
  yarn install
```

# Usage

To run the bot, you will need to provide your Telegram Bot API key and OpenAI API key as environment variables. You can do this by creating a .env file in the project root directory and adding the following:

```
# .env
TELEGRAM_BOT_TOKEN=<your-telegram-bot-api-key>
OPENAI_API_KEY=<your-openai-api-key>
```

Once you have set up your environment variables, run the following command to start the bot:

```
npm run start
```

or

```
yarn start
```

# Features

- Translate messages in real-time
- Support for multiple languages
- Simple command structure for ease of use

# Contributing

If you would like to contribute to this project, please follow these steps:

- Fork the repository
- Create a new branch (git checkout -b feature/your-feature)
- Make your changes and commit them (git commit -am 'Add your feature')
- Push to the branch (git push origin feature/your-feature)
- Create a new pull request

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.

# Acknowledgments

- The Telegram API documentation
- The OpenAI API documentation
- The Node.js and TypeScript communities
