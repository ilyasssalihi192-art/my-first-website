window.addEventListener('DOMContentLoaded', function () {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
});

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    applyLanguage(lang);
}

function applyLanguage(lang) {
    applyLangButtons(lang);

    const mainTitles = {
        about:  { fr: '👋 Information Personnelle', en: '👋 Personal Information' },
        xp:     { fr: '💼 Expérience',              en: '💼 Experience' },
        skills: { fr: '🎯 Skills & Expertise',      en: '🎯 Skills & Expertise' }
    };

    const aboutTexts = {
        p1: { fr: 'Bonjour! Je suis <strong>Salihi Ilyass</strong>, étudiant passionné avec 2 ans d\'expérience en programmation MIP. Je me spécialise en Python et en programmation web.',
              en: 'Hello! I\'m <strong>Salihi Ilyass</strong>, a passionate student with 2 years of experience in MIP programming. I specialize in Python and web programming.' },
        p2: { fr: 'Je m\'engage à créer des solutions pertinentes et efficaces qui fassent la différence. Quand je ne travaille pas, vous me trouverez en train de regarder des animés.',
              en: 'I am committed to creating relevant and effective solutions that make a difference. When I\'m not working, you\'ll find me watching anime.' },
        p3: { fr: 'Je crois en la formation continue et je m\'efforce toujours d\'élargir mes connaissances et mes compétences.',
              en: 'I believe in continuous learning and always strive to expand my knowledge and skills.' }
    };

    const experienceCards = {
        card1: {
            title: { fr: 'Développement Web', en: 'Web Development' },
            items: [
                { fr: 'Création de sites web personnels en utilisant HTML, CSS et JS',         en: 'Creating personal websites using HTML, CSS and JS' },
                { fr: 'Préparation partie serveur de ces sites en utilisant PHP et Python',    en: 'Server-side preparation of these sites using PHP and Python' }
            ]
        },
        card2: {
            title: { fr: 'Programmation', en: 'Programming' },
            items: [
                { fr: 'Résoudre des multiproblèmes sur les programmes C',                                                                      en: 'Solving multiple problems on C programs' },
                { fr: 'Création des petits projets en Python comme les dictionnaires visuels et les scripts',                                  en: 'Creating small Python projects like visual dictionaries and scripts' },
                { fr: 'Une petite expérience sur le Deep Learning et les frameworks pour Python et PHP',                                        en: 'A little experience with Deep Learning and frameworks for Python and PHP' }
            ]
        },
        card3: {
            title: { fr: 'Compétences', en: 'Skills' },
            items: [
                { fr: 'Langages : Python, C, HTML, CSS, JavaScript, PHP',                          en: 'Languages: Python, C, HTML, CSS, JavaScript, PHP' },
                { fr: 'Outils : Git, Visual Studio Code, CodeBlocks',                              en: 'Tools: Git, Visual Studio Code, CodeBlocks' },
                { fr: 'Langues : Arabe (natif), Français (courant), Anglais (intermédiaire)',       en: 'Languages: Arabic (native), French (fluent), English (intermediate)' },
                { fr: 'Pratique : Développement web, POO, Gestion serveur',                        en: 'Practice: Web development, OOP, Server management' },
                { fr: 'Spécialités : Hardware en général',                                          en: 'Specialties: Hardware in general' }
            ]
        }
    };

    const skills = [
        { fr: '📚 Lecture',          en: '📚 Reading' },
        { fr: '💻 Informatique',     en: '💻 Computer Science' },
        { fr: '⚽ Sport',            en: '⚽ Sports' },
        { fr: '🎮 Gaming',           en: '🎮 Gaming' },
        { fr: '🎵 Musique',          en: '🎵 Music' },
        { fr: '🧩 Problem Solving',  en: '🧩 Problem Solving' },
        { fr: '👥 Team Leadership',  en: '👥 Team Leadership' }
    ];

    document.querySelector('#about h2').textContent       = mainTitles.about[lang];
    document.querySelector('#experience h2').textContent  = mainTitles.xp[lang];
    document.querySelector('.skills-section h2').textContent = mainTitles.skills[lang];

    const aboutPs = document.querySelectorAll('#about p');
    aboutPs[0].innerHTML = aboutTexts.p1[lang];
    aboutPs[1].innerHTML = aboutTexts.p2[lang];
    aboutPs[2].innerHTML = aboutTexts.p3[lang];

    const cards = document.querySelectorAll('.experience-card');
    ['card1', 'card2', 'card3'].forEach((key, idx) => {
        cards[idx].querySelector('h3').textContent = experienceCards[key].title[lang];
        cards[idx].querySelectorAll('li').forEach((li, i) => {
            li.textContent = experienceCards[key].items[i][lang];
        });
    });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, i) => { item.textContent = skills[i][lang]; });
}
