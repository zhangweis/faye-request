var uuid = require('node-uuid');
var faye = require('faye');
var lodash = require('lodash');

    function createId() {
        var orderId = uuid.v4().replace(/-/g, '');
        var convertHexToBase36 = function (hex) {
            var big = parseInt(hex, 16);
            return big.toString(36);
        };
        return convertHexToBase36(orderId);
    }

    faye.Client.prototype.request = function(channel, message, timeout) {
        var replyId = '/reply/to'+createId();
        var self = this;
        return new Promise(function(resolve, reject){
            var subscription = self.subscribe(replyId, function(response) {
                subscription.cancel();
                resolve(response);
            })
            self.publish(channel, lodash.extend(message, {replyTo: replyId}));
            setTimeout(function(){
                reject('timeout');
            }, timeout||5000);
        });
    };
module.exports = faye.Client;

