import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js'; // Import centralized config

// --- Notification Function ---
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = 'notification ';
        notification.classList.add(type);
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

// --- Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase Auth initialized for login.");

// --- DOM Event Listeners ---
document.addEventListener('DOMContentLoaded', function () {

    // Password visibility toggle
    const passwordInput = document.getElementById('password');
    const togglePasswordShow = document.getElementById('toggle-password-show');
    const togglePasswordHide = document.getElementById('toggle-password-hide');

    if (passwordInput && togglePasswordShow && togglePasswordHide) {
        togglePasswordShow.addEventListener('click', () => {
            passwordInput.type = 'text';
            togglePasswordShow.style.display = 'none';
            togglePasswordHide.style.display = 'block';
        });

        togglePasswordHide.addEventListener('click', () => {
            passwordInput.type = 'password';
            togglePasswordHide.style.display = 'none';
            togglePasswordShow.style.display = 'block';
        });
    }

    // Login form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                showNotification('Please enter both email and password.', 'error');
                return;
            }

            try {
                await signInWithEmailAndPassword(auth, email, password);
                showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } catch (error) {
                console.error("Error during login: ", error);
                let errorMessage = 'Invalid email or password.';
                if (error.code === 'auth/invalid-credential') {
                    // This is a more specific error from Firebase v9+
                    errorMessage = 'Invalid email or password.';
                }
                showNotification(errorMessage, 'error');
            }
        });
    }
});
