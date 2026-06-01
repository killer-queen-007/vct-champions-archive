window.VCT_ARCHIVE = {
  defaults: {
    initialYear: "2023",
    pageSize: 5
  },
  assets: {
    basePath: "./assets",
    placeholders: {
      playerPortrait: "players/placeholder-player.svg",
      teamLogo: "teams/placeholder-team.svg",
      momentImage: "moments/placeholder-moment.svg"
    }
  },
  medals: {
    1: "🥇",
    2: "🥈",
    3: "🥉"
  },
  themes: {
    red: {
      accent: "#FF4655",
      accentSoft: "rgba(255, 70, 85, 0.24)",
      accentGlow: "rgba(255, 70, 85, 0.45)",
      accentContrast: "#050505",
      heroDepth: "#1a0a0a",
      hotStat: "#FF4655",
      coldStat: "#8E2E37"
    },
    cyan: {
      accent: "#0AC8B9",
      accentSoft: "rgba(10, 200, 185, 0.22)",
      accentGlow: "rgba(10, 200, 185, 0.4)",
      accentContrast: "#041312",
      heroDepth: "#071a1a",
      hotStat: "#24E0D1",
      coldStat: "#2D6E72"
    },
    gold: {
      accent: "#FFD700",
      accentSoft: "rgba(255, 215, 0, 0.2)",
      accentGlow: "rgba(255, 215, 0, 0.38)",
      accentContrast: "#1A1605",
      heroDepth: "#1a1407",
      hotStat: "#FFD700",
      coldStat: "#8D6D1F"
    }
  },
  tableColumns: [
    { key: "rank", label: "排名", type: "rank" },
    { key: "name", label: "选手" },
    { key: "team", label: "队伍" },
    { key: "agent", label: "特工" },
    { key: "acs", label: "ACS", sortable: true },
    { key: "kd", label: "K/D", sortable: true },
    { key: "adr", label: "ADR", sortable: true },
    { key: "kast", label: "KAST%", sortable: true, sortValueKey: "kastValue" },
    { key: "kpr", label: "KPR", sortable: true },
    { key: "dpr", label: "DPR", sortable: true },
    { key: "fb", label: "首杀(FB)", sortable: true, cellVariant: "hot" },
    { key: "fd", label: "首死(FD)", sortable: true, cellVariant: "cold" },
    { key: "fbsr", label: "FBSR", sortable: true },
    { key: "hs", label: "爆头率(HS%)", sortable: true, sortValueKey: "hsValue" }
  ],
  sortOptions: [
    { value: "acs", label: "ACS" },
    { value: "kd", label: "K/D" },
    { value: "fb", label: "首杀" },
    { value: "kastValue", label: "回合参与率" }
  ],
  playerDetailMetrics: ["acs", "kd", "adr", "kast", "fb"],
  years: {
    2023: {
      year: "2023",
      location: "洛杉矶",
      champion: "Evil Geniuses",
      shortChampion: "EG",
      assets: {
        teamLogo: "teams/2023-eg-logo.svg",
        moments: [
          "moments/2023-eg-1.jpg",
          "moments/2023-eg-2.jpg",
          "moments/2023-eg-3.jpg"
        ]
      },
      mvp: "Demon1",
      date: "2023.08.06 - 08.26",
      timelineDate: "08.06 - 08.26",
      theme: "red",
      stopAccent: "#FF4655",
      result: "总决赛：EG 3 - 1 PRX",
      moments: [
        "EG 从败者组一穿五夺冠",
        "Demon1 的大狙统治了洛杉矶",
        "这是北美 Valorant 的黎明"
      ],
      echoes: [
        "他们拒绝坠落，他们把命运按在地上。",
        "每一发子弹都在回答质疑。",
        "冠军不是童话，是血与火之后的沉默。"
      ],
      players: [
        { rank: 1, name: "Demon1", country: "美国", team: "EG", agent: "捷风", portrait: "players/2023/demon1.png", acs: 280, kd: 1.45, adr: 185, kast: "78%", kpr: 0.92, dpr: 0.63, fb: 42, fd: 18, fbsr: 2.33, hs: "32%", clutch: 84, quote: "我就是为此而生的" },
        { rank: 2, name: "Ethan", country: "美国", team: "EG", agent: "斯凯", portrait: "players/2023/ethan.png", acs: 236, kd: 1.26, adr: 151, kast: "79%", kpr: 0.81, dpr: 0.65, fb: 24, fd: 19, fbsr: 1.26, hs: "24%", clutch: 80, quote: "不退，就是胜利的开始" },
        { rank: 3, name: "jawgemo", country: "美国", team: "EG", agent: "雷兹", portrait: "players/2023/jawgemo.png", acs: 244, kd: 1.19, adr: 160, kast: "74%", kpr: 0.84, dpr: 0.71, fb: 36, fd: 28, fbsr: 1.29, hs: "21%", clutch: 74, quote: "我要先开第一枪" },
        { rank: 4, name: "C0M", country: "美国", team: "EG", agent: "猎枭", portrait: "players/2023/c0m.png", acs: 214, kd: 1.11, adr: 136, kast: "77%", kpr: 0.72, dpr: 0.65, fb: 18, fd: 17, fbsr: 1.06, hs: "27%", clutch: 70, quote: "信息就是刀锋" },
        { rank: 5, name: "Boostio", country: "美国", team: "EG", agent: "奇乐", portrait: "players/2023/boostio.png", acs: 205, kd: 1.02, adr: 130, kast: "75%", kpr: 0.69, dpr: 0.67, fb: 15, fd: 22, fbsr: 0.68, hs: "20%", clutch: 68, quote: "我会带他们走到最后" },
        { rank: 6, name: "something", country: "俄罗斯", team: "PRX", agent: "捷风", portrait: "players/2023/something.png", acs: 274, kd: 1.31, adr: 176, kast: "73%", kpr: 0.89, dpr: 0.68, fb: 39, fd: 30, fbsr: 1.3, hs: "28%", clutch: 72, quote: "下一发，就是答案" }
      ]
    },
    2024: {
      year: "2024",
      location: "首尔",
      champion: "EDward Gaming",
      shortChampion: "EDG",
      assets: {
        teamLogo: "teams/2024-edg-logo.svg",
        moments: [
          "moments/2024-edg-1.jpg",
          "moments/2024-edg-2.jpg",
          "moments/2024-edg-3.jpg"
        ]
      },
      mvp: "ZmjjKK",
      date: "2024.08.01 - 08.25",
      timelineDate: "08.01 - 08.25",
      theme: "cyan",
      stopAccent: "#0AC8B9",
      result: "总决赛：EDG 3 - 2 TH",
      moments: [
        "EDG 五局鏖战击溃 TH",
        "ZmjjKK 关键局狙击改写走向",
        "中国赛区登顶世界之巅"
      ],
      echoes: [
        "他们做到了！EDG 创造了历史！",
        "首尔的灯光照见了新的王朝。",
        "这一冠，替无数个不眠夜作证。"
      ],
      players: [
        { rank: 1, name: "ZmjjKK", country: "中国", team: "EDG", agent: "捷风", portrait: "players/2024/zmjjkk.png", acs: 287, kd: 1.38, adr: 182, kast: "77%", kpr: 0.94, dpr: 0.68, fb: 44, fd: 23, fbsr: 1.91, hs: "31%", clutch: 86, quote: "准星会替我说话" },
        { rank: 2, name: "CHICHOO", country: "中国", team: "EDG", agent: "奇乐", portrait: "players/2024/chichoo.png", acs: 231, kd: 1.24, adr: 149, kast: "80%", kpr: 0.78, dpr: 0.63, fb: 18, fd: 16, fbsr: 1.13, hs: "26%", clutch: 83, quote: "稳住，就是赢下残局" },
        { rank: 3, name: "Smoggy", country: "中国", team: "EDG", agent: "雷兹", portrait: "players/2024/smoggy.png", acs: 248, kd: 1.21, adr: 159, kast: "76%", kpr: 0.82, dpr: 0.68, fb: 34, fd: 25, fbsr: 1.36, hs: "23%", clutch: 76, quote: "给我空间，我会终结" },
        { rank: 4, name: "nobody", country: "中国", team: "EDG", agent: "猎枭", portrait: "players/2024/nobody.png", acs: 219, kd: 1.14, adr: 142, kast: "79%", kpr: 0.75, dpr: 0.66, fb: 21, fd: 18, fbsr: 1.17, hs: "25%", clutch: 78, quote: "情报落地，节奏就归我们" },
        { rank: 5, name: "S1Mon", country: "中国", team: "EDG", agent: "欧门", portrait: "players/2024/s1mon.png", acs: 207, kd: 1.03, adr: 132, kast: "75%", kpr: 0.69, dpr: 0.67, fb: 12, fd: 17, fbsr: 0.71, hs: "20%", clutch: 70, quote: "烟雾后面，是计划本身" },
        { rank: 6, name: "Meteor", country: "韩国", team: "GEN", agent: "雷兹", portrait: "players/2024/meteor.png", acs: 263, kd: 1.29, adr: 170, kast: "74%", kpr: 0.87, dpr: 0.67, fb: 37, fd: 29, fbsr: 1.28, hs: "29%", clutch: 74, quote: "舞台越大，越要向前" }
      ]
    },
    2025: {
      year: "2025",
      location: "巴黎",
      champion: "Sentinels",
      shortChampion: "SEN",
      assets: {
        teamLogo: "teams/2025-sen-logo.svg",
        moments: [
          "moments/2025-sen-1.jpg",
          "moments/2025-sen-2.jpg",
          "moments/2025-sen-3.jpg"
        ]
      },
      mvp: "TenZ",
      date: "2025.08.05 - 08.30",
      timelineDate: "08.05 - 08.30",
      theme: "gold",
      stopAccent: "#FFD700",
      result: "总决赛：SEN 3 - 2 FNC",
      moments: [
        "巴黎雨夜，SEN 完成逆转",
        "TenZ 在决胜图打出传奇残局",
        "金色雨落下时，全场沸腾"
      ],
      echoes: [
        "这不是回归，这是王者宣言。",
        "有人在巴黎封神，也有人在巴黎告别。",
        "冠军奖杯从不记得亚军的眼泪。"
      ],
      players: [
        { rank: 1, name: "TenZ", country: "加拿大", team: "SEN", agent: "捷风", portrait: "players/2025/tenz.png", acs: 291, kd: 1.41, adr: 188, kast: "79%", kpr: 0.96, dpr: 0.68, fb: 47, fd: 24, fbsr: 1.96, hs: "34%", clutch: 88, quote: "最后一图，我只看准星" },
        { rank: 2, name: "zekken", country: "美国", team: "SEN", agent: "雷兹", portrait: "players/2025/zekken.png", acs: 276, kd: 1.32, adr: 177, kast: "76%", kpr: 0.91, dpr: 0.69, fb: 41, fd: 29, fbsr: 1.41, hs: "27%", clutch: 79, quote: "我会一直冲到终点" },
        { rank: 3, name: "johnqt", country: "摩洛哥", team: "SEN", agent: "幽影", portrait: "players/2025/johnqt.png", acs: 224, kd: 1.18, adr: 145, kast: "80%", kpr: 0.76, dpr: 0.64, fb: 19, fd: 17, fbsr: 1.12, hs: "25%", clutch: 81, quote: "指挥不是声音，是方向" },
        { rank: 4, name: "Sacy", country: "巴西", team: "SEN", agent: "斯凯", portrait: "players/2025/sacy.png", acs: 216, kd: 1.11, adr: 139, kast: "81%", kpr: 0.73, dpr: 0.66, fb: 15, fd: 14, fbsr: 1.07, hs: "24%", clutch: 80, quote: "经验就是关键回合的呼吸" },
        { rank: 5, name: "Zellsis", country: "美国", team: "SEN", agent: "蝰蛇", portrait: "players/2025/zellsis.png", acs: 211, kd: 1.05, adr: 134, kast: "77%", kpr: 0.7, dpr: 0.67, fb: 14, fd: 19, fbsr: 0.74, hs: "22%", clutch: 73, quote: "我在脏活里拿胜利" },
        { rank: 6, name: "Derke", country: "芬兰", team: "FNC", agent: "捷风", portrait: "players/2025/derke.png", acs: 279, kd: 1.34, adr: 181, kast: "75%", kpr: 0.9, dpr: 0.67, fb: 43, fd: 32, fbsr: 1.34, hs: "31%", clutch: 76, quote: "我想把奖杯留在欧洲" }
      ]
    }
  }
};
