//lastest update 2017/7/31
//total 137 champions
var champions = {
    "keys": {
        "1": "Annie",
        "2": "Olaf",
        "3": "Galio",
        "4": "TwistedFate",
        "5": "XinZhao",
        "6": "Urgot",
        "7": "Leblanc",
        "8": "Vladimir",
        "9": "Fiddlesticks",
        "10": "Kayle",
        "11": "MasterYi",
        "12": "Alistar",
        "13": "Ryze",
        "14": "Sion",
        "15": "Sivir",
        "16": "Soraka",
        "17": "Teemo",
        "18": "Tristana",
        "19": "Warwick",
        "20": "Nunu",
        "21": "MissFortune",
        "22": "Ashe",
        "23": "Tryndamere",
        "24": "Jax",
        "25": "Morgana",
        "26": "Zilean",
        "27": "Singed",
        "28": "Evelynn",
        "29": "Twitch",
        "30": "Karthus",
        "31": "Chogath",
        "32": "Amumu",
        "33": "Rammus",
        "34": "Anivia",
        "35": "Shaco",
        "36": "DrMundo",
        "37": "Sona",
        "38": "Kassadin",
        "39": "Irelia",
        "40": "Janna",
        "41": "Gangplank",
        "42": "Corki",
        "43": "Karma",
        "44": "Taric",
        "45": "Veigar",
        "48": "Trundle",
        "50": "Swain",
        "51": "Caitlyn",
        "53": "Blitzcrank",
        "54": "Malphite",
        "55": "Katarina",
        "56": "Nocturne",
        "57": "Maokai",
        "58": "Renekton",
        "59": "JarvanIV",
        "60": "Elise",
        "61": "Orianna",
        "62": "MonkeyKing",
        "63": "Brand",
        "64": "LeeSin",
        "67": "Vayne",
        "68": "Rumble",
        "69": "Cassiopeia",
        "72": "Skarner",
        "74": "Heimerdinger",
        "75": "Nasus",
        "76": "Nidalee",
        "77": "Udyr",
        "78": "Poppy",
        "79": "Gragas",
        "80": "Pantheon",
        "81": "Ezreal",
        "82": "Mordekaiser",
        "83": "Yorick",
        "84": "Akali",
        "85": "Kennen",
        "86": "Garen",
        "89": "Leona",
        "90": "Malzahar",
        "91": "Talon",
        "92": "Riven",
        "96": "KogMaw",
        "98": "Shen",
        "99": "Lux",
        "101": "Xerath",
        "102": "Shyvana",
        "103": "Ahri",
        "104": "Graves",
        "105": "Fizz",
        "106": "Volibear",
        "107": "Rengar",
        "110": "Varus",
        "111": "Nautilus",
        "112": "Viktor",
        "113": "Sejuani",
        "114": "Fiora",
        "115": "Ziggs",
        "117": "Lulu",
        "119": "Draven",
        "120": "Hecarim",
        "121": "Khazix",
        "122": "Darius",
        "126": "Jayce",
        "127": "Lissandra",
        "131": "Diana",
        "133": "Quinn",
        "134": "Syndra",
        "136": "AurelionSol",
        "141": "Kayn",
        "143": "Zyra",
        "150": "Gnar",
        "154": "Zac",
        "157": "Yasuo",
        "161": "Velkoz",
        "163": "Taliyah",
        "164": "Camille",
        "201": "Braum",
        "202": "Jhin",
        "203": "Kindred",
        "222": "Jinx",
        "223": "TahmKench",
        "236": "Lucian",
        "238": "Zed",
        "240": "Kled",
        "245": "Ekko",
        "254": "Vi",
        "266": "Aatrox",
        "267": "Nami",
        "268": "Azir",
        "412": "Thresh",
        "420": "Illaoi",
        "421": "RekSai",
        "427": "Ivern",
        "429": "Kalista",
        "432": "Bard",
        "497": "Rakan",
        "498": "Xayah"
    },
    "type": "champion",
    "version": "7.15.1",
    "data": {
        "MonkeyKing": {
            "title": "孙悟空",
            "id": 62,
            "key": "MonkeyKing",
            "name": "齐天大圣"
        },
        "Jax": {
            "title": "贾克斯",
            "id": 24,
            "key": "Jax",
            "name": "武器大师"
        },
        "Fiddlesticks": {
            "title": "费德提克",
            "id": 9,
            "key": "Fiddlesticks",
            "name": "末日使者"
        },
        "Shaco": {
            "title": "萨科",
            "id": 35,
            "key": "Shaco",
            "name": "恶魔小丑"
        },
        "Warwick": {
            "title": "沃里克",
            "id": 19,
            "key": "Warwick",
            "name": "祖安怒兽"
        },
        "Xayah": {
            "title": "霞",
            "id": 498,
            "key": "Xayah",
            "name": "逆羽"
        },
        "Nidalee": {
            "title": "奈德丽",
            "id": 76,
            "key": "Nidalee",
            "name": "狂野女猎手"
        },
        "Zyra": {
            "title": "婕拉",
            "id": 143,
            "key": "Zyra",
            "name": "荆棘之兴"
        },
        "Kled": {
            "title": "克烈",
            "id": 240,
            "key": "Kled",
            "name": "暴怒骑士"
        },
        "Brand": {
            "title": "布兰德",
            "id": 63,
            "key": "Brand",
            "name": "复仇焰魂"
        },
        "Rammus": {
            "title": "拉莫斯",
            "id": 33,
            "key": "Rammus",
            "name": "披甲龙龟"
        },
        "Illaoi": {
            "title": "俄洛伊",
            "id": 420,
            "key": "Illaoi",
            "name": "海兽祭司"
        },
        "Corki": {
            "title": "库奇",
            "id": 42,
            "key": "Corki",
            "name": "英勇投弹手"
        },
        "Braum": {
            "title": "布隆",
            "id": 201,
            "key": "Braum",
            "name": "弗雷尔卓德之心"
        },
        "Darius": {
            "title": "德莱厄斯",
            "id": 122,
            "key": "Darius",
            "name": "诺克萨斯之手"
        },
        "Tryndamere": {
            "title": "泰达米尔",
            "id": 23,
            "key": "Tryndamere",
            "name": "蛮族之王"
        },
        "MissFortune": {
            "title": "厄运小姐",
            "id": 21,
            "key": "MissFortune",
            "name": "赏金猎人"
        },
        "Yorick": {
            "title": "约里克",
            "id": 83,
            "key": "Yorick",
            "name": "牧魂人"
        },
        "Xerath": {
            "title": "泽拉斯",
            "id": 101,
            "key": "Xerath",
            "name": "远古巫灵"
        },
        "Sivir": {
            "title": "希维尔",
            "id": 15,
            "key": "Sivir",
            "name": "战争女神"
        },
        "Riven": {
            "title": "锐雯",
            "id": 92,
            "key": "Riven",
            "name": "放逐之刃"
        },
        "Orianna": {
            "title": "奥莉安娜",
            "id": 61,
            "key": "Orianna",
            "name": "发条魔灵"
        },
        "Gangplank": {
            "title": "普朗克",
            "id": 41,
            "key": "Gangplank",
            "name": "海洋之灾"
        },
        "Malphite": {
            "title": "墨菲特",
            "id": 54,
            "key": "Malphite",
            "name": "熔岩巨兽"
        },
        "Poppy": {
            "title": "波比",
            "id": 78,
            "key": "Poppy",
            "name": "圣锤之毅"
        },
        "Karthus": {
            "title": "卡尔萨斯",
            "id": 30,
            "key": "Karthus",
            "name": "死亡颂唱者"
        },
        "Jayce": {
            "title": "杰斯",
            "id": 126,
            "key": "Jayce",
            "name": "未来守护者"
        },
        "Nunu": {
            "title": "努努",
            "id": 20,
            "key": "Nunu",
            "name": "雪人骑士"
        },
        "Trundle": {
            "title": "特朗德尔",
            "id": 48,
            "key": "Trundle",
            "name": "巨魔之王"
        },
        "Graves": {
            "title": "格雷福斯",
            "id": 104,
            "key": "Graves",
            "name": "法外狂徒"
        },
        "Morgana": {
            "title": "莫甘娜",
            "id": 25,
            "key": "Morgana",
            "name": "堕落天使"
        },
        "Gnar": {
            "title": "纳尔",
            "id": 150,
            "key": "Gnar",
            "name": "迷失之牙"
        },
        "Lux": {
            "title": "拉克丝",
            "id": 99,
            "key": "Lux",
            "name": "光辉女郎"
        },
        "Shyvana": {
            "title": "希瓦娜",
            "id": 102,
            "key": "Shyvana",
            "name": "龙血武姬"
        },
        "Renekton": {
            "title": "雷克顿",
            "id": 58,
            "key": "Renekton",
            "name": "荒漠屠夫"
        },
        "Fiora": {
            "title": "菲奥娜",
            "id": 114,
            "key": "Fiora",
            "name": "无双剑姬"
        },
        "Jinx": {
            "title": "金克丝",
            "id": 222,
            "key": "Jinx",
            "name": "暴走萝莉"
        },
        "Kalista": {
            "title": "卡莉丝塔",
            "id": 429,
            "key": "Kalista",
            "name": "复仇之矛"
        },
        "Fizz": {
            "title": "菲兹",
            "id": 105,
            "key": "Fizz",
            "name": "潮汐海灵"
        },
        "Kassadin": {
            "title": "卡萨丁",
            "id": 38,
            "key": "Kassadin",
            "name": "虚空行者"
        },
        "Sona": {
            "title": "娑娜",
            "id": 37,
            "key": "Sona",
            "name": "琴瑟仙女"
        },
        "Irelia": {
            "title": "艾瑞莉娅",
            "id": 39,
            "key": "Irelia",
            "name": "刀锋意志"
        },
        "Viktor": {
            "title": "维克托",
            "id": 112,
            "key": "Viktor",
            "name": "机械先驱"
        },
        "Rakan": {
            "title": "洛",
            "id": 497,
            "key": "Rakan",
            "name": "幻翎"
        },
        "Kindred": {
            "title": "千珏",
            "id": 203,
            "key": "Kindred",
            "name": "永猎双子"
        },
        "Cassiopeia": {
            "title": "卡西奥佩娅",
            "id": 69,
            "key": "Cassiopeia",
            "name": "魔蛇之拥"
        },
        "Maokai": {
            "title": "茂凯",
            "id": 57,
            "key": "Maokai",
            "name": "扭曲树精"
        },
        "Thresh": {
            "title": "锤石",
            "id": 412,
            "key": "Thresh",
            "name": "魂锁典狱长"
        },
        "Kayle": {
            "title": "凯尔",
            "id": 10,
            "key": "Kayle",
            "name": "审判天使"
        },
        "Hecarim": {
            "title": "赫卡里姆",
            "id": 120,
            "key": "Hecarim",
            "name": "战争之影"
        },
        "Khazix": {
            "title": "卡兹克",
            "id": 121,
            "key": "Khazix",
            "name": "虚空掠夺者"
        },
        "Olaf": {
            "title": "奥拉夫",
            "id": 2,
            "key": "Olaf",
            "name": "狂战士"
        },
        "Ziggs": {
            "title": "吉格斯",
            "id": 115,
            "key": "Ziggs",
            "name": "爆破鬼才"
        },
        "Syndra": {
            "title": "辛德拉",
            "id": 134,
            "key": "Syndra",
            "name": "暗黑元首"
        },
        "DrMundo": {
            "title": "蒙多医生",
            "id": 36,
            "key": "DrMundo",
            "name": "祖安狂人"
        },
        "Karma": {
            "title": "卡尔玛",
            "id": 43,
            "key": "Karma",
            "name": "天启者"
        },
        "Annie": {
            "title": "安妮",
            "id": 1,
            "key": "Annie",
            "name": "黑暗之女"
        },
        "Akali": {
            "title": "阿卡丽",
            "id": 84,
            "key": "Akali",
            "name": "暗影之拳"
        },
        "Volibear": {
            "title": "沃利贝尔",
            "id": 106,
            "key": "Volibear",
            "name": "雷霆咆哮"
        },
        "Yasuo": {
            "title": "亚索",
            "id": 157,
            "key": "Yasuo",
            "name": "疾风剑豪"
        },
        "Kennen": {
            "title": "凯南",
            "id": 85,
            "key": "Kennen",
            "name": "狂暴之心"
        },
        "Rengar": {
            "title": "雷恩加尔",
            "id": 107,
            "key": "Rengar",
            "name": "傲之追猎者"
        },
        "Ryze": {
            "title": "瑞兹",
            "id": 13,
            "key": "Ryze",
            "name": "符文法师"
        },
        "Shen": {
            "title": "慎",
            "id": 98,
            "key": "Shen",
            "name": "暮光之眼"
        },
        "Zac": {
            "title": "扎克",
            "id": 154,
            "key": "Zac",
            "name": "生化魔人"
        },
        "Talon": {
            "title": "泰隆",
            "id": 91,
            "key": "Talon",
            "name": "刀锋之影"
        },
        "Swain": {
            "title": "斯维因",
            "id": 50,
            "key": "Swain",
            "name": "策士统领"
        },
        "Bard": {
            "title": "巴德",
            "id": 432,
            "key": "Bard",
            "name": "星界游神"
        },
        "Sion": {
            "title": "赛恩",
            "id": 14,
            "key": "Sion",
            "name": "亡灵战神"
        },
        "Vayne": {
            "title": "薇恩",
            "id": 67,
            "key": "Vayne",
            "name": "暗夜猎手"
        },
        "Nasus": {
            "title": "内瑟斯",
            "id": 75,
            "key": "Nasus",
            "name": "沙漠死神"
        },
        "Kayn": {
            "title": "凯隐",
            "id": 141,
            "key": "Kayn",
            "name": "影流之镰"
        },
        "TwistedFate": {
            "title": "崔斯特",
            "id": 4,
            "key": "TwistedFate",
            "name": "卡牌大师"
        },
        "Chogath": {
            "title": "科加斯",
            "id": 31,
            "key": "Chogath",
            "name": "虚空恐惧"
        },
        "Udyr": {
            "title": "乌迪尔",
            "id": 77,
            "key": "Udyr",
            "name": "兽灵行者"
        },
        "Lucian": {
            "title": "卢锡安",
            "id": 236,
            "key": "Lucian",
            "name": "圣枪游侠"
        },
        "Ivern": {
            "title": "艾翁",
            "id": 427,
            "key": "Ivern",
            "name": "翠神"
        },
        "Leona": {
            "title": "蕾欧娜",
            "id": 89,
            "key": "Leona",
            "name": "曙光女神"
        },
        "Caitlyn": {
            "title": "凯特琳",
            "id": 51,
            "key": "Caitlyn",
            "name": "皮城女警"
        },
        "Sejuani": {
            "title": "瑟庄妮",
            "id": 113,
            "key": "Sejuani",
            "name": "北地之怒"
        },
        "Nocturne": {
            "title": "魔腾",
            "id": 56,
            "key": "Nocturne",
            "name": "永恒梦魇"
        },
        "Zilean": {
            "title": "基兰",
            "id": 26,
            "key": "Zilean",
            "name": "时光守护者"
        },
        "Azir": {
            "title": "阿兹尔",
            "id": 268,
            "key": "Azir",
            "name": "沙漠皇帝"
        },
        "Rumble": {
            "title": "兰博",
            "id": 68,
            "key": "Rumble",
            "name": "机械公敌"
        },
        "Taliyah": {
            "title": "塔莉垭",
            "id": 163,
            "key": "Taliyah",
            "name": "岩雀"
        },
        "Teemo": {
            "title": "提莫",
            "id": 17,
            "key": "Teemo",
            "name": "迅捷斥候"
        },
        "Urgot": {
            "title": "厄加特",
            "id": 6,
            "key": "Urgot",
            "name": "无畏战车"
        },
        "Amumu": {
            "title": "阿木木",
            "id": 32,
            "key": "Amumu",
            "name": "殇之木乃伊"
        },
        "Galio": {
            "title": "加里奥",
            "id": 3,
            "key": "Galio",
            "name": "正义巨像"
        },
        "Heimerdinger": {
            "title": "黑默丁格",
            "id": 74,
            "key": "Heimerdinger",
            "name": "大发明家"
        },
        "Anivia": {
            "title": "艾尼维亚",
            "id": 34,
            "key": "Anivia",
            "name": "冰晶凤凰"
        },
        "Ashe": {
            "title": "艾希",
            "id": 22,
            "key": "Ashe",
            "name": "寒冰射手"
        },
        "Velkoz": {
            "title": "维克兹",
            "id": 161,
            "key": "Velkoz",
            "name": "虚空之眼"
        },
        "Singed": {
            "title": "辛吉德",
            "id": 27,
            "key": "Singed",
            "name": "炼金术士"
        },
        "Skarner": {
            "title": "斯卡纳",
            "id": 72,
            "key": "Skarner",
            "name": "水晶先锋"
        },
        "Varus": {
            "title": "韦鲁斯",
            "id": 110,
            "key": "Varus",
            "name": "惩戒之箭"
        },
        "Twitch": {
            "title": "图奇",
            "id": 29,
            "key": "Twitch",
            "name": "瘟疫之源"
        },
        "Garen": {
            "title": "盖伦",
            "id": 86,
            "key": "Garen",
            "name": "德玛西亚之力"
        },
        "Blitzcrank": {
            "title": "布里茨",
            "id": 53,
            "key": "Blitzcrank",
            "name": "蒸汽机器人"
        },
        "MasterYi": {
            "title": "易",
            "id": 11,
            "key": "MasterYi",
            "name": "无极剑圣"
        },
        "Elise": {
            "title": "伊莉丝",
            "id": 60,
            "key": "Elise",
            "name": "蜘蛛女皇"
        },
        "Alistar": {
            "title": "阿利斯塔",
            "id": 12,
            "key": "Alistar",
            "name": "牛头酋长"
        },
        "Katarina": {
            "title": "卡特琳娜",
            "id": 55,
            "key": "Katarina",
            "name": "不祥之刃"
        },
        "Ekko": {
            "title": "艾克",
            "id": 245,
            "key": "Ekko",
            "name": "时间刺客"
        },
        "Mordekaiser": {
            "title": "莫德凯撒",
            "id": 82,
            "key": "Mordekaiser",
            "name": "铁铠冥魂"
        },
        "Lulu": {
            "title": "璐璐",
            "id": 117,
            "key": "Lulu",
            "name": "仙灵女巫"
        },
        "Camille": {
            "title": "卡蜜尔",
            "id": 164,
            "key": "Camille",
            "name": "青钢影"
        },
        "Aatrox": {
            "title": "亚托克斯",
            "id": 266,
            "key": "Aatrox",
            "name": "暗裔剑魔"
        },
        "Draven": {
            "title": "德莱文",
            "id": 119,
            "key": "Draven",
            "name": "荣耀行刑官"
        },
        "TahmKench": {
            "title": "塔姆",
            "id": 223,
            "key": "TahmKench",
            "name": "河流之王"
        },
        "Pantheon": {
            "title": "潘森",
            "id": 80,
            "key": "Pantheon",
            "name": "战争之王"
        },
        "XinZhao": {
            "title": "赵信",
            "id": 5,
            "key": "XinZhao",
            "name": "德邦总管"
        },
        "AurelionSol": {
            "title": "奥瑞利安·索尔",
            "id": 136,
            "key": "AurelionSol",
            "name": "铸星龙王"
        },
        "LeeSin": {
            "title": "李青",
            "id": 64,
            "key": "LeeSin",
            "name": "盲僧"
        },
        "Taric": {
            "title": "塔里克",
            "id": 44,
            "key": "Taric",
            "name": "瓦洛兰之盾"
        },
        "Malzahar": {
            "title": "玛尔扎哈",
            "id": 90,
            "key": "Malzahar",
            "name": "虚空先知"
        },
        "Lissandra": {
            "title": "丽桑卓",
            "id": 127,
            "key": "Lissandra",
            "name": "冰霜女巫"
        },
        "Diana": {
            "title": "黛安娜",
            "id": 131,
            "key": "Diana",
            "name": "皎月女神"
        },
        "Tristana": {
            "title": "崔丝塔娜",
            "id": 18,
            "key": "Tristana",
            "name": "麦林炮手"
        },
        "RekSai": {
            "title": "雷克塞",
            "id": 421,
            "key": "RekSai",
            "name": "虚空遁地兽"
        },
        "Vladimir": {
            "title": "弗拉基米尔",
            "id": 8,
            "key": "Vladimir",
            "name": "猩红收割者"
        },
        "JarvanIV": {
            "title": "嘉文四世",
            "id": 59,
            "key": "JarvanIV",
            "name": "德玛西亚皇子"
        },
        "Nami": {
            "title": "娜美",
            "id": 267,
            "key": "Nami",
            "name": "唤潮鲛姬"
        },
        "Jhin": {
            "title": "烬",
            "id": 202,
            "key": "Jhin",
            "name": "戏命师"
        },
        "Soraka": {
            "title": "索拉卡",
            "id": 16,
            "key": "Soraka",
            "name": "众星之子"
        },
        "Veigar": {
            "title": "维迦",
            "id": 45,
            "key": "Veigar",
            "name": "邪恶小法师"
        },
        "Janna": {
            "title": "迦娜",
            "id": 40,
            "key": "Janna",
            "name": "风暴之怒"
        },
        "Nautilus": {
            "title": "诺提勒斯",
            "id": 111,
            "key": "Nautilus",
            "name": "深海泰坦"
        },
        "Evelynn": {
            "title": "伊芙琳",
            "id": 28,
            "key": "Evelynn",
            "name": "寡妇制造者"
        },
        "Gragas": {
            "title": "古拉加斯",
            "id": 79,
            "key": "Gragas",
            "name": "酒桶"
        },
        "Zed": {
            "title": "劫",
            "id": 238,
            "key": "Zed",
            "name": "影流之主"
        },
        "Vi": {
            "title": "蔚",
            "id": 254,
            "key": "Vi",
            "name": "皮城执法官"
        },
        "KogMaw": {
            "title": "克格莫",
            "id": 96,
            "key": "KogMaw",
            "name": "深渊巨口"
        },
        "Ahri": {
            "title": "阿狸",
            "id": 103,
            "key": "Ahri",
            "name": "九尾妖狐"
        },
        "Quinn": {
            "title": "奎因",
            "id": 133,
            "key": "Quinn",
            "name": "德玛西亚之翼"
        },
        "Leblanc": {
            "title": "乐芙兰",
            "id": 7,
            "key": "Leblanc",
            "name": "诡术妖姬"
        },
        "Ezreal": {
            "title": "伊泽瑞尔",
            "id": 81,
            "key": "Ezreal",
            "name": "探险家"
        }
    }
}

