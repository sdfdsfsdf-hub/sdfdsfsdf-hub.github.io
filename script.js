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
        // Quiz completed, show a message or reset
        questionSection.innerHTML = "<h2>Quiz Complete!</h2>";
        nextButton.style.display = "none";
        return;
    }

    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    // Create question text and answer options
    questionElement.innerHTML = `
        <p>${question.text}</p>
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
nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        answeredCount++; // Increase answered count
    }
    showNextQuestion(); // Show the next question
});

// Initialize the quiz by loading questions
loadQuestions();
