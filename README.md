# faye-request

Add request method to faye client.

You can use it like below:
var FayeClient = require('faye-request');
var client = new FayeClient(serverUri);
client.request(channel, message).then(function (reply) {
    reply.something;
});
