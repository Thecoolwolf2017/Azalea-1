
import { CommandBuilder } from '../../commandBuilder';

import { Database } from '../../db';

export default function() {
    new CommandBuilder("setup")
    .category("Help Center")
    .desc("Easily setup shit with a nice UI")
    .requiresAdmin(true)
    .deprecated()
    .callback(({response})=>{
let shop = new Database("ShopADB2")
response(`TEXT ${JSON.stringify(shop.allData, null, 2)}`)
        return response("DEPRINFO Reason: unfinished command")
    })
    .register()
}