export default function addPingCommand(commands) {
  commands.addCommand("ping", {
    description: "Says pong",
    category: "Useless",
    author: "ZSStudios",
    onRun(response) {
      response(`INFO Pong!`);
    }
  });
}