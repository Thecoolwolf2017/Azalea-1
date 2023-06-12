import {world, system} from '@minecraft/server';
import { commands } from './commands';
system.run(()=>{
    try {
        world.scoreboard.addObjective('themes');
    } catch {}
})
// managed by gulp
import * as Commands from './commands-folder';
for(const command of Object.values(Commands)) {
    command(commands);
}
// create the events using my shitty import system
// import '*events';
// let events = [];
// for(const event of imports_events) {
//     let eventData = event();
//     events.push({
//         name: eventData.name,
//         onRun: eventData.onRun
//     })
// }

// checks if the player can do shit
function isAdmin(player) {
    return player.isOp() || player.hasTag("admin");
}

// useful if the function name wasnt so fucking long
// gets all strings in an array starting with a prefix then returns it
function getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix) {
    return list
        .filter(_=>_.startsWith(prefix))
        .map(_=>_.substring(prefix.length));
}

function getFirstStringStartingWithPrefixAndRemovePrefix(list, prefix, defaultString=null) {
    let result = getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix);

    if(result.length) return result[0]
    else return defaultString;
}
let prefix = '!';

world.beforeEvents.chatSend.subscribe(msg=>{
    msg.cancel = true;
    if(msg.message.startsWith(prefix)) {
        commands.run(msg, prefix);
    } else {
        // chat ranks are done
        // it just took a shitty utility function and weird string formatting
        let tags = msg.sender.getTags();
        let ranks = getAllStringsStartingWithPrefixAndRemovePrefix(tags, "rank:");
        if(!ranks.length) ranks.push(`Member`)

        let nameColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "name-color:");
        let bracketColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "bracket-color:");
        let messageColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "message-color:");
        let themeObjective;
        try {
            themeObjective = world.scoreboard.getObjective("themes");
        } catch {}
        for(const player of world.getPlayers()) {
            let score = 0;
            try {
                let s = themeObjective.getScore(player.scoreboardIdentity);

                if(s) score = s
                else score = 0
            } catch(e){
                score = 0
                console.warn(e)
            }
            let theme = commands.themeMgr.getTheme(score);
            player.sendMessage(`${bracketColor ? bracketColor : theme.defaultBracketColor}[${theme.defaultRankColor}${ranks.join(`§r${bracketColor ? bracketColor : theme.defaultBracketColor}, ${theme.defaultRankColor}`)}§r${bracketColor ? bracketColor : theme.defaultBracketColor}] ${/^§[(0-9a-f)*?]$/.test(nameColor) ? nameColor : theme.defaultNameColor}${msg.sender.nameTag}${bracketColor ? bracketColor : theme.defaultBracketColor}: ${messageColor ? messageColor : theme.defaultMessageColor}${msg.message}`);
        }
        // world.sendMessage(`[${ranks.join('§r, ')}§r] ${/^§[(0-9a-f)*?]$/.test(nameColor) ? nameColor : "§b"}${msg.sender.nameTag} ${msg.message}`);
        return;
    }
})