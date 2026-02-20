let currentCategory = null;

window.addEventListener('DOMContentLoaded', function () {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
});

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    applyLanguage(lang);
}

function highlightService(category) {
    const clickedCategory = event.target.closest('.service-category');

    if (currentCategory === category) {
        document.querySelectorAll('.service-category').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.service-card').forEach(c => c.classList.remove('highlighted'));
        document.body.classList.remove('category-selected');
        currentCategory = null;
    } else {
        document.body.classList.add('category-selected');
        document.querySelectorAll('.service-category').forEach(c => c.classList.remove('active'));
        clickedCategory.classList.add('active');

        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('highlighted');
            if (card.getAttribute('data-service') === category) {
                card.classList.add('highlighted');
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        currentCategory = category;
    }
}

function applyLanguage(lang) {
    applyLangButtons(lang);

    const translations = {
        mainTitle: { fr: '🌟 Nos Services', en: '🌟 Our Services' },
        introText: { fr: 'Découvrez notre gamme complète de services professionnels. Nous mettons notre expertise à votre service pour concrétiser vos projets digitaux avec excellence et innovation.',
                     en: 'Discover our complete range of professional services. We put our expertise at your service to bring your digital projects to life with excellence and innovation.' },
        service1: { title: { fr: 'Design Web',            en: 'Web Design' },
                    desc:  { fr: 'Création de designs modernes et attractifs pour votre site web. Interface utilisateur intuitive et responsive adaptée à tous les écrans.',
                             en: 'Creation of modern and attractive designs for your website. Intuitive and responsive user interface adapted to all screens.' } },
        service2: { title: { fr: 'Développement',         en: 'Development' },
                    desc:  { fr: 'Développement d\'applications web performantes avec les dernières technologies. Code propre, maintenable et optimisé pour la performance.',
                             en: 'Development of high-performance web applications with the latest technologies. Clean, maintainable code optimized for performance.' } },
        service3: { title: { fr: 'Applications Mobile',   en: 'Mobile Applications' },
                    desc:  { fr: 'Création d\'applications mobiles natives et hybrides pour iOS et Android. Expérience utilisateur optimale et fonctionnalités avancées.',
                             en: 'Creation of native and hybrid mobile applications for iOS and Android. Optimal user experience and advanced features.' } },
        service4: { title: { fr: 'Marketing Digital',     en: 'Digital Marketing' },
                    desc:  { fr: 'Stratégies de marketing digital pour augmenter votre visibilité en ligne. SEO, réseaux sociaux, publicité et analytics.',
                             en: 'Digital marketing strategies to increase your online visibility. SEO, social media, advertising and analytics.' } },
        service5: { title: { fr: 'Sécurité',              en: 'Security' },
                    desc:  { fr: 'Audit et sécurisation de vos applications web. Protection contre les vulnérabilités, conformité RGPD et tests de pénétration.',
                             en: 'Audit and securing of your web applications. Protection against vulnerabilities, GDPR compliance and penetration testing.' } },
        service6: { title: { fr: 'Maintenance',           en: 'Maintenance' },
                    desc:  { fr: 'Support technique et maintenance continue de vos projets. Mise à jour régulière, correction de bugs et assistance 24/7.',
                             en: 'Technical support and continuous maintenance of your projects. Regular updates, bug fixes and 24/7 assistance.' } }
    };

    document.getElementById('main-title').textContent = translations.mainTitle[lang];
    document.getElementById('intro-text').textContent = translations.introText[lang];

    for (let i = 1; i <= 6; i++) {
        document.getElementById(`service${i}-title`).textContent = translations[`service${i}`].title[lang];
        document.getElementById(`service${i}-desc`).textContent  = translations[`service${i}`].desc[lang];
    }
}
