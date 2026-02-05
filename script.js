/* =========================================
   1. CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
   ========================================= */
const body = document.body;
let is24Hour = true;

/* =========================================
   2. GESTÃO DO TEMA (DARK MODE)
   ========================================= */
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
}

/* =========================================
   3. RELÓGIO DIGITAL
   ========================================= */
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    if (!is24Hour) {
        hours = hours % 12 || 12;
    }
    
    const displayHours = String(hours).padStart(2, '0');
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    if (elHours) elHours.textContent = displayHours;
    if (elMinutes) elMinutes.textContent = displayMinutes;
    if (elSeconds) elSeconds.textContent = displaySeconds;
}

function initClock() {
    const savedFormat = localStorage.getItem('clockFormat');
    if (savedFormat) is24Hour = (savedFormat === '24');

    const formatBtn = document.getElementById('format-toggle');
    if (formatBtn) {
        formatBtn.addEventListener('click', () => {
            is24Hour = !is24Hour;
            localStorage.setItem('clockFormat', is24Hour ? '24' : '12');
            updateClock();
        });
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* =========================================
   4. CONTADOR DE VISITAS
   ========================================= */
function formatLastVisit(lastVisitISO) {
    if (!lastVisitISO) return 'Primeira vez aqui! 🎉';
    
    const lastVisit = new Date(lastVisitISO);
    const diff = new Date() - lastVisit;
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `Há ${minutes} min`;
    if (hours < 24) return `Há ${hours}h`;
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
}

function initVisitCounter() {
    const countElement = document.getElementById('visit-count');
    const lastVisitElement = document.getElementById('last-visit');
    const resetBtn = document.getElementById('reset-counter');

    // 1. Lógica de Incremento (Executa apenas uma vez ao carregar)
    let count = parseInt(localStorage.getItem('visitCount')) || 0;
    const lastVisitISO = localStorage.getItem('lastVisit');

    // Mostrar data da visita ANTERIOR antes de atualizar para a atual
    if (lastVisitElement) lastVisitElement.textContent = formatLastVisit(lastVisitISO);

    // Atualizar dados para a visita atual
    count++;
    localStorage.setItem('visitCount', count);
    localStorage.setItem('lastVisit', new Date().toISOString());

    if (countElement) countElement.textContent = count;

    // 2. Lógica de Reset
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (window.confirm('Queres resetar as estatísticas?')) {
                localStorage.removeItem('visitCount');
                localStorage.removeItem('lastVisit');
                location.reload(); 
            }
        });
    }
}

/* =========================================
   5. INICIALIZAÇÃO ÚNICA
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sistema iniciado');
    
    initTheme();
    initClock();
    initVisitCounter();

    // Ano do footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});