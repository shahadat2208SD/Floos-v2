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
};

// ===============================
// Initialization
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling();

  //
  Components.initFAQ();
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
