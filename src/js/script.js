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
  Components.initFAQ();
});
