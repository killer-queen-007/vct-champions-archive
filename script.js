const archiveConfig = window.VCT_ARCHIVE;
const vctData = archiveConfig.years;
const tableColumns = archiveConfig.tableColumns;
const sortOptions = archiveConfig.sortOptions;
const medalMap = archiveConfig.medals;
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
const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");
const pagination = document.getElementById("pagination");
const echoQuotes = document.getElementById("echoQuotes");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

function parsePercent(value) {
  return Number(String(value).replace("%", "")) || 0;
}

function buildAssetPath(relativePath, placeholderKey) {
  const fallbackPath = assetConfig.placeholders[placeholderKey];
  const resolvedRelativePath = relativePath || fallbackPath;
  return `${assetConfig.basePath}/${resolvedRelativePath}`;
}

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
}

function setBackgroundImage(element, assetPath, fallbackGradient) {
  const imagePath = assetPath ? `url("${assetPath}")` : "";
  element.style.backgroundImage = imagePath ? `${imagePath}, ${fallbackGradient}` : fallbackGradient;
}

function renderYearControls() {
  const years = Object.values(vctData);
  yearControls.innerHTML = years.map((data) => `
    <button class="year-btn" data-year="${data.year}" type="button">${data.year}</button>
  `).join("");

  yearTimeline.innerHTML = years.map((data) => `
    <button class="year-stop" data-year="${data.year}" type="button" style="--stop-accent: ${data.stopAccent}">
      <span class="stop-year">${data.year}</span>
      <span class="stop-city">${data.location}</span>
      <span class="stop-team">${data.shortChampion}</span>
      <span class="stop-date">${data.timelineDate}</span>
    </button>
  `).join("");
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
    });
    momentDots.appendChild(dot);
  });
  momentQuote.textContent = `“${data.moments[0]}”`;
}

function renderChampion() {
  const data = vctData[currentYear];
  championName.textContent = data.champion;
  championMvp.textContent = data.mvp;
  championResult.textContent = data.result;
  championDate.textContent = data.date;
  championLogo.textContent = data.shortChampion;
  setBackgroundImage(
    championLogo,
    buildAssetPath(data.assets?.teamLogo, "teamLogo"),
    "linear-gradient(145deg, rgba(255, 255, 255, 0.08), transparent)"
  );
  championLogo.style.backgroundSize = "cover";
  championLogo.style.backgroundPosition = "center";
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
    fragment.querySelector(".medal").textContent = medalMap[player.rank] || "";
    fragment.querySelector(".player-name").textContent = player.name;
    fragment.querySelector(".player-meta").textContent = `${player.country} | ${player.team}`;
    fragment.querySelector(".player-agent").textContent = `招牌特工：${player.agent}`;
    fragment.querySelector(".detail-stats").textContent = archiveConfig.playerDetailMetrics
      .map((metricKey) => `${metricKey.toUpperCase()} ${player[metricKey]}`)
      .join(" | ");
    fragment.querySelector(".player-quote").textContent = `“${player.quote}”`;

    setBackgroundImage(
      portrait,
      buildAssetPath(player.portrait, "playerPortrait"),
      "linear-gradient(135deg, #1d1d1d, #121212)"
    );
    portrait.style.backgroundSize = "cover";
    portrait.style.backgroundPosition = "center";

    card.addEventListener("click", () => {
      this.toggle(card);
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

function init() {
  renderYearControls();
  renderTableHead();
  renderSortOptions();
  setupYearSwitch();
  setupControls();
  setupRevealAnimation();
  setupNavBehavior();
  setupMobileMenu();
  fadeAndRefresh();
}

init();
