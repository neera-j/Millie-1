const Asena = require("../Utilis/events");
const { forwardOrBroadCast } = require("../Utilis/groupmute");
const { getBuffer } = require('../Utilis/download');
const { parsedJid } = require("../Utilis/Misc");

// chnage url for custom photo and change caption if
const url1 = 'https://www.hola.com/us/images/0264-10fb37a393b8-7aac16311c1f-1000/horizontal-1200/pandora-x-millie-bobby-brown-collection-launch.jpg'
const url2 = 'https://assets.popbuzz.com/2019/20/millie-bobby-brown-on-jimmy-fallon-1558697606-view-0.jpg'
Asena.addCommand(
    { pattern: 'millie ?(.*)', fromMe: true, desc: "Forward replied msg." },
    async (message, match) => {
        if (!match) return await message.sendMessage("Poliyalle");
        if (!message.reply_message)
            return await message.sendMessage("❤😍");
        const buff1 = await getBuffer(url1)
        const buff2 = await getBuffer(url2)
        const options = {}
        
        
        
        if(message.reply_message.audio){ 
         //ADD /* HERE NOT TO MODIFY AUDIO DURATION
            options.duration = 999999 
        //ADD */ HERE NOT TO MODIFY AUDIO DURATION

        options.ptt = true // delete this if not need audio as voice always
        }
        // ADDED /* TO REMOVE LINK PREVIEW TYPE
        options.linkPreview = {
               head: "💋 ᴍɪʟʟɪᴇ 💋",
               body: "ᴠᴏʟᴜᴍᴇ : ▮▮▮▮▮▮▯▯▯",
               mediaType: 2, //3 for video
               thumbnail: buff2.buffer,
               sourceUrl: "http://api.whatsapp.com/send?phone=+918113921898&text=*HI BRO ✌*",
                }
         // ADDED */ TO REMOVE LINK PREVIEW TYPE
        options.quoted = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                "imageMessage": {
                    "jpegThumbnail": buff1.buffer,
                    "caption": "0:99 ●━━━━━━───── 0:9999999"
                }
            }
        }
        for (let jid of parsedJid(match)) {
      await forwardOrBroadCast(jid, message, options);
    }
    }
);