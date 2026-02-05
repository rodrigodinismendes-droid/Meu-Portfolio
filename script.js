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

    // ===== CONTADOR DE VISITAS =====

// 1. Função para obter contagem atual
function getVisitCount() {
    // Buscar do localStorage (retorna string ou null)
    const count = localStorage.getItem('visitCount');
    
    // Converter para número (ou 0 se não existir)
    return count ? parseInt(count) : 0;
}

// 2. Função para incrementar visitas
function incrementVisitCount() {
    // Obter contagem atual
    let count = getVisitCount();
    
    // Incrementar
    count++;
    
    // Guardar nova contagem
    localStorage.setItem('visitCount', count);
    
    // Guardar timestamp da visita
    const now = new Date().toISOString();
    localStorage.setItem('lastVisit', now);
    
    return count;
}

// 3. Função para atualizar o display
function updateVisitDisplay() {
    const count = getVisitCount();
    
    // Atualizar número
    const countElement = document.getElementById('visit-count');
    if (countElement) {
        countElement.textContent = count;
    }
    
    console.log(`📊 Visitas: ${count}`);
}
// 4. Função para formatar data
function formatLastVisit() {
    const lastVisitISO = localStorage.getItem('lastVisit');
    
    if (!lastVisitISO) {
        return 'Primeira vez aqui! 🎉';
    }
    
    const lastVisit = new Date(lastVisitISO);
    const now = new Date();
    
    // Calcular diferença em milissegundos
    const diff = now - lastVisit;
    
    // Converter para minutos/horas/dias
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Há menos de 1 minuto';
    if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
}

// 5. Atualizar display da última visita
function updateLastVisitDisplay() {
    const lastVisitText = formatLastVisit();
    
    const lastVisitElement = document.getElementById('last-visit');
    if (lastVisitElement) {
        lastVisitElement.textContent = lastVisitText;
    }
}

// 6. Função para inicializar o contador
function initVisitCounter() {
    // Incrementar visitas
    incrementVisitCount();
    
    // Atualizar displays
    updateVisitDisplay();
    updateLastVisitDisplay();
    
    console.log('📊 Contador de visitas inicializado!');
}

// 7. Executar quando página carrega
document.addEventListener('DOMContentLoaded', () => {
    initVisitCounter();
    // ... outras inicializações
});

// 8. Função para resetar contador
function resetVisitCounter() {
    // Confirmar com utilizador
    const confirm = window.confirm('Tens a certeza que queres resetar o contador?');
    
    if (confirm) {
        // Limpar localStorage
        localStorage.removeItem('visitCount');
        localStorage.removeItem('lastVisit');
        
        // Atualizar displays
        updateVisitDisplay();
        updateLastVisitDisplay();
        
        console.log('🔄 Contador resetado!');
        
        // Feedback visual
        alert('Contador resetado com sucesso!');
    }
}

// 9. Event listener no botão
const resetBtn = document.getElementById('reset-counter');
if (resetBtn) {
    resetBtn.addEventListener('click', resetVisitCounter);
}
});