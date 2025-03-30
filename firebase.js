// Initialize Firebase (replace the placeholders with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyCT1nS5OWF9MYSsUjESlTzwhAy3okZT86g",
    authDomain: "quiz-7bbcb.firebaseapp.com",
    projectId: "quiz-7bbcb",
    storageBucket: "quiz-7bbcb.firebasestorage.app",
    messagingSenderId: "809031886361",
    appId: "1:809031886361:web:946bfb60fd50b3254bec88"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch questions from Firestore
const getQuestions = async () => {
    const questionsCollection = db.collection('questions');
    const snapshot = await questionsCollection.get();
    const questions = snapshot.docs.map(doc => doc.data());
    return questions;
};
