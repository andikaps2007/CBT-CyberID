let tabFocusLost = false;
let timerInterval;

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        tabFocusLost = true;
        stopExam("Ujian dihentikan karena Anda berpindah dari halaman.");
    }
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "Gathanfairuaslam" && password === "Gyathan") {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert("Username atau password salah!");
    }
});

document.getElementById('start-exam').addEventListener('click', function() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    startTimer();
    showQuestion();
});

const questions = [
    {
        question: "Siapa penemu bola lampu?",
        options: ["Thomas Edison", "Albert Einstein", "Nikola Tesla", "Alexander Graham Bell"],
        answer: "Thomas Edison"
    },
    {
        question: "Apa ibukota dari Jepang?",
        options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        answer: "Tokyo"
    },
    {
        question: "Planet apa yang dikenal sebagai planet merah?",
        options: ["Mars", "Venus", "Jupiter", "Saturnus"],
        answer: "Mars"
    },
    {
        question: "Siapa penulis novel 'Harry Potter'?",
        options: ["J.K. Rowling", "J.R.R. Tolkien", "George R.R. Martin", "Stephen King"],
        answer: "J.K. Rowling"
    },
    {
        question: "Berapa jumlah warna pada pelangi?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "Apa hewan nasional dari Australia?",
        options: ["Koala", "Kanguru", "Emu", "Dingo"],
        answer: "Kanguru"
    },
    {
        question: "Apa bahasa resmi Brasil?",
        options: ["Spanyol", "Portugis", "Inggris", "Prancis"],
        answer: "Portugis"
    },
    {
        question: "Siapa yang melukis Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "Apa gunung tertinggi di dunia?",
        options: ["K2", "Kilimanjaro", "Everest", "Denali"],
        answer: "Everest"
    },
    {
        question: "Di negara mana Menara Eiffel berada?",
        options: ["Italia", "Jerman", "Spanyol", "Prancis"],
        answer: "Prancis"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 10 * 60; // 10 menit dalam detik
let userAnswers = new Array(questions.length).fill(null);

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionData = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${questionData.question}</h2>
        ${questionData.options.map((option, index) => `
            <div>
                <input type="radio" id="option${index}" name="answer" value="${option}" ${userAnswers[currentQuestionIndex] === option ? 'checked' : ''}>
                <label for="option${index}">${option}</label>
            </div>
        `).join('')}
    `;

    // Tampilkan atau sembunyikan tombol navigasi
    document.getElementById('prev-button').style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    document.getElementById('next-button').style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('finish-button').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
    }
}

function startTimer() {
    const timeDisplay = document.getElementById('time-remaining');
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            clearInterval(timerInterval);
            finishExam();
        }
    }, 1000);
}

function finishExam() {
    checkAnswer();
    score = userAnswers.reduce((total, answer, index) => {
        return total + (answer === questions[index].answer ? 1 : 0);
    }, 0);
    alert(`Ujian selesai! Skor Anda: ${score} dari ${questions.length}`);
    // Opsi untuk mengarahkan ke halaman lain atau mereset kuis
}

function stopExam(message) {
    clearInterval(timerInterval);
    alert(message);
    document.getElementById('app').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

document.getElementById('prev-button').addEventListener('click', () => {
    checkAnswer();
    currentQuestionIndex--;
    showQuestion();
});

document.getElementById('next-button').addEventListener('click', () => {
    checkAnswer();
    currentQuestionIndex++;
    showQuestion();
});

document.getElementById('finish-button').addEventListener('click', () => {
    finishExam();
});

showQuestion();