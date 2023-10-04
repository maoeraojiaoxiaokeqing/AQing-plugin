import plugin from '../../lib/plugins/plugin.js';
import common from '../../lib/common/common.js';
import { segment } from 'oicq'
import fetch from 'node-fetch';
const _path = process.cwd()
const resPath = `${_path}/plugin/AQing-plugin/resources`
const xhz_path = 'plugins/AQing-plugin/resources/tangzhu/'

export class example extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '堂主语录',
            /** 功能描述 */
            dsc: '随机发送堂主图',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: -114514,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '堂主',
                    /** 执行方法 */
                    fnc: 'tz'
                },
                {
                    /** 命令正则匹配 */
                    reg: '#更新堂主语录',
                    /** 执行方法 */
                    fnc: 'update'
                },
            ]
        })
    }

    async tz(e) {
        let file = fs.readdirSync(xhz_path)
        let imgnum = Math.round(Math.random() * (file.length - 1))
        let msg = [segment.at(e.user_id), segment.image('file://' + xhz_path + file[imgnum])]
        await e.reply(msg);
        return true
    }

    async update(e) {
        if (!e.isMaster) {
            e.reply(`暂无权限`)
            return false
        }
        else {
            command = `git clone https://gitee.com/aayhg/tangzhuyulu.git "${resPath}/tangzhu/" --depth=1`
            e.reply('开始尝试安装图片加量包，可能会需要一段时间，请耐心等待~')
            exec(command, function (error, stdout, stderr) {
                if (error) {
                    e.reply('安装失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
                } else {
                    e.reply('图片安装成功！')
                }
            })
            return true
        }
    }
}