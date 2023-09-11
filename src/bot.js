const { Client, GatewayIntentBits } = require('discord.js');
const config = require('../config');
const StatusUpdater = require('./StatusUpdater');

class Bot {
  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
    });

    this.statusUpdater = new StatusUpdater(this.client);
  }

  start() {
    this.client.on('ready', () => {
      console.log(`[junredzik] Logged in as: ${this.client.user.tag} (${this.client.user.id})`);
      this.statusUpdater.updateStatus();
      setInterval(() => this.statusUpdater.updateStatus(), config.checkInterval);
    });

    this.client.login(config.token);
  }
}

module.exports = Bot;
