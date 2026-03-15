// Storage management for portfolio cases
const STORAGE_KEY = 'portfolioCases';

// Get default cases
function getDefaultCases() {
    return DEFAULT_CASES;
}

// Load cases from localStorage (with fallback to defaults)
function loadCases() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const cases = JSON.parse(stored);
            // Validate that it's an array
            if (Array.isArray(cases) && cases.length > 0) {
                return cases;
            }
        }
    } catch (error) {
        console.error('Error loading cases from localStorage:', error);
    }

    // Return defaults if nothing in storage or error
    const defaults = getDefaultCases();
    saveCases(defaults); // Save defaults to localStorage
    return defaults;
}

// Save cases to localStorage
function saveCases(cases) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
        return true;
    } catch (error) {
        console.error('Error saving cases to localStorage:', error);
        return false;
    }
}

// Reset cases to default
function resetCasesToDefault() {
    const defaults = getDefaultCases();
    saveCases(defaults);
    return defaults;
}

// Export cases as JSON file
function exportCasesJSON() {
    const cases = loadCases();
    const dataStr = JSON.stringify(cases, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-cases-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Import cases from JSON file
function importCasesJSON(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const cases = JSON.parse(e.target.result);

                // Validate structure
                if (!Array.isArray(cases)) {
                    throw new Error('Invalid format: expected an array of cases');
                }

                // Basic validation of each case
                for (const caseItem of cases) {
                    if (!caseItem.id || !caseItem.name) {
                        throw new Error('Invalid case structure: missing required fields');
                    }
                }

                saveCases(cases);
                resolve(cases);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error('Error reading file'));
        };

        reader.readAsText(file);
    });
}

// Get case by ID
function getCaseById(id) {
    const cases = loadCases();
    return cases.find(c => c.id === id);
}

// Add new case
function addCase(caseData) {
    const cases = loadCases();
    cases.push(caseData);
    saveCases(cases);
    return cases;
}

// Update case
function updateCase(id, caseData) {
    const cases = loadCases();
    const index = cases.findIndex(c => c.id === id);
    if (index !== -1) {
        cases[index] = { ...cases[index], ...caseData };
        saveCases(cases);
        return cases;
    }
    return null;
}

// Delete case
function deleteCase(id) {
    const cases = loadCases();
    const filtered = cases.filter(c => c.id !== id);
    saveCases(filtered);
    return filtered;
}

// Reorder cases
function reorderCase(fromIndex, toIndex) {
    const cases = loadCases();
    const [removed] = cases.splice(fromIndex, 1);
    cases.splice(toIndex, 0, removed);
    saveCases(cases);
    return cases;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getDefaultCases,
        loadCases,
        saveCases,
        resetCasesToDefault,
        exportCasesJSON,
        importCasesJSON,
        getCaseById,
        addCase,
        updateCase,
        deleteCase,
        reorderCase
    };
}
