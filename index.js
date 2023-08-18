const { Client, GatewayIntentBits } = require('discord.js');
const request = require('request');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

let lastStatusIndicator = null;

client.on('ready', () => {
  console.log(`[junredzik] Zalogowano jako: ${client.user.tag} (${client.user.id})`);
  updateStatus();
  setInterval(updateStatus, 1000 * 30);
});

const updateStatus = async (channel = null) => {
  try {
    const body = await request('https://lambda.fivem.net');
    const online = JSON.stringify(body).includes("CleanAndLegit");

    console.log(`Sprawdzam status FiveM: ${online ? 'online' : 'offline'}`);

    const activityName = online ? '``🟢 FiveM``' : '``🔴 FiveM``';

    if (lastStatusIndicator !== online) {
      lastStatusIndicator = online;
      const targetChannel = await client.channels.fetch('');
      targetChannel.send(activityName);
    }
  } catch (error) {
    console.log('Error: ', error);
    if (channel) {
      channel.send('Nie udało się pobrać statusu.');
    }
  }
};

const tokenik = '';
client.login(tokenik);
