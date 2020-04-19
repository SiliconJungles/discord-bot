"use strict";

require("dotenv").config();

const isUrl = require("./src/isUrl");
const postToServer = require("./src/postToServer");
const Discord = require("discord.js");
const CronJob = require('cron').CronJob;

const SHOW_N_TELL_CHANNEL = 692926834525995108;
const client = new Discord.Client();

client.on("message", (msg) => {
  if (msg.channel.id !== SHOW_N_TELL_CHANNEL) {
    msg.content.split(/\s/).forEach((item) => {
      if (isUrl(item)) {
        console.log(`Submitting ${item}`);
        postToServer(item, msg.author.username);
      }
    });
  }
});

client.login(process.env.TOKEN);

const notifyUsersForShowAndTell = new CronJob('55 17 * * 1-5', () => {
  console.log(new Date());
  client.channels.fetch(SHOW_N_TELL_CHANNEL).then(channel => channel.send(
    "@everyone, Get ready for Show and Tell!"
  ));
}, null, false, 'Asia/Singapore');

notifyUsersForShowAndTell.start();