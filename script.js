/* =========================================
   1. DADOS DOS PROJETOS (Base de Dados)
   ========================================= */
const projects = [
    {
        id: 1,
        title: 'E-commerce Website',
        category: 'web',
        description: 'Loja online completa com carrinho de compras',
        image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=E-commerce',
        tags: ['HTML', 'CSS', 'JavaScript', 'API'],
        link: '#',
        longDescription: 'Website de e-commerce completo com sistema de carrinho, checkout, e integração com API de pagamentos. Interface moderna e responsiva.',
        features: ['Carrinho de compras', 'Sistema de pagamento', 'Área de utilizador', 'Gestão de produtos'],
        technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage', 'Fetch API'],
        date: '2025-01'
    },
    {
        id: 2,
        title: 'App de Tarefas',
        category: 'web',
        description: 'Gestor de tarefas com filtros e categorias',
        image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Todo+App',
        tags: ['React', 'CSS', 'LocalStorage'],
        link: '#',
        longDescription: 'Aplicação de gestão de tarefas com sistema de prioridades, categorias e persistência local.',
        features: ['Adicionar/editar/remover tarefas', 'Filtros por estado', 'Categorias', 'Persistência de dados'],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
        date: '2024-12'
    },
    {
        id: 3,
        title: 'Portfolio Designer',
        category: 'design',
        description: 'Portfolio criativo para designer gráfico',
        image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Portfolio',
        tags: ['Figma', 'UI/UX', 'Protótipo'],
        link: '#',
        longDescription: 'Design de portfolio minimalista e elegante para apresentar trabalhos criativos.',
        features: ['Design responsivo', 'Animações suaves', 'Galeria de trabalhos', 'Formulário de contacto'],
        technologies: ['Figma', 'Design System', 'Prototyping'],
        date: '2024-11'
    },
    {
        id: 4,
        title: 'App Meteorologia',
        category: 'mobile',
        description: 'App mobile para consultar previsão do tempo',
        image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Weather+App',
        tags: ['React Native', 'API', 'Mobile'],
        link: '#',
        longDescription: 'Aplicação mobile para consultar previsão meteorológica com dados em tempo real.',
        features: ['Previsão 7 dias', 'Localização automática', 'Alertas meteorológicos', 'Favoritos'],
        technologies: ['React Native', 'Weather API', 'Geolocation'],
        date: '2025-01'
    },
    {
        id: 5,
        title: 'Dashboard Analytics',
        category: 'web',
        description: 'Dashboard com gráficos e estatísticas',
        image: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Dashboard',
        tags: ['Vue.js', 'Charts', 'API'],
        link: '#',
        longDescription: 'Dashboard interativo para visualização de dados e analytics com gráficos dinâmicos.',
        features: ['Gráficos interativos', 'Filtros de data', 'Exportar relatórios', 'Tempo real'],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'API'],
        date: '2024-10'
    },
    {
        id: 6,
        title: 'Redesign Logo Empresa',
        category: 'design',
        description: 'Redesign de identidade visual corporativa',
        image: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Logo+Design',
        tags: ['Illustrator', 'Branding', 'Logo'],
        link: '#',
        longDescription: 'Projeto de redesign completo de identidade visual incluindo logo, cores e tipografia.',
        features: ['Logo principal', 'Variações', 'Manual de marca', 'Mockups'],
        technologies: ['Adobe Illustrator', 'Photoshop', 'InDesign'],
        date: '2024-09'
    }
];

/* =========================================
   2. CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
   ========================================= */
const body = document.body;
let is24Hour = true;
let currentCategory = 'all';

/* =========================================
   3. GESTÃO DO TEMA (DARK MODE)
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
   4. RELÓGIO DIGITAL
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
   5. CONTADOR DE VISITAS
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

    // Lógica de Incremento
    let count = parseInt(localStorage.getItem('visitCount')) || 0;
    const lastVisitISO = localStorage.getItem('lastVisit');

    if (lastVisitElement) lastVisitElement.textContent = formatLastVisit(lastVisitISO);

    // Incrementa apenas se a sessão for nova (opcional, aqui incrementa sempre no reload)
    count++;
    localStorage.setItem('visitCount', count);
    localStorage.setItem('lastVisit', new Date().toISOString());

    if (countElement) countElement.textContent = count;

    // Lógica de Reset
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
   6. LÓGICA DE PROJETOS (Render, Filtro, Pesquisa)
   ========================================= */

// Renderizar Cards na Grid
function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');
    
    if (!grid) return; // Segurança

    grid.innerHTML = ''; // Limpar grid atual
    
    if (projectsToRender.length === 0) {
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
    
    projectsToRender.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        // Importante: Guardar o ID para o modal
        card.onclick = () => openModal(project);
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-card-body">
                <span class="project-category">${project.category.toUpperCase()}</span>
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    updateCounters();
}

