const page = document.body.dataset.page;

const navLinks = document.querySelectorAll("[data-nav]");
navLinks.forEach((link) => {
  if (link.dataset.nav === page) {
    link.classList.add("active");
  }
});

const navWrap = document.querySelector(".nav-wrap");
const navToggle = document.querySelector(".nav-toggle");

if (navWrap && navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navWrap.classList.toggle("menu-open");
  });
}

const yearSlot = document.querySelector("[data-year]");
if (yearSlot) {
  yearSlot.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  const message = contactForm.querySelector(".form-message");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const requiredFields = ["name", "phone", "city", "loanType"];
    const missing = requiredFields.filter((field) => !String(formData.get(field) || "").trim());

    if (missing.length > 0) {
      message.textContent = "Please complete the required fields so your team can follow up cleanly.";
      message.className = "form-message show error";
      return;
    }

    const phone = String(formData.get("phone")).replace(/\D/g, "");
    if (phone.length < 10) {
      message.textContent = "Please enter a valid phone number with at least 10 digits.";
      message.className = "form-message show error";
      return;
    }

    message.textContent =
      "Thanks. This static demo form is validated and ready to be connected to your CRM, email inbox, or lead API.";
    message.className = "form-message show success";
    contactForm.reset();
  });
}

const calculatorForm = document.querySelector("[data-calculator-form]");
if (calculatorForm) {
  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const outputs = {
    emi: document.querySelector("[data-output='emi']"),
    interest: document.querySelector("[data-output='interest']"),
    total: document.querySelector("[data-output='total']"),
    rate: document.querySelector("[data-output='rate']"),
    tenure: document.querySelector("[data-output='tenure']"),
  };

  const calculateEmi = () => {
    const principal = Number(document.querySelector("#loanAmount").value);
    const annualRate = Number(document.querySelector("#interestRate").value);
    const tenureYears = Number(document.querySelector("#tenureYears").value);
    const months = tenureYears * 12;
    const monthlyRate = annualRate / 12 / 100;

    if (!principal || !annualRate || !tenureYears) {
      return;
    }

    const emi =
      principal *
      monthlyRate *
      (Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1));

    const total = emi * months;
    const interest = total - principal;

    outputs.emi.textContent = currency.format(Math.round(emi));
    outputs.interest.textContent = currency.format(Math.round(interest));
    outputs.total.textContent = currency.format(Math.round(total));
    outputs.rate.textContent = `${annualRate.toFixed(1)}% p.a.`;
    outputs.tenure.textContent = `${tenureYears} years`;
  };

  calculatorForm.addEventListener("input", calculateEmi);
  calculateEmi();
}
