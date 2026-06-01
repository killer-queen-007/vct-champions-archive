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
      coldStat: "#8E2E37",
      heroPattern: "diagonal",
      heroMood: "洛杉矶的落日余晖，燃烧的赛场",
      cardGlow: "0 0 30px rgba(255, 70, 85, 0.3)"
    },
    cyan: {
      accent: "#0AC8B9",
      accentSoft: "rgba(10, 200, 185, 0.22)",
      accentGlow: "rgba(10, 200, 185, 0.4)",
      accentContrast: "#041312",
      heroDepth: "#071a1a",
      hotStat: "#24E0D1",
      coldStat: "#2D6E72",
      heroPattern: "grid",
      heroMood: "首尔的霓虹夜色，电子脉冲",
      cardGlow: "0 0 30px rgba(10, 200, 185, 0.3)"
    },
    gold: {
      accent: "#FFD700",
      accentSoft: "rgba(255, 215, 0, 0.2)",
      accentGlow: "rgba(255, 215, 0, 0.38)",
      accentContrast: "#1A1605",
      heroDepth: "#1a1407",
      hotStat: "#FFD700",
      coldStat: "#8D6D1F",
      heroPattern: "radial",
      heroMood: "巴黎的荣耀之光，金色殿堂",
      cardGlow: "0 0 30px rgba(255, 215, 0, 0.3)"
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
        teamLogo: "teams/2023-eg-logo.png",
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
        { rank: 1, name: "Demon1", country: "美国", team: "EG", agent: "捷风", portrait: "players/2023/demon1.jpg", acs: 246, kd: 1.39, adr: 165, kast: "74%", kpr: 0.92, dpr: 0.66, fb: 42, fd: 18, fbsr: 2.33, hs: "40%", clutch: 10, quote: "You can't.", quoteSource: "赛后采访" },
        { rank: 2, name: "jawgemo", country: "美国", team: "EG", agent: "雷兹", portrait: "players/2023/jawgemo.png", acs: 228, kd: 1.17, adr: 156, kast: "73%", kpr: 0.85, dpr: 0.73, fb: 55, fd: 43, fbsr: 1.28, hs: "20%", clutch: 8, quote: "我会先开第一枪" },
        { rank: 3, name: "Ethan", country: "美国", team: "EG", agent: "斯凯", portrait: "players/2023/ethan.png", acs: 201, kd: 1.08, adr: 135, kast: "76%", kpr: 0.72, dpr: 0.67, fb: 32, fd: 41, fbsr: 0.78, hs: "22%", clutch: 14, quote: "稳住，就是赢下残局" },
        { rank: 4, name: "C0M", country: "美国", team: "EG", agent: "猎枭", portrait: "players/2023/c0m.jpeg", acs: 187, kd: 1.05, adr: 122, kast: "74%", kpr: 0.68, dpr: 0.65, fb: 28, fd: 30, fbsr: 0.93, hs: "19%", clutch: 20, quote: "信息就是刀锋" },
        { rank: 5, name: "Boostio", country: "美国", team: "EG", agent: "奇乐", portrait: "players/2023/boostio.png", acs: 194, kd: 0.97, adr: 128, kast: "72%", kpr: 0.67, dpr: 0.69, fb: 25, fd: 38, fbsr: 0.66, hs: "23%", clutch: 9, quote: "我会带他们走到最后" },
        { rank: 6, name: "Jinggg", country: "新加坡", team: "PRX", agent: "霓虹", portrait: "players/2023/jinggg.png", acs: 234, kd: 1.05, adr: 158, kast: "68%", kpr: 0.82, dpr: 0.78, fb: 72, fd: 48, fbsr: 1.50, hs: "22%", clutch: 7, quote: "快攻就是我们的语言" },
        { rank: 7, name: "something", country: "俄罗斯", team: "PRX", agent: "捷风", portrait: "players/2023/something.png", acs: 212, kd: 1.02, adr: 141, kast: "71%", kpr: 0.79, dpr: 0.77, fb: 58, fd: 45, fbsr: 1.29, hs: "27%", clutch: 6, quote: "下一发，就是答案" }
      ]
    },
    2024: {
      year: "2024",
      location: "首尔",
      champion: "EDward Gaming",
      shortChampion: "EDG",
      assets: {
        teamLogo: "teams/2024-edg-logo.png",
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
        { rank: 1, name: "ZmjjKK", country: "中国", team: "EDG", agent: "霓虹", portrait: "players/2024/zmjjkk.png", acs: 251, kd: 1.20, adr: 163, kast: "71%", kpr: 0.87, dpr: 0.72, fb: 105, fd: 85, fbsr: 1.24, hs: "19%", clutch: 9, quote: "准星会替我说话" },
        { rank: 2, name: "CHICHOO", country: "中国", team: "EDG", agent: "奇乐", portrait: "players/2024/chichoo.png", acs: 226, kd: 0.96, adr: 150, kast: "72%", kpr: 0.71, dpr: 0.74, fb: 45, fd: 52, fbsr: 0.87, hs: "24%", clutch: 10, quote: "我就是那个答案" },
        { rank: 3, name: "Smoggy", country: "中国", team: "EDG", agent: "雷兹", portrait: "players/2024/smoggy.png", acs: 191, kd: 0.94, adr: 134, kast: "74%", kpr: 0.67, dpr: 0.71, fb: 38, fd: 45, fbsr: 0.84, hs: "21%", clutch: 7, quote: "给我空间，我会终结" },
        { rank: 4, name: "nobody", country: "中国", team: "EDG", agent: "猎枭", portrait: "players/2024/nobody.png", acs: 165, kd: 0.91, adr: 108, kast: "70%", kpr: 0.59, dpr: 0.65, fb: 35, fd: 42, fbsr: 0.83, hs: "25%", clutch: 6, quote: "情报落地，节奏就归我们" },
        { rank: 5, name: "S1Mon", country: "中国", team: "EDG", agent: "欧门", portrait: "players/2024/s1mon.png", acs: 163, kd: 0.90, adr: 113, kast: "73%", kpr: 0.60, dpr: 0.67, fb: 28, fd: 38, fbsr: 0.74, hs: "22%", clutch: 5, quote: "烟雾后面，是计划本身" },
        { rank: 6, name: "Wo0t", country: "土耳其", team: "TH", agent: "幽影", portrait: "players/2024/wo0t.png", acs: 198, kd: 1.14, adr: 152, kast: "69%", kpr: 0.78, dpr: 0.68, fb: 48, fd: 42, fbsr: 1.14, hs: "23%", clutch: 8, quote: "我们会回来的" },
        { rank: 7, name: "MiniBoo", country: "法国", team: "TH", agent: "捷风", portrait: "players/2024/miniboo.png", acs: 187, kd: 1.08, adr: 145, kast: "71%", kpr: 0.74, dpr: 0.69, fb: 52, fd: 48, fbsr: 1.08, hs: "27%", clutch: 6, quote: "高光时刻即将来临" }
      ]
    },
    2025: {
      year: "2025",
      location: "巴黎",
      champion: "NRG Esports",
      shortChampion: "NRG",
      assets: {
        teamLogo: "teams/2025-nrg-logo.png",
        moments: [
          "moments/2025-nrg-1.png",
          "moments/2025-nrg-2.jpg",
          "moments/2025-nrg-3.jpg"
        ]
      },
      mvp: "brawk",
      date: "2025.09.12 - 10.05",
      timelineDate: "09.12 - 10.05",
      theme: "gold",
      stopAccent: "#FFD700",
      result: "总决赛：NRG 3 - 2 FNC",
      moments: [
        "NRG 绝境逆转夺得巴黎冠军",
        "Ethan 成就史上首位两次夺冠选手",
        "brawk 首秀国际赛场即获 MVP"
      ],
      echoes: [
        "他们拒绝坠落，他们把命运按在地上。",
        "每一发子弹都在回答质疑。",
        "冠军不是童话，是血与火之后的沉默。"
      ],
      players: [
        { rank: 1, name: "brawk", country: "美国", team: "NRG", agent: "苏法", portrait: "players/2025/brawk.png", acs: 267, kd: 1.18, adr: 168, kast: "75%", kpr: 0.89, dpr: 0.75, fb: 58, fd: 42, fbsr: 1.38, hs: "18%", clutch: 8, quote: "我只想赢得胜利" },
        { rank: 2, name: "Ethan", country: "美国", team: "NRG", agent: "凯亚/隐者", portrait: "players/2025/ethan.png", acs: 248, kd: 1.12, adr: 155, kast: "78%", kpr: 0.82, dpr: 0.73, fb: 48, fd: 45, fbsr: 1.07, hs: "22%", clutch: 6, quote: "我证明了我能两次做到", quoteSource: "赛后采访" },
        { rank: 3, name: "s0m", country: "美国", team: "NRG", agent: "亚格波/奥丁", portrait: "players/2025/s0m.png", acs: 231, kd: 1.05, adr: 148, kast: "77%", kpr: 0.78, dpr: 0.74, fb: 42, fd: 48, fbsr: 0.88, hs: "25%", clutch: 5, quote: "这只是开始" },
        { rank: 4, name: "mada", country: "加拿大", team: "NRG", agent: "雷兹/亚淘宝", portrait: "players/2025/mada.png", acs: 225, kd: 1.02, adr: 152, kast: "72%", kpr: 0.81, dpr: 0.79, fb: 55, fd: 52, fbsr: 1.06, hs: "32%", clutch: 4, quote: "准备充分就不会紧张" },
        { rank: 5, name: "skuba", country: "美国", team: "NRG", agent: "薇丝/港主", portrait: "players/2025/skuba.png", acs: 218, kd: 1.08, adr: 138, kast: "74%", kpr: 0.75, dpr: 0.69, fb: 38, fd: 35, fbsr: 1.09, hs: "28%", clutch: 7, quote: "信任队友就足够了" },
        { rank: 6, name: "Alfajer", country: "土耳其", team: "FNC", agent: "圣祁", portrait: "players/2025/alfajer.png", acs: 241, kd: 1.15, adr: 158, kast: "71%", kpr: 0.84, dpr: 0.73, fb: 62, fd: 48, fbsr: 1.29, hs: "30%", clutch: 9, quote: "我会继续战斗" },
        { rank: 7, name: "kaajak", country: "波兰", team: "FNC", agent: "幽探", portrait: "players/2025/kaajak.png", acs: 229, kd: 1.09, adr: 151, kast: "70%", kpr: 0.80, dpr: 0.73, fb: 58, fd: 52, fbsr: 1.12, hs: "35%", clutch: 7, quote: "我们会回来的" }
      ]
    }
  }
};
