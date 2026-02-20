let currentLang  = localStorage.getItem('preferredLanguage') || 'fr';
let currentTheme = localStorage.getItem('preferredTheme')    || 'endra';

function changeTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('preferredTheme', theme);
    applyTheme(theme);
}

function applyTheme(theme) {
    const wasCategorySelected = document.body.classList.contains('category-selected');
    document.body.className = '';
    document.body.classList.add('theme-' + theme);
    if (wasCategorySelected) document.body.classList.add('category-selected');

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((theme === 'endra' && btn.textContent.includes('ENDRA')) ||
            (theme === 'normal' && btn.textContent.includes('NORMAL'))) {
            btn.classList.add('active');
        }
    });
}

function applyLangButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((lang === 'fr' && btn.textContent.includes('FR')) ||
            (lang === 'en' && btn.textContent.includes('EN'))) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
}
