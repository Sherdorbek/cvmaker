/**
 * Warm Paper CV / Resume Maker
 * Lightweight Vanilla ES6 Implementation
 */

// Default Sample State
const sampleState = {
  theme: "warm-classic",
  headerAlign: "left",
  settings: {
    font: "lora",
    size: "14",
    spacing: "normal",
  },
  photo: null,
  fullName: "Eleanor Vance",
  headline: "Senior Architectural Designer & Urbanist",
  email: "eleanor.vance@studiofolio.org",
  phone: "+1 (503) 849-1120",
  location: "Portland, Oregon",
  website: "eleanorvance.design",
  summary:
    "Design lead with 8+ years guiding sustainable civic architecture and adaptive reuse initiatives. Dedicated to balancing traditional hand craft with computational environmental analysis to deliver enduring, human-scale spaces.",
  experiences: [
    {
      id: "exp-1",
      role: "Lead Project Architect",
      company: "Atelier Linden & Associates",
      date: "2021 — Present",
      description:
        "• Directed sustainable design on three award-winning municipal library renovations.\n• Coordinated cross-disciplinary teams through zoning, schematic design, and construction documents.\n• Reduced embodied carbon metrics by 28% across timber frame construction packages.",
    },
    {
      id: "exp-2",
      role: "Architectural Associate",
      company: "Ochre Studio Collective",
      date: "2018 — 2021",
      description:
        "• Produced full set schematic models and client presentation suites in Rhino and Revit.\n• Facilitated community workshop sessions for neighborhood revitalization master plans.",
    },
  ],
  educations: [
    {
      id: "edu-1",
      degree: "Master of Architecture (M.Arch)",
      school: "University of Oregon — School of Architecture",
      date: "2016 — 2018",
    },
    {
      id: "edu-2",
      degree: "B.A. in Environmental Design",
      school: "University of Washington",
      date: "2012 — 2016",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "AIA Northwest Design Merit Award",
      issuer: "American Institute of Architects",
      date: "2023",
      description: "Recognized for exemplary low-carbon civic timber restoration.",
    },
    {
      id: "ach-2",
      title: "Urban Environmental Fellow",
      issuer: "Pacific Design Foundation",
      date: "2020",
      description: "",
    },
  ],
  skills: [
    { id: "sk-1", name: "Python", level: "Intermediate" },
    { id: "sk-2", name: "English", level: "C1" },
    { id: "sk-3", name: "Revit & BIM", level: "Expert" },
    { id: "sk-4", name: "Mass Timber Design", level: "Advanced" },
    { id: "sk-5", name: "Rhino 3D", level: "Advanced" },
    { id: "sk-6", name: "Passive House", level: "Certified" },
  ],
};

// Header alignment is left-locked from the UI; the state key stays for
// JSON import/export compatibility and is normalized to "left".
const HEADER_ALIGNMENT = "left";

// Application State (normalizeResumeState builds fresh arrays/objects, so no deep copy needed)
let appState = normalizeResumeState(loadSavedState() || sampleState);

// ==========================================================
// INTERNATIONALIZATION (uzb latin / rus / eng)
// ==========================================================
const LANG_STORAGE_KEY = "inkfold_lang";

