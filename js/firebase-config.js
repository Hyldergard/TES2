/**
 *  KONFIGURASI FIREBASE (firebase-config.js)
 *  File ini berisi objek konfigurasi yang diperlukan untuk menghubungkan aplikasi web Anda
 *  dengan proyek Firebase di cloud.
 *
 *  PENTING:
 *  - Objek `firebaseConfig` diekspor (export) agar bisa diimpor (import) dan digunakan oleh file
 *    JavaScript lain (seperti main.js, register.js) yang perlu berinteraksi dengan Firebase.
 *  - Memisahkan konfigurasi ke dalam file tersendiri adalah praktik yang baik untuk keteraturan kode.
 *  - Informasi ini didapatkan dari konsol Firebase saat Anda membuat aplikasi web baru di proyek Anda.
 */

// Objek konfigurasi ini berisi kunci unik yang mengidentifikasi proyek Firebase Anda.
export const firebaseConfig = {
    "projectId": "pkmapps-47491484-69b61",
    "appId": "1:1072858119691:web:77284cae91ec47cd65910e",
    "storageBucket": "pkmapps-47491484-69b61.firebasestorage.app",
    // CATATAN: Meskipun API Key terlihat, Firebase menggunakan Aturan Keamanan (Security Rules)
    // untuk melindungi data Anda di sisi backend. Akses tidak sah akan diblokir oleh aturan tersebut.
    "apiKey": "AIzaSyB6WiNB9Uiw8RWBk8K1i6L7ArJXnktP-n8",
    "authDomain": "pkmapps-47491484-69b61.firebaseapp.com",
    "messagingSenderId": "1072858119691"
};
