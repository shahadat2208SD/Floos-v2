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

  initNavbarAnimation() {
    const navbarAria = document.querySelector(".navbar-area");

    if (!navbarAria) return;

    gsap.from(navbarAria, {
      opacity: 0,
      y: -40,
      duration: 1.2,
      ease: "power3.out",
    });
  },
};

const Animations = {
  initSectionTitles() {
    const titles = document.querySelectorAll(".text-appear");
    titles.forEach((title) => {
      const titleText = new SplitType(title, { types: "lines" });
      titleText.lines.forEach((lines) => {
        const lineText = new SplitType(lines, { types: "words" });
        gsap.from(lineText.words, {
          scrollTrigger: {
            trigger: title,
            start: "top 65%",
            end: "top 30%",
            scrub: false,
          },
          y: 110,
          rotation: 21,
          stagger: 0.02,
          duration: 0.7,
          ease: "power2.out",
        });
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
        y: 95,
        rotation: 2,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
  },

  initHeroMobile() {
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
      scale: 0.98,
      duration: 0.9,
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
};

// ===============================
// Initialization
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling();

  //
  Components.initFAQ();
  Components.initNavbarAnimation();

  Animations.initSectionTitles();
  Animations.initRevealElements();
  Animations.initHeroMobile();
  Animations.initWorldMap();
  Animations.initQR_box();
});

// Mobile Nav --------------
const mobileMenuButton = document.getElementById("mobile-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuItems = document.querySelectorAll("#menu-items li");
const menuButtons = document.getElementById("menu-buttons");

// Open menu function with GSAP
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

// Close menu function with GSAP
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

// Event listeners
mobileMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);

// Initialize - ensure menu is hidden initially
gsap.set(mobileMenu, {
  display: "none",
  pointerEvents: "none",
});

// Set initial positions for animated elements
gsap.set(menuItems, { opacity: 0, x: "2rem" });
gsap.set(menuButtons, { opacity: 0, y: 10 });
