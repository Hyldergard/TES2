/**
 *  SKRIP HALAMAN LOGIN (main.js)
 *  - Inisialisasi Firebase Authentication dan Firestore.
 *  - Mengelola fungsionalitas untuk menampilkan/menyembunyikan password.
 *  - Memvalidasi form login.
 *  - Mengambil data pengguna (username) dari Firestore setelah login berhasil.
 *  - Menyimpan username ke sessionStorage untuk digunakan di dashboard.
 */

// --- Import Modul Firebase ---
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

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
    }, 3000);
}

// --- Inisialisasi Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Inisialisasi Firestore

console.log("Firebase Auth and Firestore initialized for login page.");

// --- Event Listeners untuk Interaksi DOM ---
document.addEventListener('DOMContentLoaded', function () {

    // --- Toggle Password Visibility ---
    // (Kode ini tetap sama)

    // --- Logika Submission Form Login ---
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                showNotification('Please enter both email and password.', true);
                return;
            }

            try {
                // Langkah 1: Login dengan Firebase Auth
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Langkah 2: Ambil data pengguna dari Firestore menggunakan UID
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                let username = email.split('@')[0]; // Default username jika tidak ditemukan

                if (userDocSnap.exists()) {
                    // Jika dokumen ditemukan, gunakan username dari sana
                    username = userDocSnap.data().username;
                    console.log(`Username '${username}' fetched from Firestore.`);
                } else {
                    // Jika dokumen tidak ada (misalnya untuk pengguna lama), log pesan peringatan
                    console.warn(`User document not found in Firestore for UID ${user.uid}. Using fallback username.`);
                }

                // Langkah 3: Simpan username ke sessionStorage
                sessionStorage.setItem('loggedInUsername', username);
                console.log(`Username '${username}' saved to sessionStorage.`);

                // Langkah 4: Beri feedback dan arahkan ke dashboard
                showNotification('Login successful! Redirecting...', false);
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                console.error("Error during login: ", error);
                showNotification('Invalid email or password.', true);
            }
        });
    }
    
    // Logika untuk toggle password (disembunyikan untuk keringkasan, tidak ada perubahan)
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
});
