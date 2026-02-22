/**
 *  SKRIP HALAMAN DASHBOARD (dashboard.js)
 *  File ini menangani interaksi di halaman dashboard, terutama untuk fungsionalitas sidebar.
 */

document.addEventListener('DOMContentLoaded', () => {

    const sidebarToggle = document.getElementById('sidebar-toggle');
    const body = document.body;

    // Cek apakah elemen ada
    if (sidebarToggle && body) {
        // Tambahkan event listener ke tombol toggle
        sidebarToggle.addEventListener('click', () => {
            // Toggle class 'sidebar-collapsed' pada elemen body
            body.classList.toggle('sidebar-collapsed');
        });
    }

    // Tambahkan fungsionalitas logout jika diperlukan
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Logika logout Firebase akan ditambahkan di sini nanti
            alert('Logout functionality will be added here.');
            // Contoh: firebase.auth().signOut().then(() => { window.location.href = 'index.html'; });
        });
    }
});
