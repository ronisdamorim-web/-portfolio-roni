// Admin panel functionality

let currentTags = [];
let currentGalleryImages = [];
let editingCaseId = null;

// Initialize admin panel
function initAdmin() {
    renderCasesList();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    const caseForm = document.getElementById('caseForm');
    caseForm.addEventListener('submit', handleFormSubmit);

    // Tag input
    const tagInput = document.getElementById('tagInput');
    tagInput.addEventListener('keypress', handleTagInput);

    // Gallery add button
    const addGalleryBtn = document.getElementById('addGalleryImage');
    addGalleryBtn.addEventListener('click', addGalleryImageInput);

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    exportBtn.addEventListener('click', exportCasesJSON);

    // Import button
    const importBtn = document.getElementById('importBtn');
    const importInput = document.getElementById('importInput');

    importBtn.addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', handleImportFile);

    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', handleReset);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        id: editingCaseId || generateSlug(document.getElementById('caseName').value),
        name: document.getElementById('caseName').value,
        description: document.getElementById('caseDescription').value,
        tags: currentTags,
        status: document.getElementById('caseStatus').value,
        coverImage: document.getElementById('caseCoverImage').value,
        heroImage: document.getElementById('caseHeroImage').value || document.getElementById('caseCoverImage').value,
        sections: {
            contexto: document.getElementById('sectionContexto').value,
            problema: document.getElementById('sectionProblema').value,
            objetivo: document.getElementById('sectionObjetivo').value,
            processo: document.getElementById('sectionProcesso').value,
            solucao: document.getElementById('sectionSolucao').value,
            resultado: document.getElementById('sectionResultado').value
        },
        galleryImages: currentGalleryImages.filter(img => img.trim() !== '')
    };

    if (editingCaseId) {
        updateCase(editingCaseId, formData);
        showNotification('Case atualizado com sucesso!', 'success');
    } else {
        addCase(formData);
        showNotification('Case adicionado com sucesso!', 'success');
    }

    resetForm();
    renderCasesList();
}

// Generate slug from name
function generateSlug(name) {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Handle tag input
function handleTagInput(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const tag = e.target.value.trim();
        if (tag && !currentTags.includes(tag)) {
            currentTags.push(tag);
            renderTags();
            e.target.value = '';
        }
    }
}

// Render tags
function renderTags() {
    const tagsContainer = document.getElementById('tagsContainer');
    const existingInput = tagsContainer.querySelector('.tag-input');

    tagsContainer.innerHTML = currentTags.map(tag => `
        <span class="tag-input-item">
            ${tag}
            <span class="tag-remove" onclick="removeTag('${tag}')">×</span>
        </span>
    `).join('');

    tagsContainer.appendChild(existingInput);
}

// Remove tag
window.removeTag = function (tag) {
    currentTags = currentTags.filter(t => t !== tag);
    renderTags();
};

// Add gallery image input
function addGalleryImageInput() {
    currentGalleryImages.push('');
    renderGalleryInputs();
}

// Render gallery inputs
function renderGalleryInputs() {
    const galleryList = document.getElementById('galleryImagesList');

    galleryList.innerHTML = currentGalleryImages.map((img, index) => `
        <div class="gallery-input-item">
            <input 
                type="url" 
                value="${img}" 
                placeholder="https://..." 
                onchange="updateGalleryImage(${index}, this.value)"
            >
            <button type="button" class="btn-secondary btn-icon" onclick="removeGalleryImage(${index})">×</button>
        </div>
    `).join('');
}

// Update gallery image
window.updateGalleryImage = function (index, value) {
    currentGalleryImages[index] = value;
};

// Remove gallery image
window.removeGalleryImage = function (index) {
    currentGalleryImages.splice(index, 1);
    renderGalleryInputs();
};

