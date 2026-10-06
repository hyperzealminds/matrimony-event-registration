/**
 * Vihar Vivaha - Matrimony Event Registration Application Logic
 * Clean, lightweight, reliable, zero third-party framework dependencies.
 */

(function () {
  'use strict';

  // Key for local storage persistence
  const STORAGE_KEY = 'vihari_matrimony_reg_user';

  // DOM Elements
  const regForm = document.getElementById('eventRegistrationForm');
  const fullNameInput = document.getElementById('fullName');
  const mobileInput = document.getElementById('mobileNumber');
  const emailInput = document.getElementById('emailAddress');
  const genderInput = document.getElementById('genderSelect');
  const ageInput = document.getElementById('ageInput');
  const confirmationCheck = document.getElementById('confirmationCheckbox');
  const btnProceedPayment = document.getElementById('btnProceedPayment');
  
  // User state notification bar
  const userStateBanner = document.getElementById('userStateBanner');
  const userStateName = document.getElementById('userStateName');
  const btnStateReset = document.getElementById('btnStateReset');
  
  // Modals
  const paymentModal = document.getElementById('paymentModal');
  const modalCandidateName = document.getElementById('modalCandidateName');
  const btnModalConfirmPay = document.getElementById('btnModalConfirmPay');
  const btnModalClose = document.getElementById('btnModalClose');
  const termsModal = document.getElementById('termsModal');
  const privacyModal = document.getElementById('privacyModal');

  // Toasts
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  /**
   * Helper to show toast alert
   */
  function showToast(message, duration = 4000) {
    if (!toastNotice) return;
    toastMessage.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, duration);
  }

  /**
   * Phone Number formatting & cleanup (digits only, max 10)
   */
  if (mobileInput) {
    mobileInput.addEventListener('input', function (e) {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
  }

  /**
   * Validate Form Fields
   */
  function validateForm() {
    let isValid = true;

    // Full Name
    const nameVal = fullNameInput.value.trim();
    if (!nameVal || nameVal.length < 3) {
      setFieldError(fullNameInput, true);
      isValid = false;
    } else {
      setFieldError(fullNameInput, false);
    }

    // Mobile (10 digit Indian Mobile)
    const mobileVal = mobileInput.value.trim();
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileVal)) {
      setFieldError(mobileInput, true);
      isValid = false;
    } else {
      setFieldError(mobileInput, false);
    }

    // Email Address
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      setFieldError(emailInput, true);
      isValid = false;
    } else {
      setFieldError(emailInput, false);
    }

    // Gender
    const genderVal = genderInput.value;
    if (!genderVal) {
      setFieldError(genderInput, true);
      isValid = false;
    } else {
      setFieldError(genderInput, false);
    }

    // Age (Valid matrimonial range: 21 to 70)
    const ageVal = parseInt(ageInput.value, 10);
    if (isNaN(ageVal) || ageVal < 21 || ageVal > 75) {
      setFieldError(ageInput, true);
      isValid = false;
    } else {
      setFieldError(ageInput, false);
    }

    // Confirmation Checkbox
    if (!confirmationCheck.checked) {
      confirmationCheck.parentElement.style.borderColor = '#DC2626';
      confirmationCheck.parentElement.style.backgroundColor = '#FEF2F2';
      isValid = false;
    } else {
      confirmationCheck.parentElement.style.borderColor = 'var(--color-primary-border)';
      confirmationCheck.parentElement.style.backgroundColor = 'var(--color-bg-cream)';
    }

    return isValid;
  }

  function setFieldError(element, isError) {
    if (isError) {
      element.classList.add('is-invalid');
    } else {
      element.classList.remove('is-invalid');
    }
  }

  /**
   * Open and Close Modals
   */
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  /**
   * Check LocalStorage for previously entered candidate info
   */
  function loadPersistedCandidate() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const candidate = JSON.parse(saved);
        if (fullNameInput && candidate.name) fullNameInput.value = candidate.name;
        if (mobileInput && candidate.phone) mobileInput.value = candidate.phone;
        if (emailInput && candidate.email) emailInput.value = candidate.email;
        if (genderInput && candidate.gender) genderInput.value = candidate.gender;
        if (ageInput && candidate.age) ageInput.value = candidate.age;

        // Display user state banner
        if (userStateBanner && userStateName && candidate.name) {
          userStateName.textContent = candidate.name;
          userStateBanner.style.display = 'flex';
        }
      }
    } catch (err) {
      console.warn('LocalStorage access warning:', err);
    }
  }

  /**
   * Clear saved candidate
   */
  if (btnStateReset) {
    btnStateReset.addEventListener('click', function () {
      localStorage.removeItem(STORAGE_KEY);
      if (userStateBanner) userStateBanner.style.display = 'none';
      if (regForm) regForm.reset();
      showToast('Registration form cleared.');
    });
  }

  /**
   * Save registration state locally and forward to Razorpay
   */
  function handleProceedToPayment(event) {
    if (event) event.preventDefault();

    if (!validateForm()) {
      showToast('Please check all highlighted fields before proceeding.');
      return;
    }

    const candidateData = {
      name: fullNameInput.value.trim(),
      phone: mobileInput.value.trim(),
      email: emailInput.value.trim(),
      gender: genderInput.value,
      age: ageInput.value.trim(),
      submittedAt: new Date().toISOString()
    };

    // Save candidate data locally
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(candidateData));
      if (userStateBanner && userStateName) {
        userStateName.textContent = candidateData.name;
        userStateBanner.style.display = 'flex';
      }
    } catch (err) {
      console.warn('Could not save to localStorage:', err);
    }

    // Future Extensible Hook: API dispatch when backend is connected
    if (window.EVENT_CONFIG && window.EVENT_CONFIG.integration && window.EVENT_CONFIG.integration.enableBackendApi) {
      dispatchRegistrationToBackend(candidateData);
    }

    // Show Payment Transition Modal with Candidate's Name
    if (modalCandidateName) {
      modalCandidateName.textContent = candidateData.name;
    }
    openModal('paymentModal');
  }

  /**
   * Action when confirming payment modal: Open Razorpay checkout page
   */
  if (btnModalConfirmPay) {
    btnModalConfirmPay.addEventListener('click', function () {
      const razorpayUrl = (window.EVENT_CONFIG && window.EVENT_CONFIG.links && window.EVENT_CONFIG.links.razorpayPage)
        || 'https://pages.razorpay.com/pl_TkiLJXbjFdODnH/view';

      closeModal('paymentModal');
      showToast('Opening secure Razorpay payment page...');

      // Open Razorpay in a new tab so user retains the registration page with Biodata steps
      window.open(razorpayUrl, '_blank', 'noopener,noreferrer');

      // Scroll candidate smoothly to Step 3 / Biodata section so it is right in front of them
      setTimeout(() => {
        const biodataSection = document.getElementById('biodata-section');
        if (biodataSection) {
          biodataSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);
    });
  }

  /**
   * Future Backend Hook: sends candidate data to database or backend endpoint
   */
  async function dispatchRegistrationToBackend(candidateData) {
    try {
      const endpoint = window.EVENT_CONFIG.integration.apiEndpoint;
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidateData)
      });
    } catch (e) {
      console.log('Backend notification not enabled or failed silently:', e);
    }
  }

  /**
   * FAQ Accordion Toggle
   */
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', function () {
      const item = this.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all other items for clean accordion UX
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /**
   * Form submit listener
   */
  if (regForm) {
    regForm.addEventListener('submit', handleProceedToPayment);
  }

  // Clear validation styles on input
  [fullNameInput, mobileInput, emailInput, genderInput, ageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    }
  });

  if (confirmationCheck) {
    confirmationCheck.addEventListener('change', function () {
      if (this.checked) {
        this.parentElement.style.borderColor = 'var(--color-primary-border)';
        this.parentElement.style.backgroundColor = 'var(--color-bg-cream)';
      }
    });
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function () {
    loadPersistedCandidate();

    // Populate dynamic config values if present
    if (window.EVENT_CONFIG) {
      const conf = window.EVENT_CONFIG;
      // Set external links
      const biodataLinks = document.querySelectorAll('.link-biodata-form');
      biodataLinks.forEach((a) => {
        a.href = conf.links.googleForm;
      });

      const razorpayLinks = document.querySelectorAll('.link-razorpay-direct');
      razorpayLinks.forEach((a) => {
        a.href = conf.links.razorpayPage;
      });

      const whatsappLinks = document.querySelectorAll('.link-whatsapp-support');
      whatsappLinks.forEach((a) => {
        a.href = conf.links.whatsappSupport;
      });
    }
  });

})();
