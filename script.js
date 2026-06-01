const archiveConfig = window.VCT_ARCHIVE;
const vctData = archiveConfig.years;
const tableColumns = archiveConfig.tableColumns;
const sortOptions = archiveConfig.sortOptions;
const assetConfig = archiveConfig.assets;

let currentYear = archiveConfig.defaults.initialYear;
let currentPage = 1;
const pageSize = archiveConfig.defaults.pageSize;
let searchKeyword = "";
let sortField = sortOptions[0].value;

const transitionTargets = document.querySelectorAll(".transition-target");
const siteNav = document.getElementById("siteNav");
const yearControls = document.getElementById("yearControls");
const yearTimeline = document.getElementById("yearTimeline");
const playerGrid = document.getElementById("playerGrid");
const playerTemplate = document.getElementById("playerCardTemplate");
const championName = document.getElementById("championName");
const championMvp = document.getElementById("championMvp");
const championResult = document.getElementById("championResult");
const championDate = document.getElementById("championDate");
const championLogo = document.getElementById("championLogo");
const momentDots = document.getElementById("momentDots");
const momentQuote = document.getElementById("momentQuote");
const momentGallery = document.getElementById("momentGallery");
const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");
const pagination = document.getElementById("pagination");
const echoQuotes = document.getElementById("echoQuotes");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const playerModal = document.getElementById("playerModal");

function parsePercent(value) {
  return Number(String(value).replace("%", "")) || 0;
}

const ModalController = {
  currentPlayer: null,

  open(player) {
    this.currentPlayer = player;

    const modalPortrait = playerModal.querySelector(".modal-portrait");
    const modalName = playerModal.querySelector(".modal-player-name");
    const modalMeta = playerModal.querySelector(".modal-player-meta");
    const modalAgent = playerModal.querySelector(".modal-agent");
    const modalRankBadge = playerModal.querySelector(".modal-rank-badge");
    const modalQuote = playerModal.querySelector(".modal-quote");
    const modalQuoteSource = playerModal.querySelector(".modal-quote-source");

    ImageManager.apply(modalPortrait, player.portrait, "playerPortrait");

    modalName.textContent = player.name;
    modalMeta.textContent = `${player.country} | ${player.team}`;
    modalAgent.textContent = `招牌特工：${player.agent}`;
    modalQuote.textContent = `"${player.quote}"`;
    modalQuoteSource.textContent = player.quoteSource || "";

    modalRankBadge.textContent = player.rank;
    modalRankBadge.className = "modal-rank-badge";
    if (player.rank === 1) modalRankBadge.classList.add("rank-1");
    else if (player.rank === 2) modalRankBadge.classList.add("rank-2");
    else if (player.rank === 3) modalRankBadge.classList.add("rank-3");

    const statKeys = ["acs", "kd", "adr", "kast", "kpr", "dpr", "fb", "fd", "fbsr", "hs"];
    statKeys.forEach((key) => {
      const el = playerModal.querySelector(`[data-stat="${key}"]`);
      if (el) el.textContent = player[key] ?? "";
    });

    playerModal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  close() {
    playerModal.classList.remove("active");
    document.body.style.overflow = "";
    this.currentPlayer = null;
  },

  init() {
    const closeBtn = playerModal.querySelector(".modal-close");
    const backdrop = playerModal.querySelector(".modal-backdrop");

    closeBtn.addEventListener("click", () => this.close());
    backdrop.addEventListener("click", () => this.close());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && playerModal.classList.contains("active")) {
        this.close();
      }
    });
  }
};

function parsePercent(value) {
  return Number(String(value).replace("%", "")) || 0;
}

