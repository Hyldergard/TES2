/**
 *  SKRIP HALAMAN LOGIN (main.js)
 *  File ini menangani semua interaksi pengguna di halaman login (index.html).
 *  - Inisialisasi Firebase Authentication.
 *  - Mengelola fungsionalitas untuk menampilkan/menyembunyikan password.
 *  - Memvalidasi dan mengirimkan form login ke Firebase.
 *  - Menampilkan notifikasi untuk feedback kepada pengguna.
 */

// --- Import Modul Firebase ---
// Mengimpor fungsi yang diperlukan dari Firebase SDK.
// `initializeApp` untuk menghubungkan ke proyek Firebase.
// `getAuth` dan `signInWithEmailAndPassword` untuk proses otentikasi.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// Mengimpor konfigurasi Firebase dari file terpusat agar lebih rapi.
import { firebaseConfig } from './firebase-config.js';

// --- Fungsi Notifikasi ---
/**
 * Menampilkan notifikasi pop-up kepada pengguna.
 * @param {string} message - Pesan yang akan ditampilkan.
 * @param {string} type - Tipe notifikasi ('success' atau 'error') untuk styling.
 */
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = 'notification '; // Reset class
        notification.classList.add(type);      // Tambah class success atau error
        notification.style.display = 'block';    // Tampilkan notifikasi

        // Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

// --- Inisialisasi Firebase ---
// Menghubungkan aplikasi web ini dengan proyek Firebase Anda menggunakan konfigurasi yang diimpor.
const app = initializeApp(firebaseConfig);
// Mendapatkan instance dari layanan Firebase Authentication.
const auth = getAuth(app);

console.log("Firebase Auth initialized for login page.");

// --- Event Listeners untuk Interaksi DOM ---
// Menjalankan skrip setelah seluruh konten HTML selesai dimuat.
document.addEventListener('DOMContentLoaded', function () {

    // --- Logika Menampilkan/Menyembunyikan Password ---
    const passwordInput = document.getElementById('password');
    const togglePasswordShow = document.getElementById('toggle-password-show');
    const togglePasswordHide = document.getElementById('toggle-password-hide');

    if (passwordInput && togglePasswordShow && togglePasswordHide) {
        // Ketika ikon mata (show) diklik
        togglePasswordShow.addEventListener('click', () => {
            passwordInput.type = 'text'; // Ubah tipe input menjadi teks
            togglePasswordShow.style.display = 'none'; // Sembunyikan ikon 'show'
            togglePasswordHide.style.display = 'block'; // Tampilkan ikon 'hide'
        });

        // Ketika ikon mata coret (hide) diklik
        togglePasswordHide.addEventListener('click', () => {
            passwordInput.type = 'password'; // Kembalikan tipe input ke password
            togglePasswordHide.style.display = 'none'; // Sembunyikan ikon 'hide'
            togglePasswordShow.style.display = 'block'; // Tampilkan ikon 'show'
        });
    }

    // --- Logika Submission Form Login ---
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        // Menambahkan listener untuk event 'submit' pada form.
        loginForm.addEventListener('submit', async (event) => {
            // Mencegah form mengirim data secara default (yang akan me-reload halaman).
            event.preventDefault(); 
            
            // Mengambil nilai dari input email dan password.
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validasi sederhana: pastikan kedua field terisi.
            if (!email || !password) {
                showNotification('Please enter both email and password.', 'error');
                return; // Hentikan proses jika tidak valid
            }

            // Blok try-catch untuk menangani proses login asynchronous.
            try {
                // Mencoba untuk login pengguna dengan email dan password menggunakan Firebase Auth.
                await signInWithEmailAndPassword(auth, email, password);
                
                // Jika berhasil, tampilkan notifikasi sukses.
                showNotification('Login successful! Redirecting...', 'success');
                
                // Tunggu sejenak lalu arahkan pengguna ke halaman dashboard.
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                // Jika terjadi error saat login...
                console.error("Error during login: ", error); // Log error ke konsol untuk debugging.
                
                // Siapkan pesan error yang ramah untuk pengguna.
                let errorMessage = 'Invalid email or password.';
                // Firebase v9+ memberikan kode error spesifik 'auth/invalid-credential' untuk login gagal.
                if (error.code === 'auth/invalid-credential') {
                    errorMessage = 'Invalid email or password.';
                }
                // Tampilkan pesan error kepada pengguna.
                showNotification(errorMessage, 'error');
            }
        });
    }
});
