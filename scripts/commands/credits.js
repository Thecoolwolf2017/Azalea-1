export default function addCreditsCommand(commands) {
  commands.addCommand("credits", {
    description: "Who helped make azelea",
    category: "Help Center",
    onRun(theme, response) {
      let text = [
        `${theme.category}<-=- ${theme.command}Credits ${theme.category}-=->`,
        `${theme.command}TRASH ${theme.description}developer/Owner`,
        `${theme.command}ZSStudios ${theme.description}Miscellaneous developer (Made some commands)`,
        `${theme.command}Lozenda ${theme.description}Lead Developer`,
      ];
      response(`TEXT ${text.join("\n")}`);
    },
  });
  for (let i = 0; i < 100; i++) {
    commands.addCommand(i.toString(), {
      description: i.toString(),
      category: "Spam",
      onRun() {},
    });
  }
}
