
import { CommandBuilder } from '../commandBuilder';

export default function() {
    new CommandBuilder("setup")
    .category("Help Center")
    .desc("Easily setup shit with a nice UI")
    .requiresAdmin(true)
    .callback(({})=>{
        return;
    })
    .register()
}