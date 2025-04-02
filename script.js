// Initialize Firebase (replace the placeholders with your Firebase config)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCT1nS5OWF9MYSsUjESlTzwhAy3okZT86g",
    authDomain: "quiz-7bbcb.firebaseapp.com",
    projectId: "quiz-7bbcb",
    storageBucket: "quiz-7bbcb.firebasestorage.app",
    messagingSenderId: "809031886361",
    appId: "1:809031886361:web:946bfb60fd50b3254bec88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch questions from Firestore
const getQuestions = async () => {
    const questionsCollection = collection(db,'questions');
    const snapshot = await getDocs(questionsCollection);;
    const questions = snapshot.docs.map(doc => doc.data());
    return questions;
};


let questions = [];
let currentQuestionIndex = 0;
let answeredCount = 0;

const answeredCountElement = document.getElementById('answered-count');
const nextButton = document.getElementById('next-button');
const questionSection = document.getElementById('question-section');
const totalQuestionsElement = document.getElementById('total-questions');

// Fetch questions from Firestore and display them
async function loadQuestions() {
    questions = await getQuestions(); // Get questions from Firestore
    totalQuestionsElement.textContent = questions.length;
    showNextQuestion();
}

// Display the next question
function showNextQuestion() {
    if (currentQuestionIndex >= questions.length) {
        questionSection.innerHTML = "<h2>Completo!</h2>";
        nextButton.style.display = "none";
        return;
    }

    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    // Create question text and answer options
    questionElement.innerHTML = `
        <p style="font-size: 2em; font-weight: bold; color: #333; margin-bottom: 20px; text-align: left;">${question.text}</p>
        ${question.options.map((option, index) => `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
        `).join('')}
    `;

    questionSection.innerHTML = '';
    questionSection.appendChild(questionElement);
    currentQuestionIndex++;

    // Update the answered count
    answeredCountElement.textContent = answeredCount;
}

// Handle the next button click
nextButton.addEventListener('click', async () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert("Selecione uma resposta!");
        return;
    }

    answeredCount++; // Increase answered count

    const answer = selectedOption.value;
    const question = questions[currentQuestionIndex-1].text;

      // Store the answer in Firestore
    try {
        await addDoc(collection(db, 'answers'), {
            question: question,
          answer: answer,
        });
        console.log("Answer saved to Firestore!");
      } catch (error) {
        console.error("Error saving answer to Firestore: ", error);
      }

      showNextQuestion(); // Show the next question

});

// Initialize the quiz by loading questions
loadQuestions();
