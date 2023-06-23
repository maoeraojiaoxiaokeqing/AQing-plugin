import { BotApi, AlemonApi, plugin } from '../../AQing-plugin/model/api/api.js'
import fs from "fs";
import cfg from '../../../../Miao-Yunzai/lib/config/config.js'
import moment from "moment"
const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
//项目路径
const dirpath = "plugins/AQing-plugin/data/";//文件夹路径
var filename = `hg`;//文件名
if (filename.indexOf(".json") == -1) {//如果文件名不包含.json
    filename = filename + ".json";//添加.json
}
let Template = {//创建该用户
    "experience": 0,
};   
let cdtime_exercise = 1440 * 60
export class qd extends plugin {
    constructor() {
        super({
            name: '阿晴签到',
            dsc: '签到加好感',
            event: 'message',
            priority: 1,  // 本JS插件优先级 数字越低越高喔
            rule: [{
                reg: "^阿晴签到$", //触发词 可以改成你自己想要的（下面那些中文提示词都可以自己改）
                fnc: 'meiridaka3qn'
            }]
        });
    }
    async meiridaka3qn(e) {
        //获取当前日期
        let user_id = e.user_id;
        let lastTime_exercise = await redis.get(`duel:exercise-cd:${e.user_id}`);
        //let masterList = cfg.masterQQ
        if (lastTime_exercise) {//&& !masterList.includes(e.user_id)
            const seconds = moment(currentTime).diff(moment(lastTime_exercise), 'seconds')
            let tips = [
                segment.at(e.user_id), "\n",
                `不可以重复签到哦(*/ω＼*)`, "\n",
                `冷却中：${cdtime_exercise - seconds}s`
            ]
            e.reply(tips);
            return
        }

        if (!fs.existsSync(dirpath)) {//如果文件夹不存在
            fs.mkdirSync(dirpath);//创建文件夹
        }
        if (!fs.existsSync(dirpath + "/" + filename)) {//如果文件不存在
            fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({//创建文件
            }));
        }
        const json = JSON.parse(fs.readFileSync(dirpath + "/" + filename));//读取文件
        if (!json.hasOwnProperty(user_id)) {//如果json中不存在该用户
            json[user_id] = Template
        }
        await redis.set(`duel:exercise-cd:${e.user_id}`, currentTime, {
            EX: cdtime_exercise
        });
        const date = new Date();
        let experience_ = 0
        let hours = date.getHours()
        //早上好
        if (e.msg.includes('早') || e.msg.includes('晨练')) {
            if (hours >= 6 && hours <= 8) {
                experience_ = Math.round(3 + 2 * Math.random())
                json[user_id].experience += experience_
                e.reply([segment.at(user_id),
                `\n恭喜你获得了${experience_}点好感,新的一天开始啦~\n你的好感为:${json[user_id].experience}`]);
            }
            else {
                experience_ = Math.round(1 + 1 * Math.random())
                json[user_id].experience += experience_
                e.reply([segment.at(user_id),
                `\n现在一点也不早了，你只或得了${experience_}点好感。\n你的好感为:${json[user_id].experience}`]);
            }
            return
        }
        //睡觉，会被禁言
        else if (hours >= 6 && hours <= 8) {
            experience_ = Math.round(2 + 2 * Math.random())
            json[user_id].experience += experience_
            e.reply([segment.at(user_id),
            `\n恭喜你获得了${experience_}点好感\n你的好感为:${json[user_id].experience}}`]);//发送消息
        } else if (hours >= 8 && hours <= 20) {
            experience_ = Math.round(1 + 2 * Math.random())
            json[user_id].experience += experience_
            e.reply([segment.at(user_id),
            `恭喜你获得了${experience_}点好感！\n你的好感为:${json[user_id].experience}`]);//发送消息
        } else {
            experience_ = Math.round(1 + 1 * Math.random())
            json[user_id].experience += experience_
            e.reply([segment.at(user_id),
            `\n这么晚才找阿晴，你只获得了${experience_}点好感！\n你的好感为:${json[user_id].experience}`]);//发送消息
        }
        if (e.isMaster) {//如果是主人，额外送两倍
            e.reply('主人贴贴！')
            json[user_id].experience += experience_ * 2
        }
        fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));//写入文件
        return true;
    }
}