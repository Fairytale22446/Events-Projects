      const events = document.querySelectorAll(".event");

      events.forEach((event) => {
        event.addEventListener("click", () => {
          event.classList.toggle("active");

          // small bounce animation on click
          event.style.transform = "scale(1.05)";
          setTimeout(() => {
            event.style.transform = "scale(1)";
          }, 200);
        });
      });