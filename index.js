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

const updateStatus = (channel = null) => {
  request('https://lambda.fivem.net', (error, res, body) => {
    if (!error) {
      const text = JSON.stringify(body);
      const online = text.includes("CleanAndLegit");
  
      console.log("Sprawdzam status FiveM: " + (online ? 'online' : 'offline'));

      if (!online) {
        activityName = '``🔴 FiveM``';
      } else {
        activityName = '``🟢 FiveM``';
      }
      if (lastStatusIndicator !== online) {
        lastStatusIndicator = online;
        if (channel) {
          channel.send(`Status FiveM: ${online ? 'Server Online' : 'Server Offline'}`);
        }
        client.channels
          .fetch('')
          .then((channel) => {
            channel.send(`${activityName}`);
          })
          .catch(console.error);
      }
    } else {
      console.log('Error: ', error);
      if (channel) {
        channel.send('Nie udało się pobrać statusu.');
      }
    }
  });
};

const tokenik = '';
client.login(tokenik);
