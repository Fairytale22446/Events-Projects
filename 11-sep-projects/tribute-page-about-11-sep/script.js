      // scroll animation
      const sections = document.querySelectorAll(".section");
      const reveal = () => {
        const trigger = window.innerHeight * 0.8;
        sections.forEach((sec) => {
          const top = sec.getBoundingClientRect().top;
          if (top < trigger) sec.classList.add("show");
        });
      };
      window.addEventListener("scroll", reveal);
      reveal();