const TRANSLATIONS = {
  eng: {
    brandSub: "handcrafted resumes on warm paper",
    exportJson: "Export JSON", importJson: "Import JSON", clear: "Clear", fillSample: "Fill Sample",
    printPdf: "Print / Save PDF", edit: "Edit", preview: "Preview",
    photoOptional: "Profile Photo (Optional)", uploadPhoto: "Upload Photo", removePhoto: "Remove Photo",
    fullName: "Full Name", headline: "Professional Title", email: "Email Address", phone: "Phone",
    location: "Location", website: "Portfolio / Link", summary: "Profile Summary",
    phFullname: "e.g. Eleanor Vance", phHeadline: "e.g. Senior Architectural Designer",
    phEmail: "you@studio.co", phPhone: "+998 (90) 123-45-67", phLocation: "Tashkent, Uzbekistan",
    phWebsite: "yourname.design",
    phSummary: "Brief narrative highlighting your trajectory, philosophy, and expertise...",
    experience: "Experience", addRole: "+ Add Role", education: "Education", addDegree: "+ Add Degree",
    honorsSection: "Honors & Achievements", addAchievement: "+ Add Achievement",
    skillsSection: "Skills & Proficiencies", addSkill: "+ Add Skill",
    expBadge: "Role", eduBadge: "Degree", achBadge: "Honor",
    position: "Position / Role", company: "Company / Firm", timePeriod: "Time Period",
    keyResponsibilities: "Key Responsibilities & Outcomes",
    degreeLabel: "Degree / Certificate", institution: "Institution", yearDates: "Year / Dates",
    awardTitle: "Award / Honor Title", issuerLabel: "Issuer / Organization", yearDate: "Year / Date",
    shortDescription: "Short Description (Optional)",
    phRole: "e.g. Senior Architect", phCompany: "e.g. Studio Craft", phExpDate: "e.g. 2020 — Present",
    phDesc: "Notable achievements, tools, scope...",
    phDegree: "e.g. B.S. in Architecture", phSchool: "e.g. Columbia University",
    phEduDate: "e.g. 2014 — 2018", phAchTitle: "e.g. Design Merit Award",
    phIssuer: "e.g. American Institute of Architects", phAchDate: "e.g. 2023",
    phAchDesc: "Notable context or recognition detail...",
    phSkill: "Skill (e.g. Python)", phLevel: "Level / Value (e.g. Intermediate, C1)",
    profExperience: "Professional Experience", educationCredentials: "Education & Credentials",
    honorsAchievements: "Honors & Achievements", skillsCompetencies: "Skills & Competencies",
    contSuffix: "(Cont.)",
    yourName: "Your Name", roleFallback: "Role", degreeFallback: "Degree",
    honorFallback: "Honor / Award", universityFallback: "University", companyFallback: "Company",
    contactTitle: "Contact", educationTitle: "Education", skillsTitle: "Skills",
    profileTitle: "Profile", workExperience: "Work Experience", honorsTitle: "Honors & Achievements",
    deleteRole: "Remove role", deleteDegree: "Remove degree", deleteHonor: "Remove honor",
    deleteSkill: "Remove skill", cleanSheet: "Start with a clean sheet?",
    exportFail: "Could not export resume to JSON.",
    importFail: "Failed to import JSON: ",
    invalidFormat: "Invalid format: Root must be a JSON object.",
    readFail: "Failed to read the selected file.",
  },
  uzb: {
    brandSub: "iliq qog'ozda qo'lda yaratilgan rezyumelar",
    exportJson: "JSON eksport qilish", importJson: "JSON import qilish", clear: "Tozalash",
    fillSample: "Namuna bilan to'ldirish",
    printPdf: "Chop etish / PDF saqlash", edit: "Tahrirlash", preview: "Ko'rish",
    photoOptional: "Profil rasmi (ixtiyoriy)", uploadPhoto: "Rasm yuklash", removePhoto: "Rasmni olib tashlash",
    fullName: "To'liq ism", headline: "Mutaxassislik / lavozim", email: "Elektron pochta", phone: "Telefon",
    location: "Joylashuv", website: "Portfolio / havola", summary: "Profil xulosasi",
    phFullname: "masalan: Eleanor Vance", phHeadline: "masalan: Katta dizayner",
    phEmail: "siz@studio.uz", phPhone: "+998 (90) 123-45-67", phLocation: "Toshkent, O'zbekiston",
    phWebsite: "ismingiz.uz",
    phSummary: "Kasbiiy yo'lingiz, falsafangiz va tajribangiz haqida qisqa bayon...",
    experience: "Ish tajribasi", addRole: "+ Rol qo'shish", education: "Ta'lim", addDegree: "+ Daraja qo'shish",
    honorsSection: "Faxrli unvonlar va mukofotlar", addAchievement: "+ Yutuq qo'shish",
    skillsSection: "Ko'nikmalar va malakalar", addSkill: "+ Ko'nikma qo'shish",
    expBadge: "Rol", eduBadge: "Daraja", achBadge: "Mukofot",
    position: "Lavozim / rol", company: "Kompaniya / firma", timePeriod: "Muddat",
    keyResponsibilities: "Asosyy vazifalar va natijalar",
    degreeLabel: "Daraja / sertifikat", institution: "O'quv muassasasi", yearDates: "Yillar / sanalar",
    awardTitle: "Mukofot / faxrli unvon", issuerLabel: "Tashkilot", yearDate: "Yil / sana",
    shortDescription: "Qisqa tavsif (ixtiyoriy)",
    phRole: "masalan: Katta muhandis", phCompany: "masalan: Studio Craft", phExpDate: "masalan: 2020 — hozir",
    phDesc: "Muhim yutuqlar, vositalar, mas'uliyat doirasi...",
    phDegree: "masalan: Arxitektura bakalavri", phSchool: "masalan: TATU",
    phEduDate: "masalan: 2014 — 2018", phAchTitle: "masalan: Dizayn mukofoti",
    phIssuer: "masalan: Arxitektorlar uyushmasi", phAchDate: "masalan: 2023",
    phAchDesc: "Qisqa kontekst yoki izoh...",
    phSkill: "Ko'nikma (masalan: Python)", phLevel: "Daraja (masalan: O'rtacha, C1)",
    profExperience: "Ish tajribasi", educationCredentials: "Ta'lim va malakalar",
    honorsAchievements: "Faxrli unvonlar va mukofotlar", skillsCompetencies: "Ko'nikmalar va malakalar",
    contSuffix: "(davomi)",
    yourName: "Ismingiz", roleFallback: "Rol", degreeFallback: "Daraja",
    honorFallback: "Faxrli unvon / mukofot", universityFallback: "Universitet", companyFallback: "Kompaniya",
    contactTitle: "Aloqa", educationTitle: "Ta'lim", skillsTitle: "Ko'nikmalar",
    profileTitle: "Profil", workExperience: "Ish tajribasi", honorsTitle: "Faxrli unvonlar va mukofotlar",
    deleteRole: "Rolni o'chirish", deleteDegree: "Darajani o'chirish", deleteHonor: "Mukofotni o'chirish",
    deleteSkill: "Ko'nikmani o'chirish", cleanSheet: "Yangi bo'sh varaqdan boshlaysizmi?",
    exportFail: "JSON eksport qilib bo'lmadi.",
    importFail: "JSON import qilib bo'lmadi: ",
    invalidFormat: "Notog'ri format: ildiz JSON obyekt bo'lishi kerak.",
    readFail: "Tanlangan faylni o'qib bo'lmadi.",
  },
  rus: {
    brandSub: "резюме на тёплой бумаге",
    exportJson: "Экспорт JSON", importJson: "Импорт JSON", clear: "Очистить", fillSample: "Заполнить примером",
    printPdf: "Печать / Сохранить PDF", edit: "Редактирование", preview: "Просмотр",
    photoOptional: "Фото профиля (необязательно)", uploadPhoto: "Загрузить фото", removePhoto: "Убрать фото",
    fullName: "Полное имя", headline: "Профессиональный титул", email: "Эл. почта", phone: "Телефон",
    location: "Город", website: "Портфолио / ссылка", summary: "О себе",
    phFullname: "например: Элеанор Вэнс", phHeadline: "например: Ведущий дизайнер",
    phEmail: "you@studio.co", phPhone: "+7 (900) 123-45-67", phLocation: "Ташкент, Узбекистан",
    phWebsite: "yourname.design",
    phSummary: "Кратко о вашем пути, философии и опыте...",
    experience: "Опыт работы", addRole: "+ Добавить роль", education: "Образование", addDegree: "+ Добавить диплом",
    honorsSection: "Награды и достижения", addAchievement: "+ Добавить награду",
    skillsSection: "Навыки и компетенции", addSkill: "+ Добавить навык",
    expBadge: "Роль", eduBadge: "Диплом", achBadge: "Награда",
    position: "Должность / роль", company: "Компания / фирма", timePeriod: "Период",
    keyResponsibilities: "Ключевые обязанности и результаты",
    degreeLabel: "Степень / сертификат", institution: "Учебное заведение", yearDates: "Годы / даты",
    awardTitle: "Награда / звание", issuerLabel: "Организация", yearDate: "Год / дата",
    shortDescription: "Краткое описание (необязательно)",
    phRole: "например: Ведущий инженер", phCompany: "например: Studio Craft", phExpDate: "например: 2020 — наст.",
    phDesc: "Заметные достижения, инструменты, масштаб...",
    phDegree: "например: бакалавр архитектуры", phSchool: "например: МГУ",
    phEduDate: "например: 2014 — 2018", phAchTitle: "например: Премия за дизайн",
    phIssuer: "например: Институт архитекторов", phAchDate: "например: 2023",
    phAchDesc: "Краткий контекст или деталь...",
    phSkill: "Навык (например: Python)", phLevel: "Уровень (например: Средний, C1)",
    profExperience: "Профессиональный опыт", educationCredentials: "Образование и квалификация",
    honorsAchievements: "Награды и достижения", skillsCompetencies: "Навыки и компетенции",
    contSuffix: "(прод.)",
    yourName: "Ваше имя", roleFallback: "Роль", degreeFallback: "Диплом",
    honorFallback: "Награда / звание", universityFallback: "Университет", companyFallback: "Компания",
    contactTitle: "Контакты", educationTitle: "Образование", skillsTitle: "Навыки",
    profileTitle: "О себе", workExperience: "Опыт работы", honorsTitle: "Награды и достижения",
    deleteRole: "Удалить роль", deleteDegree: "Удалить диплом", deleteHonor: "Удалить награду",
    deleteSkill: "Удалить навык", cleanSheet: "Начать с чистого листа?",
    exportFail: "Не удалось экспортировать резюме в JSON.",
    importFail: "Не удалось импортировать JSON: ",
    invalidFormat: "Неверный формат: корень должен быть JSON-объектом.",
    readFail: "Не удалось прочитать выбранный файл.",
  },
};

function loadSavedLanguage() {
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY);
    return v && TRANSLATIONS[v] ? v : "eng";
  } catch (e) {
    return "eng";
  }
}

let currentLang = loadSavedLanguage();

// Translate helper with English fallback
function t(key) {
  const lang = TRANSLATIONS[currentLang] || TRANSLATIONS.eng;
  if (lang[key] != null) return lang[key];
  return TRANSLATIONS.eng[key] != null ? TRANSLATIONS.eng[key] : key;
}

// Apply translations to all static, tagged DOM elements
function applyLocalization() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = t(el.getAttribute("data-i18n"));
    if (value) el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  const langSelect = document.getElementById("lang-select");
  if (langSelect) langSelect.value = currentLang;
}

function saveLanguage() {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
  } catch (e) {
    // ignore
  }
}

