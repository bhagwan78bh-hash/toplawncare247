/* ==========================================================================
   TOPLAWNCARE247 - APPLICATION CONTROLLER
   ========================================================================== */

import { initLawnCalculator } from './calculator.js';
import { initComparisonSlider } from './slider.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize submodules
  initLawnCalculator();
  initComparisonSlider();

  // 2. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileClose = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

  function openMobileNav() {
    mobileDrawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) {
      closeMobileNav();
    }
  });

  // 4. Seasonal Care Matrix Tabs
  const seasonTabs = document.querySelectorAll('.season-tab-btn');
  const seasonContents = document.querySelectorAll('.season-tab-content');

  seasonTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      seasonTabs.forEach(t => t.classList.remove('active'));
      seasonContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.dataset.season;
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 5. Legal Modals (Privacy Policy & Terms of Service)
  const legalModal = document.getElementById('legalModal');
  const privacyTabBtn = document.getElementById('tabPrivacyBtn');
  const termsTabBtn = document.getElementById('tabTermsBtn');
  const privacySection = document.getElementById('legalPrivacySection');
  const termsSection = document.getElementById('legalTermsSection');
  const legalModalTitle = document.getElementById('legalModalTitle');
  const closeLegalBtn = document.getElementById('closeLegalBtn');
  const printLegalBtn = document.getElementById('printLegalBtn');

  function switchLegalTab(tab) {
    if (tab === 'privacy') {
      privacyTabBtn?.classList.add('active');
      termsTabBtn?.classList.remove('active');
      if (privacySection) privacySection.style.display = 'block';
      if (termsSection) termsSection.style.display = 'none';
      if (legalModalTitle) legalModalTitle.textContent = 'Privacy Policy';
    } else {
      termsTabBtn?.classList.add('active');
      privacyTabBtn?.classList.remove('active');
      if (termsSection) termsSection.style.display = 'block';
      if (privacySection) privacySection.style.display = 'none';
      if (legalModalTitle) legalModalTitle.textContent = 'Terms of Service';
    }
  }

  function openLegalModal(initialTab = 'privacy') {
    switchLegalTab(initialTab);
    if (legalModal && typeof legalModal.showModal === 'function') {
      legalModal.showModal();
    } else if (legalModal) {
      legalModal.setAttribute('open', '');
    }
  }

  function closeLegalModal() {
    if (legalModal && typeof legalModal.close === 'function') {
      legalModal.close();
    } else if (legalModal) {
      legalModal.removeAttribute('open');
    }
  }

  // Open triggers across page
  document.querySelectorAll('[data-open-legal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-open-legal') || 'privacy';
      openLegalModal(tab);
    });
  });

  // Tab switcher inside modal
  privacyTabBtn?.addEventListener('click', () => switchLegalTab('privacy'));
  termsTabBtn?.addEventListener('click', () => switchLegalTab('terms'));

  // Close buttons
  closeLegalBtn?.addEventListener('click', closeLegalModal);

  // Print button
  printLegalBtn?.addEventListener('click', () => {
    window.print();
  });

  // Light-dismiss fallback for browsers without closedby support
  if (legalModal && !('closedBy' in HTMLDialogElement.prototype)) {
    legalModal.addEventListener('click', (event) => {
      if (event.target !== legalModal) return;
      const rect = legalModal.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        legalModal.close();
      }
    });
  }

  // 6. Lead Capture & Download Modal
  const leadForm = document.getElementById('leadNewsletterForm');
  const leadModal = document.getElementById('leadModal');
  const closeLeadModalBtn = document.getElementById('closeLeadModalBtn');
  const leadUserEmailDisplay = document.getElementById('leadUserEmailDisplay');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('leadEmailInput');
      const emailVal = emailInput?.value.trim();

      if (!emailVal || !emailVal.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      if (leadUserEmailDisplay) {
        leadUserEmailDisplay.textContent = emailVal;
      }

      if (leadModal && typeof leadModal.showModal === 'function') {
        leadModal.showModal();
      }

      // Reset form
      leadForm.reset();
    });
  }

  closeLeadModalBtn?.addEventListener('click', () => {
    if (leadModal && typeof leadModal.close === 'function') {
      leadModal.close();
    }
  });

  if (leadModal && !('closedBy' in HTMLDialogElement.prototype)) {
    leadModal.addEventListener('click', (event) => {
      if (event.target !== leadModal) return;
      const rect = leadModal.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        leadModal.close();
      }
    });
  }

  // 7. Interactive Custom Plan Download Trigger from Calculator
  const getCustomPlanBtn = document.getElementById('getCustomPlanBtn');
  getCustomPlanBtn?.addEventListener('click', () => {
    const grassName = document.getElementById('resGrassTitle')?.textContent || 'Your Lawn';
    const emailPrompt = prompt(`Where should we send your custom ${grassName} seasonal schedule?`, 'homeowner@example.com');
    if (emailPrompt && emailPrompt.includes('@')) {
      if (leadUserEmailDisplay) leadUserEmailDisplay.textContent = emailPrompt;
      if (leadModal && typeof leadModal.showModal === 'function') {
        leadModal.showModal();
      }
    }
  });
});
