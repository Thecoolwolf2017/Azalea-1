import { system } from '@minecraft/server';

export default function addPingCommand(commands) {
    commands.addCommand("ping", {
        description: "Says pong",
        category: "Fun",
        author: "ZSStudios",
        onRun(response) {
            system.runTimeout(()=>{
                let currentTick = system.currentTick
                // TODO: #12 Fix whatever the fuck this is
                response(`INFO ${currentTick - prevTick} TPS`)
            },20);
        }
    })
}