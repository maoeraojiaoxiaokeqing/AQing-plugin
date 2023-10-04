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
            /** �������� */
            name: '������¼',
            /** �������� */
            dsc: '�����������ͼ',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** ���ȼ�������ԽС�ȼ�Խ�� */
            priority: -114514,
            rule: [
                {
                    /** ��������ƥ�� */
                    reg: '����',
                    /** ִ�з��� */
                    fnc: 'tz'
                },
                {
                    /** ��������ƥ�� */
                    reg: '#����������¼',
                    /** ִ�з��� */
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
            e.reply(`����Ȩ��`)
            return false
        }
        else {
            command = `git clone https://gitee.com/aayhg/tangzhuyulu.git "${resPath}/tangzhu/" --depth=1`
            e.reply('��ʼ���԰�װͼƬ�����������ܻ���Ҫһ��ʱ�䣬�����ĵȴ�~')
            exec(command, function (error, stdout, stderr) {
                if (error) {
                    e.reply('��װʧ�ܣ�\nError code: ' + error.code + '\n' + error.stack + '\n ���Ժ����ԡ�')
                } else {
                    e.reply('ͼƬ��װ�ɹ���')
                }
            })
            return true
        }
    }
}