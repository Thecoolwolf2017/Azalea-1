export function addTestCommand(commands) {
    commands.addCommand("test", {
        description: "Debuggging",
        category: "Debug",
        onRun(response) {
            response(`TEXT Test test debugging help me`);
        }
    })
}