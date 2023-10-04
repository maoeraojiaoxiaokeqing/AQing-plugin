import plugin from '../../../lib/plugins/plugin.js';

export class help extends plugin {
    constructor() {
        super({
            name: '[阿晴插件]帮助',
            dsc: '阿晴帮助',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: `^#阿晴帮助$`,
                    fnc: 'help'
                },
            ]
        })
    }

async help (e) {
  e.reply(segment.image(`/help/help.jpg`))
  return true
}
}