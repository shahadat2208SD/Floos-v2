// ===============================
// Smooth Scrolling
// ===============================
let lenis;
const initSmoothScrolling = () => {
  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  lenis.on("scroll", () => ScrollTrigger.update());

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};

const Components = {
  initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const header = item.querySelector("div:first-child");
      const content = item.querySelector(".faq-content");

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close all FAQs
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            otherItem.querySelector(".faq-content").style.height = "0px";
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove("active");
          content.style.height = "0px";
        } else {
          item.classList.add("active");
          content.style.height = content.scrollHeight + "px";
        }
      });
    });

    // Open first FAQ  default
    faqItems[0].classList.add("active");
    faqItems[0].querySelector(".faq-content").style.height =
      faqItems[0].querySelector(".faq-content").scrollHeight + "px";
  },

  // HeadRoom-----------------
  initHeaderRoom() {
    const myElement = document.getElementById("header");
    if (myElement) {
      const options = {
        offset: 100,
        tolerance: 10,
        classes: {
          initial: "headroom",
          pinned: "headroom--pinned",
          unpinned: "headroom--unpinned",
          top: "headroom--top",
          notTop: "headroom--not-top",
          bottom: "headroom--bottom",
          notBottom: "headroom--not-bottom",
        },
      };
      const headroom = new Headroom(myElement, options);
      headroom.init();
    }
  },

  // Mobile Nav --------------
  initMobileNavbarCloseOpen() {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const closeMenuButton = document.getElementById("close-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuItems = document.querySelectorAll("#menu-items li");

    const menuButtons = document.getElementById("menu-buttons");

    function openMenu() {
      // Make menu visible and interactive
      gsap.set(mobileMenu, {
        display: "block",
        pointerEvents: "auto",
      });

      // Animate menu appearance
      const tl = gsap.timeline();

      // Fade in the menu background
      tl.to(mobileMenu, {
        opacity: 1,

        duration: 0.5,
        ease: "power2.out",
      });

      // Staggered animation for menu items
      tl.to(
        menuItems,
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: "back.out(1.4)",
        },
        "-=0.1"
      );

      // Animate buttons
      tl.to(
        menuButtons,
        {
          opacity: 1,
          y: -50,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Prevent body scrolling
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide menu completely when animation is done
          gsap.set(mobileMenu, {
            display: "none",
            pointerEvents: "none",
          });

          // Reset item positions for next open
          gsap.set(menuItems, { opacity: 0, x: "2rem" });

          // Allow body scrolling
          document.body.style.overflow = "";
        },
      });

      // Fade out buttons first
      tl.to(menuButtons, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
      });

      // Staggered exit for menu items
      tl.to(
        menuItems,
        {
          opacity: 0,
          x: "1rem",
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.in",
        },
        "-=0.2"
      );

      // Finally fade out the whole menu
      tl.to(
        mobileMenu,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      );
    }

    mobileMenuButton.addEventListener("click", openMenu);
    closeMenuButton.addEventListener("click", closeMenu);

    //  menu is hidden initially
    gsap.set(mobileMenu, {
      display: "none",
      pointerEvents: "none",
    });

    // Set initial positions for animated elements
    gsap.set(menuItems, { opacity: 0, x: "2rem" });
    gsap.set(menuButtons, { opacity: 0, y: 10 });
  },
};

