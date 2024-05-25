
export default function AddRankCommand(commands) {
    commands.addCommand("rank", {
        description: "Add / remove ranks",
        category: "Management",
        deprecated: true,
        admin: true,
        onRun(args, theme, response) {
            return response("DEPRINFO Bro just use admin panel. §9§o!adminpanel")
        }
    })
}