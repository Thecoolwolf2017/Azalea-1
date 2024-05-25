import {
  system,
  world,
} from '@minecraft/server';

import { Database } from '../db';
import moment from '../moment';

let cachedBans = [];
world.afterEvents.worldInitialize.subscribe(()=>{
    let bansDb = new Database("Bans");
    cachedBans = JSON.parse(bansDb.get("bans") ? bansDb.get("bans") : "[]");
})
world.afterEvents.playerSpawn.subscribe(eventData=>{
    // return;
    let ban = cachedBans.find(_=>eventData.player.id==_.playerId || eventData.player.name==_.playerName);
    let banIndex = cachedBans.findIndex(_=>eventData.player.id==_.playerId || eventData.player.name==_.playerName);
    if(ban) {
        console.warn(ban.expires, Date.now())
        if(ban.expires > 0 && Date.now() < ban.expires) {
            let player = eventData.player;
            system.run(()=>{
                player.runCommand(`kick "${player.name}" §cYou have been banned until ${moment(ban.expires).format('MMMM Do YYYY, h:mm:ss a')} UTC!\n\n§r§eYou can try contacting an admin to get unbanned if you think the ban wasnt fair`);
            })
            return;
        } else if(ban.expires > 0 && Date.now() > ban.expires) {
            cachedBans.splice(banIndex, 1);
            let bansDb = new Database("Bans");
            bansDb.set("bans", JSON.stringify(cachedBans));
        } else if(ban.expires == 0) {
            let player = eventData.player;
            system.run(()=>{
                player.runCommand(`kick "${player.name}" §cYou have been banned permanently!\n\n§r§eYou can try contacting an admin to get unbanned if you think the ban wasnt fair`);
            })
        }
        eventData.player.sendMessage("You are banned!");
    }
})
;
;
;
;
//The parenthesis in the regex creates a captured group within the quotes
function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];
    
    do {
        //Each call to exec returns the next regex match as an array
        var match = myRegexp.exec(myString);
    } while (match != null);

    return myArray;
}
export default function banCommand(commands) {
    commands.addCommand("ban", {
        admin: true,
        category: "Moderation",
    })

("unban", {
        description: "Unban a player",
        admin: true,
        category: "Moderation",
        async onRun(worseArgs, response) {
            let args = betterArgs(worseArgs.join(' '));
            if(!args.length) return response(`ERROR You must include a player name. If the player you're trying to ban has spaces in their name, just add quotes around their name.`);
            let bansDb = new Database("Bans");
            let bansList = JSON.parse(bansDb.get("bans") ? bansDb.get("bans") : "[]");
            let responseText = `Unbanned player!`;
            let ban = bansList.find(_=>_.playerName.toLowerCase() == args[0].toLowerCase());
            let banIndex = bansList.find(_=>_.playerName.toLowerCase() == args[0].toLowerCase());
            if(ban) {
                bansList.splice(banIndex, 1);
            } else {
                return response(`ERROR Player not banned!`);
            }
            cachedBans = bansList;
            bansDb.set("bans", JSON.stringify(bansList));
            return response(`SUCCESS ${responseText}`);
        }
    })

    commands.addCommand('banlist', {
        description: "List all bans",
        admin: true,
        category: "Moderation",
        async onRun(response) {
            let bansDb = new Database("Bans");
            let bansList = JSON.parse(bansDb.get("bans") ? bansDb.get("bans") : "[]");
            cachedBans = bansList;

            let text = [`${theme.category}<-=- ${theme.command}Bans ${theme.category}-=->`];

            for(const ban of cachedBans) {
                let date = new Date(ban.expires);
                let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                let endStr = `${months[date.getMonth()]} ${date.getDate()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                text.push(`${theme.command}${ban.playerName} ${theme.description}Expires ${ban.expires > 0 ? endStr : "Never"}`);
            }

            if(!cachedBans.length) text.push(`${theme.errorColor}There are no bans...`);

            response(`TEXT ${text.join('\n§r')}`)
        }
    })
}