const ImageManager = {
  cache: new Map(),
  loading: new Set(),

  TYPE_CONFIG: {
    playerPortrait: {
      placeholder: assetConfig.placeholders.playerPortrait,
      fallbackGradient: "linear-gradient(135deg, #1d1d1d, #0d0d0d)",
      size: "cover",
      position: "center top"
    },
    teamLogo: {
      placeholder: assetConfig.placeholders.teamLogo,
      fallbackGradient: "linear-gradient(145deg, rgba(255,255,255,0.08), transparent)",
      size: "contain",
      position: "center"
    },
    momentImage: {
      placeholder: assetConfig.placeholders.momentImage,
      fallbackGradient: "linear-gradient(135deg, #1a1a1a, #0a0a0a)",
      size: "cover",
      position: "center"
    }
  },

  resolve(relativePath, type) {
    const config = this.TYPE_CONFIG[type];
    if (!config) return `${assetConfig.basePath}/${relativePath}`;
    const resolved = relativePath || config.placeholder;
    return `${assetConfig.basePath}/${resolved}`;
  },

  preload(url) {
    if (this.cache.has(url)) return Promise.resolve(true);
    if (this.loading.has(url)) return Promise.resolve(false);

    this.loading.add(url);
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(url, true);
        this.loading.delete(url);
        resolve(true);
      };
      img.onerror = () => {
        this.cache.set(url, false);
        this.loading.delete(url);
        resolve(false);
      };
      img.src = url;
    });
  },

  preloadYear(yearData) {
    const urls = [];

    if (yearData.assets?.teamLogo) {
      urls.push(this.resolve(yearData.assets.teamLogo, "teamLogo"));
    }

    if (yearData.players) {
      yearData.players.forEach((p) => {
        if (p.portrait) {
          urls.push(this.resolve(p.portrait, "playerPortrait"));
        }
      });
    }

    if (yearData.assets?.moments) {
      yearData.assets.moments.forEach((m) => {
        urls.push(this.resolve(m, "momentImage"));
      });
    }

    return Promise.allSettled(urls.map((u) => this.preload(u)));
  },

  apply(element, relativePath, type) {
    const config = this.TYPE_CONFIG[type] || this.TYPE_CONFIG.playerPortrait;
    const url = this.resolve(relativePath, type);

    element.style.backgroundImage = `url("${url}"), ${config.fallbackGradient}`;
    element.style.backgroundSize = config.size;
    element.style.backgroundPosition = config.position;

    if (!relativePath) {
      element.classList.add("img-placeholder");
      element.classList.remove("img-loaded", "img-error");
      return;
    }

    element.classList.remove("img-placeholder", "img-loaded", "img-error");

    if (this.cache.has(url)) {
      if (this.cache.get(url)) {
        element.classList.add("img-loaded");
      } else {
        this._applyFallback(element, config);
      }
      return;
    }

    element.classList.add("img-loading");
    this.preload(url).then((ok) => {
      element.classList.remove("img-loading");
      if (ok) {
        element.classList.add("img-loaded");
      } else {
        this._applyFallback(element, config);
      }
    });
  },

  applyImg(element, relativePath, type) {
    const config = this.TYPE_CONFIG[type] || this.TYPE_CONFIG.playerPortrait;
    const url = this.resolve(relativePath, type);

    if (!relativePath) {
      element.src = this.resolve(config.placeholder, type);
      element.classList.add("img-placeholder");
      return;
    }

    element.src = url;

    if (this.cache.has(url) && !this.cache.get(url)) {
      element.src = this.resolve(config.placeholder, type);
      element.classList.add("img-error");
      return;
    }

    element.onload = () => element.classList.add("img-loaded");
    element.onerror = () => {
      element.src = this.resolve(config.placeholder, type);
      element.classList.add("img-error");
    };
  },

  _applyFallback(element, config) {
    element.style.backgroundImage = config.fallbackGradient;
    element.classList.add("img-error");
  },

  clearCache() {
    this.cache.clear();
    this.loading.clear();
  }
};

function withDerivedPlayerData(player) {
  return {
    ...player,
    kastValue: parsePercent(player.kast),
    hsValue: parsePercent(player.hs)
  };
}

function setThemeVariables(themeName) {
  const theme = archiveConfig.themes[themeName];
  if (!theme) return;

  const root = document.documentElement;
  root.style.setProperty("--theme-accent", theme.accent);
  root.style.setProperty("--theme-soft", theme.accentSoft);
  root.style.setProperty("--theme-glow", theme.accentGlow);
  root.style.setProperty("--theme-contrast", theme.accentContrast);
  root.style.setProperty("--hero-depth", theme.heroDepth);
  root.style.setProperty("--stat-hot", theme.hotStat);
  root.style.setProperty("--stat-cold", theme.coldStat);
  root.style.setProperty("--card-glow", theme.cardGlow || "0 0 30px var(--theme-soft)");

  const hero = document.getElementById("hero");
  if (hero) {
    hero.classList.remove("theme-diagonal", "theme-grid", "theme-radial");
    hero.classList.add("theme-" + (theme.heroPattern || "diagonal"));
  }

  const heroMood = document.getElementById("heroMood");
  if (heroMood && theme.heroMood) {
    heroMood.textContent = theme.heroMood;
  }
}