exports.getChampionChineseNameById = function(championId){
    var key =  champions['keys'][championId];
    return champions['data'][key]['name'];
}

exports.getChampionEnglishNameById = function(championId){
    return (champions.keys)[championId];
}


//console.log(exports.getChampionNameById(133));

/*

{
    "seasonId": 9,
    "queueId": 420,
    "gameId": 2562477488,
    "participantIdentities": [
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "On Mode",
                "matchHistoryUri": "/v1/stats/player_history/NA1/50555427",
                "platformId": "NA1",
                "currentAccountId": 50555427,
                "profileIcon": 711,
                "summonerId": 35982127,
                "accountId": 50555427
            },
            "participantId": 1
        },
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "OhMyBARD",
                "matchHistoryUri": "/v1/stats/player_history/NA/33578521",
                "platformId": "NA",
                "currentAccountId": 33578521,
                "profileIcon": 2090,
                "summonerId": 20557578,
                "accountId": 33578521
            },
            "participantId": 2
        },
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "NautyDaddy",
                "matchHistoryUri": "/v1/stats/player_history/NA/33621878",
                "platformId": "NA",
                "currentAccountId": 33621878,
                "profileIcon": 1213,
                "summonerId": 20588570,
                "accountId": 33621878
            },
            "participantId": 3
        },
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "Nv Peng You",
                "matchHistoryUri": "/v1/stats/player_history/NA1/221684865",
                "platformId": "NA1",
                "currentAccountId": 221684865,
                "profileIcon": 1637,
                "summonerId": 60296417,
                "accountId": 221684865
            },
            "participantId": 4
        },
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "Who is 55Kai",
                "matchHistoryUri": "/v1/stats/player_history/NA1/220718535",
                "platformId": "NA1",
                "currentAccountId": 220718535,
                "profileIcon": 1630,
                "summonerId": 59700668,
                "accountId": 220718535
            },
            "participantId": 5
        },
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "Shinigami X7",
                "matchHistoryUri": "/v1/stats/player_history/NA1/205201637",
                "platformId": "NA1",
                "currentAccountId": 205201637,
                "profileIcon": 1211,
                "summonerId": 42721822,
                "accountId": 205201637
            },
            "participantId": 6
        },
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "DrFloppyTitties",
                "matchHistoryUri": "/v1/stats/player_history/NA/32324847",
                "platformId": "NA",
                "currentAccountId": 32324847,
                "profileIcon": 9,
                "summonerId": 19630962,
                "accountId": 32324847
            },
            "participantId": 7
        },
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "Uziiiii111",
                "matchHistoryUri": "/v1/stats/player_history/NA1/236230916",
                "platformId": "NA1",
                "currentAccountId": 236230916,
                "profileIcon": 2090,
                "summonerId": 82591889,
                "accountId": 236230916
            },
            "participantId": 8
        },
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "MynameisBoBoChiu",
                "matchHistoryUri": "/v1/stats/player_history/NA1/216226301",
                "platformId": "NA1",
                "currentAccountId": 216226301,
                "profileIcon": 627,
                "summonerId": 53448157,
                "accountId": 216226301
            },
            "participantId": 9
        },
        {
            "player": {
                "currentPlatformId": "NA1",
                "summonerName": "JustSSaiyan",
                "matchHistoryUri": "/v1/stats/player_history/NA1/221990160",
                "platformId": "NA1",
                "currentAccountId": 221990160,
                "profileIcon": 685,
                "summonerId": 60781042,
                "accountId": 221990160
            },
            "participantId": 10
        }
    ],
    "gameVersion": "7.15.196.5272",
    "platformId": "NA1",
    "gameMode": "CLASSIC",
    "mapId": 11,
    "gameType": "MATCHED_GAME",
    "teams": [
        {
            "firstDragon": true,
            "bans": [
                {
                    "pickTurn": 1,
                    "championId": 141
                },
                {
                    "pickTurn": 2,
                    "championId": 53
                },
                {
                    "pickTurn": 3,
                    "championId": 75
                },
                {
                    "pickTurn": 4,
                    "championId": 25
                },
                {
                    "pickTurn": 5,
                    "championId": 105
                }
            ],
            "firstInhibitor": true,
            "win": "Win",
            "firstRiftHerald": true,
            "firstBaron": true,
            "baronKills": 1,
            "riftHeraldKills": 1,
            "firstBlood": true,
            "teamId": 100,
            "firstTower": true,
            "vilemawKills": 0,
            "inhibitorKills": 1,
            "towerKills": 8,
            "dominionVictoryScore": 0,
            "dragonKills": 3
        },
        {
            "firstDragon": false,
            "bans": [
                {
                    "pickTurn": 6,
                    "championId": 238
                },
                {
                    "pickTurn": 7,
                    "championId": 75
                },
                {
                    "pickTurn": 8,
                    "championId": 57
                },
                {
                    "pickTurn": 9,
                    "championId": 119
                },
                {
                    "pickTurn": 10,
                    "championId": 31
                }
            ],
            "firstInhibitor": false,
            "win": "Fail",
            "firstRiftHerald": false,
            "firstBaron": false,
            "baronKills": 0,
            "riftHeraldKills": 0,
            "firstBlood": false,
            "teamId": 200,
            "firstTower": false,
            "vilemawKills": 0,
            "inhibitorKills": 0,
            "towerKills": 2,
            "dominionVictoryScore": 0,
            "dragonKills": 0
        }
    ],
    "participants": [
        {
            "stats": {
                "item1": 3116,
                "totalPlayerScore": 0,
                "visionScore": 16,
                "unrealKills": 0,
                "win": true,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 0,
                "totalDamageDealt": 146412,
                "magicDamageDealtToChampions": 12874,
                "largestMultiKill": 2,
                "largestKillingSpree": 4,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 187,
                "magicalDamageTaken": 3547,
                "longestTimeSpentLiving": 1138,
                "neutralMinionsKilledEnemyJungle": 0,
                "firstTowerAssist": false,
                "neutralMinionsKilledTeamJungle": 2,
                "goldEarned": 11083,
                "item2": 3146,
                "item3": 3020,
                "item0": 3191,
                "deaths": 2,
                "item6": 3363,
                "wardsPlaced": 4,
                "item4": 0,
                "item5": 0,
                "turretKills": 1,
                "tripleKills": 0,
                "damageSelfMitigated": 19744,
                "goldSpent": 8950,
                "magicDamageDealt": 119689,
                "kills": 5,
                "doubleKills": 1,
                "firstInhibitorKill": false,
                "trueDamageTaken": 74,
                "firstBloodAssist": false,
                "firstBloodKill": false,
                "assists": 5,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 6,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 2,
                "damageDealtToTurrets": 3551,
                "physicalDamageDealtToChampions": 1148,
                "pentaKills": 0,
                "trueDamageDealt": 5060,
                "trueDamageDealtToChampions": 66,
                "champLevel": 14,
                "participantId": 1,
                "firstInhibitorAssist": true,
                "wardsKilled": 0,
                "firstTowerKill": false,
                "totalHeal": 9753,
                "totalMinionsKilled": 188,
                "physicalDamageDealt": 21662,
                "damageDealtToObjectives": 32203,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 14089,
                "totalUnitsHealed": 12,
                "inhibitorKills": 0,
                "totalDamageTaken": 6533,
                "killingSprees": 1,
                "timeCCingOthers": 3,
                "physicalDamageTaken": 2911
            },
            "spell1Id": 4,
            "participantId": 1,
            "runes": [
                {
                    "runeId": 5273,
                    "rank": 9
                },
                {
                    "runeId": 5297,
                    "rank": 9
                },
                {
                    "runeId": 5316,
                    "rank": 9
                },
                {
                    "runeId": 5357,
                    "rank": 3
                }
            ],
            "highestAchievedSeasonTier": "GOLD",
            "masteries": [
                {
                    "masteryId": 6114,
                    "rank": 5
                },
                {
                    "masteryId": 6122,
                    "rank": 1
                },
                {
                    "masteryId": 6131,
                    "rank": 1
                },
                {
                    "masteryId": 6134,
                    "rank": 4
                },
                {
                    "masteryId": 6143,
                    "rank": 1
                },
                {
                    "masteryId": 6154,
                    "rank": 5
                },
                {
                    "masteryId": 6164,
                    "rank": 1
                },
                {
                    "masteryId": 6312,
                    "rank": 5
                },
                {
                    "masteryId": 6323,
                    "rank": 1
                },
                {
                    "masteryId": 6331,
                    "rank": 5
                },
                {
                    "masteryId": 6341,
                    "rank": 1
                }
            ],
            "spell2Id": 12,
            "teamId": 100,
            "timeline": {
                "lane": "TOP",
                "participantId": 1,
                "csDiffPerMinDeltas": {
                    "0-10": 0.19999999999999996,
                    "10-20": -0.3999999999999999
                },
                "goldPerMinDeltas": {
                    "0-10": 305.20000000000005,
                    "10-20": 379.79999999999995
                },
                "xpDiffPerMinDeltas": {
                    "0-10": 19.30000000000001,
                    "10-20": -152.60000000000002
                },
                "creepsPerMinDeltas": {
                    "0-10": 7.3,
                    "10-20": 8.4
                },
                "xpPerMinDeltas": {
                    "0-10": 442.6,
                    "10-20": 449.3
                },
                "role": "SOLO",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": -244.9,
                    "10-20": -748.8
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 142.4,
                    "10-20": 276.20000000000005
                }
            },
            "championId": 82
        },
        {
            "stats": {
                "item1": 3068,
                "totalPlayerScore": 0,
                "visionScore": 39,
                "unrealKills": 0,
                "win": true,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 0,
                "totalDamageDealt": 75835,
                "magicDamageDealtToChampions": 1391,
                "largestMultiKill": 1,
                "largestKillingSpree": 4,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 396,
                "magicalDamageTaken": 7094,
                "longestTimeSpentLiving": 526,
                "neutralMinionsKilledEnemyJungle": 9,
                "firstTowerAssist": false,
                "neutralMinionsKilledTeamJungle": 30,
                "goldEarned": 9657,
                "item2": 1408,
                "item3": 1033,
                "item0": 2031,
                "deaths": 4,
                "item6": 3340,
                "wardsPlaced": 21,
                "item4": 3117,
                "item5": 1036,
                "turretKills": 0,
                "tripleKills": 0,
                "damageSelfMitigated": 16018,
                "goldSpent": 7525,
                "magicDamageDealt": 16765,
                "kills": 6,
                "doubleKills": 0,
                "firstInhibitorKill": false,
                "trueDamageTaken": 493,
                "firstBloodAssist": false,
                "firstBloodKill": true,
                "assists": 11,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 45,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 2,
                "damageDealtToTurrets": 392,
                "physicalDamageDealtToChampions": 5738,
                "pentaKills": 0,
                "trueDamageDealt": 7200,
                "trueDamageDealtToChampions": 212,
                "champLevel": 12,
                "participantId": 2,
                "firstInhibitorAssist": true,
                "wardsKilled": 4,
                "firstTowerKill": false,
                "totalHeal": 6373,
                "totalMinionsKilled": 21,
                "physicalDamageDealt": 51869,
                "damageDealtToObjectives": 8183,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 7342,
                "totalUnitsHealed": 1,
                "inhibitorKills": 0,
                "totalDamageTaken": 19127,
                "killingSprees": 1,
                "timeCCingOthers": 17,
                "physicalDamageTaken": 11539
            },
            "spell1Id": 4,
            "participantId": 2,
            "runes": [
                {
                    "runeId": 5245,
                    "rank": 5
                },
                {
                    "runeId": 5257,
                    "rank": 4
                },
                {
                    "runeId": 5289,
                    "rank": 5
                },
                {
                    "runeId": 5290,
                    "rank": 4
                },
                {
                    "runeId": 5316,
                    "rank": 4
                },
                {
                    "runeId": 5317,
                    "rank": 4
                },
                {
                    "runeId": 5319,
                    "rank": 1
                },
                {
                    "runeId": 5335,
                    "rank": 1
                },
                {
                    "runeId": 5346,
                    "rank": 1
                },
                {
                    "runeId": 5347,
                    "rank": 1
                }
            ],
            "highestAchievedSeasonTier": "GOLD",
            "masteries": [
                {
                    "masteryId": 6111,
                    "rank": 5
                },
                {
                    "masteryId": 6121,
                    "rank": 1
                },
                {
                    "masteryId": 6131,
                    "rank": 2
                },
                {
                    "masteryId": 6212,
                    "rank": 4
                },
                {
                    "masteryId": 6312,
                    "rank": 5
                },
                {
                    "masteryId": 6321,
                    "rank": 1
                },
                {
                    "masteryId": 6331,
                    "rank": 5
                },
                {
                    "masteryId": 6341,
                    "rank": 1
                },
                {
                    "masteryId": 6351,
                    "rank": 5
                },
                {
                    "masteryId": 6362,
                    "rank": 1
                }
            ],
            "spell2Id": 11,
            "teamId": 100,
            "timeline": {
                "lane": "JUNGLE",
                "participantId": 2,
                "csDiffPerMinDeltas": {
                    "0-10": 0.09999999999999998,
                    "10-20": -1
                },
                "goldPerMinDeltas": {
                    "0-10": 353,
                    "10-20": 291.4
                },
                "xpDiffPerMinDeltas": {
                    "0-10": 10.09999999999998,
                    "10-20": -131.3
                },
                "creepsPerMinDeltas": {
                    "0-10": 0.5,
                    "10-20": 0.30000000000000004
                },
                "xpPerMinDeltas": {
                    "0-10": 315.6,
                    "10-20": 252.6
                },
                "role": "NONE",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": -344.5,
                    "10-20": -218.5
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 542.6,
                    "10-20": 679
                }
            },
            "championId": 64
        },
        {
            "stats": {
                "item1": 3009,
                "totalPlayerScore": 0,
                "visionScore": 27,
                "unrealKills": 0,
                "win": true,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 1733,
                "totalDamageDealt": 111882,
                "magicDamageDealtToChampions": 1958,
                "largestMultiKill": 2,
                "largestKillingSpree": 10,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 45,
                "magicalDamageTaken": 4542,
                "longestTimeSpentLiving": 0,
                "neutralMinionsKilledEnemyJungle": 0,
                "firstTowerAssist": false,
                "neutralMinionsKilledTeamJungle": 9,
                "goldEarned": 11787,
                "item2": 3134,
                "item3": 1055,
                "item0": 3094,
                "deaths": 0,
                "item6": 3363,
                "wardsPlaced": 11,
                "item4": 3031,
                "item5": 3133,
                "turretKills": 3,
                "tripleKills": 0,
                "damageSelfMitigated": 4841,
                "goldSpent": 9925,
                "magicDamageDealt": 3156,
                "kills": 10,
                "doubleKills": 1,
                "firstInhibitorKill": false,
                "trueDamageTaken": 0,
                "firstBloodAssist": false,
                "firstBloodKill": false,
                "assists": 8,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 10,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 1,
                "damageDealtToTurrets": 8204,
                "physicalDamageDealtToChampions": 14847,
                "pentaKills": 0,
                "trueDamageDealt": 0,
                "trueDamageDealtToChampions": 0,
                "champLevel": 13,
                "participantId": 3,
                "firstInhibitorAssist": true,
                "wardsKilled": 3,
                "firstTowerKill": true,
                "totalHeal": 3746,
                "totalMinionsKilled": 143,
                "physicalDamageDealt": 108725,
                "damageDealtToObjectives": 14815,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 16805,
                "totalUnitsHealed": 2,
                "inhibitorKills": 0,
                "totalDamageTaken": 11676,
                "killingSprees": 1,
                "timeCCingOthers": 23,
                "physicalDamageTaken": 7133
            },
            "spell1Id": 4,
            "participantId": 3,
            "runes": [
                {
                    "runeId": 5253,
                    "rank": 9
                },
                {
                    "runeId": 5289,
                    "rank": 9
                },
                {
                    "runeId": 5317,
                    "rank": 9
                },
                {
                    "runeId": 5335,
                    "rank": 3
                }
            ],
            "highestAchievedSeasonTier": "DIAMOND",
            "masteries": [
                {
                    "masteryId": 6111,
                    "rank": 5
                },
                {
                    "masteryId": 6122,
                    "rank": 1
                },
                {
                    "masteryId": 6131,
                    "rank": 5
                },
                {
                    "masteryId": 6142,
                    "rank": 1
                },
                {
                    "masteryId": 6151,
                    "rank": 5
                },
                {
                    "masteryId": 6164,
                    "rank": 1
                },
                {
                    "masteryId": 6312,
                    "rank": 5
                },
                {
                    "masteryId": 6322,
                    "rank": 1
                },
                {
                    "masteryId": 6331,
                    "rank": 5
                },
                {
                    "masteryId": 6343,
                    "rank": 1
                }
            ],
            "spell2Id": 7,
            "teamId": 100,
            "timeline": {
                "lane": "BOTTOM",
                "participantId": 3,
                "csDiffPerMinDeltas": {
                    "0-10": 0.8000000000000003,
                    "10-20": -0.7499999999999998
                },
                "goldPerMinDeltas": {
                    "0-10": 358.6,
                    "10-20": 420.2
                },
                "xpDiffPerMinDeltas": {
                    "0-10": 90.59999999999998,
                    "10-20": 5.149999999999977
                },
                "creepsPerMinDeltas": {
                    "0-10": 6.5,
                    "10-20": 4.800000000000001
                },
                "xpPerMinDeltas": {
                    "0-10": 332.8,
                    "10-20": 379.9
                },
                "role": "DUO_CARRY",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": -155.35,
                    "10-20": -39.55
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 272.2,
                    "10-20": 517.2
                }
            },
            "championId": 202
        },
        {
            "stats": {
                "item1": 3107,
                "totalPlayerScore": 0,
                "visionScore": 50,
                "unrealKills": 0,
                "win": true,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 0,
                "totalDamageDealt": 28697,
                "magicDamageDealtToChampions": 9108,
                "largestMultiKill": 1,
                "largestKillingSpree": 0,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 204,
                "magicalDamageTaken": 3505,
                "longestTimeSpentLiving": 1341,
                "neutralMinionsKilledEnemyJungle": 0,
                "firstTowerAssist": true,
                "neutralMinionsKilledTeamJungle": 0,
                "goldEarned": 8660,
                "item2": 3092,
                "item3": 3117,
                "item0": 2049,
                "deaths": 2,
                "item6": 3364,
                "wardsPlaced": 18,
                "item4": 1033,
                "item5": 0,
                "turretKills": 0,
                "tripleKills": 0,
                "damageSelfMitigated": 4331,
                "goldSpent": 6675,
                "magicDamageDealt": 22109,
                "kills": 1,
                "doubleKills": 0,
                "firstInhibitorKill": false,
                "trueDamageTaken": 2156,
                "firstBloodAssist": false,
                "firstBloodKill": false,
                "assists": 15,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 0,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 1,
                "damageDealtToTurrets": 2452,
                "physicalDamageDealtToChampions": 1659,
                "pentaKills": 0,
                "trueDamageDealt": 412,
                "trueDamageDealtToChampions": 412,
                "champLevel": 12,
                "participantId": 4,
                "firstInhibitorAssist": true,
                "wardsKilled": 8,
                "firstTowerKill": false,
                "totalHeal": 2539,
                "totalMinionsKilled": 17,
                "physicalDamageDealt": 6175,
                "damageDealtToObjectives": 6766,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 11180,
                "totalUnitsHealed": 4,
                "inhibitorKills": 0,
                "totalDamageTaken": 10510,
                "killingSprees": 0,
                "timeCCingOthers": 28,
                "physicalDamageTaken": 4848
            },
            "spell1Id": 14,
            "participantId": 4,
            "runes": [
                {
                    "runeId": 5273,
                    "rank": 9
                },
                {
                    "runeId": 5289,
                    "rank": 9
                },
                {
                    "runeId": 5316,
                    "rank": 9
                },
                {
                    "runeId": 5357,
                    "rank": 3
                }
            ],
            "highestAchievedSeasonTier": "GOLD",
            "masteries": [
                {
                    "masteryId": 6114,
                    "rank": 5
                },
                {
                    "masteryId": 6123,
                    "rank": 1
                },
                {
                    "masteryId": 6134,
                    "rank": 5
                },
                {
                    "masteryId": 6142,
                    "rank": 1
                },
                {
                    "masteryId": 6311,
                    "rank": 5
                },
                {
                    "masteryId": 6322,
                    "rank": 1
                },
                {
                    "masteryId": 6332,
                    "rank": 5
                },
                {
                    "masteryId": 6342,
                    "rank": 1
                },
                {
                    "masteryId": 6351,
                    "rank": 5
                },
                {
                    "masteryId": 6362,
                    "rank": 1
                }
            ],
            "spell2Id": 4,
            "teamId": 100,
            "timeline": {
                "lane": "BOTTOM",
                "participantId": 4,
                "csDiffPerMinDeltas": {
                    "0-10": 0.8000000000000003,
                    "10-20": -0.7499999999999998
                },
                "goldPerMinDeltas": {
                    "0-10": 190.6,
                    "10-20": 323.6
                },
                "xpDiffPerMinDeltas": {
                    "0-10": 90.59999999999998,
                    "10-20": 5.149999999999977
                },
                "creepsPerMinDeltas": {
                    "0-10": 0.2,
                    "10-20": 0.8
                },
                "xpPerMinDeltas": {
                    "0-10": 260.1,
                    "10-20": 239
                },
                "role": "DUO_SUPPORT",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": -155.35,
                    "10-20": -39.55
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 209.3,
                    "10-20": 195.5
                }
            },
            "championId": 117
        },
        {
            "stats": {
                "item1": 1056,
                "totalPlayerScore": 0,
                "visionScore": 20,
                "unrealKills": 0,
                "win": true,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 0,
                "totalDamageDealt": 93751,
                "magicDamageDealtToChampions": 23491,
                "largestMultiKill": 1,
                "largestKillingSpree": 3,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 261,
                "magicalDamageTaken": 5452,
                "longestTimeSpentLiving": 899,
                "neutralMinionsKilledEnemyJungle": 0,
                "firstTowerAssist": true,
                "neutralMinionsKilledTeamJungle": 2,
                "goldEarned": 9702,
                "item2": 3041,
                "item3": 3020,
                "item0": 1058,
                "deaths": 3,
                "item6": 3363,
                "wardsPlaced": 8,
                "item4": 3165,
                "item5": 0,
                "turretKills": 2,
                "tripleKills": 0,
                "damageSelfMitigated": 8606,
                "goldSpent": 7600,
                "magicDamageDealt": 78024,
                "kills": 4,
                "doubleKills": 0,
                "firstInhibitorKill": false,
                "trueDamageTaken": 274,
                "firstBloodAssist": false,
                "firstBloodKill": false,
                "assists": 14,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 2,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 0,
                "damageDealtToTurrets": 3965,
                "physicalDamageDealtToChampions": 1571,
                "pentaKills": 0,
                "trueDamageDealt": 0,
                "trueDamageDealtToChampions": 0,
                "champLevel": 13,
                "participantId": 5,
                "firstInhibitorAssist": false,
                "wardsKilled": 1,
                "firstTowerKill": false,
                "totalHeal": 1344,
                "totalMinionsKilled": 109,
                "physicalDamageDealt": 15727,
                "damageDealtToObjectives": 7850,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 25062,
                "totalUnitsHealed": 1,
                "inhibitorKills": 0,
                "totalDamageTaken": 11578,
                "killingSprees": 1,
                "timeCCingOthers": 52,
                "physicalDamageTaken": 5851
            },
            "spell1Id": 6,
            "participantId": 5,
            "runes": [
                {
                    "runeId": 5273,
                    "rank": 9
                },
                {
                    "runeId": 5289,
                    "rank": 9
                },
                {
                    "runeId": 5318,
                    "rank": 9
                },
                {
                    "runeId": 5357,
                    "rank": 3
                }
            ],
            "highestAchievedSeasonTier": "PLATINUM",
            "masteries": [
                {
                    "masteryId": 6114,
                    "rank": 5
                },
                {
                    "masteryId": 6122,
                    "rank": 1
                },
                {
                    "masteryId": 6131,
                    "rank": 5
                },
                {
                    "masteryId": 6143,
                    "rank": 1
                },
                {
                    "masteryId": 6312,
                    "rank": 5
                },
                {
                    "masteryId": 6321,
                    "rank": 1
                },
                {
                    "masteryId": 6331,
                    "rank": 2
                },
                {
                    "masteryId": 6332,
                    "rank": 3
                },
                {
                    "masteryId": 6343,
                    "rank": 1
                },
                {
                    "masteryId": 6351,
                    "rank": 5
                },
                {
                    "masteryId": 6362,
                    "rank": 1
                }
            ],
            "spell2Id": 4,
            "teamId": 100,
            "timeline": {
                "lane": "MIDDLE",
                "participantId": 5,
                "csDiffPerMinDeltas": {
                    "0-10": -2.5999999999999996,
                    "10-20": -1.9
                },
                "goldPerMinDeltas": {
                    "0-10": 230.70000000000002,
                    "10-20": 350.4
                },
                "xpDiffPerMinDeltas": {
                    "0-10": -4.299999999999969,
                    "10-20": -5.800000000000011
                },
                "creepsPerMinDeltas": {
                    "0-10": 4.2,
                    "10-20": 4.7
                },
                "xpPerMinDeltas": {
                    "0-10": 339.5,
                    "10-20": 412
                },
                "role": "SOLO",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": -22,
                    "10-20": 10.500000000000028
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 320.1,
                    "10-20": 599.6
                }
            },
            "championId": 99
        },
        {
            "stats": {
                "item1": 2055,
                "totalPlayerScore": 0,
                "visionScore": 46,
                "unrealKills": 0,
                "win": false,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 0,
                "totalDamageDealt": 5532,
                "magicDamageDealtToChampions": 2333,
                "largestMultiKill": 1,
                "largestKillingSpree": 0,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 184,
                "magicalDamageTaken": 7552,
                "longestTimeSpentLiving": 557,
                "neutralMinionsKilledEnemyJungle": 0,
                "firstTowerAssist": false,
                "neutralMinionsKilledTeamJungle": 0,
                "goldEarned": 7223,
                "item2": 2302,
                "item3": 2033,
                "item0": 3107,
                "deaths": 4,
                "item6": 3341,
                "wardsPlaced": 26,
                "item4": 1004,
                "item5": 3158,
                "turretKills": 0,
                "tripleKills": 0,
                "damageSelfMitigated": 3155,
                "goldSpent": 6125,
                "magicDamageDealt": 3538,
                "kills": 2,
                "doubleKills": 0,
                "firstInhibitorKill": false,
                "trueDamageTaken": 250,
                "firstBloodAssist": false,
                "firstBloodKill": false,
                "assists": 3,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 0,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 6,
                "damageDealtToTurrets": 0,
                "physicalDamageDealtToChampions": 610,
                "pentaKills": 0,
                "trueDamageDealt": 339,
                "trueDamageDealtToChampions": 339,
                "champLevel": 9,
                "participantId": 6,
                "firstInhibitorAssist": false,
                "wardsKilled": 6,
                "firstTowerKill": false,
                "totalHeal": 12823,
                "totalMinionsKilled": 13,
                "physicalDamageDealt": 1654,
                "damageDealtToObjectives": 0,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 3283,
                "totalUnitsHealed": 5,
                "inhibitorKills": 0,
                "totalDamageTaken": 11704,
                "killingSprees": 0,
                "timeCCingOthers": 39,
                "physicalDamageTaken": 3902
            },
            "spell1Id": 3,
            "participantId": 6,
            "runes": [
                {
                    "runeId": 5257,
                    "rank": 9
                },
                {
                    "runeId": 5289,
                    "rank": 5
                },
                {
                    "runeId": 5301,
                    "rank": 4
                },
                {
                    "runeId": 5367,
                    "rank": 3
                },
                {
                    "runeId": 5403,
                    "rank": 9
                }
            ],
            "highestAchievedSeasonTier": "PLATINUM",
            "masteries": [
                {
                    "masteryId": 6211,
                    "rank": 5
                },
                {
                    "masteryId": 6221,
                    "rank": 1
                },
                {
                    "masteryId": 6231,
                    "rank": 5
                },
                {
                    "masteryId": 6242,
                    "rank": 1
                },
                {
                    "masteryId": 6311,
                    "rank": 5
                },
                {
                    "masteryId": 6322,
                    "rank": 1
                },
                {
                    "masteryId": 6332,
                    "rank": 5
                },
                {
                    "masteryId": 6342,
                    "rank": 1
                },
                {
                    "masteryId": 6352,
                    "rank": 5
                },
                {
                    "masteryId": 6363,
                    "rank": 1
                }
            ],
            "spell2Id": 4,
            "teamId": 200,
            "timeline": {
                "lane": "BOTTOM",
                "participantId": 6,
                "csDiffPerMinDeltas": {
                    "0-10": -0.8000000000000003,
                    "10-20": 0.7499999999999998
                },
                "goldPerMinDeltas": {
                    "0-10": 168.2,
                    "10-20": 321.5
                },
                "xpDiffPerMinDeltas": {
                    "0-10": -90.59999999999998,
                    "10-20": -5.149999999999977
                },
                "creepsPerMinDeltas": {
                    "0-10": 0.6000000000000001,
                    "10-20": 0.6
                },
                "xpPerMinDeltas": {
                    "0-10": 167,
                    "10-20": 268.5
                },
                "role": "DUO_SUPPORT",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": 155.35,
                    "10-20": 39.55
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 299.8,
                    "10-20": 330.9
                }
            },
            "championId": 16
        },
        {
            "stats": {
                "item1": 2031,
                "totalPlayerScore": 0,
                "visionScore": 35,
                "unrealKills": 0,
                "win": false,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 469,
                "totalDamageDealt": 87611,
                "magicDamageDealtToChampions": 3711,
                "largestMultiKill": 1,
                "largestKillingSpree": 0,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 567,
                "magicalDamageTaken": 12737,
                "longestTimeSpentLiving": 555,
                "neutralMinionsKilledEnemyJungle": 0,
                "firstTowerAssist": false,
                "neutralMinionsKilledTeamJungle": 56,
                "goldEarned": 7177,
                "item2": 3065,
                "item3": 1409,
                "item0": 3047,
                "deaths": 6,
                "item6": 3364,
                "wardsPlaced": 17,
                "item4": 1029,
                "item5": 0,
                "turretKills": 0,
                "tripleKills": 0,
                "damageSelfMitigated": 22470,
                "goldSpent": 6850,
                "magicDamageDealt": 57323,
                "kills": 1,
                "doubleKills": 0,
                "firstInhibitorKill": false,
                "trueDamageTaken": 170,
                "firstBloodAssist": false,
                "firstBloodKill": false,
                "assists": 5,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 65,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 1,
                "damageDealtToTurrets": 0,
                "physicalDamageDealtToChampions": 1445,
                "pentaKills": 0,
                "trueDamageDealt": 7974,
                "trueDamageDealtToChampions": 32,
                "champLevel": 12,
                "participantId": 7,
                "firstInhibitorAssist": false,
                "wardsKilled": 3,
                "firstTowerKill": false,
                "totalHeal": 10150,
                "totalMinionsKilled": 25,
                "physicalDamageDealt": 22313,
                "damageDealtToObjectives": 4040,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 5189,
                "totalUnitsHealed": 1,
                "inhibitorKills": 0,
                "totalDamageTaken": 28098,
                "killingSprees": 0,
                "timeCCingOthers": 21,
                "physicalDamageTaken": 15191
            },
            "spell1Id": 11,
            "participantId": 7,
            "runes": [
                {
                    "runeId": 5245,
                    "rank": 6
                },
                {
                    "runeId": 5247,
                    "rank": 3
                },
                {
                    "runeId": 5289,
                    "rank": 4
                },
                {
                    "runeId": 5297,
                    "rank": 5
                },
                {
                    "runeId": 5317,
                    "rank": 9
                },
                {
                    "runeId": 5337,
                    "rank": 3
                }
            ],
            "highestAchievedSeasonTier": "UNRANKED",
            "masteries": [
                {
                    "masteryId": 6114,
                    "rank": 5
                },
                {
                    "masteryId": 6123,
                    "rank": 1
                },
                {
                    "masteryId": 6134,
                    "rank": 5
                },
                {
                    "masteryId": 6143,
                    "rank": 1
                },
                {
                    "masteryId": 6211,
                    "rank": 5
                },
                {
                    "masteryId": 6223,
                    "rank": 1
                },
                {
                    "masteryId": 6232,
                    "rank": 5
                },
                {
                    "masteryId": 6241,
                    "rank": 1
                },
                {
                    "masteryId": 6252,
                    "rank": 5
                },
                {
                    "masteryId": 6262,
                    "rank": 1
                }
            ],
            "spell2Id": 4,
            "teamId": 200,
            "timeline": {
                "lane": "JUNGLE",
                "participantId": 7,
                "csDiffPerMinDeltas": {
                    "0-10": -0.09999999999999998,
                    "10-20": 1
                },
                "goldPerMinDeltas": {
                    "0-10": 245,
                    "10-20": 258.20000000000005
                },
                "xpDiffPerMinDeltas": {
                    "0-10": -10.09999999999998,
                    "10-20": 131.3
                },
                "creepsPerMinDeltas": {
                    "0-10": 0.4,
                    "10-20": 1.3
                },
                "xpPerMinDeltas": {
                    "0-10": 305.5,
                    "10-20": 383.9
                },
                "role": "NONE",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": 344.5,
                    "10-20": 218.5
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 887.1,
                    "10-20": 897.5
                }
            },
            "championId": 79
        },
        {
            "stats": {
                "item1": 3153,
                "totalPlayerScore": 0,
                "visionScore": 12,
                "unrealKills": 0,
                "win": false,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 303,
                "totalDamageDealt": 60943,
                "magicDamageDealtToChampions": 1839,
                "largestMultiKill": 1,
                "largestKillingSpree": 0,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 188,
                "magicalDamageTaken": 8263,
                "longestTimeSpentLiving": 570,
                "neutralMinionsKilledEnemyJungle": 0,
                "firstTowerAssist": false,
                "neutralMinionsKilledTeamJungle": 0,
                "goldEarned": 7714,
                "item2": 1055,
                "item3": 3047,
                "item0": 2031,
                "deaths": 6,
                "item6": 3363,
                "wardsPlaced": 4,
                "item4": 3086,
                "item5": 1042,
                "turretKills": 0,
                "tripleKills": 0,
                "damageSelfMitigated": 6219,
                "goldSpent": 6650,
                "magicDamageDealt": 7808,
                "kills": 2,
                "doubleKills": 0,
                "firstInhibitorKill": false,
                "trueDamageTaken": 90,
                "firstBloodAssist": false,
                "firstBloodKill": false,
                "assists": 4,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 0,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 0,
                "damageDealtToTurrets": 385,
                "physicalDamageDealtToChampions": 5191,
                "pentaKills": 0,
                "trueDamageDealt": 0,
                "trueDamageDealtToChampions": 0,
                "champLevel": 11,
                "participantId": 8,
                "firstInhibitorAssist": false,
                "wardsKilled": 4,
                "firstTowerKill": false,
                "totalHeal": 1693,
                "totalMinionsKilled": 136,
                "physicalDamageDealt": 53135,
                "damageDealtToObjectives": 801,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 7030,
                "totalUnitsHealed": 4,
                "inhibitorKills": 0,
                "totalDamageTaken": 15795,
                "killingSprees": 0,
                "timeCCingOthers": 32,
                "physicalDamageTaken": 7441
            },
            "spell1Id": 4,
            "participantId": 8,
            "runes": [
                {
                    "runeId": 5245,
                    "rank": 9
                },
                {
                    "runeId": 5289,
                    "rank": 9
                },
                {
                    "runeId": 5317,
                    "rank": 9
                },
                {
                    "runeId": 5337,
                    "rank": 3
                }
            ],
            "highestAchievedSeasonTier": "UNRANKED",
            "masteries": [
                {
                    "masteryId": 6111,
                    "rank": 5
                },
                {
                    "masteryId": 6123,
                    "rank": 1
                },
                {
                    "masteryId": 6131,
                    "rank": 5
                },
                {
                    "masteryId": 6141,
                    "rank": 1
                },
                {
                    "masteryId": 6151,
                    "rank": 5
                },
                {
                    "masteryId": 6162,
                    "rank": 1
                },
                {
                    "masteryId": 6211,
                    "rank": 5
                },
                {
                    "masteryId": 6223,
                    "rank": 1
                },
                {
                    "masteryId": 6231,
                    "rank": 5
                },
                {
                    "masteryId": 6241,
                    "rank": 1
                }
            ],
            "spell2Id": 7,
            "teamId": 200,
            "timeline": {
                "lane": "BOTTOM",
                "participantId": 8,
                "csDiffPerMinDeltas": {
                    "0-10": -0.8000000000000003,
                    "10-20": 0.7499999999999998
                },
                "goldPerMinDeltas": {
                    "0-10": 189.3,
                    "10-20": 308.5
                },
                "xpDiffPerMinDeltas": {
                    "0-10": -90.59999999999998,
                    "10-20": -5.149999999999977
                },
                "creepsPerMinDeltas": {
                    "0-10": 4.5,
                    "10-20": 6.5
                },
                "xpPerMinDeltas": {
                    "0-10": 244.70000000000002,
                    "10-20": 340.1
                },
                "role": "DUO_CARRY",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": 155.35,
                    "10-20": 39.55
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 492.4,
                    "10-20": 460.9
                }
            },
            "championId": 110
        },
        {
            "stats": {
                "item1": 3165,
                "totalPlayerScore": 0,
                "visionScore": 11,
                "unrealKills": 0,
                "win": false,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 0,
                "totalDamageDealt": 103092,
                "magicDamageDealtToChampions": 12172,
                "largestMultiKill": 1,
                "largestKillingSpree": 4,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 1073,
                "magicalDamageTaken": 8800,
                "longestTimeSpentLiving": 481,
                "neutralMinionsKilledEnemyJungle": 0,
                "firstTowerAssist": false,
                "neutralMinionsKilledTeamJungle": 8,
                "goldEarned": 9006,
                "item2": 3020,
                "item3": 1056,
                "item0": 3285,
                "deaths": 5,
                "item6": 3363,
                "wardsPlaced": 5,
                "item4": 1052,
                "item5": 0,
                "turretKills": 1,
                "tripleKills": 0,
                "damageSelfMitigated": 10113,
                "goldSpent": 8460,
                "magicDamageDealt": 87936,
                "kills": 4,
                "doubleKills": 0,
                "firstInhibitorKill": false,
                "trueDamageTaken": 114,
                "firstBloodAssist": false,
                "firstBloodKill": false,
                "assists": 1,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 14,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 1,
                "damageDealtToTurrets": 1652,
                "physicalDamageDealtToChampions": 814,
                "pentaKills": 0,
                "trueDamageDealt": 546,
                "trueDamageDealtToChampions": 0,
                "champLevel": 13,
                "participantId": 9,
                "firstInhibitorAssist": false,
                "wardsKilled": 2,
                "firstTowerKill": false,
                "totalHeal": 512,
                "totalMinionsKilled": 175,
                "physicalDamageDealt": 14610,
                "damageDealtToObjectives": 2434,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 12987,
                "totalUnitsHealed": 1,
                "inhibitorKills": 0,
                "totalDamageTaken": 15102,
                "killingSprees": 1,
                "timeCCingOthers": 19,
                "physicalDamageTaken": 6187
            },
            "spell1Id": 4,
            "participantId": 9,
            "runes": [
                {
                    "runeId": 5273,
                    "rank": 9
                },
                {
                    "runeId": 5289,
                    "rank": 9
                },
                {
                    "runeId": 5317,
                    "rank": 9
                },
                {
                    "runeId": 5357,
                    "rank": 3
                }
            ],
            "highestAchievedSeasonTier": "GOLD",
            "masteries": [
                {
                    "masteryId": 6114,
                    "rank": 5
                },
                {
                    "masteryId": 6122,
                    "rank": 1
                },
                {
                    "masteryId": 6134,
                    "rank": 5
                },
                {
                    "masteryId": 6142,
                    "rank": 1
                },
                {
                    "masteryId": 6312,
                    "rank": 5
                },
                {
                    "masteryId": 6323,
                    "rank": 1
                },
                {
                    "masteryId": 6332,
                    "rank": 5
                },
                {
                    "masteryId": 6343,
                    "rank": 1
                },
                {
                    "masteryId": 6351,
                    "rank": 5
                },
                {
                    "masteryId": 6362,
                    "rank": 1
                }
            ],
            "spell2Id": 21,
            "teamId": 200,
            "timeline": {
                "lane": "MIDDLE",
                "participantId": 9,
                "csDiffPerMinDeltas": {
                    "0-10": 2.5999999999999996,
                    "10-20": 1.9
                },
                "goldPerMinDeltas": {
                    "0-10": 231.5,
                    "10-20": 391.6
                },
                "xpDiffPerMinDeltas": {
                    "0-10": 4.299999999999969,
                    "10-20": 5.800000000000011
                },
                "creepsPerMinDeltas": {
                    "0-10": 6.8,
                    "10-20": 6.6
                },
                "xpPerMinDeltas": {
                    "0-10": 343.79999999999995,
                    "10-20": 417.8
                },
                "role": "SOLO",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": 22,
                    "10-20": -10.500000000000028
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 342.1,
                    "10-20": 589.0999999999999
                }
            },
            "championId": 61
        },
        {
            "stats": {
                "item1": 3153,
                "totalPlayerScore": 0,
                "visionScore": 18,
                "unrealKills": 0,
                "win": false,
                "objectivePlayerScore": 0,
                "largestCriticalStrike": 468,
                "totalDamageDealt": 87576,
                "magicDamageDealtToChampions": 1029,
                "largestMultiKill": 1,
                "largestKillingSpree": 0,
                "quadraKills": 0,
                "totalTimeCrowdControlDealt": 93,
                "magicalDamageTaken": 12725,
                "longestTimeSpentLiving": 950,
                "neutralMinionsKilledEnemyJungle": 0,
                "firstTowerAssist": false,
                "neutralMinionsKilledTeamJungle": 6,
                "goldEarned": 8544,
                "item2": 0,
                "item3": 3087,
                "item0": 2031,
                "deaths": 5,
                "item6": 3340,
                "wardsPlaced": 9,
                "item4": 3047,
                "item5": 1042,
                "turretKills": 1,
                "tripleKills": 0,
                "damageSelfMitigated": 18134,
                "goldSpent": 7775,
                "magicDamageDealt": 17142,
                "kills": 2,
                "doubleKills": 0,
                "firstInhibitorKill": false,
                "trueDamageTaken": 66,
                "firstBloodAssist": false,
                "firstBloodKill": false,
                "assists": 4,
                "totalScoreRank": 0,
                "neutralMinionsKilled": 22,
                "combatPlayerScore": 0,
                "visionWardsBoughtInGame": 3,
                "damageDealtToTurrets": 3261,
                "physicalDamageDealtToChampions": 5863,
                "pentaKills": 0,
                "trueDamageDealt": 1442,
                "trueDamageDealtToChampions": 626,
                "champLevel": 13,
                "participantId": 10,
                "firstInhibitorAssist": false,
                "wardsKilled": 2,
                "firstTowerKill": false,
                "totalHeal": 3391,
                "totalMinionsKilled": 164,
                "physicalDamageDealt": 68992,
                "damageDealtToObjectives": 3261,
                "sightWardsBoughtInGame": 0,
                "totalDamageDealtToChampions": 7519,
                "totalUnitsHealed": 1,
                "inhibitorKills": 0,
                "totalDamageTaken": 23334,
                "killingSprees": 0,
                "timeCCingOthers": 7,
                "physicalDamageTaken": 10542
            },
            "spell1Id": 4,
            "participantId": 10,
            "runes": [
                {
                    "runeId": 5247,
                    "rank": 9
                },
                {
                    "runeId": 5295,
                    "rank": 6
                },
                {
                    "runeId": 5296,
                    "rank": 3
                },
                {
                    "runeId": 5317,
                    "rank": 9
                },
                {
                    "runeId": 5337,
                    "rank": 3
                }
            ],
            "highestAchievedSeasonTier": "GOLD",
            "masteries": [
                {
                    "masteryId": 6111,
                    "rank": 5
                },
                {
                    "masteryId": 6122,
                    "rank": 1
                },
                {
                    "masteryId": 6134,
                    "rank": 5
                },
                {
                    "masteryId": 6143,
                    "rank": 1
                },
                {
                    "masteryId": 6151,
                    "rank": 5
                },
                {
                    "masteryId": 6162,
                    "rank": 1
                },
                {
                    "masteryId": 6211,
                    "rank": 5
                },
                {
                    "masteryId": 6223,
                    "rank": 1
                },
                {
                    "masteryId": 6232,
                    "rank": 5
                },
                {
                    "masteryId": 6241,
                    "rank": 1
                }
            ],
            "spell2Id": 14,
            "teamId": 200,
            "timeline": {
                "lane": "TOP",
                "participantId": 10,
                "csDiffPerMinDeltas": {
                    "0-10": -0.19999999999999996,
                    "10-20": 0.3999999999999999
                },
                "goldPerMinDeltas": {
                    "0-10": 272.6,
                    "10-20": 423.5
                },
                "xpDiffPerMinDeltas": {
                    "0-10": -19.30000000000001,
                    "10-20": 152.60000000000002
                },
                "creepsPerMinDeltas": {
                    "0-10": 7.1,
                    "10-20": 8.8
                },
                "xpPerMinDeltas": {
                    "0-10": 423.3,
                    "10-20": 601.9000000000001
                },
                "role": "SOLO",
                "damageTakenDiffPerMinDeltas": {
                    "0-10": 244.9,
                    "10-20": 748.8
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 387.3,
                    "10-20": 1025
                }
            },
            "championId": 23
        }
    ],
    "gameDuration": 1566,
    "gameCreation": 1501628541391
}

 */
