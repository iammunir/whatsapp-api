const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({authStrategy: new LocalAuth()});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage('6285338017331@c.us', `OK I'm ready`);
});

const greetings = ['hello', 'hi', 'ping', 'p', 'halo', 'met', 'selamat'];
client.on('message', async msg => {
    const contact = await msg.getContact();
    const info = `${msg.from} - ${contact.number}: ${msg.body}`;
    console.log(info);

    const message = msg.body;
    
    const i = greetings.findIndex(greet => message.toLowerCase().includes(greet));

    if (i >= 0) {
        msg.reply(`${message} juga`);
    }
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});


client.initialize();