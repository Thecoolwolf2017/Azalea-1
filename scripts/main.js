import * as mc from '@minecraft/server';
import blockEditor from './extensions/blockEditor';
import chest_guis from './extensions/chest_guis';
import combat_log from './extensions/combat_log';
import command_detection from './extensions/command_detection';
import configurator from './extensions/configurator';
import { beforeChat } from './beforeChat';
import { commands } from './commands';
import { eventMgr } from './eventManager';
import credits from 'commands-folder/commands/credits';
import help from 'commands-folder/commands/help';
import ping from 'commands-folder/commands/ping';
import realhack from 'commands-folder/commands/realhack';
import rolldice from 'commands-folder/commands/rolldice';
import tagcmd from 'commands-folder/commands/tagcmd';
import test from 'commands-folder/commands/test';
import event1 from 'commands-folder/events/event1';
import eventscriptevent from 'commands-folder/events/scriptevent';
import scriptevents from 'commands-folder/scriptevents/test';
//import * as CommandsAzalea from './commands-folder/Azalea';
//import * as CommandsConverter from './commands-folder/Converter';
//import * as CommandsDev from './commands-folder/Dev';
//import * as CommandsEconomy from './commands-folder/Economy';
//import * as CommandsInternal from './commands-folder/Internal';
//import * as CommandsLeaderboards from './commands-folder/Leaderboards';
//import * as CommandsMisc from './commands-folder/Misc';
//import * as CommandsModeration from './commands-folder/Moderation';
//import * as CommandsPreferences from './commands-folder/Preferences';
//import * as CommandsSocial from './commands-folder/Social';
//import * as CommandsUtilities from './commands-folder/Utilities';
//import * as CommandsWarps from './commands-folder/Warps';
//import * as UIs from './uis_new';
import { NicknamesModule } from './nicknames';
import './leaderboardHandler';
import './legacyPlayerShopNoChestUI';
import './sellshop';
import { permList } from './isAdmin';
//import Events from './events';
import { Database } from './db';
//import { uiManager } from './uis';
import './iconExtension';
class BindManager {
    constructor() {
        this.binds = new Map();
        mc.world.beforeEvents.itemUse.subscribe(e => {
            if (e.source.typeId != "minecraft:player") return;

            if (this.binds.has(e.itemStack.typeId)) {
                e.cancel = true;

                this.binds.get(e.itemStack.typeId)(e.source);
            }
        })
    }

    setBind(typeId, callback) {
        this.binds.set(typeId, callback);
    }

    removeBind(typeId) {
        if (this.binds.has(typeId)) this.binds.delete(typeId);
    }
}

let bindManager = new BindManager();

let flags = new Map();
class ExtensionAPI {
    #namespace
    constructor(namespace) {
        this.#namespace = namespace;
        this.bindManager = bindManager;
    }
    registerModule(name, mainClass) {
        eventMgr.emit("RegisterModule", { name, mainClass });
    }

    getFlag(name) {
        if(flags.has(name)) return flags.get(name)
        return false;
    }
    setFlag(name, bool) {
        flags.set(name, bool);
    }
}
let extensions = [blockEditor,chest_guis,combat_log,command_detection,configurator];

class Azalea {
    #modules;

    constructor() {
        this.extensions = [];
        this.#loadExtensions();
        this.#loadLegacyModules();
        this.#loadEvents();
        this.#loadCommands();
        this.#addPermissionList();
        this.#misc();
        this.#modules = [];
        // this.#customExtensionTesting()
        //this.#loadUIs();
        this.#loadEvents2();

    }
    getExtension() {

    }

