document.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const toggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const whatsappLinks = document.querySelectorAll('.whatsapp-link, .whatsapp-product-btn');

  whatsappLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href) return;

      const baseUrl = 'https://wa.me/918095911063?text=';
      const message = href.includes('text=')
        ? href.split('text=')[1]
        : encodeURIComponent('Hi DAR Fashions, I would like to enquire about your collection.');

      if (href.startsWith('https://wa.me/') || href.startsWith('http://wa.me/')) {
        link.href = `${baseUrl}${message}`;
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  const enquireModal = document.getElementById('enquireModalBackdrop');
  const closeEnquireModal = document.getElementById('closeEnquireModal');
  const enquireForm = document.getElementById('enquireForm');

  const submitWhatsAppForm = (form) => {
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const mobile = (formData.get('mobile') || '').toString().trim();
    const interest = (formData.get('interest') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    const whatsappMessage = encodeURIComponent(
      `Hi DAR Fashions, I am ${name || 'a customer'} and my mobile number is ${mobile || 'not shared'}. I am interested in ${interest || 'your collection'} and my message is: ${message || 'Please contact me.'}`
    );

    window.open(`https://wa.me/918095911063?text=${whatsappMessage}`, '_blank', 'noopener,noreferrer');
    form.reset();
  };

  const openEnquireModal = () => {
    if (enquireModal) {
      enquireModal.classList.add('visible');
      enquireModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('body-modal-open');
    }
  };

  const closeEnquireModalFn = () => {
    if (enquireModal) {
      enquireModal.classList.remove('visible');
      enquireModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('body-modal-open');
    }
  };

  if (enquireModal && closeEnquireModal) {
    const shouldAutoOpen = window.matchMedia('(min-width: 641px)').matches;
    if (shouldAutoOpen) {
      setTimeout(openEnquireModal, 500);
    }

    closeEnquireModal.addEventListener('click', closeEnquireModalFn);
    enquireModal.addEventListener('click', (event) => {
      if (event.target === enquireModal) {
        closeEnquireModalFn();
      }
    });
  }

  if (enquireForm) {
    enquireForm.addEventListener('submit', (event) => {
      event.preventDefault();
      submitWhatsAppForm(enquireForm);
      closeEnquireModalFn();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      submitWhatsAppForm(contactForm);
    });
  }

  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card) => {
    const productName = card.dataset.productName;
    const button = card.querySelector('.whatsapp-product-btn');
    if (!button || !productName) return;

    const rawMessage = `Hi DAR Fashions, I would like to buy the ${productName}.`;
    button.href = `https://wa.me/918095911063?text=${encodeURIComponent(rawMessage)}`;
  });
});