// Selectors
const elements = {
  toolTheme: document.getElementById("tool-theme"),
  toolFont: document.getElementById("tool-font"),
  toolSize: document.getElementById("tool-size"),
  toolSpacing: document.getElementById("tool-spacing"),
  photoInput: document.getElementById("photoInput"),
  btnRemovePhoto: document.getElementById("btn-remove-photo"),
  editorPhotoPreview: document.getElementById("editor-photo-preview"),
  fullName: document.getElementById("fullName"),
  headline: document.getElementById("headline"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  location: document.getElementById("location"),
  website: document.getElementById("website"),
  summary: document.getElementById("summary"),
  skillsList: document.getElementById("skills-list"),
  experienceList: document.getElementById("experience-list"),
  educationList: document.getElementById("education-list"),
  achievementsList: document.getElementById("achievements-list"),
  previewWrapper: document.getElementById("preview-wrapper"),

  // Buttons & File Inputs
  btnAddExperience: document.getElementById("add-experience-btn"),
  btnAddEducation: document.getElementById("add-education-btn"),
  btnAddAchievement: document.getElementById("add-achievement-btn"),
  btnAddSkill: document.getElementById("add-skill-btn"),
  btnSample: document.getElementById("btn-sample"),
  btnReset: document.getElementById("btn-reset"),
  btnImportJson: document.getElementById("btn-import-json"),
  btnExportJson: document.getElementById("btn-export-json"),
  jsonFileInput: document.getElementById("jsonFileInput"),
  btnPrint: document.getElementById("btn-print"),
};

// Auto-resize helper for textareas
function autoResizeTextarea(el) {
  if (!el) return;
  el.style.height = "auto";
  el.style.height = Math.max(el.scrollHeight, 40) + "px";
}

function queueAutoResize(el) {
  if (!el) return;
  requestAnimationFrame(() => autoResizeTextarea(el));
}

function autoResizeAllTextareas() {
  requestAnimationFrame(() => {
    document.querySelectorAll("textarea").forEach(autoResizeTextarea);
  });
}

// High-Performance Batched Updates (Eliminates typing lag & layout thrashing)
let previewDebounceId = null;
let saveTimeoutId = null;

// The preview render is expensive: it rebuilds the whole sheet DOM and runs
// A4 pagination (forced reflow per block). A bare rAF batch still re-rendered
// on every single keystroke frame while typing, so coalesce bursts into one
// render after typing pauses for a moment.
const PREVIEW_DEBOUNCE_MS = 120;

function scheduleUpdate() {
  clearTimeout(saveTimeoutId);
  saveTimeoutId = setTimeout(saveState, 300);

  clearTimeout(previewDebounceId);
  previewDebounceId = setTimeout(renderPreview, PREVIEW_DEBOUNCE_MS);
}

// Typography Configurations
const fontMap = {
  lora: "'Lora', Georgia, serif",
  fraunces: "'Fraunces', Georgia, serif",
  times: "'Times New Roman', Times, serif",
  garamond: "'EB Garamond', Georgia, serif",
  newsreader: "'Newsreader', Georgia, serif",
  sans: "'Plus Jakarta Sans', system-ui, sans-serif",
  inter: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Courier New', Courier, monospace",
};

const sizeMap = {
  small: "13px",
  normal: "14px",
  large: "16px",
};

const spacingMap = {
  tight: { lineHeight: "1.4", sectionGap: "1rem" },
  normal: { lineHeight: "1.55", sectionGap: "1.35rem" },
  relaxed: { lineHeight: "1.75", sectionGap: "1.75rem" },
};

function applyTypographySettings() {
  if (!appState.settings) {
    appState.settings = { font: "lora", size: "14", spacing: "normal" };
  }

  const { font, size, spacing } = appState.settings;

  // Normalize size value if legacy keyword was stored
  const pixelSize = sizeMap[size] || (size ? (size.includes("px") ? size : `${size}px`) : "14px");
  const normalizedSelectVal = sizeMap[size] ? sizeMap[size].replace("px", "") : (size ? size.replace("px", "") : "14");

  if (elements.toolFont) elements.toolFont.value = font || "lora";
  if (elements.toolSize) elements.toolSize.value = normalizedSelectVal;
  if (elements.toolSpacing) elements.toolSpacing.value = spacing || "normal";

  const root = document.documentElement;
  root.style.setProperty("--sheet-font", fontMap[font] || fontMap.lora);
  root.style.setProperty("--sheet-font-size", pixelSize);

  const sp = spacingMap[spacing] || spacingMap.normal;
  root.style.setProperty("--sheet-line-height", sp.lineHeight);
  root.style.setProperty("--sheet-section-gap", sp.sectionGap);
}

// Initialization
function init() {
  applyLocalization();

  // Language Selector Listener
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      currentLang = e.target.value || "eng";
      saveLanguage();
      applyLocalization();
      renderFormInputs();
      renderPreview();
    });
  }

  applyTypographySettings();
  bindInputEvents();
  renderFormInputs();
  renderPreview();
  autoResizeAllTextareas();
  initResizer();

  // Fonts arriving after first paint change metrics; re-render once so the
  // A4 pagination and single-page auto-fit use final text measurements.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => renderPreview());
  }

  // Keep single-page templates fitted when the preview width changes
  // (resizing the window or dragging the sidebar re-wraps the text).
  let refitTimeoutId = null;
  window.addEventListener("resize", () => {
    clearTimeout(refitTimeoutId);
    refitTimeoutId = setTimeout(() => {
      if (!elements.previewWrapper) return;
      const pageEl = elements.previewWrapper.querySelector(".paper-sheet");
      if (pageEl && pageEl.querySelector(".sheet-fit")) autoFitSheet(pageEl);
    }, 150);
  });

  // Mobile-only pane switcher (Edit <-> Preview)
  initMobileViewSwitch();

  // 3-Dot Dropdown Interaction
  const navDropdown = document.getElementById("nav-dropdown");
  const btnDropdownToggle = document.getElementById("btn-dropdown-toggle");

  if (navDropdown && btnDropdownToggle) {
    btnDropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navDropdown.classList.toggle("active");
      btnDropdownToggle.setAttribute("aria-expanded", isOpen);
    });

    document.addEventListener("click", (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove("active");
        btnDropdownToggle.setAttribute("aria-expanded", "false");
      }
    });

    navDropdown.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        navDropdown.classList.remove("active");
        btnDropdownToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Theme Selector Listener
  if (elements.toolTheme) {
    elements.toolTheme.value = appState.theme || "warm-classic";
    elements.toolTheme.addEventListener("change", (e) => {
      appState.theme = e.target.value;
      saveState();
      renderPreview();
    });
  }

  // Typography Toolbar Listeners
  elements.toolFont.addEventListener("change", (e) => {
    appState.settings.font = e.target.value;
    saveState();
    applyTypographySettings();
    renderPreview();
  });

  elements.toolSize.addEventListener("change", (e) => {
    appState.settings.size = e.target.value;
    saveState();
    applyTypographySettings();
    renderPreview();
  });

  elements.toolSpacing.addEventListener("change", (e) => {
    appState.settings.spacing = e.target.value;
    saveState();
    applyTypographySettings();
    renderPreview();
  });

  // Header Alignment Listeners
  if (elements.headerAlignGroup) {
    elements.headerAlignGroup.querySelectorAll(".btn-align").forEach((btn) => {
      btn.addEventListener("click", () => {
        appState.headerAlign = btn.dataset.align || "center";
        saveState();
        renderHeaderAlignButtons();
        renderPreview();
      });
    });
  }

  // Photo upload handling
  elements.photoInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        appState.photo = loadEvt.target.result;
        saveState();
        renderPhotoControls();
        renderPreview();
      };
      reader.readAsDataURL(file);
    }
  });

  elements.btnRemovePhoto.addEventListener("click", () => {
    appState.photo = null;
    elements.photoInput.value = "";
    saveState();
    renderPhotoControls();
    renderPreview();
  });

  elements.btnAddExperience.addEventListener("click", () => {
    appState.experiences.push({
      id: "exp-" + Date.now(),
      role: "",
      company: "",
      date: "",
      description: "",
    });
    saveState();
    renderExperienceEditor();
    renderPreview();
    autoResizeAllTextareas();
  });

  elements.btnAddEducation.addEventListener("click", () => {
    appState.educations.push({
      id: "edu-" + Date.now(),
      degree: "",
      school: "",
      date: "",
    });
    saveState();
    renderEducationEditor();
    renderPreview();
  });

  elements.btnAddAchievement.addEventListener("click", () => {
    appState.achievements.push({
      id: "ach-" + Date.now(),
      title: "",
      issuer: "",
      date: "",
      description: "",
    });
    saveState();
    renderAchievementsEditor();
    renderPreview();
    autoResizeAllTextareas();
  });

  elements.btnAddSkill.addEventListener("click", () => {
    appState.skills.push({
      id: "sk-" + Date.now(),
      name: "",
      level: "",
    });
    saveState();
    renderSkillsEditor();
    renderPreview();
  });

  elements.btnSample.addEventListener("click", () => {
    appState = JSON.parse(JSON.stringify(sampleState));
    saveState();
    applyTypographySettings();
    renderFormInputs();
    renderPreview();
    autoResizeAllTextareas();
  });

  elements.btnReset.addEventListener("click", () => {
    if (confirm(t("cleanSheet"))) {
      appState = {
        theme: appState.theme || "warm-classic",
        headerAlign: "left",
        settings: {
          font: "lora",
          size: "14",
          spacing: "normal",
        },
        photo: null,
        fullName: "",
        headline: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        summary: "",
        experiences: [],
        educations: [],
        achievements: [],
        skills: [],
      };
      saveState();
      applyTypographySettings();
      renderFormInputs();
      renderPreview();
      autoResizeAllTextareas();
    }
  });

  elements.btnPrint.addEventListener("click", () => {
    saveState();
    window.print();
  });

  window.addEventListener("beforeunload", saveState);

  // JSON Export & Import Listeners
  if (elements.btnExportJson) {
    elements.btnExportJson.addEventListener("click", exportToJson);
  }

  if (elements.btnImportJson && elements.jsonFileInput) {
    elements.btnImportJson.addEventListener("click", () => {
      elements.jsonFileInput.click();
    });

    elements.jsonFileInput.addEventListener("change", handleJsonImport);
  }
}

