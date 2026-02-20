let currentFilter = 'all';

window.addEventListener('DOMContentLoaded', function () {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    updateStats();
});

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    applyLanguage(lang);
}

function applyLanguage(lang) {
    applyLangButtons(lang);

    const translations = {
        mainTitle: { fr: '🚀 Mes Projets', en: '🚀 My Projects' },
        introText: { fr: 'Découvrez une sélection de mes réalisations les plus récentes. Chaque projet représente un défi unique et une opportunité d\'apprentissage.',
                     en: 'Discover a selection of my most recent achievements. Each project represents a unique challenge and a learning opportunity.' },
        project1: { title: { fr: 'Site E-commerce', en: 'E-commerce Website' },
                    desc:  { fr: 'Une plateforme de vente en ligne complète avec panier d\'achat, système de paiement sécurisé et gestion avancée des stocks en temps réel.',
                             en: 'A complete online sales platform with shopping cart, secure payment system and advanced real-time inventory management.' } },
        project2: { title: { fr: 'Application Mobile', en: 'Mobile Application' },
                    desc:  { fr: 'Application de gestion de tâches avec synchronisation cloud instantanée, notifications push et interface intuitive.',
                             en: 'Task management application with instant cloud synchronization, push notifications and intuitive interface.' } },
        project3: { title: { fr: 'Dashboard Analytics', en: 'Analytics Dashboard' },
                    desc:  { fr: 'Interface de visualisation de données avec graphiques interactifs en temps réel et rapports personnalisables exportables.',
                             en: 'Data visualization interface with real-time interactive charts and exportable customizable reports.' } },
        project4: { title: { fr: 'Blog Personnel', en: 'Personal Blog' },
                    desc:  { fr: 'Plateforme de blog moderne avec système de commentaires, recherche avancée, catégorisation et éditeur WYSIWYG.',
                             en: 'Modern blog platform with comment system, advanced search, categorization and WYSIWYG editor.' } },
        project5: { title: { fr: 'Jeu Web Interactif', en: 'Interactive Web Game' },
                    desc:  { fr: 'Jeu de stratégie en temps réel avec animations fluides 60fps, système de score et multijoueur en ligne.',
                             en: 'Real-time strategy game with smooth 60fps animations, scoring system and online multiplayer.' } },
        project6: { title: { fr: 'API RESTful', en: 'RESTful API' },
                    desc:  { fr: 'Service web robuste pour la gestion de ressources avec authentification JWT, documentation Swagger et tests automatisés.',
                             en: 'Robust web service for resource management with JWT authentication, Swagger documentation and automated tests.' } }
    };

    document.getElementById('main-title').textContent = translations.mainTitle[lang];
    document.getElementById('intro-text').textContent = translations.introText[lang];

    for (let i = 1; i <= 6; i++) {
        document.getElementById(`project${i}-title`).textContent = translations[`project${i}`].title[lang];
        document.getElementById(`project${i}-desc`).textContent  = translations[`project${i}`].desc[lang];
    }

    updateStats();
}

function filterProjects(category) {
    currentFilter = category;
    const projectCards  = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    projectCards.forEach(card => {
        const cats = card.getAttribute('data-category').split(' ');
        if (category === 'all' || cats.includes(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    updateStats();
}

function updateStats() {
    const allProjects      = document.querySelectorAll('.project-card');
    const visibleProjects  = document.querySelectorAll('.project-card:not(.hidden)');
    const completedProjects = Array.from(visibleProjects).filter(c => c.querySelector('.status-completed'));
    const progressProjects  = Array.from(visibleProjects).filter(c => c.querySelector('.status-progress'));

    const word = currentLang === 'fr' ? 'projets' : 'projects';
    document.getElementById('total-count').textContent     = `${allProjects.length} ${word}`;
    document.getElementById('displayed-count').textContent = `${visibleProjects.length} ${word}`;
    document.getElementById('completed-count').textContent = `${completedProjects.length} ${word}`;
    document.getElementById('progress-count').textContent  = `${progressProjects.length} ${word}`;
}
