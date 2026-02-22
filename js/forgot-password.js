import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
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
        }, 4000);
    }
}

// --- Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase Auth initialized for password reset.");

// --- DOM Event Listeners ---
document.addEventListener('DOMContentLoaded', function () {
    const forgotPasswordForm = document.querySelector('.forgot-password-form');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;

            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }

            try {
                await sendPasswordResetEmail(auth, email);
                showNotification('Password reset email sent! Please check your inbox.', 'success');
                forgotPasswordForm.reset();
            } catch (error) {
                console.error("Error sending password reset email: ", error);
                if (error.code === 'auth/user-not-found') {
                    showNotification('This email is not registered in our system.', 'error');
                } else {
                    showNotification('An error occurred. Please try again later.', 'error');
                }
            }
        });
    }
});
