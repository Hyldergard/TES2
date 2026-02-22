/**
 *  SKRIP HALAMAN DASHBOARD (dashboard.js)
 *  - Mengelola tampilan nama pengguna yang sedang login.
 *  - Menangani fungsionalitas sidebar (toggle).
 *  - Mengimplementasikan proses logout dari Firebase.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {

    const sidebarToggle = document.getElementById('sidebar-toggle');
    const body = document.body;
    const mainHeader = document.querySelector('.main-header h1');
    const logoutButton = document.getElementById('logout-btn');

    // --- 1. Tampilkan Nama Pengguna ---
    // Ambil nama pengguna dari sessionStorage
    const loggedInUsername = sessionStorage.getItem('loggedInUsername');

    if (mainHeader) {
        if (loggedInUsername) {
            // Jika ada, sapa pengguna dengan namanya
            mainHeader.textContent = `Welcome, ${loggedInUsername}!`;
        } else {
            // Fallback jika tidak ada nama pengguna
            mainHeader.textContent = 'Welcome to your Dashboard!';
        }
    }

    // --- 2. Fungsionalitas Toggle Sidebar ---
    if (sidebarToggle && body) {
        sidebarToggle.addEventListener('click', () => {
            body.classList.toggle('sidebar-collapsed');
        });
    }

    // --- 3. Fungsionalitas Logout ---
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault(); // Mencegah link dari navigasi
            
            try {
                // Panggil fungsi signOut dari Firebase Auth
                await signOut(auth);
                
                // Hapus data sesi dari sessionStorage
                sessionStorage.removeItem('loggedInUsername');
                
                // Beri tahu pengguna dan arahkan ke halaman login
                alert('You have been logged out successfully.');
                window.location.href = 'index.html';

            } catch (error) {
                console.error('Error during logout: ', error);
                alert('An error occurred during logout. Please try again.');
            }
        });
    }
});