function renderYearControls() {
  const years = Object.values(vctData);
  yearControls.innerHTML = years.map((data) => `
    <button class="year-btn" data-year="${data.year}" type="button">${data.year}</button>
  `).join("");

  yearTimeline.innerHTML = years.map((data) => {
    const cityMap = {
      "洛杉矶": "los-angeles",
      "首尔": "seoul",
      "巴黎": "paris"
    };
    const cityKey = cityMap[data.location] || data.location;
    return `
    <button class="year-stop" data-year="${data.year}" data-city="${cityKey}" type="button" style="--stop-accent: ${data.stopAccent}">
      <span class="stop-year">${data.year}</span>
      <span class="stop-city">${data.location}</span>
      <span class="stop-team">${data.shortChampion}</span>
      <span class="stop-date">${data.timelineDate}</span>
    </button>
  `}).join("");
}

function renderTableHead() {
  tableHead.innerHTML = `
    <tr>
      ${tableColumns.map((column) => `<th>${column.label}</th>`).join("")}
    </tr>
  `;
}

function renderSortOptions() {
  sortSelect.innerHTML = sortOptions.map((option) => `
    <option value="${option.value}">${option.label}</option>
  `).join("");
  sortSelect.value = sortField;
}

function getPlayersForTable() {
  const players = vctData[currentYear].players.map(withDerivedPlayerData);
  const filtered = players.filter((player) => {
    const key = searchKeyword.toLowerCase();
    return player.name.toLowerCase().includes(key) || player.team.toLowerCase().includes(key);
  });
  filtered.sort((a, b) => b[sortField] - a[sortField]);
  return filtered;
}

function syncYearButtons() {
  document.querySelectorAll("[data-year]").forEach((button) => {
    button.classList.toggle("active", button.dataset.year === currentYear);
  });
}

function renderMoments(data) {
  const images = data.assets?.moments || [];
  const hasGallery = images.length > 0;

  momentDots.innerHTML = "";
  data.moments.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "moment-dot";
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      momentQuote.textContent = `“${item}”`;
      momentDots.querySelectorAll(".moment-dot").forEach((d, i) => {
        d.classList.toggle("active", i === index);
      });
      momentGallery.querySelectorAll(".moment-gallery-item").forEach((g, i) => {
        g.classList.toggle("active", i === index);
      });
    });
    momentDots.appendChild(dot);
  });
  momentQuote.textContent = `“${data.moments[0]}”`;

  momentGallery.innerHTML = "";
  if (hasGallery) {
    images.forEach((imgPath, index) => {
      const item = document.createElement("div");
      item.className = "moment-gallery-item";
      if (index === 0) item.classList.add("active");

      const bg = document.createElement("div");
      bg.className = "moment-gallery-item-bg";
      ImageManager.apply(bg, imgPath, "momentImage");

      item.appendChild(bg);
      item.addEventListener("click", () => {
        momentDots.querySelectorAll(".moment-dot").forEach((d, i) => {
          d.classList.toggle("active", i === index);
        });
        momentGallery.querySelectorAll(".moment-gallery-item").forEach((g, i) => {
          g.classList.toggle("active", i === index);
        });
        momentQuote.textContent = `“${data.moments[index]}”`;
      });
      momentGallery.appendChild(item);
    });
    momentGallery.classList.add("visible");
  } else {
    momentGallery.classList.remove("visible");
  }
}

function renderChampion() {
  const data = vctData[currentYear];
  championName.textContent = data.champion;
  championMvp.textContent = data.mvp;
  championResult.textContent = data.result;
  championDate.textContent = data.date;
  championLogo.textContent = data.shortChampion;
  ImageManager.apply(championLogo, data.assets?.teamLogo, "teamLogo");
  renderMoments(data);
}

const PlayerCardComponent = {
  expandedCard: null,
  interactionMode: "expand",

  create(player) {
    const fragment = playerTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".player-card");
    const portrait = fragment.querySelector(".portrait-placeholder");

    card.dataset.playerName = player.name;
    card.dataset.interactionMode = this.interactionMode;
    fragment.querySelector(".player-name").textContent = player.name;
    fragment.querySelector(".player-meta").textContent = `${player.country} | ${player.team}`;
    fragment.querySelector(".player-agent").textContent = `招牌特工：${player.agent}`;
    fragment.querySelector(".detail-stats").textContent = archiveConfig.playerDetailMetrics
      .map((metricKey) => `${metricKey.toUpperCase()} ${player[metricKey]}`)
      .join(" | ");
    fragment.querySelector(".player-quote").textContent = `“${player.quote}”`;

    ImageManager.apply(portrait, player.portrait, "playerPortrait");

    card.addEventListener("click", () => {
      ModalController.open(player);
    });

    return fragment;
  },

  toggle(card) {
    if (this.interactionMode !== "expand") return;

    const isExpanded = card.classList.contains("expanded");
    if (this.expandedCard && this.expandedCard !== card) {
      this.expandedCard.classList.remove("expanded");
    }

    card.classList.toggle("expanded", !isExpanded);
    this.expandedCard = isExpanded ? null : card;
  },

  reset() {
    if (this.expandedCard) {
      this.expandedCard.classList.remove("expanded");
      this.expandedCard = null;
    }
  }
};

