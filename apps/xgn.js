import plugin from "../../../lib/plugins/plugin.js";
import fetch from 'node-fetch'

export class xgn extends plugin {
    constructor() {
        super({
            name: "AQ:娱乐功能",
            dsc: "一些娱乐小功能",
            event: "message",
            priority: 5,
            rule: [{
                reg: "^来份舔狗日记$",
                fnc: "tgrj",
            },
            {
                reg: "^#*(.*)运势$",
                fnc: "xzys"
            },
            {
                reg: "^来句鸡汤$",
                fnc: "jt",
            },

            ],
        });
    }
    async tgrj(e) {
        //e.msg 用户的命令消息
        console.log("用户命令：", e.msg);
        //执行的逻辑功能
        let url = `https://xiaobai.klizi.cn/API/other/tgrj.php`;

        let msg = [
            segment.at(e.user_id),
            segment.text(url),
        ];

        //发送消息
        e.reply(msg);

        return true; //返回true 阻挡消息不再往下
    }
    async Tianqi(e) {
        if (!e.msg.replace(/#|＃|运势| /g, "")) return e.reply("请输入#+星座名称", true)
        let res = await fetch("https://v.api.aa1.cn/api/xingzuo/?msg=" + e.msg.replace(/#|＃| /g, "")).catch((err) => logger.error(err))
        if (!res) return e.reply('接口请求失败')
        res = await res.json()//返回json
        e.reply(`${res.content.replace(/{br}/g, '\n')}`, true)//发送引用消息（content节替换所有{br}为换行）
        return true;
    }
    async jt(e) {
        //e.msg 用户的命令消息
        console.log("用户命令：", e.msg);
        //执行的逻辑功能
        let url = `http://tfapi.top/API/yiyan.php`;

        let msg = [
            segment.at(e.user_id),
            segment.text(url),
        ];
        return true;
    }
}