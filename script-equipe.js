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

    const translations = {
        mainTitle:    { fr: '👥 Rencontrez Notre Équipe', en: '👥 Meet Our Team' },
        introText:    { fr: 'Une équipe diversifiée et talentueuse, unie par la passion du développement web et l\'innovation technologique. Ensemble, nous transformons vos idées en réalité digitale.',
                        en: 'A diverse and talented team, united by a passion for web development and technological innovation. Together, we transform your ideas into digital reality.' },
        cultureTitle: { fr: '🌟 Notre Culture', en: '🌟 Our Culture' },
        member1:      { fr: 'Étudiant en génie informatique passionné par le développement web full-stack et l\'architecture logicielle moderne.',
                        en: 'Computer engineering student passionate about full-stack web development and modern software architecture.' },
        member2:      { fr: 'Créatrice d\'expériences utilisateur exceptionnelles avec un œil pour le design moderne et l\'accessibilité.',
                        en: 'Creator of exceptional user experiences with an eye for modern design and accessibility.' },
        member3:      { fr: 'Expert en architecture backend scalable et sécurité des applications web avec 5 ans d\'expérience.',
                        en: 'Expert in scalable backend architecture and web application security with 5 years of experience.' },
        member4:      { fr: 'Spécialiste du développement mobile cross-platform avec une passion pour les performances optimales.',
                        en: 'Cross-platform mobile development specialist with a passion for optimal performance.' },
        culture1: { title: { fr: 'Innovation Continue', en: 'Continuous Innovation' },
                    desc:  { fr: 'Nous encourageons l\'expérimentation et l\'adoption des technologies émergentes pour rester à la pointe.',
                             en: 'We encourage experimentation and adoption of emerging technologies to stay at the forefront.' } },
        culture2: { title: { fr: 'Travail d\'Équipe', en: 'Teamwork' },
                    desc:  { fr: 'La collaboration et le partage des connaissances sont au cœur de notre réussite collective.',
                             en: 'Collaboration and knowledge sharing are at the heart of our collective success.' } },
        culture3: { title: { fr: 'Apprentissage', en: 'Learning' },
                    desc:  { fr: 'Formation continue et développement professionnel pour chaque membre de l\'équipe.',
                             en: 'Continuous training and professional development for every team member.' } },
        culture4: { title: { fr: 'Excellence', en: 'Excellence' },
                    desc:  { fr: 'Nous visons toujours la plus haute qualité dans chaque projet que nous entreprenons.',
                             en: 'We always aim for the highest quality in every project we undertake.' } }
    };

    document.getElementById('main-title').textContent     = translations.mainTitle[lang];
    document.getElementById('intro-text').textContent     = translations.introText[lang];
    document.getElementById('culture-title').textContent  = translations.cultureTitle[lang];
    document.getElementById('member1-desc').textContent   = translations.member1[lang];
    document.getElementById('member2-desc').textContent   = translations.member2[lang];
    document.getElementById('member3-desc').textContent   = translations.member3[lang];
    document.getElementById('member4-desc').textContent   = translations.member4[lang];

    for (let i = 1; i <= 4; i++) {
        document.getElementById(`culture${i}-title`).textContent = translations[`culture${i}`].title[lang];
        document.getElementById(`culture${i}-desc`).textContent  = translations[`culture${i}`].desc[lang];
    }
}
