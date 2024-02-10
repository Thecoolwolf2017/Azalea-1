export default function addCreditsCommand(commands) {
    commands.addCommand("credits", {
        description: "Who helped make azalea",
        category: "{{ADDONNAME}}",
        azaleaVersion: "0.1",
        onRun(msg, args, theme, response, commands, prefix) {
            let text = [
                `${theme.category}<-=- ${theme.header ? theme.header : theme.command}Beta Testers ${theme.category}-=->`,
                `${theme.category}> ${theme.command}TRASH (Trash9240) ${theme.description}Main beta tester`,
                `${theme.category}> ${theme.command}Sabotage (brightfps_or_sabotage) ${theme.description}Beta tester`,
                `${theme.category}> ${theme.command}Archie (archie8713) ${theme.description}Beta tester`,
                `${theme.category}> ${theme.command}mexican(TTG) (el_cuh6712) ${theme.description}Beta tester`,
                `${theme.category}> ${theme.command}Drago (dragoluxidoor) ${theme.description}Beta tester`,
                `${theme.category}> ${theme.command}Flowy ($ Flow#1129) ${theme.description}Beta tester`,
                `${theme.category}> ${theme.command}DongWoo (woo.19) ${theme.description}Beta tester`,
                `${theme.category}> ${theme.command}KGUSE (kguse1) ${theme.description}Beta tester`,
                `${theme.category}> ${theme.command}slapisbetter (.slapisbetter) ${theme.description}Beta tester`,
                `${theme.category}<-=- ${theme.header ? theme.header : theme.command}Contributors ${theme.category}-=->`,
                `${theme.category}> ${theme.command}TRASH (Trash9240) ${theme.description}Main developer`,
                `${theme.category}> ${theme.command}Asteroid3946 ${theme.description}Manager, UI Designer`,
                `${theme.category}> ${theme.command}EGG7869 ${theme.description}Texture designer 1`,
                `${theme.category}> ${theme.command}s0lfur ${theme.description}Texture designer 2`,
                `${theme.category}> ${theme.command}deaderg ${theme.description}Texture designer 3`,
                `${theme.category}> ${theme.command}Jaguire ${theme.description}Bugtester 1`,
                `${theme.category}> ${theme.command}TheWolfLovers ${theme.description}Chest GUI Theme Designer`,
                ``,
                `§9Discord: https://azalea-mc.org/discord`,
                `§aMCPEDL: https://mcpedl.com/azalea`
            ]
            response(`TEXT ${text.join('\n§r')}`);
        }
    })
}