function renderPlayers() {
  const data = vctData[currentYear];
  playerGrid.innerHTML = "";
  PlayerCardComponent.reset();
  data.players.forEach((player) => {
    playerGrid.appendChild(PlayerCardComponent.create(player));
  });
}

function createRankBadge(rank) {
  if (rank === 1) return '<span class="rank-top1">1</span>';
  if (rank === 2) return '<span class="rank-top2">2</span>';
  if (rank === 3) return '<span class="rank-top3">3</span>';
  return String(rank);
}

function renderTableCell(player, column) {
  if (column.type === "rank") {
    return createRankBadge(player[column.key]);
  }

  const cellValue = player[column.key];
  const variantAttr = column.cellVariant ? ` data-cell-variant="${column.cellVariant}"` : "";
  return `<span${variantAttr}>${cellValue}</span>`;
}

function renderTable() {
  const rows = getPlayersForTable();
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = rows.slice(start, start + pageSize);

  tableBody.innerHTML = pageRows.map((player) => `
    <tr>
      ${tableColumns.map((column) => `<td>${renderTableCell(player, column)}</td>`).join("")}
    </tr>
  `).join("");

  pagination.innerHTML = "";
  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "page-btn";
    button.textContent = String(page);
    if (page === currentPage) button.classList.add("active");
    button.addEventListener("click", () => {
      currentPage = page;
      renderTable();
    });
    pagination.appendChild(button);
  }
}

function renderEcho() {
  const data = vctData[currentYear];
  echoQuotes.innerHTML = data.echoes.map((quote) => `<p class="echo-item">"${quote}"</p>`).join("");
}

function fadeAndRefresh() {
  transitionTargets.forEach((el) => el.classList.add("fading"));
  ImageManager.preloadYear(vctData[currentYear]);
  window.setTimeout(() => {
    setThemeVariables(vctData[currentYear].theme);
    syncYearButtons();
    renderChampion();
    renderPlayers();
    renderTable();
    renderEcho();
    transitionTargets.forEach((el) => el.classList.remove("fading"));
  }, 180);
}

function setupYearSwitch() {
  document.querySelectorAll(".year-btn, .year-stop").forEach((button) => {
    button.addEventListener("click", () => {
      const year = button.dataset.year;
      if (!year || year === currentYear) return;
      currentYear = year;
      currentPage = 1;

      const watermark = document.getElementById("heroWatermark");
      const yearData = VCT_ARCHIVE.years[currentYear];
      if (watermark && yearData) {
        watermark.textContent = yearData.shortChampion;
      }

      MusicPlayer.switchYear(year);
      fadeAndRefresh();
    });
  });
}

function setupRevealAnimation() {
  const sections = document.querySelectorAll(".reveal-section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.12 });

  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(section);
  });
}

function setupNavBehavior() {
  window.addEventListener("scroll", () => {
    siteNav.classList.toggle("scrolled", window.scrollY > 100);
  });
}

function setupControls() {
  searchInput.addEventListener("input", (event) => {
    searchKeyword = event.target.value.trim();
    currentPage = 1;
    renderTable();
  });

  sortSelect.addEventListener("change", (event) => {
    sortField = event.target.value;
    currentPage = 1;
    renderTable();
  });
}

