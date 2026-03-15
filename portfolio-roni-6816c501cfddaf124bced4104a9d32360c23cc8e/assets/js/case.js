// Case detail page functionality

// Get case ID from URL
function getCaseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Render case detail page
function renderCaseDetail() {
    const caseId = getCaseIdFromUrl();

    if (!caseId) {
        window.location.href = 'index.html';
        return;
    }

    const caseData = getCaseById(caseId);

    if (!caseData) {
        alert('Case não encontrado');
        window.location.href = 'index.html';
        return;
    }

    // Update page title
    document.title = `${caseData.title} | Roni Amorim`;

    // Render hero section
    const heroTitle = document.getElementById('caseHeroTitle');
    const heroSubtitle = document.getElementById('caseHeroSubtitle');
    const heroTags = document.getElementById('caseHeroTags');

    heroTitle.textContent = caseData.title;

    if (caseData.subtitle) {
        heroSubtitle.textContent = caseData.subtitle;
        heroSubtitle.style.display = 'block';
    } else {
        heroSubtitle.style.display = 'none';
    }

    heroTags.innerHTML = `
        ${caseData.status === 'andamento' ? '<span class="status-badge">Em andamento</span>' : ''}
        ${caseData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    `;

    // Render sections
    const caseBody = document.getElementById('caseBody');
    const sections = caseData.sections || {};

    const sectionOrder = [
        { key: 'context', title: 'Contexto' },
        { key: 'problem', title: 'Problema' },
        { key: 'objective', title: 'Objetivo' },
        { key: 'process', title: 'Processo' },
        { key: 'solution', title: 'Solução' },
        { key: 'result', title: 'Resultado' }
    ];

    let sectionsHtml = '';

    sectionOrder.forEach(section => {
        // Only render section if it has content
        if (sections[section.key] && sections[section.key].trim() !== '') {
            sectionsHtml += `
                <div class="case-section">
                    <h2 class="case-section-title">${section.title}</h2>
                    <div class="case-section-content">${sections[section.key]}</div>
                </div>
            `;
        }
    });

    caseBody.innerHTML = sectionsHtml;

    // Render gallery if exists and has images
    if (caseData.gallery && caseData.gallery.length > 0) {
        const gallerySection = document.createElement('div');
        gallerySection.className = 'case-gallery';
        gallerySection.innerHTML = `
            <h2 class="case-section-title">Galeria</h2>
            <div class="gallery-grid">
                ${caseData.gallery.map(item => {
            const imgUrl = typeof item === 'string' ? item : item.url;
            const caption = typeof item === 'object' && item.caption ? item.caption : '';
            return `
                        <div class="gallery-item">
                            <img src="${imgUrl}" alt="${caption || caseData.title}" class="gallery-image" loading="lazy">
                            ${caption ? `<p class="gallery-caption">${caption}</p>` : ''}
                        </div>
                    `;
        }).join('')}
            </div>
        `;
        caseBody.appendChild(gallerySection);
    }
}

// Initialize on case page
if (document.getElementById('caseDetail')) {
    renderCaseDetail();
}
