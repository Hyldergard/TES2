/**
 *  SKRIP HALAMAN LUPA PASSWORD (forgot-password.js)
 *  File ini menangani logika untuk mengirim email reset password kepada pengguna.
 *  - Inisialisasi Firebase Authentication.
 *  - Memvalidasi input email dari form.
 *  - Memanggil fungsi `sendPasswordResetEmail` dari Firebase.
 *  - Menampilkan notifikasi sukses atau error kepada pengguna.
 */

// --- Import Modul Firebase ---
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js'; // Import konfigurasi terpusat

// --- Fungsi Notifikasi ---
/**
 * Menampilkan notifikasi pop-up kepada pengguna.
 * @param {string} message - Pesan yang akan ditampilkan.
 * @param {string} type - Tipe notifikasi ('success' atau 'error').
 */
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = 'notification ';
        notification.classList.add(type);
        notification.style.display = 'block';
        // Notifikasi untuk reset password dibiarkan sedikit lebih lama
        setTimeout(() => {
            notification.style.display = 'none';
        }, 4000);
    }
}

// --- Inisialisasi Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase Auth initialized for password reset.");

// --- Event Listener untuk Form Lupa Password ---
document.addEventListener('DOMContentLoaded', function () {
    const forgotPasswordForm = document.querySelector('.forgot-password-form');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (event) => {
            // Mencegah reload halaman default
            event.preventDefault();
            
            // Mengambil nilai email dari input
            const email = document.getElementById('email').value;

            // Validasi: pastikan email telah diisi
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }

            try {
                // --- Kirim Email Reset Password ---
                // Memanggil fungsi Firebase untuk mengirim email reset ke alamat yang diberikan.
                await sendPasswordResetEmail(auth, email);

                // --- Proses Berhasil ---
                showNotification('Password reset email sent! Please check your inbox.', 'success');
                // Mengosongkan form setelah email berhasil dikirim.
                forgotPasswordForm.reset();

            } catch (error) {
                // --- Penanganan Error ---
                console.error("Error sending password reset email: ", error);

                // Memberikan pesan error yang lebih spesifik kepada pengguna.
                if (error.code === 'auth/user-not-found') {
                    showNotification('This email is not registered in our system.', 'error');
                } else {
                    // Pesan fallback untuk error lainnya.
                    showNotification('An error occurred. Please try again later.', 'error');
                }
            }
        });
    }
});