    #misc() {
        let configDb = new Database("Config");
        let didConvert = false;
        mc.system.runInterval(()=>{
            let startingRank = configDb.get("StartingRank", "");
            if(!startingRank) {
                startingRank = "Member";
                configDb.set("StartingRank", startingRank);
            }
            if(didConvert) return;
            let converted = configDb.get("converted", "false") == "false" ? false : true;
            if(converted) {
                didConvert = true;
                return;
            }
            configDb.set("ChatrankFormat", `{{has_tag staffchat "<bc>[<nc>StaffChat<bc>] " "<bl>"}}§r<bc>[<rc>{{rank_joiner "<drj>"}}§r<bc>] §r<nc><name> §r<bc><dra> §r<mc><msg>`);
            configDb.set("converted", "true");
            didConvert = true;
        },100);

        //for(const event of Object.values(Events)) {
           // eventMgr.listen(event.name, event.callback)
        //}

        mc.system.runInterval(()=>{
            eventMgr.emit("heartbeat");
        }, 20);

        eventMgr.emit("initialize");
    }

    #addPermissionList() {
        permList.addPermission("Dynamic Sign Editor", "signeditor")
        permList.addPermission("Edit Shop", "shop.edit");
        permList.addPermission("Edit Warps", "warps.edit");
        permList.addPermission("Homes", "homes.personal.edit");
        permList.addPermission("Shared Homes", "homes.shared.use");
        permList.addPermission("Teleport To Warps", "warps.tp");
        permList.addPermission("Bypass Combat Log", "combatlog.bypass");
        permList.addPermission("Edit Chat Options", "chatoptions.edit");
        permList.addPermission("Edit Misc Options", "miscoptions.edit");
        permList.addPermission("Edit Leaderboards", "leaderboards.edit");
        permList.addPermission("Edit Gift Codes", "giftcodes.edit");
        permList.addPermission("Edit PVP Settings", "pvpsettings.edit");
        permList.addPermission("Edit Chest GUIs", "chestguis.edit");
        permList.addPermission("Edit Normal GUIs", "formsv2.edit");
        permList.addPermission("Edit Sidebar Options", "sidebar.edit");
        permList.addPermission("View Reports", "reports.view");
        permList.addPermission("Handle Reports", "reports.handle");
        permList.addPermission("Edit Player Settings", "players.edit");
        permList.addPermission("Edit Important Settings", "important.edit");
        permList.addPermission("Edit Verification Settings", "verification.edit");
        permList.addPermission("Edit Custom Commands", "customcmds.edit");
    }

    #loadLegacyModules() {
        NicknamesModule();
    }

    //#loadUIs() {
        //for (const UI of Object.values(UIs)) {
          //  uiManager.addUI(`${UI.name}${UI.description ? `:${UI.description}` : ``}`, UI.onOpen);
        //}

    //}

    #loadCommands() {
        let cmds = [
            //CommandsAdvanced,
           // CommandsAzalea,
            //CommandsConverter,
            //CommandsDev,
            //CommandsEconomy,
            //CommandsInternal,
            //CommandsLeaderboards,
            //CommandsMisc,
            //CommandsModeration,
            //CommandsPreferences,
            //CommandsSocial,
            //CommandsUtilities,
            //CommandsWarps
        ];
        for (const cmdList of cmds) {
            for (const command of Object.values(cmdList)) {
                command(commands);
            }
        }
    }

    #loadEvents() {
        mc.world.beforeEvents.chatSend.subscribe(beforeChat);

        eventMgr.listen("RegisterModule", this.#registerModule);
    }

    #registerModule({ name, mainClass }) {
        this.#modules.push({ name, mainClass });
    }

    #loadExtensions() {
        for (const extension of Object.values(extensions)) {
            this.loadExtension(extension);
        }
    }

    loadExtension(Extension) {
      let ext = new Extension.main(new ExtensionAPI(Extension.namespace));
        this.extensions.push({namespace: Extension.namespace, ext});
    }
    #loadEvents2() {
        mc.system.afterEvents.scriptEventReceive.subscribe(e=>{
            if(e.sourceType == mc.ScriptEventSource.Entity) {
                eventMgr.emit("ScriptEventEntity", e)
            }
        })
    }
}

export const azalea = new Azalea();