// Bind live change handlers for single-value inputs
function bindInputEvents() {
  const fields = [
    "fullName",
    "headline",
    "email",
    "phone",
    "location",
    "website",
    "summary",
  ];

  fields.forEach((field) => {
    elements[field].addEventListener("input", (e) => {
      appState[field] = e.target.value;
      if (e.target.tagName.toLowerCase() === "textarea") {
        queueAutoResize(e.target);
      }
      scheduleUpdate();
    });
  });
}

// Photo Controls in Editor
function renderPhotoControls() {
  if (appState.photo) {
    elements.editorPhotoPreview.src = appState.photo;
    elements.editorPhotoPreview.style.display = "block";
    elements.btnRemovePhoto.style.display = "inline-flex";
  } else {
    elements.editorPhotoPreview.src = "";
    elements.editorPhotoPreview.style.display = "none";
    elements.btnRemovePhoto.style.display = "none";
  }
}

// Populate Inputs
function renderFormInputs() {
  if (elements.toolTheme) {
    elements.toolTheme.value = appState.theme || "warm-classic";
  }
  renderPhotoControls();
  elements.fullName.value = appState.fullName || "";
  elements.headline.value = appState.headline || "";
  elements.email.value = appState.email || "";
  elements.phone.value = appState.phone || "";
  elements.location.value = appState.location || "";
  elements.website.value = appState.website || "";
  elements.summary.value = appState.summary || "";

  renderExperienceEditor();
  renderEducationEditor();
  renderAchievementsEditor();
  renderSkillsEditor();
  autoResizeAllTextareas();
}

// Render Experience inputs
function renderExperienceEditor() {
  elements.experienceList.innerHTML = "";
  appState.experiences.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "dynamic-item";
    itemEl.innerHTML = `
      <div class="dynamic-item-header">
        <span class="item-badge">${t("expBadge")} #${index + 1}</span>
        <button class="delete-btn" title="${t("deleteRole")}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="form-grid">
        <div class="field-group full">
          <label>${t("position")}</label>
          <input type="text" class="inp-role" value="${escapeHtml(item.role)}" placeholder="${t("phRole")}">
        </div>
        <div class="field-group">
          <label>${t("company")}</label>
          <input type="text" class="inp-company" value="${escapeHtml(item.company)}" placeholder="${t("phCompany")}">
        </div>
        <div class="field-group">
          <label>${t("timePeriod")}</label>
          <input type="text" class="inp-date" value="${escapeHtml(item.date)}" placeholder="${t("phExpDate")}">
        </div>
        <div class="field-group full">
          <label>${t("keyResponsibilities")}</label>
          <textarea rows="3" class="inp-desc" placeholder="${t("phDesc")}">${escapeHtml(item.description)}</textarea>
        </div>
      </div>
    `;

    itemEl.querySelector(".delete-btn").addEventListener("click", () => {
      appState.experiences.splice(index, 1);
      saveState();
      renderExperienceEditor();
      renderPreview();
    });

    itemEl.querySelector(".inp-role").addEventListener("input", (e) => {
      item.role = e.target.value;
      scheduleUpdate();
    });
    itemEl.querySelector(".inp-company").addEventListener("input", (e) => {
      item.company = e.target.value;
      scheduleUpdate();
    });
    itemEl.querySelector(".inp-date").addEventListener("input", (e) => {
      item.date = e.target.value;
      scheduleUpdate();
    });
    const descInput = itemEl.querySelector(".inp-desc");
    descInput.addEventListener("input", (e) => {
      item.description = e.target.value;
      queueAutoResize(e.target);
      scheduleUpdate();
    });
    requestAnimationFrame(() => autoResizeTextarea(descInput));

    elements.experienceList.appendChild(itemEl);
  });
}

// Render Education inputs
function renderEducationEditor() {
  elements.educationList.innerHTML = "";
  appState.educations.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "dynamic-item";
    itemEl.innerHTML = `
      <div class="dynamic-item-header">
        <span class="item-badge">${t("eduBadge")} #${index + 1}</span>
        <button class="delete-btn" title="${t("deleteDegree")}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="form-grid">
        <div class="field-group full">
          <label>${t("degreeLabel")}</label>
          <input type="text" class="inp-degree" value="${escapeHtml(item.degree)}" placeholder="${t("phDegree")}">
        </div>
        <div class="field-group">
          <label>${t("institution")}</label>
          <input type="text" class="inp-school" value="${escapeHtml(item.school)}" placeholder="${t("phSchool")}">
        </div>
        <div class="field-group">
          <label>${t("yearDates")}</label>
          <input type="text" class="inp-date" value="${escapeHtml(item.date)}" placeholder="${t("phEduDate")}">
        </div>
      </div>
    `;

    itemEl.querySelector(".delete-btn").addEventListener("click", () => {
      appState.educations.splice(index, 1);
      saveState();
      renderEducationEditor();
      renderPreview();
    });

    itemEl.querySelector(".inp-degree").addEventListener("input", (e) => {
      item.degree = e.target.value;
      scheduleUpdate();
    });
    itemEl.querySelector(".inp-school").addEventListener("input", (e) => {
      item.school = e.target.value;
      scheduleUpdate();
    });
    itemEl.querySelector(".inp-date").addEventListener("input", (e) => {
      item.date = e.target.value;
      scheduleUpdate();
    });

    elements.educationList.appendChild(itemEl);
  });
}

// Render Achievements inputs
function renderAchievementsEditor() {
  elements.achievementsList.innerHTML = "";
  if (!appState.achievements) appState.achievements = [];

  appState.achievements.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "dynamic-item";
    itemEl.innerHTML = `
      <div class="dynamic-item-header">
        <span class="item-badge">${t("achBadge")} #${index + 1}</span>
        <button class="delete-btn" title="${t("deleteHonor")}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="form-grid">
        <div class="field-group full">
          <label>${t("awardTitle")}</label>
          <input type="text" class="inp-ach-title" value="${escapeHtml(item.title || "")}" placeholder="${t("phAchTitle")}">
        </div>
        <div class="field-group">
          <label>${t("issuerLabel")}</label>
          <input type="text" class="inp-ach-issuer" value="${escapeHtml(item.issuer || "")}" placeholder="${t("phIssuer")}">
        </div>
        <div class="field-group">
          <label>${t("yearDate")}</label>
          <input type="text" class="inp-ach-date" value="${escapeHtml(item.date || "")}" placeholder="${t("phAchDate")}">
        </div>
        <div class="field-group full">
          <label>${t("shortDescription")}</label>
          <textarea rows="2" class="inp-ach-desc" placeholder="${t("phAchDesc")}">${escapeHtml(item.description || "")}</textarea>
        </div>
      </div>
    `;

    itemEl.querySelector(".delete-btn").addEventListener("click", () => {
      appState.achievements.splice(index, 1);
      saveState();
      renderAchievementsEditor();
      renderPreview();
    });

    itemEl.querySelector(".inp-ach-title").addEventListener("input", (e) => {
      item.title = e.target.value;
      scheduleUpdate();
    });
    itemEl.querySelector(".inp-ach-issuer").addEventListener("input", (e) => {
      item.issuer = e.target.value;
      scheduleUpdate();
    });
    itemEl.querySelector(".inp-ach-date").addEventListener("input", (e) => {
      item.date = e.target.value;
      scheduleUpdate();
    });
    const descInput = itemEl.querySelector(".inp-ach-desc");
    descInput.addEventListener("input", (e) => {
      item.description = e.target.value;
      queueAutoResize(e.target);
      scheduleUpdate();
    });
    requestAnimationFrame(() => autoResizeTextarea(descInput));

    elements.achievementsList.appendChild(itemEl);
  });
}

