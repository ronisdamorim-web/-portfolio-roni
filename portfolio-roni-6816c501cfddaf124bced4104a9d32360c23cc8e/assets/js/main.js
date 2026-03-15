// =====================
// Optimized Starfield with Magnet Gravity Effect + Minimal Twinkle
// =====================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
const isMobile = window.innerWidth < 768;

let w, h;
function resizeCanvas() {
    w = canvas.width = window.innerWidth * window.devicePixelRatio;
    h = canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const stars = [];
const STAR_COUNT = 120;

// Initialize stars with fixed positions
for (let i = 0; i < STAR_COUNT; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    stars.push({
        ox: x, // original position
        oy: y,
        x: x,
        y: y,
        r: Math.random() * 1.2 + 0.5, // radius 0.5-1.7px
        baseOpacity: Math.random() * 0.5 + 0.4,
        opacity: Math.random() * 0.5 + 0.4,
        twinkleSpeed: Math.random() * 0.005 + 0.003, // Very slow
        twinkleOffset: Math.random() * Math.PI * 2
    });
}

const mouse = { x: -9999, y: -9999 };

// Mouse tracking (only on desktop)
if (!isMobile) {
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });
}

// Animation loop
function animateStars() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const time = Date.now();

    for (const s of stars) {
        // Minimal twinkle effect
        s.opacity = s.baseOpacity + Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.08;

        // Apply magnet effect only on desktop
        if (!isMobile && mouse.x > -9999) {
            const dx = mouse.x - s.x;
            const dy = mouse.y - s.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const radius = 200; // magnet reach
            const strength = 0.25; // pull strength

            if (dist < radius && dist > 1) {
                const pull = (1 - dist / radius) * strength;
                s.x += dx * pull;
                s.y += dy * pull;
            }
        }

        // Slowly return to original position
        s.x += (s.ox - s.x) * 0.04;
        s.y += (s.oy - s.y) * 0.04;

        // Draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();
    }

    requestAnimationFrame(animateStars);
}

animateStars();

// =====================
// Glitch Effect with Matrix Green
// =====================
function glitch(el) {
    if (!el.dataset.glitch) el.dataset.glitch = el.innerText;

    const text = el.dataset.glitch;
    const words = text.split(" ");
    const stop = Math.max(...words.map((w) => w.length));

    if (el.dataset.interval) clearInterval(Number(el.dataset.interval));

    el.classList.add("matrix-glitching");

    let min = 5;
    let iterations = 0;

    const interval = setInterval(() => {
        el.innerText = words
            .map((word) => {
                return word
                    .split("")
                    .map((letter, index) => {
                        if (iterations > index + min || index > iterations) {
                            return letter;
                        } else {
                            return Math.floor(Math.random() * 10);
                        }
                    })
                    .join("");
            })
            .join(" ");

        el.dataset.interval = String(interval);
        iterations++;

        if (iterations >= stop + min) {
            clearInterval(Number(el.dataset.interval));
            el.innerText = text;
            el.classList.remove("matrix-glitching");
        }
    }, 75);
}

const glitchEl = document.querySelectorAll("[data-glitch]");
glitchEl.forEach((el) => {
    // Desktop hover
    el.addEventListener("mouseover", () => glitch(el));
    // Mobile: run once on load
    if (window.innerWidth < 768) {
        setTimeout(() => glitch(el), 600);
    }
});

// =====================
// Smooth Scroll
// =====================
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const casesSection = document.getElementById('cases');
            if (casesSection) {
                casesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// =====================
// Render Cases on Home Page
// =====================
function renderCases() {
    const casesGrid = document.getElementById('casesGrid');
    if (!casesGrid) return;

    let cases = [];

    // 1. Tentar carregar do DB_CONTENT (site publicado)
    if (window.DB_CONTENT && Array.isArray(window.DB_CONTENT.cases)) {
        cases = window.DB_CONTENT.cases;
    }
    // 2. Fallback para loadCases global (se existir)
    else if (typeof loadCases === 'function') {
        cases = loadCases();
    }

    // 3. Filtrar apenas os visíveis (Regra Robusta)
    const visibleCases = cases.filter(c => {
        return c.visible !== false && c.hidden !== true && c.status !== 'oculto';
    });

    casesGrid.innerHTML = visibleCases.map((caseItem) => `
        <a href="case.html?id=${caseItem.id}" class="case-card" data-id="${caseItem.id}">
            <img src="${caseItem.coverImage}" alt="${caseItem.title}" class="case-image" loading="lazy">
            <div class="case-content">
                <h3 class="case-title">${caseItem.title}</h3>
                <p class="case-description">${caseItem.shortDescription}</p>
                <div class="case-tags">
                    ${caseItem.status === 'andamento' ? '<span class="status-badge">Em andamento</span>' : ''}
                    ${caseItem.tags ? caseItem.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                </div>
            </div>
        </a>
    `).join('');
}

// Initialize on home page
if (document.getElementById('casesGrid')) {
    renderCases();
}
