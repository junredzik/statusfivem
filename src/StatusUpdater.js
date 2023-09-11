const request = require('request');
const config = require('../config');

class StatusUpdater {
  constructor(client) {
    this.client = client;
    this.lastStatusIndicator = null;
  }

  updateStatus() {
    request(config.lambdaUrl, (error, res, body) => {
      if (!error) {
        const text = JSON.stringify(body);
        const online = text.includes("CleanAndLegit");
    
        console.log("Checking FiveM status: " + (online ? 'online' : 'offline'));

        let activityName = online ? '``🟢 FiveM``' : '``🔴 FiveM``';
        
        if (this.lastStatusIndicator !== online) {
          this.lastStatusIndicator = online;
          this.client.channels
            .fetch(config.channelId)
            .then(channel => channel.send(activityName))
            .catch(console.error);
        }
      } else {
        console.log('Error: ', error);
      }
    });
  }
}

module.exports = StatusUpdater;
