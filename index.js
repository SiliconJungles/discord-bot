"use strict";

require("dotenv").config();

const isUrl = require("./src/isUrl");
const postToServer = require("./src/postToServer");
const Discord = require("discord.js");
const CronJob = require('cron').CronJob;
const getHolidays = require('public-holidays').getHolidays;

const SHOW_N_TELL_CHANNEL = '692926834525995108';
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

const notifyUsersForShowAndTell = new CronJob('45 17 * * 1-5', () => {
  getHolidays({ country: 'sg', lang: 'en' }).then((holidays) => {
    const holidayDates = {}
    holidays.forEach(holiday => holidayDates[holiday["date"].toLocaleDateString("en-SG")] = holiday["name"])

    const today = new Date().toLocaleDateString("en-SG")
    if (holidayDates[today]) {
      console.log(`Today is a holiday! ${holidayDates[today]}`)
    } else {
      console.log(`Starting show and tell: ${today}`)
      client.channels.fetch(SHOW_N_TELL_CHANNEL).then(channel => channel.send(
        "@everyone, Get ready for Show and Tell!"
      ));
    }
  }).catch((error) => {
    console.error(error)
  })
}, null, false, 'Asia/Singapore');

notifyUsersForShowAndTell.start();