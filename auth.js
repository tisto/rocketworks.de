// Passwortschutz für die Website
(function() {
    // Zugangsdaten (in Produktion sollten diese serverseitig geprüft werden)
    const validUsername = 'rocketworks';
    const validPassword = 'thadäus2';

    // Prüfen ob bereits authentifiziert
    if (sessionStorage.getItem('authenticated') === 'true') {
        return;
    }

    // Funktion zum Erstellen des Login-Overlays
    function showLoginPrompt() {
        // Erstelle Overlay
        const overlay = document.createElement('div');
        overlay.id = 'auth-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;

        // Erstelle Login-Formular
        const loginBox = document.createElement('div');
        loginBox.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 90%;
        `;

        loginBox.innerHTML = `
            <h2 style="margin-bottom: 1.5rem; text-align: center; color: #1f2937;">🚀 Rocketworks Login</h2>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Benutzername</label>
                <input type="text" id="auth-username" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 1rem;">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Passwort</label>
                <input type="password" id="auth-password" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 1rem;">
            </div>
            <div id="auth-error" style="color: #dc2626; margin-bottom: 1rem; display: none; text-align: center;">Ungültige Zugangsdaten!</div>
            <button id="auth-submit" style="width: 100%; padding: 0.75rem; background: linear-gradient(to right, #2563eb, #9333ea); color: white; border: none; border-radius: 4px; font-size: 1rem; font-weight: 600; cursor: pointer;">Anmelden</button>
        `;

        overlay.appendChild(loginBox);
        document.body.appendChild(overlay);

        // Event-Listener für das Formular
        const usernameInput = document.getElementById('auth-username');
        const passwordInput = document.getElementById('auth-password');
        const submitButton = document.getElementById('auth-submit');
        const errorDiv = document.getElementById('auth-error');

        function checkCredentials() {
            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username === validUsername && password === validPassword) {
                sessionStorage.setItem('authenticated', 'true');
                overlay.remove();
            } else {
                errorDiv.style.display = 'block';
                passwordInput.value = '';
                passwordInput.focus();
            }
        }

        submitButton.addEventListener('click', checkCredentials);

        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkCredentials();
            }
        });

        usernameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                passwordInput.focus();
            }
        });

        // Fokus auf Benutzername-Feld
        setTimeout(() => usernameInput.focus(), 100);
    }

    // Zeige Login-Prompt wenn Seite geladen ist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showLoginPrompt);
    } else {
        showLoginPrompt();
    }
})();
