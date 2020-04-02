"use strict";

require("dotenv").config();

import { isUrl } from "./src/isUrl";

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("message", msg => {
  msg.content.split(" ").forEach(item => {
    if (isUrl(item)) {
      console.log(`URL: ${item}`);
    }
  });
});

client.login(process.env.TOKEN);
