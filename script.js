console.log('🚀 Portfolio carregado com sucesso!');

// Teste: mudar cor de fundo ao clicar
document.body.addEventListener('click', () => {
    console.log('Clicaste na página!');


    const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    // Alterna a classe .dark-mode no corpo da página
    body.classList.toggle('dark-mode');
    
    // Opcional: Guardar a preferência do utilizador no navegador
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Verificar se o utilizador já tinha escolhido o modo escuro antes
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}
});

