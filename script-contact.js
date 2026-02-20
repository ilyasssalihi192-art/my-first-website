let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let comments    = JSON.parse(localStorage.getItem('comments'))    || [];

window.addEventListener('DOMContentLoaded', function () {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    updateAuthUI();
});

function openModal(modalId)  { document.getElementById(modalId).classList.add('active'); }
function closeModal(modalId) { document.getElementById(modalId).classList.remove('active'); }
function switchModal(closeId, openId) { closeModal(closeId); openModal(openId); }

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) event.target.classList.remove('active');
};

function handleRegister(event) {
    event.preventDefault();
    const name            = document.getElementById('register-name').value;
    const email           = document.getElementById('register-email').value;
    const password        = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-password-confirm').value;

    if (password !== confirmPassword) {
        alert(currentLang === 'fr' ? 'Les mots de passe ne correspondent pas !' : 'Passwords do not match!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        alert(currentLang === 'fr' ? 'Cet email est déjà utilisé !' : 'This email is already in use!');
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = { name, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    closeModal('registerModal');
    updateAuthUI();
    alert(currentLang === 'fr' ? '✓ Compte créé avec succès !' : '✓ Account created successfully!');
}

function handleLogin(event) {
    event.preventDefault();
    const email    = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const users    = JSON.parse(localStorage.getItem('users')) || [];
    const user     = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert(currentLang === 'fr' ? 'Email ou mot de passe incorrect !' : 'Incorrect email or password!');
        return;
    }

    currentUser = { name: user.name, email: user.email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    closeModal('loginModal');
    updateAuthUI();
    alert(currentLang === 'fr' ? `✓ Bienvenue ${user.name} !` : `✓ Welcome ${user.name}!`);
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    alert(currentLang === 'fr' ? '✓ Déconnexion réussie !' : '✓ Logout successful!');
}

function updateAuthUI() {
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    const loginBtn      = document.getElementById('loginBtn');
    const registerBtn   = document.getElementById('registerBtn');
    const userInfo      = document.getElementById('userInfo');
    const commentForm   = document.getElementById('commentForm');
    const loginRequired = document.getElementById('loginRequired');

    if (currentUser) {
        loginBtn.style.display    = 'none';
        registerBtn.style.display = 'none';
        userInfo.classList.add('active');
        document.getElementById('userName').textContent   = currentUser.name;
        document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
        commentForm.style.display   = 'block';
        loginRequired.style.display = 'none';
    } else {
        loginBtn.style.display    = 'block';
        registerBtn.style.display = 'block';
        userInfo.classList.remove('active');
        commentForm.style.display   = 'none';
        loginRequired.style.display = 'block';
    }

    loadComments();
}

function handleComment(event) {
    event.preventDefault();
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    if (!currentUser) {
        alert(currentLang === 'fr' ? 'Veuillez vous connecter pour commenter' : 'Please login to comment');
        return;
    }

    const commentText = document.getElementById('comment-text').value;
    const newComment  = {
        id:     Date.now(),
        author: currentUser.name,
        email:  currentUser.email,
        text:   commentText,
        date:   new Date().toLocaleString(currentLang === 'fr' ? 'fr-FR' : 'en-US')
    };

    comments.unshift(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
    document.getElementById('comment-text').value = '';
    loadComments();
}

function deleteComment(commentId) {
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    if (!currentUser) { alert(currentLang === 'fr' ? 'Veuillez vous connecter' : 'Please login'); return; }

    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    if (comment.email !== currentUser.email) {
        alert(currentLang === 'fr' ? 'Vous ne pouvez supprimer que vos propres commentaires' : 'You can only delete your own comments');
        return;
    }

    const msg = currentLang === 'fr' ? 'Êtes-vous sûr de vouloir supprimer ce commentaire ?' : 'Are you sure you want to delete this comment?';
    if (confirm(msg)) {
        comments = comments.filter(c => c.id !== commentId);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
        alert(currentLang === 'fr' ? '✓ Commentaire supprimé avec succès' : '✓ Comment deleted successfully');
    }
}

function loadComments() {
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    comments    = JSON.parse(localStorage.getItem('comments'))    || [];
    const commentsList = document.getElementById('commentsList');

    if (comments.length === 0) {
        commentsList.innerHTML = `<p style="text-align:center;color:rgba(255,255,255,0.6);padding:30px;">
            ${currentLang === 'fr' ? 'Aucun commentaire pour le moment. Soyez le premier à commenter !' : 'No comments yet. Be the first to comment!'}</p>`;
        return;
    }

    commentsList.innerHTML = comments.map(comment => {
        const canDelete = currentUser && currentUser.email === comment.email;
        return `
        <div class="comment-item">
            <div class="comment-header">
                <div class="comment-avatar">${comment.author.charAt(0).toUpperCase()}</div>
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${comment.date}</span>
                ${canDelete ? `<button class="delete-button" onclick="deleteComment(${comment.id})" title="${currentLang === 'fr' ? 'Supprimer' : 'Delete'}">
                    <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                </button>` : ''}
            </div>
            <div class="comment-text">${comment.text}</div>
        </div>`;
    }).join('');
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData     = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.disabled     = true;
        submitButton.textContent  = currentLang === 'fr' ? '⏳ Envoi en cours...' : '⏳ Sending...';

        try {
            const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
            const data     = await response.json();
            if (data.success) {
                showThankYouPage();
            } else {
                alert(currentLang === 'fr' ? '❌ Erreur lors de l\'envoi. Veuillez réessayer.' : '❌ Error sending message. Please try again.');
                submitButton.disabled    = false;
                submitButton.textContent = originalText;
            }
        } catch (error) {
            alert(currentLang === 'fr' ? '❌ Erreur de connexion. Veuillez réessayer.' : '❌ Connection error. Please try again.');
            submitButton.disabled    = false;
            submitButton.textContent = originalText;
        }
    });
}

function showThankYouPage() {
    document.body.innerHTML = `
        <style>
            @keyframes scaleIn { from { transform: scale(0) rotate(-180deg); } to { transform: scale(1) rotate(0deg); } }
            @keyframes slideUp  { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
        </style>
        <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;width:100%;padding:20px;animation:fadeIn 0.6s ease;">
            <div style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);border-radius:30px;padding:60px 40px;max-width:650px;width:100%;text-align:center;box-shadow:0 8px 32px rgba(31,38,135,0.37);animation:slideUp 0.6s ease;">
                <div style="width:120px;height:120px;margin:0 auto 30px;background:linear-gradient(135deg,#2ed573,#7bed9f);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:70px;animation:scaleIn 0.5s ease 0.3s backwards;box-shadow:0 8px 24px rgba(46,213,115,0.4);">✓</div>
                <h1 style="font-size:2.8em;margin-bottom:25px;color:#ffd700;text-shadow:2px 2px 4px rgba(0,0,0,0.3);font-weight:700;">
                    ${currentLang === 'fr' ? 'Message envoyé avec succès !' : 'Message sent successfully!'}</h1>
                <p style="font-size:1.3em;line-height:1.8;color:rgba(255,255,255,0.95);margin-bottom:45px;">
                    ${currentLang === 'fr' ? 'Merci pour votre message ! 🎉<br>J\'ai bien reçu votre demande et je vous répondrai dans les plus brefs délais.' : 'Thank you for your message! 🎉<br>I received your request and will respond to you as soon as possible.'}</p>
                <button onclick="location.reload()" style="padding:18px 50px;background:linear-gradient(135deg,#ffd700,#a0f0ed);color:#2c3e50;border:none;border-radius:50px;font-weight:700;font-size:1.15em;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(255,215,0,0.3);font-family:'Segoe UI',sans-serif;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    ${currentLang === 'fr' ? '← Retour au site' : '← Back to site'}</button>
                <div style="margin-top:35px;padding-top:35px;border-top:1px solid rgba(255,255,255,0.2);">
                    <div style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
                        <div style="padding:12px 25px;background:rgba(255,255,255,0.1);border-radius:12px;font-size:1em;color:rgba(255,255,255,0.85);">
                            💌 ${currentLang === 'fr' ? 'Email de confirmation envoyé' : 'Confirmation email sent'}</div>
                        <div style="padding:12px 25px;background:rgba(255,255,255,0.1);border-radius:12px;font-size:1em;color:rgba(255,255,255,0.85);">
                            ⏱️ ${currentLang === 'fr' ? 'Réponse sous 24-48h' : 'Response within 24-48h'}</div>
                    </div>
                </div>
                <div style="margin-top:25px;font-size:1em;color:rgba(255,255,255,0.7);">
                    ${currentLang === 'fr' ? 'Rechargement automatique dans' : 'Automatic reload in'} <strong id="countdown" style="color:#ffd700;">10</strong> ${currentLang === 'fr' ? 'secondes' : 'seconds'}...
                </div>
            </div>
        </div>`;

    let seconds = 10;
    const iv = setInterval(() => {
        seconds--;
        const el = document.getElementById('countdown');
        if (el) el.textContent = seconds;
        if (seconds <= 0) { clearInterval(iv); location.reload(); }
    }, 1000);
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    applyLanguage(lang);
    loadComments();
}

function applyLanguage(lang) {
    applyLangButtons(lang);

    const placeholders = {
        name:    { fr: 'Jean Dupont',              en: 'John Doe' },
        email:   { fr: 'jean.dupont@exemple.com',  en: 'john.doe@example.com' },
        message: { fr: 'Votre message...',          en: 'Your message...' },
        comment: { fr: 'Partagez votre avis...',    en: 'Share your thoughts...' }
    };

    document.getElementById('name').placeholder         = placeholders.name[lang];
    document.getElementById('email').placeholder        = placeholders.email[lang];
    document.getElementById('message').placeholder      = placeholders.message[lang];
    document.getElementById('comment-text').placeholder = placeholders.comment[lang];

    document.querySelectorAll('#subject option').forEach(opt => {
        if (opt.hasAttribute('data-' + lang)) opt.textContent = opt.getAttribute('data-' + lang);
    });

    const t = {
        mainTitle:    { fr: '📬 Envoyez-nous un message',              en: '📬 Send us a message' },
        introText:    { fr: 'Vous avez un projet en tête ? Une question ? N\'hésitez pas à nous contacter. Nous serons ravis d\'échanger avec vous et de répondre à toutes vos questions dans les plus brefs délais.',
                        en: 'Do you have a project in mind? A question? Don\'t hesitate to contact us. We will be happy to discuss with you and answer all your questions as soon as possible.' },
        formTitle:    { fr: '✉️ Formulaire de contact',                en: '✉️ Contact Form' },
        locationTitle:{ fr: '📍 Notre localisation',                   en: '📍 Our Location' },
        socialTitle:  { fr: '🌐 Suivez-nous sur les réseaux sociaux',  en: '🌐 Follow us on social media' },
        commentsTitle:{ fr: '💬 Commentaires',                         en: '💬 Comments' },
        loginTitle:   { fr: '🔐 Connexion',                            en: '🔐 Login' },
        registerTitle:{ fr: '📝 Créer un compte',                      en: '📝 Create Account' }
    };

    document.getElementById('main-title').textContent     = t.mainTitle[lang];
    document.getElementById('intro-text').textContent     = t.introText[lang];
    document.getElementById('form-title').textContent     = t.formTitle[lang];
    document.getElementById('location-title').textContent = t.locationTitle[lang];
    document.getElementById('social-title').textContent   = t.socialTitle[lang];
    document.getElementById('comments-title').textContent = t.commentsTitle[lang];
    document.getElementById('login-title').textContent    = t.loginTitle[lang];
    document.getElementById('register-title').textContent = t.registerTitle[lang];

    const m = {
        loginPasswordLabel:             { fr: 'Mot de passe',                en: 'Password' },
        loginSubmit:                    { fr: 'Se connecter',                en: 'Login' },
        loginSwitchText:                { fr: 'Pas encore de compte ?',      en: "Don't have an account?" },
        loginSwitchLink:                { fr: 'Créer un compte',             en: 'Create account' },
        registerNameLabel:              { fr: 'Nom complet',                 en: 'Full Name' },
        registerPasswordLabel:          { fr: 'Mot de passe',                en: 'Password' },
        registerPasswordConfirmLabel:   { fr: 'Confirmer le mot de passe',   en: 'Confirm Password' },
        registerSubmit:                 { fr: 'Créer mon compte',            en: 'Create my account' },
        registerSwitchText:             { fr: 'Déjà inscrit ?',              en: 'Already registered?' },
        registerSwitchLink:             { fr: 'Se connecter',                en: 'Login' }
    };

    document.getElementById('login-password-label').textContent            = m.loginPasswordLabel[lang];
    document.getElementById('login-submit').textContent                    = m.loginSubmit[lang];
    document.getElementById('login-switch-text').textContent               = m.loginSwitchText[lang];
    document.getElementById('login-switch-link').textContent               = m.loginSwitchLink[lang];
    document.getElementById('register-name-label').textContent             = m.registerNameLabel[lang];
    document.getElementById('register-password-label').textContent         = m.registerPasswordLabel[lang];
    document.getElementById('register-password-confirm-label').textContent = m.registerPasswordConfirmLabel[lang];
    document.getElementById('register-submit').textContent                 = m.registerSubmit[lang];
    document.getElementById('register-switch-text').textContent            = m.registerSwitchText[lang];
    document.getElementById('register-switch-link').textContent            = m.registerSwitchLink[lang];
}
