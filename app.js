"use strict";

const fs         = require('fs');
const {Server}   = require('ssh2');
const SftpServer = require('ssh2-sftp-server');

new ssh2.Server({
  hostKeys: [fs.readFileSync('host.key')]
}, function(client) {
  client.on('authentication', function(ctx) {
    ctx.accept();
  }).on('ready', function() {
    client.on('session', (accept) => {
      let session = accept();
      session.on('sftp', function() {
        var sftpStream = accept();
        new SftpServer(sftpStream);
      });
    });
  });
});
