const STORAGE_KEY = "app-settings";

const DEFAULT_SETTINGS = {
  displayName: "",
  email: "",
  timezone: "UTC",
  theme: "light",
  language: "en",
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  publicProfile: false,
  dataRetention: "90",
};

const form = document.getElementById("settings-form");
const resetBtn = document.getElementById("reset-btn");
const toast = document.getElementById("toast");

function getSettingsFromForm() {
  const formData = new FormData(form);
  return {
    displayName: formData.get("displayName").trim(),
    email: formData.get("email").trim(),
    timezone: formData.get("timezone"),
    theme: formData.get("theme"),
    language: formData.get("language"),
    emailNotifications: formData.get("emailNotifications") === "on",
    pushNotifications: formData.get("pushNotifications") === "on",
    weeklyDigest: formData.get("weeklyDigest") === "on",
    publicProfile: formData.get("publicProfile") === "on",
    dataRetention: formData.get("dataRetention"),
  };
}

function applySettingsToForm(settings) {
  form.displayName.value = settings.displayName;
  form.email.value = settings.email;
  form.timezone.value = settings.timezone;
  form.language.value = settings.language;
  form.dataRetention.value = settings.dataRetention;

  const themeRadio = form.querySelector(`input[name="theme"][value="${settings.theme}"]`);
  if (themeRadio) themeRadio.checked = true;

  form.emailNotifications.checked = settings.emailNotifications;
  form.pushNotifications.checked = settings.pushNotifications;
  form.weeklyDigest.checked = settings.weeklyDigest;
  form.publicProfile.checked = settings.publicProfile;
}

function applyTheme(theme) {
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  document.documentElement.setAttribute("data-theme", resolved);
}

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function showError(fieldName, message) {
  const input = form.elements[fieldName];
  const errorEl = document.querySelector(`[data-error-for="${fieldName}"]`);
  input.classList.add("invalid");
  errorEl.textContent = message;
}

function clearErrors() {
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
  form.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
}

function validate(settings) {
  clearErrors();
  let isValid = true;

  if (!settings.displayName) {
    showError("displayName", "Display name is required.");
    isValid = false;
  }

  if (!settings.email) {
    showError("email", "Email is required.");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
    showError("email", "Enter a valid email address.");
    isValid = false;
  }

  return isValid;
}

let toastTimeout;

function showToast(message, type = "success") {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.hidden = false;

  toastTimeout = setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}

function init() {
  const settings = loadSettings();
  applySettingsToForm(settings);
  applyTheme(settings.theme);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const settings = getSettingsFromForm();

    if (!validate(settings)) return;

    saveSettings(settings);
    applyTheme(settings.theme);
    showToast("Settings saved successfully.");
  });

  form.addEventListener("change", (event) => {
    if (event.target.name === "theme") {
      applyTheme(event.target.value);
    }
  });

  resetBtn.addEventListener("click", () => {
    applySettingsToForm(DEFAULT_SETTINGS);
    applyTheme(DEFAULT_SETTINGS.theme);
    clearErrors();
    localStorage.removeItem(STORAGE_KEY);
    showToast("Settings reset to defaults.");
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const currentTheme = form.querySelector('input[name="theme"]:checked')?.value;
    if (currentTheme === "system") {
      applyTheme("system");
    }
  });
}

init();