// Render Skills inputs
function renderSkillsEditor() {
  elements.skillsList.innerHTML = "";
  if (!appState.skills) appState.skills = [];

  appState.skills.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "skill-row";
    itemEl.innerHTML = `
      <input type="text" class="inp-skill-name" value="${escapeHtml(item.name || "")}" placeholder="${t("phSkill")}">
      <input type="text" class="inp-skill-level" value="${escapeHtml(item.level || "")}" placeholder="${t("phLevel")}">
      <button class="delete-btn" title="${t("deleteSkill")}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;

    itemEl.querySelector(".delete-btn").addEventListener("click", () => {
      appState.skills.splice(index, 1);
      saveState();
      renderSkillsEditor();
      renderPreview();
    });

    itemEl.querySelector(".inp-skill-name").addEventListener("input", (e) => {
      item.name = e.target.value;
      scheduleUpdate();
    });

    itemEl.querySelector(".inp-skill-level").addEventListener("input", (e) => {
      item.level = e.target.value;
      scheduleUpdate();
    });

    elements.skillsList.appendChild(itemEl);
  });
}

// ==========================================================
// THEME REGISTRY & PREVIEW RENDERERS
// Designed for modular addition of future templates
// ==========================================================
const THEMES = {
  "warm-classic": {
    id: "warm-classic",
    name: "Warm Paper (Classic)",
    render: renderWarmClassic,
  },
  "modern-navy": {
    id: "modern-navy",
    name: "Executive Navy (Split)",
    render: renderModernNavy,
  },
  "mono-split": {
    id: "mono-split",
    name: "Minimal Mono (Grayscale)",
    render: renderMonoSplit,
  },
};

function renderPreview() {
  const previewWrapper = elements.previewWrapper;
  if (!previewWrapper) return;
  previewWrapper.innerHTML = "";

  const themeKey = appState.theme || "warm-classic";
  const theme = THEMES[themeKey] || THEMES["warm-classic"];
  theme.render(previewWrapper);

// Single-page templates (Navy / Mono) have no pagination: shrink their
// content wrapper so overflow never spills/clips on screen or in print.
const singlePage = previewWrapper.querySelector(".paper-sheet");
if (singlePage && singlePage.querySelector(".sheet-fit")) autoFitSheet(singlePage);
}

// A4 sheet nominal height in px (297mm @ 96dpi, kept slightly under to avoid
// 0.5px rounding overflow in print). Must match .paper-sheet min-height.
const A4_SHEET_HEIGHT = 1122;
// Exact print width of the sheet (210mm @ 96dpi) — matches @media print.
const A4_PRINT_WIDTH = 794;

let fitProbeHost = null;
function getFitProbeHost() {
  if (!fitProbeHost) {
    fitProbeHost = document.createElement("div");
    fitProbeHost.style.cssText =
      "position:absolute;left:-99999px;top:0;visibility:hidden;pointer-events:none;";
    document.body.appendChild(fitProbeHost);
  }
  return fitProbeHost;
}

// Measure how tall a single-page template renders at the exact print width,
// regardless of how wide the on-screen preview pane currently is (text wraps
// differently per width, so the screen height is not the print height).
function measureSheetHeightAtPrintWidth(pageEl) {
  const host = getFitProbeHost();
  const clone = pageEl.cloneNode(true);
  clone.style.width = A4_PRINT_WIDTH + "px";
  const cloneFit = clone.querySelector(".sheet-fit");
  if (cloneFit) {
    cloneFit.style.transform = "";
    cloneFit.style.width = "";
    cloneFit.style.transformOrigin = "";
  }
  host.innerHTML = "";
  host.appendChild(clone);
  return cloneFit ? cloneFit.scrollHeight : clone.scrollHeight;
}

// Fit-to-page for fixed single-page templates: scale the content wrapper down
// (transform does not reflow, so wrapping stays identical while shrinking)
// until it fits one sheet both on screen and at print layout width.
function autoFitSheet(pageEl) {
  const fitWrap = pageEl.querySelector(".sheet-fit");
  if (!fitWrap) return;

  fitWrap.style.transform = "";
  fitWrap.style.width = "";
  fitWrap.style.transformOrigin = "";

  const printHeight = measureSheetHeightAtPrintWidth(pageEl);
  const screenHeight = fitWrap.scrollHeight;
  if (printHeight <= A4_SHEET_HEIGHT + 1 && screenHeight <= A4_SHEET_HEIGHT + 1) return;

  // Floor is a last resort so extreme dumps of text never re-clip the page.
  const scale = Math.max(
    0.25,
    Math.min(
      1,
      Math.min(A4_SHEET_HEIGHT / printHeight, A4_SHEET_HEIGHT / screenHeight) * 0.995
    )
  );

  fitWrap.style.transformOrigin = "top left";
  fitWrap.style.transform = `scale(${scale})`;
  fitWrap.style.width = `${100 / scale}%`;
}

// 1. Warm Paper (Classic Multi-Page Engine)
function renderWarmClassic(previewWrapper) {
  // 1. Build Visual Content Units
  const blocks = [];

  // Header block (Always on Page 1)
  const headerEl = document.createElement("div");
  headerEl.className = "sheet-header-block";
  const contactParts = [];
  if (appState.email) contactParts.push(`<span>${escapeHtml(appState.email)}</span>`);
  if (appState.phone) contactParts.push(`<span>${escapeHtml(appState.phone)}</span>`);
  if (appState.location) contactParts.push(`<span>${escapeHtml(appState.location)}</span>`);
  if (appState.website) contactParts.push(`<span>${escapeHtml(appState.website)}</span>`);
  const contactHtml = contactParts.join('<span class="sep">•</span>');

  const textBlockHtml = `
    <div class="sheet-header-text">
      <h1 class="sheet-name">${escapeHtml(appState.fullName || t("yourName"))}</h1>
      ${appState.headline ? `<p class="sheet-headline">${escapeHtml(appState.headline)}</p>` : ""}
      ${contactHtml ? `<div class="sheet-contact">${contactHtml}</div>` : ""}
    </div>
  `;

  const alignClass = `align-${appState.headerAlign || "left"}`;

  if (appState.photo) {
    headerEl.innerHTML = `
      <header class="sheet-header has-photo ${alignClass}">
        <img class="sheet-photo" src="${appState.photo}" alt="Profile portrait" decoding="async">
        ${textBlockHtml}
      </header>
      <div class="sheet-divider"></div>
    `;
  } else {
    headerEl.innerHTML = `
      <header class="sheet-header ${alignClass}">
        ${textBlockHtml}
      </header>
      <div class="sheet-divider"></div>
    `;
  }
  blocks.push({ type: "header", el: headerEl });

  // About / Summary Block
  if (appState.summary && appState.summary.trim()) {
    const summaryEl = document.createElement("section");
    summaryEl.className = "sheet-section sheet-summary-section";
    summaryEl.innerHTML = `
      <p class="sheet-summary">${escapeHtml(appState.summary)}</p>
    `;
    blocks.push({ type: "section", section: "summary", el: summaryEl });
  }

  // Experience Block(s)
  const validExp = (appState.experiences || []).filter(
    (e) => (e.role && e.role.trim()) || (e.company && e.company.trim()) || (e.description && e.description.trim())
  );
  if (validExp.length > 0) {
    const titleEl = document.createElement("h3");
    titleEl.className = "sheet-section-title";
    titleEl.textContent = t("profExperience");
    blocks.push({ type: "section-title", section: "experience", titleText: t("profExperience"), el: titleEl });

    validExp.forEach((exp) => {
      const entryEl = document.createElement("div");
      entryEl.className = "sheet-entry";
      entryEl.innerHTML = `
        <div class="sheet-entry-head">
          <div>
            <span class="sheet-entry-title">${escapeHtml(exp.role || t("roleFallback"))}</span>
            ${exp.company ? `<span class="sheet-entry-company">— ${escapeHtml(exp.company)}</span>` : ""}
          </div>
          ${exp.date ? `<span class="sheet-entry-date">${escapeHtml(exp.date)}</span>` : ""}
        </div>
        ${exp.description ? `<p class="sheet-entry-desc">${escapeHtml(exp.description)}</p>` : ""}
      `;
      blocks.push({ type: "item", section: "experience", titleText: "Professional Experience", el: entryEl });
    });
  }

  // Education Block(s)
  const validEdu = (appState.educations || []).filter(
    (e) => (e.degree && e.degree.trim()) || (e.school && e.school.trim())
  );
  if (validEdu.length > 0) {
    const titleEl = document.createElement("h3");
    titleEl.className = "sheet-section-title";
    titleEl.textContent = t("educationCredentials");
    blocks.push({ type: "section-title", section: "education", titleText: t("educationCredentials"), el: titleEl });

    validEdu.forEach((edu) => {
      const entryEl = document.createElement("div");
      entryEl.className = "sheet-entry";
      entryEl.innerHTML = `
        <div class="sheet-entry-head">
          <div>
            <span class="sheet-entry-title">${escapeHtml(edu.degree || t("degreeFallback"))}</span>
            ${edu.school ? `<span class="sheet-entry-company">— ${escapeHtml(edu.school)}</span>` : ""}
          </div>
          ${edu.date ? `<span class="sheet-entry-date">${escapeHtml(edu.date)}</span>` : ""}
        </div>
      `;
      blocks.push({ type: "item", section: "education", titleText: "Education & Credentials", el: entryEl });
    });
  }

  // Achievements Block(s)
  const validAch = (appState.achievements || []).filter(
    (a) => (a.title && a.title.trim()) || (a.issuer && a.issuer.trim())
  );
  if (validAch.length > 0) {
    const titleEl = document.createElement("h3");
    titleEl.className = "sheet-section-title";
    titleEl.textContent = t("honorsAchievements");
    blocks.push({ type: "section-title", section: "achievements", titleText: t("honorsAchievements"), el: titleEl });

    validAch.forEach((ach) => {
      const entryEl = document.createElement("div");
      entryEl.className = "sheet-entry";
      entryEl.innerHTML = `
        <div class="sheet-entry-head">
          <div>
            <span class="sheet-entry-title">${escapeHtml(ach.title || t("honorFallback"))}</span>
            ${ach.issuer ? `<span class="sheet-entry-company">— ${escapeHtml(ach.issuer)}</span>` : ""}
          </div>
          ${ach.date ? `<span class="sheet-entry-date">${escapeHtml(ach.date)}</span>` : ""}
        </div>
        ${ach.description ? `<p class="sheet-entry-desc">${escapeHtml(ach.description)}</p>` : ""}
      `;
      blocks.push({ type: "item", section: "achievements", titleText: "Honors & Achievements", el: entryEl });
    });
  }

  // Skills Block
  const validSkills = (appState.skills || []).filter((s) => s.name && s.name.trim().length > 0);
  if (validSkills.length > 0) {
    const skillsSec = document.createElement("section");
    skillsSec.className = "sheet-section";
    const titleEl = document.createElement("h3");
    titleEl.className = "sheet-section-title";
    titleEl.textContent = t("skillsCompetencies");
    skillsSec.appendChild(titleEl);

    const skillsWrap = document.createElement("div");
    skillsWrap.className = "sheet-skills";
    validSkills.forEach((skill) => {
      const pill = document.createElement("span");
      pill.className = "sheet-skill-pill";
      pill.innerHTML = `
        <span class="sheet-skill-name">${escapeHtml(skill.name.trim())}</span>
        ${skill.level && skill.level.trim() ? `<span class="sheet-skill-level">${escapeHtml(skill.level.trim())}</span>` : ""}
      `;
      skillsWrap.appendChild(pill);
    });
    skillsSec.appendChild(skillsWrap);
    blocks.push({ type: "section", section: "skills", titleText: t("skillsCompetencies"), el: skillsSec });
  }

  // Multi-Page Layout Flow Engine
  // NOTE: The screen limit must match the PRINT layout, not the screen padding.
  // In @media print the sheet is 297mm tall with 20mm top + 15mm bottom padding,
  // so printable content is only ~262mm (~990px). Allowing content up to the
  // screen padding limit pushed overflow onto a blank page when printing.
  const A4_PAGE_BOTTOM_LIMIT = 985;

  function createNewPage() {
    const page = document.createElement("div");
    page.className = "paper-sheet";
    previewWrapper.appendChild(page);
    return page;
  }

  let currentPage = createNewPage();

  blocks.forEach((block) => {
    currentPage.appendChild(block.el);

    const pageRect = currentPage.getBoundingClientRect();
    const elRect = block.el.getBoundingClientRect();
    const relativeBottom = elRect.bottom - pageRect.top;

    if (relativeBottom > A4_PAGE_BOTTOM_LIMIT && currentPage.children.length > 1) {
      const prevChild = block.el.previousElementSibling;
      const wasTitle = prevChild && prevChild.classList.contains("sheet-section-title");

      currentPage.removeChild(block.el);

      if (wasTitle) {
        currentPage.removeChild(prevChild);
      }

      currentPage = createNewPage();

      if (wasTitle) {
        currentPage.appendChild(prevChild);
      } else if (block.type === "item" && block.titleText) {
        const contTitle = document.createElement("h3");
        contTitle.className = "sheet-section-title";
        contTitle.textContent = `${block.titleText} ${t("contSuffix")}`;
        currentPage.appendChild(contTitle);
      }

      currentPage.appendChild(block.el);
    }
  });
}

// 2. Executive Navy (Two-Column Split Layout Template)
function renderModernNavy(previewWrapper) {
  const validExp = (appState.experiences || []).filter(
    (e) => (e.role && e.role.trim()) || (e.company && e.company.trim()) || (e.description && e.description.trim())
  );
  const validEdu = (appState.educations || []).filter(
    (e) => (e.degree && e.degree.trim()) || (e.school && e.school.trim())
  );
  const validAch = (appState.achievements || []).filter(
    (a) => (a.title && a.title.trim()) || (a.issuer && a.issuer.trim())
  );
  const validSkills = (appState.skills || []).filter((s) => s.name && s.name.trim().length > 0);

  const page = document.createElement("div");
  page.className = "paper-sheet theme-modern-navy";

  // Left Sidebar
  const sidebar = document.createElement("aside");
  sidebar.className = "navy-sidebar";

  if (appState.photo) {
    const photoWrap = document.createElement("div");
    photoWrap.className = "navy-photo-wrap";
    photoWrap.innerHTML = `<img src="${appState.photo}" class="navy-photo" alt="Profile photo" decoding="async">`;
    sidebar.appendChild(photoWrap);
  }

  // Sidebar: Contact
  const contactItems = [];
  if (appState.phone) {
    contactItems.push(`
      <div class="navy-contact-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <span>${escapeHtml(appState.phone)}</span>
      </div>
    `);
  }
  if (appState.email) {
    contactItems.push(`
      <div class="navy-contact-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        <span>${escapeHtml(appState.email)}</span>
      </div>
    `);
  }
  if (appState.location) {
    contactItems.push(`
      <div class="navy-contact-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <span>${escapeHtml(appState.location)}</span>
      </div>
    `);
  }
  if (appState.website) {
    contactItems.push(`
      <div class="navy-contact-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        <span>${escapeHtml(appState.website)}</span>
      </div>
    `);
  }

  if (contactItems.length > 0) {
    const contactSec = document.createElement("div");
    contactSec.className = "navy-side-section";
    contactSec.innerHTML = `
      <h4 class="navy-side-title">${t("contactTitle")}</h4>
      <div class="navy-contact-list">${contactItems.join("")}</div>
    `;
    sidebar.appendChild(contactSec);
  }

  // Sidebar: Education
  if (validEdu.length > 0) {
    const eduSec = document.createElement("div");
    eduSec.className = "navy-side-section";
    eduSec.innerHTML = `
      <h4 class="navy-side-title">${t("educationTitle")}</h4>
      <div class="navy-side-items">
        ${validEdu.map((edu) => `
          <div class="navy-edu-item">
            ${edu.date ? `<div class="navy-side-date">${escapeHtml(edu.date)}</div>` : ""}
            <div class="navy-side-school">${escapeHtml(edu.school || t("universityFallback"))}</div>
            ${edu.degree ? `<div class="navy-side-degree">• ${escapeHtml(edu.degree)}</div>` : ""}
          </div>
        `).join("")}
      </div>
    `;
    sidebar.appendChild(eduSec);
  }

  // Sidebar: Skills
  if (validSkills.length > 0) {
    const skillsSec = document.createElement("div");
    skillsSec.className = "navy-side-section";
    skillsSec.innerHTML = `
      <h4 class="navy-side-title">${t("skillsTitle")}</h4>
      <ul class="navy-skills-list">
        ${validSkills.map((sk) => `
          <li class="navy-skill-item">
            <span class="navy-bullet">•</span>
            <span class="navy-skill-name">${escapeHtml(sk.name)}</span>
            ${sk.level ? `<span class="navy-skill-lvl">(${escapeHtml(sk.level)})</span>` : ""}
          </li>
        `).join("")}
      </ul>
    `;
    sidebar.appendChild(skillsSec);
  }

  const fitWrap = document.createElement("div");
  fitWrap.className = "sheet-fit";
  fitWrap.appendChild(sidebar);

  // Right Main Column
  const main = document.createElement("main");
  main.className = "navy-main";

  // Main Header (Name, Headline, Decorative Underline)
  const header = document.createElement("header");
  header.className = "navy-header";
  header.innerHTML = `
    <h1 class="navy-name">${escapeHtml(appState.fullName || t("yourName"))}</h1>
    ${appState.headline ? `<div class="navy-headline">${escapeHtml(appState.headline)}</div>` : ""}
    <div class="navy-header-bar"></div>
  `;
  main.appendChild(header);

  // Profile
  if (appState.summary && appState.summary.trim()) {
    const profileSec = document.createElement("section");
    profileSec.className = "navy-main-section";
    profileSec.innerHTML = `
      <h3 class="navy-main-title">${t("profileTitle")}</h3>
      <p class="navy-profile-desc">${escapeHtml(appState.summary)}</p>
    `;
    main.appendChild(profileSec);
  }

  // Work Experience Timeline
  if (validExp.length > 0) {
    const expSec = document.createElement("section");
    expSec.className = "navy-main-section";
    expSec.innerHTML = `
      <h3 class="navy-main-title">${t("workExperience")}</h3>
      <div class="navy-timeline">
        ${validExp.map((exp) => `
          <div class="navy-timeline-item">
            <div class="navy-tl-header">
              <span class="navy-tl-company">${escapeHtml(exp.company || t("companyFallback"))}</span>
              <span class="navy-tl-date">${escapeHtml(exp.date || "")}</span>
            </div>
            <div class="navy-tl-role">${escapeHtml(exp.role || "")}</div>
            ${exp.description ? `<p class="navy-tl-desc">${escapeHtml(exp.description)}</p>` : ""}
          </div>
        `).join("")}
      </div>
    `;
    main.appendChild(expSec);
  }

  // Honors / Achievements Grid (Reference Block)
  if (validAch.length > 0) {
    const achSec = document.createElement("section");
    achSec.className = "navy-main-section";
    achSec.innerHTML = `
      <h3 class="navy-main-title">Honors & Achievements</h3>
      <div class="navy-achievements-grid">
        ${validAch.map((ach) => `
          <div class="navy-ach-item">
            <div class="navy-ach-title">${escapeHtml(ach.title || "")}</div>
            <div class="navy-ach-issuer">${escapeHtml(ach.issuer || "")} ${ach.date ? `(${escapeHtml(ach.date)})` : ""}</div>
            ${ach.description ? `<p class="navy-ach-desc">${escapeHtml(ach.description)}</p>` : ""}
          </div>
        `).join("")}
      </div>
    `;
    main.appendChild(achSec);
  }

  fitWrap.appendChild(main);
  page.appendChild(fitWrap);
  previewWrapper.appendChild(page);
}

// 3. Minimal Mono (Grayscale Split Layout Template)
function renderMonoSplit(previewWrapper) {
  const validExp = (appState.experiences || []).filter(
    (e) => (e.role && e.role.trim()) || (e.company && e.company.trim()) || (e.description && e.description.trim())
  );
  const validEdu = (appState.educations || []).filter(
    (e) => (e.degree && e.degree.trim()) || (e.school && e.school.trim())
  );
  const validSkills = (appState.skills || []).filter((s) => s.name && s.name.trim().length > 0);

  const page = document.createElement("div");
  page.className = "paper-sheet theme-mono-split";

  // ---- Top band: grayscale photo panel + name header ----
  const top = document.createElement("div");
  top.className = "mono-top";

  if (appState.photo) {
    top.innerHTML = `
      <div class="mono-photo-panel">
        <img src="${appState.photo}" class="mono-photo" alt="Profile photo" decoding="async">
      </div>
    `;
  } else {
    const initials = (appState.fullName || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
    top.innerHTML = `
      <div class="mono-photo-panel">
        <span class="mono-photo-initials">${escapeHtml(initials)}</span>
      </div>
    `;
  }

  const header = document.createElement("header");
  header.className = "mono-header";
  header.innerHTML = `
    <h1 class="mono-name">${escapeHtml(appState.fullName || t("yourName"))}</h1>
    ${appState.headline ? `<div class="mono-headline">${escapeHtml(appState.headline)}</div>` : ""}
    <div class="mono-header-bar"></div>
  `;
  top.appendChild(header);

  const fitWrap = document.createElement("div");
  fitWrap.className = "sheet-fit";
  fitWrap.appendChild(top);

  // ---- Two-column body ----
  const body = document.createElement("div");
  body.className = "mono-body";

  // Left Sidebar: Contact / Skills / Education
  const side = document.createElement("aside");
  side.className = "mono-side";

  const monoIcons = {
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
  };

  const contactItems = [];
  if (appState.phone) contactItems.push({ icon: monoIcons.phone, text: appState.phone });
  if (appState.email) contactItems.push({ icon: monoIcons.mail, text: appState.email });
  if (appState.location) contactItems.push({ icon: monoIcons.pin, text: appState.location });
  if (appState.website) contactItems.push({ icon: monoIcons.globe, text: appState.website });

  if (contactItems.length > 0) {
    side.innerHTML += `
      <section class="mono-section">
        <h3 class="mono-title">${t("contactTitle")}</h3>
        <div class="mono-contact-list">
          ${contactItems.map((c) => `
            <div class="mono-contact-item">
              ${c.icon}
              <span>${escapeHtml(c.text)}</span>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (validSkills.length > 0) {
    side.innerHTML += `
      <section class="mono-section">
        <h3 class="mono-title">${t("skillsTitle")}</h3>
        <ul class="mono-list">
          ${validSkills.map((sk) => `
            <li>${escapeHtml(sk.name.trim())}${sk.level && sk.level.trim() ? ` <span class="mono-skill-lvl">(${escapeHtml(sk.level.trim())})</span>` : ""}</li>
          `).join("")}
        </ul>
      </section>
    `;
  }

  if (validEdu.length > 0) {
    side.innerHTML += `
      <section class="mono-section">
        <h3 class="mono-title">${t("educationTitle")}</h3>
        <div class="mono-edu-list">
          ${validEdu.map((edu) => `
            <div class="mono-edu-item">
              <div class="mono-edu-school">${escapeHtml(edu.school || t("universityFallback"))}</div>
              ${edu.date ? `<div class="mono-edu-date">${escapeHtml(edu.date)}</div>` : ""}
              ${edu.degree ? `<div class="mono-edu-degree">${escapeHtml(edu.degree)}</div>` : ""}
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  body.appendChild(side);

  // Right Main Column: Summary / Experience / Achievements
  const main = document.createElement("main");
  main.className = "mono-main";

  if (appState.summary && appState.summary.trim()) {
    main.innerHTML += `
      <section class="mono-section">
        <h3 class="mono-title">${t("profileTitle")}</h3>
        <p class="mono-summary">${escapeHtml(appState.summary)}</p>
      </section>
    `;
  }

  if (validExp.length > 0) {
    main.innerHTML += `
      <section class="mono-section">
        <h3 class="mono-title">${t("workExperience")}</h3>
        ${validExp.map((exp) => `
          <div class="mono-exp-item">
            <div class="mono-exp-head">
              <span class="mono-exp-role">${escapeHtml(exp.role || "Role")}</span>
              ${exp.date ? `<span class="mono-exp-date">${escapeHtml(exp.date)}</span>` : ""}
            </div>
            ${exp.company ? `<div class="mono-exp-company">${escapeHtml(exp.company)}</div>` : ""}
            ${exp.description && exp.description.trim() ? `
              <ul class="mono-list mono-exp-desc">
                ${splitDescriptionLines(exp.description).map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
              </ul>
            ` : ""}
          </div>
        `).join("")}
      </section>
    `;
  }

  const validAch = (appState.achievements || []).filter(
    (a) => (a.title && a.title.trim()) || (a.issuer && a.issuer.trim())
  );
  if (validAch.length > 0) {
    main.innerHTML += `
      <section class="mono-section">
        <h3 class="mono-title">${t("honorsTitle")}</h3>
        <ul class="mono-list">
          ${validAch.map((ach) => `
            <li>
              <span class="mono-ach-title">${escapeHtml(ach.title || t("honorFallback"))}</span>${ach.issuer ? ` — ${escapeHtml(ach.issuer)}` : ""}${ach.date ? ` (${escapeHtml(ach.date)})` : ""}
              ${ach.description && ach.description.trim() ? `<div class="mono-ach-desc">${escapeHtml(ach.description)}</div>` : ""}
            </li>
          `).join("")}
        </ul>
      </section>
    `;
  }

  body.appendChild(main);
  fitWrap.appendChild(body);
  page.appendChild(fitWrap);
  previewWrapper.appendChild(page);
}

// Mobile view switcher: toggles between the editor and the preview pane
// on stacked layouts (<= 980px), so users aren't forced to scroll for ages.
function initMobileViewSwitch() {
  const switchEl = document.getElementById("mobile-view-switch");
  const workspaceEl = document.querySelector(".workspace");
  if (!switchEl || !workspaceEl) return;

  const btns = switchEl.querySelectorAll(".switch-btn");
  const switchQuery = window.matchMedia("(max-width: 980px)");
  let activeView = "editor";

  const apply = () => {
    if (!switchQuery.matches) {
      // Desktop layout always shows both panes
      workspaceEl.classList.remove("only-editor", "only-preview");
      btns.forEach((b) => {
        b.classList.toggle("active", b.dataset.view === activeView);
        b.setAttribute("aria-selected", String(b.dataset.view === activeView));
      });
      return;
    }
    workspaceEl.classList.toggle("only-editor", activeView === "editor");
    workspaceEl.classList.toggle("only-preview", activeView === "preview");
    btns.forEach((b) => {
      b.classList.toggle("active", b.dataset.view === activeView);
      b.setAttribute("aria-selected", String(b.dataset.view === activeView));
    });
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeView = btn.dataset.view || "editor";
      apply();
      // land at the top of the newly revealed pane
      window.scrollTo(0, 0);
    });
  });

  const syncAcrossBreakpoint = () => apply();

  if (typeof switchQuery.addEventListener === "function") {
    switchQuery.addEventListener("change", syncAcrossBreakpoint);
  } else if (typeof switchQuery.addListener === "function") {
    switchQuery.addListener(syncAcrossBreakpoint); // older Safari
  }

  apply();
}

// Draggable Splitter Implementation
function initResizer() {  const resizer = document.getElementById("pane-resizer");
  const editorPane = document.querySelector(".editor-pane");
  const workspace = document.querySelector(".workspace");
  if (!resizer || !editorPane || !workspace) return;

  const savedWidth = localStorage.getItem("warm_paper_sidebar_width");
  if (savedWidth) {
    workspace.style.setProperty("--sidebar-width", `${savedWidth}px`);
  }

  let isDragging = false;

  resizer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    document.body.classList.add("is-resizing");
    resizer.classList.add("is-active");

    // Measure once per drag instead of forcing a layout read on every mousemove.
    const workspaceRect = workspace.getBoundingClientRect();

    const onMouseMove = (moveEvent) => {
      if (!isDragging) return;
      const pointerX = moveEvent.clientX - workspaceRect.left;

      const minW = 320;
      const maxW = Math.min(workspaceRect.width - 360, 780);
      const clampedWidth = Math.max(minW, Math.min(pointerX, maxW));

      workspace.style.setProperty("--sidebar-width", `${clampedWidth}px`);
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        document.body.classList.remove("is-resizing");
        resizer.classList.remove("is-active");

        const currentWidth = parseInt(getComputedStyle(editorPane).width, 10);
        if (currentWidth) {
          localStorage.setItem("warm_paper_sidebar_width", currentWidth);
        }
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

// Helpers
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Split a multi-line description into clean bullet lines (strips leading "•")
function splitDescriptionLines(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean);
}

// Normalize and sanitize resume state structure
function normalizeResumeState(data) {
  if (!data || typeof data !== "object") {
    return JSON.parse(JSON.stringify(sampleState));
  }

  const validSettings = data.settings && typeof data.settings === "object" ? data.settings : {};
  const settings = {
    font: validSettings.font || "lora",
    size: validSettings.size ? String(validSettings.size).replace("px", "") : "14",
    spacing: validSettings.spacing || "normal",
  };

  const experiences = Array.isArray(data.experiences)
    ? data.experiences.map((exp, idx) => ({
        id: exp.id || "exp-" + Date.now() + "-" + idx,
        role: String(exp.role || ""),
        company: String(exp.company || ""),
        date: String(exp.date || ""),
        description: String(exp.description || ""),
      }))
    : [];

  const educations = Array.isArray(data.educations)
    ? data.educations.map((edu, idx) => ({
        id: edu.id || "edu-" + Date.now() + "-" + idx,
        degree: String(edu.degree || ""),
        school: String(edu.school || ""),
        date: String(edu.date || ""),
      }))
    : [];

  const achievements = Array.isArray(data.achievements)
    ? data.achievements.map((ach, idx) => ({
        id: ach.id || "ach-" + Date.now() + "-" + idx,
        title: String(ach.title || ""),
        issuer: String(ach.issuer || ""),
        date: String(ach.date || ""),
        description: String(ach.description || ""),
      }))
    : [];

  let skills = [];
  if (Array.isArray(data.skills)) {
    skills = data.skills.map((s, idx) => {
      if (typeof s === "string") {
        return { id: "sk-" + Date.now() + "-" + idx, name: s, level: "" };
      }
      return {
        id: s.id || "sk-" + Date.now() + "-" + idx,
        name: String(s.name || ""),
        level: String(s.level || ""),
      };
    });
  } else if (typeof data.skills === "string") {
    skills = data.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s, idx) => ({
        id: "sk-" + Date.now() + "-" + idx,
        name: s,
        level: "",
      }));
  }

  return {
    theme: ["warm-classic", "modern-navy", "mono-split"].includes(data.theme) ? data.theme : "warm-classic",
    headerAlign: HEADER_ALIGNMENT,
    settings,
    photo: typeof data.photo === "string" ? data.photo : null,
    fullName: String(data.fullName || ""),
    headline: String(data.headline || ""),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    location: String(data.location || ""),
    website: String(data.website || ""),
    summary: String(data.summary || ""),
    experiences,
    educations,
    achievements,
    skills,
  };
}

// Export resume data to JSON file
function exportToJson() {
  try {
    const dataStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([dataStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = (appState.fullName || "resume")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "resume";
    link.href = url;
    link.download = `${safeName}-cv.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Export failed:", err);
    alert(t("exportFail"));
  }
}

// Import resume data from JSON file
function handleJsonImport(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (loadEvt) => {
    try {
      const parsed = JSON.parse(loadEvt.target.result);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error(t("invalidFormat"));
      }

      appState = normalizeResumeState(parsed);
      saveState();
      applyTypographySettings();
      renderFormInputs();
      renderPreview();
      autoResizeAllTextareas();
    } catch (err) {
      console.error("JSON Import Error:", err);
      alert(t("importFail") + (err.message || t("invalidFormat")));
    } finally {
      e.target.value = "";
    }
  };

  reader.onerror = () => {
    alert(t("readFail"));
    e.target.value = "";
  };

  reader.readAsText(file);
}

function saveState() {
  try {
    localStorage.setItem("warm_paper_cv_state", JSON.stringify(appState));
  } catch (e) {
    // ignore
  }
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem("warm_paper_cv_state");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// Start application
document.addEventListener("DOMContentLoaded", init);

