"use strict";

const { GraphQLClient } = require("graphql-request");

module.exports = (url, username) => {
  const endpoint = `${process.env.STANDUP_BOT_URL}/v1/graphql`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.STANDUP_BOT_SECRET
    }
  });

  const query = `
    mutation {
      insert_shares(
        objects: {
          sharing: "${url}",
          contributor: "${username}",
          user_id: "${process.env.STANDUP_USER_ID}"
        }
      ) {
        affected_rows
        returning {
          sharing
        }
      }
    }`;

  client
    .request(query)
    .then(data => console.log(data))
    .catch(error => console.error(error));
};
