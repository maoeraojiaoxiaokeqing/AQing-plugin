import plugin from "../../../lib/plugins/plugin.js";
import fetch from 'node-fetch'

export class xgn extends plugin {
    constructor() {
        super({
            name: "AQ:���ֹ���",
            dsc: "һЩ����С����",
            event: "message",
            priority: 5,
            rule: [{
                reg: "^�������ռ�$",
                fnc: "tgrj",
            },
            {
                reg: "^#*(.*)����$",
                fnc: "xzys"
            },
            {
                reg: "^���伦��$",
                fnc: "jt",
            },

            ],
        });
    }
    async tgrj(e) {
        //e.msg �û���������Ϣ
        console.log("�û����", e.msg);
        //ִ�е��߼�����
        let url = `https://xiaobai.klizi.cn/API/other/tgrj.php`;

        let msg = [
            segment.at(e.user_id),
            segment.text(url),
        ];

        //������Ϣ
        e.reply(msg);

        return true; //����true �赲��Ϣ��������
    }
    async Tianqi(e) {
        if (!e.msg.replace(/#|��|����| /g, "")) return e.reply("������#+��������", true)
        let res = await fetch("https://v.api.aa1.cn/api/xingzuo/?msg=" + e.msg.replace(/#|��| /g, "")).catch((err) => logger.error(err))
        if (!res) return e.reply('�ӿ�����ʧ��')
        res = await res.json()//����json
        e.reply(`${res.content.replace(/{br}/g, '\n')}`, true)//����������Ϣ��content���滻����{br}Ϊ���У�
        return true;
    }
    async jt(e) {
        //e.msg �û���������Ϣ
        console.log("�û����", e.msg);
        //ִ�е��߼�����
        let url = `http://tfapi.top/API/yiyan.php`;

        let msg = [
            segment.at(e.user_id),
            segment.text(url),
        ];
        return true;
    }
}