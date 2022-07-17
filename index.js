
// catch 404 and forward to error handler
const publicIp = require('public-ip');
const axios = require('axios');
const fs = require("fs");
const  {exec } = require("child_process");

//--- blwsmartware
const CFemail ="vuchungbt@gmail.com";
const CLAPIKey="Bearer eS8H1pzyxMQk31_tulDUKi4r0a8Qq_SDA9KvRoHb";

//---- vnchat.me
const DNSzoneID_chat="899b5688cecabad1a6bfb9d95ee2b109";
const CLAPIKey_chat="Bearer hmhidcB71dkGTbWjE-aZ-O9TmD_YxPm0m-2iGDx0";
const id_chat="c5162746681f3bd114ff120eff4ef184";

let oldIP = '';

var HourInMilliseconds = 1000 * 60 * 60;

let myVar = setInterval(myTimer, 30000);
let x = 0;

function myTimer() {
    (async () => {
        let ip = await publicIp.v4();
        
        if(ip!==null && ip!==''&& ip!==undefined && ip!==oldIP) {
            console.log('New:',ip);
            console.log('Old:',oldIP);
            

            oldIP = ip;
            				
			//-------vnchat.me----------------
			let url_chat = 'https://api.cloudflare.com/client/v4/zones/'+DNSzoneID_chat+'/dns_records/'+id_chat;
            let body_chat = {
                "type":"A",
                "name":"vnchat.me",
                "content":ip,
                "ttl":1,
                "proxied":true
                }
            
                try {
                    const datares_chat = (await axios.put(url_chat, body_chat, {
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : CLAPIKey_chat
                        }
                      }
                    )).data;
                    
                    if (datares_chat && datares_chat.success==true) {
                        
                        console.log('Change vnchat.me success to ',ip);
                    }
                    else {
                        console.log('Change failed to ',ip);
                    }
                }
                catch (error) {
                    console.error(error);
                }


        }
                   
        })();
}




