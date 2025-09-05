/* =========================
       Background Particles
       ========================= */
      const canvas = document.getElementById("bgCanvas");
      const c = canvas.getContext("2d");
      let W, H, particles;
      function resize() {
        W = canvas.width = innerWidth;
        H = canvas.height = innerHeight;
      }
      addEventListener("resize", resize);
      resize();

      const rnd = (min, max) => Math.random() * (max - min) + min;
      function makeParticle() {
        const green = Math.random() > 0.5;
        return {
          x: rnd(0, W),
          y: rnd(0, H),
          r: rnd(1.2, 3.3),
          vx: rnd(-0.1, 0.1),
          vy: rnd(0.05, 0.3),
          a: rnd(0, Math.PI * 2),
          spin: rnd(0.002, 0.01),
          color: green ? "rgba(17,94,69,0.9)" : "rgba(255,255,255,0.9)",
        };
      }
      function initParticles(n = 140) {
        particles = Array.from({ length: n }, makeParticle);
      }
      initParticles();

      function draw() {
        c.clearRect(0, 0, W, H);
        for (const p of particles) {
          p.a += p.spin;
          p.x += p.vx + Math.sin(p.a) * 0.12;
          p.y += p.vy;
          if (p.y - p.r > H) {
            p.y = -10;
            p.x = rnd(0, W);
          }
          c.beginPath();
          c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          c.fillStyle = p.color;
          c.fill();
        }
        requestAnimationFrame(draw);
      }
      draw();

      /* =========================
       Timeline Data + Logic
       ========================= */
      const timelineData = [
        {
          date: "6 Sept 1965",
          title: "Youm‑e‑Difa (Defence Day)",
          body: "Pakistan commemorates the courage and sacrifices of the armed forces. Major actions on the Lahore front took place as defenses held firm.",
        },
        {
          date: "7 Sept 1965",
          title: "Air Force Operations",
          body: "Key Pakistan Air Force sorties and engagements. Naval action off the coast also occurred around this time.",
        },
        {
          date: "Early–Mid Sept 1965",
          title: "Major Land Battles",
          body: "Intense armoured engagements took place on multiple fronts including Sialkot sector. These days saw some of the largest tank battles in the region.",
        },
        {
          date: "Late Sept 1965",
          title: "Towards Ceasefire",
          body: "Diplomatic efforts increased and a UN‑mandated ceasefire was accepted later in the month.",
        },
        {
          date: "Remembrance",
          title: "Honouring the Fallen",
          body: "Defence Day is marked every 6 September to honour martyrs and veterans of the armed forces and to celebrate national resilience.",
        },
      ];

      const tRoot = document.getElementById("timeline");
      timelineData.forEach((item, idx) => {
        const wrap = document.createElement("div");
        wrap.className = "t-item";
        const dot = document.createElement("div");
        dot.className = "t-dot";
        const head = document.createElement("div");
        head.className = "t-head";
        head.setAttribute("role", "button");
        head.setAttribute("tabindex", "0");
        head.setAttribute("aria-expanded", "false");
        head.innerHTML = `
        <div style="display:flex; gap:10px; align-items:baseline; flex-wrap:wrap">
          <span class="t-date">${item.date}</span>
          <span class="t-title">${item.title}</span>
        </div>
        <span class="t-toggle">▸</span>
      `;
        const body = document.createElement("div");
        body.className = "t-body";
        body.innerHTML = `<div class="t-body-inner">${item.body}</div>`;
        wrap.append(dot, head, body);
        tRoot.append(wrap);

        function toggle() {
          const isOpen = body.classList.toggle("open");
          head.setAttribute("aria-expanded", String(isOpen));
          head.querySelector(".t-toggle").textContent = isOpen ? "▾" : "▸";
          body.style.maxHeight = isOpen ? body.scrollHeight + "px" : "0px";
        }
        head.addEventListener("click", toggle);
        head.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        });
        if (idx === 0) {
          toggle();
        }
      });

      /* =========================
       Gallery + Lightbox
       ========================= */
      const images = [
        {
          src: "https://images.theconversation.com/files/208938/original/file-20180305-146691-162sprd.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip",
          label: "Pakistan Army",
          caption: "Pakistan Army – Service & sacrifice.",
        },
        {
          src: "https://i0.wp.com/defencesecurityasia.com/wp-content/uploads/2023/12/Iraq-Acquires-JF-17-Block-III-Fighter-Jets-from-Pakistan.jpg?fit=1920%2C1080&ssl=1",
          label: "Pakistan Air Force",
          caption: "Pakistan Air Force – Air superiority & courage.",
        },
        {
          src: "https://dailyausaf.com/en/wp-content/uploads/2024/09/Ausaf-English-web-84.jpg",
          label: "Pakistan Navy",
          caption: "Pakistan Navy – Guardians of the seas.",
        },
        {
          src: "https://www.youlinmagazine.com/articles/1823.jpg",
          label: "Patriotism",
          caption: "Honouring the martyrs and veterans.",
        },
        {
          src: "https://thepakistanitraveller.assamartist.com/wp-content/uploads/2021/09/Pakistan-Defence-Day-6th-September-Tribute-Assam-Artist-scaled.jpg",
          label: "Technology",
          caption: "Future‑ready defence technologies.",
        },
        {
          src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
          label: "Unity",
          caption: "United we stand – قوم، وطن، فوج",
        },
      ];

      const gRoot = document.getElementById("gallery");
      images.forEach((img, i) => {
        const t = document.createElement("figure");
        t.className = "thumb";
        t.setAttribute("data-index", i);
        t.innerHTML = `<img src="${img.src}" alt="${img.label}"><figcaption class="label">${img.label}</figcaption>`;
        t.addEventListener("click", () => openLightbox(i));
        gRoot.appendChild(t);
      });

      // Lightbox logic
      const lb = document.getElementById("lightbox");
      const lbImg = document.getElementById("lbImg");
      const lbCaption = document.getElementById("lbCaption");
      const lbPrev = document.getElementById("lbPrev");
      const lbNext = document.getElementById("lbNext");
      const lbClose = document.getElementById("lbClose");
      let current = 0;

      function openLightbox(index) {
        current = index;
        updateLB();
        lb.classList.add("open");
        lb.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
      function closeLightbox() {
        lb.classList.remove("open");
        lb.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
      function updateLB() {
        lbImg.src = images[current].src;
        lbImg.alt = images[current].label;
        lbCaption.textContent = images[current].caption;
      }
      function prev() {
        current = (current - 1 + images.length) % images.length;
        updateLB();
      }
      function next() {
        current = (current + 1) % images.length;
        updateLB();
      }

      lbPrev.addEventListener("click", prev);
      lbNext.addEventListener("click", next);
      lbClose.addEventListener("click", closeLightbox);
      lb.addEventListener("click", (e) => {
        if (e.target === lb) closeLightbox();
      });
      document.addEventListener("keydown", (e) => {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      });