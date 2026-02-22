import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js'; // Import centralized config

// --- Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase Auth and Firestore initialized for registration.");

// --- Registration Logic ---
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('.register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!email || !username || !password) {
                alert('Please fill in all fields.');
                return;
            }
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            try {
                // Step 1: Create user in Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Step 2: Save additional user info (like username) to Firestore
                await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email,
                    createdAt: new Date()
                });

                alert('Registration successful! You can now log in.');
                window.location.href = 'index.html';

            } catch (error) {
                console.error("Error during registration: ", error);
                if (error.code === 'auth/email-already-in-use') {
                    alert('This email address is already registered.');
                } else if (error.code === 'auth/weak-password') {
                    alert('The password is too weak. Please choose a stronger password.');
                } else {
                    alert('An error occurred during registration. Please try again.');
                }
            }
        });
    }
});
