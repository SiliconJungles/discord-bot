"use strict";

require("dotenv").config();

const isUrl = require("./src/isUrl");
const postToServer = require("./src/postToServer");
const Discord = require("discord.js");

const client = new Discord.Client();

client.on("message", msg => {
  msg.content.split(" ").forEach(item => {
    if (isUrl(item)) {
      postToServer(item, msg.author.username);
    }
  });
});

client.login(process.env.TOKEN);
