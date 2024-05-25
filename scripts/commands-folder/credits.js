export default function addCreditsCommand(commands) {
    commands.addCommand("credits", {
        description: "Who helped make azelea",
        category: "Help Center",
        onRun(theme, response) {
            let text = [
                `${theme.category}<-=- ${theme.command}Credits ${theme.category}-=->`,
                `${theme.command}TRASH ${theme.description}Main developer`,
                `${theme.command}ZSStudios ${theme.description}Miscellaneous developer (Made some commands)`
            ]
            response(`TEXT ${text.join('\n')}`);
        }
    })
}