function setupMobileMenu() {
  menuToggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const MusicPlayer = {
  tracks: [
    { year: "2023", title: "Ticking Away", artist: "Grabbitz & bbno$", src: "assets/audio/2023-ticking-away.mp3" },
    { year: "2024", title: "Superpower", artist: "KISS OF LIFE & Jackson Wang", src: "assets/audio/2024-superpower.mp3" },
    { year: "2025", title: "Last Shot", artist: "2025年冠军赛主题曲", src: "assets/audio/2025-theme.mp3" }
  ],
  currentIndex: 0,
  isPlaying: false,
  audio: null,
  elements: {},

  init() {
    this.audio = new Audio();
    this.audio.volume = 0.7;
    this.audio.muted = true;

    this.elements = {
      player: document.getElementById("musicPlayer"),
      collapsed: document.querySelector(".music-player-collapsed"),
      expanded: document.querySelector(".music-player-expanded"),
      toggle: document.querySelector(".music-toggle"),
      close: document.querySelector(".music-close"),
      play: document.querySelector(".music-play"),
      prev: document.querySelector(".music-prev"),
      next: document.querySelector(".music-next"),
      progressBar: document.querySelector(".music-progress-bar"),
      progressFill: document.querySelector(".music-progress-fill"),
      currentTime: document.querySelector(".music-current"),
      duration: document.querySelector(".music-duration"),
      volumeSlider: document.querySelector(".music-volume-slider"),
      year: document.querySelector(".music-year"),
      title: document.querySelector(".music-title"),
      artist: document.querySelector(".music-artist"),
      iconPlay: document.querySelector(".icon-play"),
      iconPause: document.querySelector(".icon-pause")
    };

    this.bindEvents();
    this.updateDisplay();
    this.syncWithCurrentYear();
  },

  syncWithCurrentYear() {
    const yearIndex = this.tracks.findIndex(t => t.year === currentYear);
    if (yearIndex !== -1) {
      this.currentIndex = yearIndex;
      this.updateDisplay();
    }
  },

  switchYear(year) {
    const yearIndex = this.tracks.findIndex(t => t.year === year);
    if (yearIndex !== -1 && yearIndex !== this.currentIndex) {
      this.currentIndex = yearIndex;
      this.updateDisplay(true);
    }
  },

  bindEvents() {
    this.elements.toggle.addEventListener("click", () => this.expand());
    this.elements.close.addEventListener("click", () => this.collapse());
    this.elements.play.addEventListener("click", () => this.togglePlay());
    this.elements.prev.addEventListener("click", () => this.prev());
    this.elements.next.addEventListener("click", () => this.next());

    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("loadedmetadata", () => this.updateDuration());
    this.audio.addEventListener("ended", () => this.next());

    this.elements.progressBar.addEventListener("click", (e) => {
      const rect = this.elements.progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      this.audio.currentTime = percent * this.audio.duration;
    });

    this.elements.volumeSlider.addEventListener("input", (e) => {
      this.audio.volume = e.target.value / 100;
    });

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && e.target.tagName !== "INPUT") {
        e.preventDefault();
        this.togglePlay();
      }
    });
  },

  expand() {
    this.elements.player.classList.add("expanded");
  },

  collapse() {
    this.elements.player.classList.remove("expanded");
  },

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },

  play() {
    this.isPlaying = true;
    this.elements.player.classList.add("playing");
    this.elements.iconPlay.style.display = "none";
    this.elements.iconPause.style.display = "block";
    this.audio.muted = false;
    if (this.audio.readyState >= 3) {
      this.audio.play().catch(() => {});
    } else {
      this.audio.oncanplay = () => {
        this.audio.play().catch(() => {});
        this.audio.oncanplay = null;
      };
    }
  },

  pause() {
    this.isPlaying = false;
    this.elements.player.classList.remove("playing");
    this.elements.iconPlay.style.display = "block";
    this.elements.iconPause.style.display = "none";
    this.audio.pause();
  },

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.tracks.length) % this.tracks.length;
    this.updateDisplay(true);
  },

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.tracks.length;
    this.updateDisplay(true);
  },

  updateDisplay(autoPlay = false) {
    const track = this.tracks[this.currentIndex];
    this.elements.year.textContent = track.year;
    this.elements.title.textContent = track.title;
    this.elements.artist.textContent = track.artist;

    if (track.src) {
      this.audio.src = track.src;
      this.audio.load();
      this.elements.progressFill.style.width = "0%";
      this.elements.currentTime.textContent = "0:00";
      this.elements.duration.textContent = "0:00";

      if (autoPlay) {
        this.audio.oncanplay = () => {
          this.audio.play().catch(() => {});
          this.audio.oncanplay = null;
        };
      }
    } else {
      this.audio.src = "";
    }
  },

  updateProgress() {
    if (this.audio.duration) {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      this.elements.progressFill.style.width = `${percent}%`;
      this.elements.currentTime.textContent = this.formatTime(this.audio.currentTime);
    }
  },

  updateDuration() {
    this.elements.duration.textContent = this.formatTime(this.audio.duration);
  },

  formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
};

function init() {
  renderYearControls();
  renderTableHead();
  renderSortOptions();
  setupYearSwitch();
  setupControls();
  setupRevealAnimation();
  setupNavBehavior();
  setupMobileMenu();
  ModalController.init();
  setThemeVariables(vctData[currentYear].theme);
  ImageManager.preloadYear(vctData[currentYear]);
  Object.keys(vctData).forEach((year) => {
    if (year !== currentYear) {
      ImageManager.preloadYear(vctData[year]);
    }
  });
  MusicPlayer.init();
  fadeAndRefresh();
}

init();
