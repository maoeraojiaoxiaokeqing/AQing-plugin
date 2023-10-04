
 import plugin from '../../lib/plugins/plugin.js'//导包部分
import { segment } from "oicq";
import fetch from "node-fetch";
const xhz_path = 'plugins/AQing-plugin/resources/ys/'
export class example extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '原神启动',
            /** 功能描述 */
            dsc: '原神启动!',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 4888,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^(.*)原神(.*)$',
                    /** 执行方法 */
                    fnc: 'ys'
                },
            ]
        })
    }
    async ys(e) {
        let file = fs.readdirSync(xhz_path)
        let imgnum = Math.round(Math.random() * (file.length - 1))
        let msg = [segment.at(e.user_id), segment.image('file://' + xhz_path + file[imgnum])]
        await e.reply(msg);
        return true
    }
}
 
 