import { CommandBuilder } from '../commandBuilder';

export default function() {
    new CommandBuilder("floating-text")
        .desc("Float")
        .category("Floating Text")
        .requiresAdmin(true)
        .callback(({msg,args})=>{
            let rabbit = msg.sender.dimension.spawnEntity("rabbit", msg.sender.location);
            rabbit.nameTag = args.join(' ').replaceAll('\\n','\n')
        })
        .register();
}