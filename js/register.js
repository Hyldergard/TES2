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

// --- Logika Registrasi ---
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('.register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            // Mencegah form dari reload halaman default
            event.preventDefault();

            // Mengambil nilai dari setiap input field
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // --- Validasi Input Sederhana ---
            if (!email || !username || !password) {
                alert('Please fill in all fields.');
                return; // Hentikan eksekusi
            }
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return; // Hentikan eksekusi
            }

            try {
                // --- Langkah 1: Buat Pengguna di Firebase Authentication ---
                // Ini akan membuat record pengguna baru dengan email dan password.
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // --- Langkah 2: Simpan Informasi Tambahan Pengguna di Firestore ---
                // `user.uid` adalah ID unik yang diberikan Firebase untuk setiap pengguna.
                // Kita akan membuat dokumen baru di koleksi "users" dengan ID tersebut.
                await setDoc(doc(db, "users", user.uid), {
                    username: username, // Simpan username
                    email: email,       // Simpan email
                    createdAt: new Date() // Simpan tanggal pembuatan akun
                });

                // --- Proses Berhasil ---
                alert('Registration successful! You can now log in.');
                // Arahkan pengguna ke halaman login setelah berhasil mendaftar.
                window.location.href = 'index.html';

            } catch (error) {
                // --- Penanganan Error ---
                console.error("Error during registration: ", error); // Log error untuk debugging

                // Memberikan pesan yang lebih spesifik kepada pengguna berdasarkan kode error dari Firebase.
                if (error.code === 'auth/email-already-in-use') {
                    alert('This email address is already registered.');
                } else if (error.code === 'auth/weak-password') {
                    alert('The password is too weak. Please choose a stronger password.');
                } else {
                    // Pesan fallback jika terjadi error lain
                    alert('An error occurred during registration. Please try again.');
                }
            }
        });
    }
});
