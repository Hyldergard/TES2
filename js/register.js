/**
 *  SKRIP HALAMAN REGISTRASI (register.js)
 *  File ini menangani logika untuk mendaftarkan pengguna baru.
 *  - Inisialisasi Firebase Authentication dan Firestore.
 *  - Memvalidasi input dari form registrasi.
 *  - Membuat pengguna baru di Firebase Authentication.
 *  - Menyimpan informasi tambahan pengguna (seperti username) di Firestore.
 *  - Memberikan feedback kepada pengguna mengenai status pendaftaran.
 */

// --- Import Modul Firebase ---
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js'; // Import konfigurasi terpusat

// --- Inisialisasi Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Layanan Otentikasi
const db = getFirestore(app); // Layanan Database Firestore

console.log("Firebase Auth and Firestore initialized for registration.");

// --- Fungsi Bantuan untuk Notifikasi ---
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.textContent = message;
    notification.className = 'notification show';
    if (isError) {
        notification.classList.add('error');
    }

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// --- Logika Registrasi ---
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('.register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!email || !username || !password) {
                showNotification('Please fill in all fields.', true);
                return;
            }
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters long.', true);
                return;
            }

            try {
                // Langkah 1: Buat Pengguna di Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Langkah 2: Simpan Informasi Tambahan Pengguna di Firestore
                // Dokumen akan memiliki ID yang sama dengan UID pengguna dari Authentication.
                await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email,
                    createdAt: new Date()
                });

                console.log(`User data for UID ${user.uid} saved to Firestore.`);

                // --- Proses Berhasil ---
                showNotification('Registration successful! Redirecting to login...');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);

            } catch (error) {
                console.error("Error during registration: ", error);
                if (error.code === 'auth/email-already-in-use') {
                    showNotification('This email address is already registered.', true);
                } else {
                    showNotification('An error occurred during registration. Please try again.', true);
                }
            }
        });
    }
});
