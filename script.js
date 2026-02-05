console.log('🚀 Portfolio carregado com sucesso!');

/* =========================================
   1. GESTÃO DO TEMA (DARK MODE)
   ========================================= */
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Função para verificar preferência guardada ao iniciar
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
}

// Evento de clique no botão de tema
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Guardar a preferência
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

/* =========================================
   2. RELÓGIO DIGITAL
   ========================================= */
let is24Hour = true;
let clockInterval;

// Função principal de atualizar o tempo
function updateClock() {
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Lógica 12h/24h
    if (!is24Hour) {
        hours = hours % 12 || 12; // Transforma 0 em 12
    }
    
    // Formatação (adicionar zero: 9 -> 09)
    const displayHours = String(hours).padStart(2, '0');
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    
    // Atualizar HTML (com verificação de segurança)
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    if (elHours) elHours.textContent = displayHours;
    if (elMinutes) elMinutes.textContent = displayMinutes;
    if (elSeconds) elSeconds.textContent = displaySeconds;
}

// Função para alternar formato
function toggleFormat() {
    is24Hour = !is24Hour;
    localStorage.setItem('clockFormat', is24Hour ? '24' : '12');
    updateClock(); // Atualiza logo para não esperar 1 seg
    console.log(`Formato alterado para: ${is24Hour ? '24h' : '12h'}`);
}

// Carregar formato guardado
function loadClockFormat() {
    const savedFormat = localStorage.getItem('clockFormat');
    if (savedFormat) {
        is24Hour = (savedFormat === '24');
    }
}

/* =========================================
   3. INICIALIZAÇÃO (QUANDO A PÁGINA CARREGA)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Carregar Tema
    loadTheme();

    // 2. Configurar Relógio
    loadClockFormat();
    updateClock(); // Primeira chamada imediata
    setInterval(updateClock, 1000); // Inicia o intervalo
    
    // 3. Configurar Botão do Relógio
    const formatBtn = document.getElementById('format-toggle');
    if (formatBtn) {
        formatBtn.addEventListener('click', toggleFormat);
    }

    // 4. Atualizar o Ano no Footer automaticamente
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    console.log('✅ Sistema inicializado corretamente.');
});