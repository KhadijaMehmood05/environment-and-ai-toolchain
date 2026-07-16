const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = {
  name(value) {
    if (!value.trim()) {
      return "Name is required.";
    }
    return "";
  },

  email(value) {
    if (!value.trim()) {
      return "Please enter a valid email address.";
    }
    if (!EMAIL_PATTERN.test(value.trim())) {
      return "Please enter a valid email address.";
    }
    return "";
  },

  password(value) {
    if (!value) {
      return "Password must be at least 8 characters.";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return "";
  },
};

function showError(input, message) {
  const errorId = `${input.id}-error`;
  const errorEl = document.getElementById(errorId);

  if (message) {
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
    errorEl.hidden = false;
  } else {
    input.removeAttribute("aria-invalid");
    errorEl.textContent = "";
    errorEl.hidden = true;
  }
}

function validateField(input) {
  const validator = validators[input.name];
  if (!validator) {
    return true;
  }

  const message = validator(input.value);
  showError(input, message);
  return message === "";
}

function validateForm(form) {
  const inputs = form.querySelectorAll("input[name]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

function showSuccess(message) {
  const successEl = document.getElementById("form-success");
  successEl.textContent = message;
  successEl.hidden = false;
}

function hideSuccess() {
  const successEl = document.getElementById("form-success");
  successEl.textContent = "";
  successEl.hidden = true;
}

const form = document.getElementById("settings-form");

form.addEventListener("input", (event) => {
  if (event.target.matches("input[name]")) {
    hideSuccess();
    validateField(event.target);
  }
});

form.addEventListener("blur", (event) => {
  if (event.target.matches("input[name]")) {
    validateField(event.target);
  }
}, true);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  hideSuccess();

  if (!validateForm(form)) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  showSuccess("Settings saved successfully.");
  form.reset();
  form.querySelectorAll("input[name]").forEach((input) => {
    showError(input, "");
  });
});