const Animations = {
  initRevealElementsV2() {
    const elements = document.querySelectorAll(".reveal-me-2");
    elements.forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 90%",
          end: "top 50%",
          scrub: false,
        },
        opacity: 0,
        y: 99,
        rotation: 3,
        filter: "blur(7px)",
        duration: 0.9,

        ease: "power2.out",
      });
    });
  },
  initRevealElementsV3() {
    const elements = document.querySelectorAll(".reveal-me-3");
    elements.forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 98%",
          end: "top 50%",
          scrub: false,
        },
        opacity: 0,
        y: 99,
        rotation: 3,
        filter: "blur(7px)",
        duration: 0.9,

        ease: "power2.out",
      });
    });
  },

  initRevealElements() {
    const elements = document.querySelectorAll(".reveal-me");
    elements.forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
          end: "top 50%",
          scrub: false,
        },
        opacity: 0,
        y: 99,
        rotation: 3,
        filter: "blur(14px)",
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
  },

  initHeroMobileAnimation() {
    const heroMobile = document.querySelector(".hero-mobile");
    if (!heroMobile) return;
    gsap.from(heroMobile, {
      x: 70,
      opacity: 0,
      duration: 0.8,
      rotation: 3,
      scrollTrigger: {
        trigger: heroMobile,
        start: "top 85%",
        end: "top 50%",
        scrub: false,
      },
    });
  },

  initWorldMap() {
    const worldMap = document.querySelector(".worldmap");
    if (!worldMap) return;
    gsap.from(worldMap, {
      opacity: 0,
      scale: 0.97,
      duration: 1.7,
    });
  },
  initQR_box() {
    const QR_Box = document.querySelector(".QR_box");
    if (!QR_Box) return;
    gsap.from(QR_Box, {
      y: 70,
      opacity: 0,
      duration: 0.8,
      rotation: 4,
      scrollTrigger: {
        trigger: QR_Box,
        start: "top 85%",
        end: "top 50%",
        scrub: false,
      },
    });
  },
  initImageReveal() {
    const images = document.querySelectorAll(".reveal-image");
    images.forEach((img) => {
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: "top 70%",
          end: "top 20%",
          scrub: 1.5,
        },
        scale: 1.2,
        opacity: 0,
        duration: 1.8,
        ease: "power3.out",
        transformOrigin: "center center",
      });
    });
  },
  initSecureCardAreaAnimations() {
    const handImage = document.getElementById("hand-img");
    const paymentImage = document.getElementById("payment-img");
    const badgeCardImage = document.getElementById("badge-card-img");
    const badgeCard2Image = document.getElementById("badge-card-2-img");
    const arrowCard1 = document.getElementById("arrow-shape-1");
    const arrowCard2 = document.getElementById("arrow-shape-2");
    const backgroundImage = document.getElementById("background-bg");
    const blurBackgroundImage = document.getElementById("blur-bg");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: handImage,
        start: "top 44%",
        end: "top 50%",
        scrub: false,
      },
    });

    tl.from([handImage, backgroundImage, paymentImage, blurBackgroundImage], {
      opacity: 0,
      y: 119,
      rotation: -5,
      filter: "blur(7px)",
      duration: 0.9,
      stagger: 0.1,
      ease: "power2.out",
      willChange: "opacity, transform, filter", // Optimize for blur
    });

    tl.from(
      [arrowCard1, arrowCard2],
      {
        opacity: 0,
        y: -80,

        rotation: 40,
        filter: "blur(3px)",
        duration: 1.4,
        stagger: 0.1,
        ease: "power3.out",
        willChange: "opacity, transform, filter",
      },
      "<"
    ); // Animate at the same time as the previous animation

    tl.from(
      badgeCardImage,
      {
        opacity: 0,
        x: -119,
        rotation: -19,
        filter: "blur(7px)",
        duration: 1.77,
        ease: "power3.out",
        willChange: "opacity, transform, filter",
      },
      "<"
    );

    tl.from(
      badgeCard2Image,
      {
        opacity: 0,
        x: 119,
        rotation: 19,
        filter: "blur(7px)",
        duration: 1.77,
        ease: "power3.out",
        willChange: "opacity, transform, filter",
      },
      "<"
    );
  },

  initBackToTop() {
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
      backToTopButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  },

  initLinkTransition() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Optional: Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  },
};

// ===============================
// Initialization
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling();

  //
  Components.initFAQ();
  Components.initHeaderRoom();
  Components.initMobileNavbarCloseOpen();

  Animations.initRevealElementsV2();
  Animations.initRevealElementsV3();
  Animations.initRevealElements();
  Animations.initHeroMobileAnimation();
  Animations.initWorldMap();
  Animations.initQR_box();
  Animations.initImageReveal();
  Animations.initSecureCardAreaAnimations();
  Animations.initBackToTop();
  Animations.initLinkTransition();
});