// Atualizar contadores nos botões
function updateCounters() {
    const counts = {
        all: projects.length,
        web: projects.filter(p => p.category === 'web').length,
        mobile: projects.filter(p => p.category === 'mobile').length,
        design: projects.filter(p => p.category === 'design').length
    };

    // Atualiza o texto dentro da span .count de cada botão
    for (const [key, value] of Object.entries(counts)) {
        const btn = document.querySelector(`.filter-btn[data-filter="${key}"] .count`);
        if (btn) btn.textContent = value;
    }
}

// Inicializar Filtros e Pesquisa
function initProjectControls() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');

    // 1. Filtros (Botões)
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adicionar ao clicado
            btn.classList.add('active');
            
            currentCategory = btn.dataset.filter; // ex: 'web', 'all'
            
            filterAndSearchProjects();
        });
    });

    // 2. Pesquisa (Input)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterAndSearchProjects(e.target.value);
        });
    }
}

// Função Central de Filtragem (combina Categoria + Pesquisa)
function filterAndSearchProjects(searchTerm = '') {
    const searchLower = searchTerm.toLowerCase();
    const searchInput = document.getElementById('search-input');
    // Se não veio termo (clique no botão), usa o que está no input
    const term = searchTerm || (searchInput ? searchInput.value.toLowerCase() : '');

    const filtered = projects.filter(project => {
        // Verifica Categoria
        const matchCategory = currentCategory === 'all' || project.category === currentCategory;
        
        // Verifica Pesquisa (Título ou Tags)
        const matchSearch = project.title.toLowerCase().includes(term) || 
                          project.tags.some(tag => tag.toLowerCase().includes(term));

        return matchCategory && matchSearch;
    });

    renderProjects(filtered);
}

/* =========================================
   7. MODAL (Detalhes do Projeto)
   ========================================= */
function openModal(project) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    // Preencher dados no modal
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-description').textContent = project.longDescription;
    document.getElementById('modal-date').textContent = project.date;
    
    // Preencher listas (features e tech)
    const featuresList = document.getElementById('modal-features');
    const techList = document.getElementById('modal-tech');
    
    if (featuresList) {
        featuresList.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
    }
    if (techList) {
        techList.innerHTML = project.technologies.map(t => `<span class="tag">${t}</span>`).join('');
    }

    // Link do projeto
    const linkBtn = document.getElementById('modal-link');
    if (linkBtn) linkBtn.href = project.link;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Impede scroll no fundo
}

function initModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Fechar ao clicar fora do conteúdo
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

/* =========================================
   8. INICIALIZAÇÃO ÚNICA (Main)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sistema iniciado');
    
    initTheme();
    initClock();
    initVisitCounter();
    
    // Inicializar Projetos e Controles
    renderProjects(projects);
    initProjectControls();
    initModal();

    // Ano do footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();


    // ===== SISTEMA DE FILTROS =====

function filterProjects(category) {
    // Guardar categoria atual
    currentCategory = category;
    
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }
    
    // Re-renderizar com projetos filtrados
    renderProjects(filteredProjects);
    
    console.log(`Filtro aplicado: ${category} (${filteredProjects.length} projetos)`);
}

// ===== EVENT LISTENERS PARA FILTROS =====

function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar active ao clicado
            button.classList.add('active');
            
            // Obter categoria do data attribute
            const category = button.dataset.category;
            
            // Filtrar projetos
            filterProjects(category);
        });
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();  // ADICIONAR ESTA LINHA
    console.log('✅ Filtros configurados!');

    
});

// ===== SISTEMA DE MODAL =====

function openModal(projectId) {
    // Encontrar projeto pelo ID
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        console.error('Projeto não encontrado!');
        return;
    }
    
    // Preencher conteúdo do modal
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <span class="modal-category">${project.category}</span>
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="modal-image">
        
        <div class="modal-section">
            <h3>Sobre o Projeto</h3>
            <p>${project.longDescription}</p>
        </div>
        
        <div class="modal-section">
            <h3>Funcionalidades</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Tecnologias Utilizadas</h3>
            <div class="modal-tech">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        <a href="${project.link}" target="_blank" class="modal-link">
            Ver Projeto Completo →
        </a>
    `;
    
    // Mostrar modal
    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
    
    console.log(`Modal aberto: ${project.title}`);
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    
    // Restaurar scroll
    document.body.style.overflow = 'auto';
    
    console.log('Modal fechado');
}
// ===== EVENT LISTENERS DO MODAL =====

function setupModalListeners() {
    // Event Delegation nos cards
    const grid = document.getElementById('projects-grid');
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = parseInt(card.dataset.id);
            openModal(projectId);
        }
    });
    
    // Fechar modal ao clicar no X
    const closeBtn = document.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora (no overlay)
    const modal = document.getElementById('project-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();  // ADICIONAR ESTA LINHA
    console.log('✅ Modal configurado!');
});

});