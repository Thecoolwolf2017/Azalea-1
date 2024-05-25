import { uiManager } from '../uis';
import { worldTags } from '../apis/WorldTags';
// A function that takes a JSON string and returns a highlighted string with Minecraft color codes
export default function addVersionCommand(commands) {
    commands.addCommand("testing", {
        description: "Command to test code",
        isDev: true,
        category: "Development",
        onRun(args, response) {
            // response(`TEXT Text response`)
            // response(`RESPONSE1 Miscellaneous response`);
            // response(`INFO Info response`);
            // response(`WARN Warn response`);
            // response(`ERROR Error response`);
            // response(`SUCCESS Success response`);
            // let inventory = msg.sender.getComponent("inventory");
            // let item = inventory.container.getItem(msg.sender.selectedSlot);
            // console.warn(item.getTags());
            // let lb = new Database("Shop-ADB2");
            // response(`TEXT ${lb.get("leaderboards")}`)
            // let inventory = msg.sender.getComponent("inventory");
            // let container = inventory.container;
            // for(const player of world.getPlayers()) {
            //   for(const tag of player.getTags()) {
            //     if(tag.startsWith('rank:')) player.removeTag(tag);
            //   }
            // }
            // container.addItem(new ItemStack("minecraft:glowingobsidian", 1))
            // let playershops = new Database("ShopADB2");
            // response(`TEXT ${highlightJSON(JSON.stringify(playershops.allData, null, 2))}`);
            if(args[0] == "view") {
              response(`TEXT ${worldTags.tags.join(', ')}`);
            } else {
              worldTags.tags.push(args.slice(1).join(' '))
            }
        }
    })
    commands.addCommand("chatdialog", {
        description: "Command to test code",
        isDev: true,
        category: "Development",
        onRun(theme, response) {
            response(`TEXT ${theme.category}+---- ${theme.header}DIALOG ${theme.category}----+`);
            response(`TEXT ${theme.category}|                        |`);
            response(`TEXT ${theme.category}| §rThis is a test       ${theme.category}|`);
            response(`TEXT ${theme.category}|                        |`);
            response(`TEXT ${theme.category}+---------------+`)
        }
    })
    commands.addCommand("uis", {
        description: "View UIs through UI manager",
        isDev: true,
        category: "Development",
        onRun(theme, response) {
            let uis = uiManager.uis.map(_=>_.id);
            let text = [`${theme.category}----- ${theme.header}UI IDs ${theme.category}-----`];
            for(const id of uis) {
                text.push(id);
            }
            response(`TEXT ${text.join('\n§r')}`)
        }
    })
}