// Render cases list
function renderCasesList() {
    const cases = loadCases();
    const casesList = document.getElementById('casesList');

    casesList.innerHTML = cases.map((caseItem, index) => `
        <div class="case-item">
            <div class="case-item-info">
                <div class="case-item-title">${caseItem.name}</div>
                <div class="case-item-meta">
                    ${caseItem.status === 'andamento' ? '<span class="status-badge">Em andamento</span>' : ''}
                    ${caseItem.tags.join(', ')}
                </div>
            </div>
            <div class="case-item-actions">
                ${index > 0 ? `<button class="btn-small" onclick="moveCase(${index}, ${index - 1})">↑</button>` : ''}
                ${index < cases.length - 1 ? `<button class="btn-small" onclick="moveCase(${index}, ${index + 1})">↓</button>` : ''}
                <button class="btn-small" onclick="editCase('${caseItem.id}')">Editar</button>
                <button class="btn-small danger" onclick="deleteCaseConfirm('${caseItem.id}')">Excluir</button>
            </div>
        </div>
    `).join('');
}

// Edit case
window.editCase = function (id) {
    const caseData = getCaseById(id);
    if (!caseData) return;

    editingCaseId = id;

    document.getElementById('caseName').value = caseData.name;
    document.getElementById('caseDescription').value = caseData.description;
    document.getElementById('caseStatus').value = caseData.status;
    document.getElementById('caseCoverImage').value = caseData.coverImage;
    document.getElementById('caseHeroImage').value = caseData.heroImage || '';

    currentTags = [...caseData.tags];
    renderTags();

    if (caseData.sections) {
        document.getElementById('sectionContexto').value = caseData.sections.contexto || '';
        document.getElementById('sectionProblema').value = caseData.sections.problema || '';
        document.getElementById('sectionObjetivo').value = caseData.sections.objetivo || '';
        document.getElementById('sectionProcesso').value = caseData.sections.processo || '';
        document.getElementById('sectionSolucao').value = caseData.sections.solucao || '';
        document.getElementById('sectionResultado').value = caseData.sections.resultado || '';
    }

    currentGalleryImages = [...(caseData.galleryImages || [])];
    renderGalleryInputs();

    document.getElementById('submitBtn').textContent = 'Salvar Alterações';
    document.getElementById('caseForm').scrollIntoView({ behavior: 'smooth' });
};

// Delete case with confirmation
window.deleteCaseConfirm = function (id) {
    const caseData = getCaseById(id);
    if (confirm(`Tem certeza que deseja excluir "${caseData.name}"?`)) {
        deleteCase(id);
        renderCasesList();
        showNotification('Case excluído com sucesso!', 'success');
    }
};

// Move case (reorder)
window.moveCase = function (fromIndex, toIndex) {
    reorderCase(fromIndex, toIndex);
    renderCasesList();
    showNotification('Ordem atualizada!', 'success');
};

// Reset form
function resetForm() {
    document.getElementById('caseForm').reset();
    currentTags = [];
    currentGalleryImages = [];
    editingCaseId = null;
    renderTags();
    renderGalleryInputs();
    document.getElementById('submitBtn').textContent = 'Adicionar Case';
}

// Handle import file
function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    importCasesJSON(file)
        .then(() => {
            renderCasesList();
            showNotification('Cases importados com sucesso!', 'success');
        })
        .catch(error => {
            showNotification(`Erro ao importar: ${error.message}`, 'error');
        });

    e.target.value = '';
}

// Handle reset
function handleReset() {
    if (confirm('Tem certeza que deseja resetar todos os cases para o padrão? Esta ação não pode ser desfeita.')) {
        resetCasesToDefault();
        renderCasesList();
        resetForm();
        showNotification('Cases resetados para o padrão!', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--bg-secondary);
        border: 1px solid ${type === 'success' ? '#4caf50' : type === 'error' ? '#ff4444' : 'var(--accent)'};
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize
if (document.getElementById('adminContainer')) {
    initAdmin();
}
