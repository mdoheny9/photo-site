const { defineConfig } = require("cypress");

require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    env: {
      appUrl: process.env.APP_URL,
      email0: process.env.EMAIL0,
      password00: process.env.PASSWORD00,
      password01: process.env.PASSWORD01,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
