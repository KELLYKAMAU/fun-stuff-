// ============================================
// VALENTINE'S DAY WEBSITE - JAVASCRIPT
// ============================================

// Configuration - UPDATE THESE VALUES
const CONFIG = {
    herName: "Reemie Wambui",           // Replace with her name
    yourName: "Kelly Kamau",     // Replace with your name
    personalMessage: "Hey wamboo ,I know ur wondering but I do know u might have a pretty good guess,it may seem odd but I do have a request?",  // Replace with your personal message
    relationshipStartDate: "2025-12-19",  // Format: YYYY-MM-DD (when you started dating/met - optional)
    enableLoveCounter: true,  // Set to false to hide love counter
    // Reasons why she's special - UPDATE THESE with personal, genuine reasons
    reasonsWhySpecial: [
        { icon: "✨", text: "Your energy is magnetic—when you talk, I genuinely want to listen" },
        { icon: "💫", text: "You have this way of making ordinary moments feel meaningful" },
        { icon: "🌙", text: "Your smile—I don't know how to explain it, but it stays with me" },
        { icon: "💭", text: "The way you think about things shows depth I really admire" },
        { icon: "🤍", text: "You're real. No games, no pretense—just authentically you" },
        { icon: "💕", text: "Every conversation with you feels like a gift I didn't know I needed" }
    ],
    closingNote: "These are just a few reasons why I'm grateful you're giving me a chance. I see something special in you, and I want to understand it better—slowly, genuinely, and with real intention."
};

// DOM Elements
const scrollButton = document.getElementById('scrollButton');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const successScreen = document.getElementById('successScreen');
const messageSection = document.getElementById('messageSection');
const question1Section = document.getElementById('question1Section');
const question2Section = document.getElementById('question2Section');
const question3Section = document.getElementById('question3Section');
const hintText = document.getElementById('hintText');

// Question 1 elements
const yesButton1 = document.getElementById('yesButton1');
const noButton1 = document.getElementById('noButton1');
const secretAnswer1 = document.getElementById('secretAnswer1');
const reaction1 = document.getElementById('reaction1');

// Question 2 elements
const loveMeterFill = document.getElementById('loveMeterFill');
const loveMeterText = document.getElementById('loveMeterText');
const meterButton1 = document.getElementById('meterButton1');
const meterButton2 = document.getElementById('meterButton2');
const meterButton3 = document.getElementById('meterButton3');
const meterButton4 = document.getElementById('meterButton4');
const continueButton = document.getElementById('continueButton');
const reaction2 = document.getElementById('reaction2');

// Question 3 elements
const reaction3 = document.getElementById('reaction3');

// Special section elements
const specialSection = document.getElementById('specialSection');
const reasonsGrid = document.getElementById('reasonsGrid');
const closingNoteText = document.getElementById('closingNoteText');

// Quiz elements
const dateQuizSection = document.getElementById('dateQuizSection');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizProgressText = document.getElementById('quizProgressText');
const quizProgressFill = document.getElementById('quizProgressFill');
const quizResult = document.getElementById('quizResult');
const quizResultText = document.getElementById('quizResultText');
const quizContinueButton = document.getElementById('quizContinueButton');
const datePlanInlineText = document.getElementById('datePlanInlineText');
const reactionQuiz = document.getElementById('reactionQuiz');

// Quiz state
let currentQuizQuestion = 0;
let quizAnswers = {};
let datePlan = '';

// Quiz questions
const quizQuestions = [
    {
        question: "What's your ideal date vibe?",
        options: [
            { text: "Cozy & intimate ☕", value: "cozy" },
            { text: "Adventure & fun 🎢", value: "adventure" },
            { text: "Romantic & fancy 💐", value: "romantic" },
            { text: "Casual & relaxed 😊", value: "casual" }
        ]
    },
    {
        question: "What time of day works best?",
        options: [
            { text: "Morning ☀️", value: "morning" },
            { text: "Afternoon 🌤️", value: "afternoon" },
            { text: "Evening 🌙", value: "evening" },
            { text: "Anytime! ✨", value: "flexible" }
        ]
    },
    {
        question: "What sounds most appealing?",
        options: [
            { text: "Food & drinks 🍽️", value: "food" },
            { text: "Activity or event 🎭", value: "activity" },
            { text: "Nature & outdoors 🌳", value: "nature" },
            { text: "Something creative 🎨", value: "creative" }
        ]
    }
];

// Date plan templates based on quiz answers
const datePlans = {
    cozy_morning_food: "A cozy morning coffee date at a quiet café, followed by brunch at a spot with great vibes. Just us, good conversation, and no rush.",
    cozy_afternoon_food: "An afternoon at a cute restaurant or café, maybe dessert after. Low-key, comfortable, perfect for getting to know each other better.",
    cozy_evening_food: "Dinner at a warm, intimate restaurant with great food and atmosphere. We can take our time, talk, and just enjoy each other's company.",
    cozy_flexible_food: "A relaxed food adventure — maybe brunch, lunch, or dinner at a place you'd love. I'll pick somewhere cozy and comfortable.",
    
    adventure_morning_activity: "An early morning adventure — maybe hiking, exploring a new area, or trying something active together. Then we grab food after!",
    adventure_afternoon_activity: "An afternoon of fun — could be an escape room, mini golf, arcade, or something active. Then we grab a bite and chat.",
    adventure_evening_activity: "An evening event or activity — maybe a concert, comedy show, or something fun happening in town. Then dinner after.",
    adventure_flexible_activity: "Something fun and active — I'll plan an adventure based on what's happening. Could be anything from exploring to trying something new!",
    
    romantic_morning_nature: "A morning walk in a beautiful park or garden, maybe a picnic breakfast. Peaceful, romantic, and just us.",
    romantic_afternoon_nature: "An afternoon in nature — maybe a botanical garden, scenic spot, or beautiful park. Then we can grab something to eat.",
    romantic_evening_nature: "A sunset walk somewhere beautiful, followed by a nice dinner. Romantic, thoughtful, and perfect for us.",
    romantic_flexible_nature: "A romantic day in nature — I'll plan something beautiful and peaceful. Maybe a garden, park, or scenic spot you'd love.",
    
    casual_morning_creative: "A casual morning doing something creative together — maybe a painting class, pottery, or something fun and low-pressure.",
    casual_afternoon_creative: "An afternoon creative activity — could be a workshop, art class, or something hands-on. Then we grab food and chat.",
    casual_evening_creative: "An evening creative experience — maybe a cooking class, art event, or something fun. Then dinner somewhere relaxed.",
    casual_flexible_creative: "Something creative and fun — I'll find a cool workshop or activity we can do together. Low-pressure and enjoyable.",
    
    // Fallback plans
    default_cozy: "A cozy, comfortable date — maybe coffee, food, or just hanging out somewhere nice. I'll make sure it's relaxed and perfect for us.",
    default_adventure: "Something fun and adventurous — I'll plan an activity or event we can enjoy together. It'll be memorable!",
    default_romantic: "A romantic, thoughtful date — I'll plan something special that shows I care. Something beautiful and meaningful.",
    default_casual: "A casual, relaxed date — nothing fancy, just us spending quality time together. I'll make sure it's comfortable and fun."
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializePersonalization();
    setupEventListeners();
    setupSmoothScrolling();
    checkImageLoad();
    if (CONFIG.enableLoveCounter) {
        initializeLoveCounter();
    }
    initializeShareButton();
});

// ============================================
// IMAGE LOAD CHECK
// ============================================

function checkImageLoad() {
    const herPhoto = document.getElementById('herPhoto');
    if (herPhoto) {
        herPhoto.addEventListener('error', () => {
            // Image failed to load, show placeholder
            const placeholder = herPhoto.nextElementSibling;
            if (placeholder && placeholder.classList.contains('photo-placeholder')) {
                herPhoto.style.display = 'none';
                placeholder.style.display = 'flex';
            }
        });
        
        // Check if image is already loaded or if src is missing
        if (!herPhoto.complete || !herPhoto.naturalWidth) {
            // Try to load the image
            const img = new Image();
            img.onerror = () => {
                const placeholder = herPhoto.nextElementSibling;
                if (placeholder && placeholder.classList.contains('photo-placeholder')) {
                    herPhoto.style.display = 'none';
                    placeholder.style.display = 'flex';
                }
            };
            img.src = herPhoto.src;
        }
    }
}

// ============================================
// PERSONALIZATION
// ============================================

function initializePersonalization() {
    // Update her name
    const herNameElement = document.getElementById('herName');
    if (herNameElement && CONFIG.herName !== "[INSERT NAME]") {
        herNameElement.textContent = CONFIG.herName;
    }
    
    // Update your name
    const yourNameElement = document.getElementById('yourName');
    if (yourNameElement && CONFIG.yourName !== "[INSERT YOUR NAME]") {
        yourNameElement.textContent = CONFIG.yourName;
    }
    
    // Update personal message
    const personalMessageElement = document.getElementById('personalMessage');
    if (personalMessageElement && CONFIG.personalMessage !== "[INSERT YOUR MESSAGE HERE]") {
        personalMessageElement.textContent = CONFIG.personalMessage;
    }
    
    // Initialize special reasons section
    initializeSpecialReasons();
    
    // Update closing note
    const closingNoteElement = document.getElementById('closingNoteText');
    if (closingNoteElement && CONFIG.closingNote) {
        closingNoteElement.textContent = CONFIG.closingNote;
    }
}

function initializeSpecialReasons() {
    const reasonsGridElement = document.getElementById('reasonsGrid');
    if (!reasonsGridElement || !CONFIG.reasonsWhySpecial || CONFIG.reasonsWhySpecial.length === 0) {
        return;
    }
    
    // Clear any existing content
    reasonsGridElement.innerHTML = '';
    
    // Create reason cards with staggered animations
    CONFIG.reasonsWhySpecial.forEach((reason, index) => {
        const reasonCard = document.createElement('div');
        reasonCard.className = 'reason-card';
        reasonCard.style.animationDelay = `${index * 0.15}s`;
        
        reasonCard.innerHTML = `
            <div class="reason-icon">${reason.icon}</div>
            <p class="reason-text">${reason.text}</p>
        `;
        
        // Add click interaction for extra engagement
        reasonCard.addEventListener('click', () => {
            reasonCard.style.transform = 'scale(1.05)';
            setTimeout(() => {
                reasonCard.style.transform = '';
            }, 200);
            
            // Small confetti on click
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 5,
                    spread: 20,
                    origin: { y: 0.5 },
                    colors: ['#ff6b9d', '#ff1493']
                });
            }
        });
        
        reasonsGridElement.appendChild(reasonCard);
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Scroll button
    if (scrollButton) {
        scrollButton.addEventListener('click', () => {
            messageSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Question 1 buttons
    if (yesButton1) {
        yesButton1.addEventListener('click', () => handleQuestion1Yes());
    }
    if (noButton1) {
        noButton1.addEventListener('click', () => handleQuestion1No());
    }
    
    // Question 2 - Love meter buttons
    if (meterButton1) meterButton1.addEventListener('click', () => updateLoveMeter(25));
    if (meterButton2) meterButton2.addEventListener('click', () => updateLoveMeter(50));
    if (meterButton3) meterButton3.addEventListener('click', () => updateLoveMeter(100));
    if (meterButton4) meterButton4.addEventListener('click', () => updateLoveMeter(200));
    if (continueButton) {
        continueButton.addEventListener('click', () => showDateQuiz());
    }
    
    // Quiz continue button
    if (quizContinueButton) {
        quizContinueButton.addEventListener('click', () => {
            showQuestion3();
        });
    }
    
    // Question 3 buttons
    if (yesButton) {
        yesButton.addEventListener('click', handleYesClick);
    }
    
    // No button - with fun behavior
    if (noButton) {
        noButton.addEventListener('mouseenter', handleNoHover);
        noButton.addEventListener('click', handleNoClick);
    }
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (currentQuestion === 3) {
            if (e.key === 'y' || e.key === 'Y') {
                handleYesClick();
            } else if (e.key === 'n' || e.key === 'N') {
                handleNoClick();
            }
        }
    });
}

// ============================================
// YES BUTTON HANDLER
// ============================================

// ============================================
// QUESTION 1 HANDLERS
// ============================================

function handleQuestion1Yes() {
    reaction1.textContent = '😍';
    reaction1.style.animation = 'bounce 0.5s ease';
    secretAnswer1.classList.remove('hidden');
    secretAnswer1.style.animation = 'fadeInUp 0.5s ease';
    
    // Small confetti burst
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ff6b9d', '#ff1493', '#ffb3d9']
        });
    }
    
    setTimeout(() => {
        question1Section.classList.add('hidden');
        showQuestion2();
    }, 2000);
}

function handleQuestion1No() {
    reaction1.textContent = '😢';
    reaction1.style.animation = 'shake 0.5s ease';
    
    // Show secret answer anyway (playful)
    setTimeout(() => {
        reaction1.textContent = '😊';
        secretAnswer1.textContent = "I know you're just being shy! 💕";
        secretAnswer1.classList.remove('hidden');
        secretAnswer1.style.animation = 'fadeInUp 0.5s ease';
        
        setTimeout(() => {
            question1Section.classList.add('hidden');
            showQuestion2();
        }, 2000);
    }, 1000);
}

function showQuestion2() {
    question2Section.classList.remove('hidden');
    question2Section.style.display = 'flex';
    question2Section.style.opacity = '1';
    question2Section.style.transform = 'translateY(0)';
    question2Section.scrollIntoView({ behavior: 'smooth' });
    if (reaction2) {
        reaction2.style.animation = 'pulse 1s ease infinite';
    }
}

// ============================================
// QUESTION 2 - LOVE METER
// ============================================

function updateLoveMeter(value) {
    loveMeterValue = Math.max(loveMeterValue, value);
    
    // Update meter visual
    if (loveMeterFill) {
        const percentage = Math.min(loveMeterValue, 200);
        loveMeterFill.style.width = `${percentage}%`;
        
        // Change color based on value
        if (percentage >= 200) {
            loveMeterFill.style.background = 'linear-gradient(90deg, #c77dff, #ff6b9d, #ff1493, #9333ea, #c77dff)';
            loveMeterFill.style.backgroundSize = '200% 100%';
            loveMeterFill.style.animation = 'gradientShift 2s ease infinite';
        } else if (percentage >= 100) {
            loveMeterFill.style.background = 'linear-gradient(90deg, #c77dff, #ff6b9d, #ff1493)';
        } else {
            loveMeterFill.style.background = 'linear-gradient(90deg, #ffb3d9, #c77dff, #ff6b9d)';
        }
    }
    
    // Update text
    if (loveMeterText) {
        if (loveMeterValue >= 200) {
            loveMeterText.textContent = '∞% (Infinity!)';
            loveMeterText.style.fontSize = '1.5rem';
        } else {
            loveMeterText.textContent = `${loveMeterValue}%`;
        }
    }
    
    // Show continue button when meter is high enough
    if (loveMeterValue >= 50 && continueButton) {
        continueButton.classList.remove('hidden');
        continueButton.style.animation = 'fadeInUp 0.5s ease';
    }
    
    // Confetti burst for high values
    if (loveMeterValue >= 100 && typeof confetti !== 'undefined') {
        confetti({
            particleCount: 20,
            spread: 40,
            origin: { y: 0.5 },
            colors: ['#ff6b9d', '#ff1493']
        });
    }
}

// ============================================
// DATE QUIZ FUNCTIONALITY
// ============================================

function showDateQuiz() {
    question2Section.classList.add('hidden');
    dateQuizSection.classList.remove('hidden');
    dateQuizSection.style.display = 'flex';
    dateQuizSection.style.opacity = '1';
    dateQuizSection.style.transform = 'translateY(0)';
    dateQuizSection.scrollIntoView({ behavior: 'smooth' });
    
    // Reset quiz state
    currentQuizQuestion = 0;
    quizAnswers = {};
    quizResult.classList.add('hidden');
    
    // Show first question
    displayQuizQuestion();
    
    if (reactionQuiz) {
        reactionQuiz.style.animation = 'pulse 1s ease infinite';
    }
}

function displayQuizQuestion() {
    if (currentQuizQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }
    
    const question = quizQuestions[currentQuizQuestion];
    
    // Update progress
    const progress = ((currentQuizQuestion + 1) / quizQuestions.length) * 100;
    quizProgressFill.style.width = `${progress}%`;
    quizProgressText.textContent = `Question ${currentQuizQuestion + 1} of ${quizQuestions.length}`;
    
    // Display question
    quizQuestion.textContent = question.question;
    
    // Clear and display options
    quizOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option.text;
        button.addEventListener('click', () => selectQuizOption(option.value, button));
        quizOptions.appendChild(button);
    });
}

function selectQuizOption(value, buttonElement) {
    // Store answer
    const questionKeys = ['vibe', 'time', 'preference'];
    quizAnswers[questionKeys[currentQuizQuestion]] = value;
    
    // Visual feedback
    const allOptions = quizOptions.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    buttonElement.classList.add('selected');
    
    // Small confetti for selection
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 10,
            spread: 30,
            origin: { y: 0.7 },
            colors: ['#ff6b9d', '#ff1493']
        });
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
        currentQuizQuestion++;
        displayQuizQuestion();
    }, 800);
}

function showQuizResult() {
    // Generate date plan based on answers
    datePlan = generateDatePlan();
    
    // Hide quiz question, show result
    quizQuestion.style.display = 'none';
    quizOptions.style.display = 'none';
    quizResult.classList.remove('hidden');
    quizResultText.textContent = datePlan;
    
    // Update progress to 100%
    quizProgressFill.style.width = '100%';
    quizProgressText.textContent = 'All done! ✨';
    
    // Confetti celebration
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff6b9d', '#ff1493', '#ff1744', '#ffb3d9']
        });
    }
}

function generateDatePlan() {
    const vibe = quizAnswers.vibe || 'casual';
    const time = quizAnswers.time || 'flexible';
    const preference = quizAnswers.preference || 'food';
    
    // Try to find a matching plan
    const planKey = `${vibe}_${time}_${preference}`;
    let plan = datePlans[planKey];
    
    // If no exact match, try fallback
    if (!plan) {
        plan = datePlans[`default_${vibe}`] || datePlans.default_casual;
    }
    
    return plan;
}

function showQuestion3() {
    dateQuizSection.classList.add('hidden');
    question3Section.classList.remove('hidden');
    question3Section.style.display = 'flex';
    question3Section.style.opacity = '1';
    question3Section.style.transform = 'translateY(0)';
    question3Section.scrollIntoView({ behavior: 'smooth' });
    currentQuestion = 3;
    
    // Display the personalized date plan
    if (datePlanInlineText && datePlan) {
        datePlanInlineText.textContent = `Based on your answers: ${datePlan}`;
        datePlanInlineText.style.display = 'block';
        datePlanInlineText.style.marginBottom = '2rem';
        datePlanInlineText.style.fontSize = 'clamp(1rem, 2vw, 1.2rem)';
        datePlanInlineText.style.color = 'rgba(255, 255, 255, 0.95)';
        datePlanInlineText.style.fontStyle = 'italic';
        datePlanInlineText.style.lineHeight = '1.6';
    }
    
    if (reaction3) {
        reaction3.style.animation = 'pulse 1s ease infinite';
    }
}

// ============================================
// QUESTION 3 - FINAL YES/NO
// ============================================

function handleYesClick() {
    // Hide main container
    const mainContainer = document.getElementById('mainContainer');
    if (mainContainer) {
        mainContainer.style.display = 'none';
    }
    
    // Show success screen
    if (successScreen) {
        successScreen.classList.add('show');
        
        // Enhanced confetti celebration
        createEnhancedConfetti();
        
        // Play success sound (optional - you can add a sound file)
        playSuccessSound();
    }
}

// ============================================
// NO BUTTON HANDLER (Fun Behavior)
// ============================================

let noClickCount = 0;
let currentQuestion = 1;
let loveMeterValue = 0;
const noMessages = [
    "Are you sure? 😊",
    "Maybe think about it? 💭",
    "Pretty please? 🥺",
    "Pookie please? 🥺",
    "I'm gonna cry... 😭",
    "Just one more chance? 💕",
    "I won't give up! 💪",
    "You know you want to say yes! 😉",
    "Please don't do this to me! 😢",
    "My heart is breaking... 💔"
];

function handleNoHover() {
    // Move button away from cursor
    const rect = noButton.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noButton.style.position = 'fixed';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    noButton.style.transition = 'all 0.3s ease';
}

function handleNoClick() {
    noClickCount++;
    
    // Change button text
    if (noClickCount <= noMessages.length) {
        const noText = noButton.querySelector('span:first-child');
        if (noText) {
            noText.textContent = noMessages[noClickCount - 1];
        }
    }
    
    // Make No button smaller AND Yes button bigger
    const noScale = Math.max(0.3, 1 - (noClickCount * 0.1));
    const yesScale = Math.min(1.5, 1 + (noClickCount * 0.1));
    
    noButton.style.transform = `scale(${noScale})`;
    yesButton.style.transform = `scale(${yesScale})`;
    yesButton.style.transition = 'all 0.3s ease';
    
    // Update reaction emoji
    if (reaction3) {
        const reactions = ['😢', '😭', '🥺', '💔', '😰'];
        reaction3.textContent = reactions[Math.min(noClickCount - 1, reactions.length - 1)];
        reaction3.style.animation = 'shake 0.5s';
    }
    
    // Shake animation
    noButton.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noButton.style.animation = '';
        if (reaction3) reaction3.style.animation = '';
    }, 500);
    
    // After several clicks, make it easier
    if (noClickCount >= 3) {
        hintText.textContent = "💡 Come on, you know you want to! 😊";
        hintText.style.color = 'var(--deep-pink)';
        hintText.style.fontWeight = 'bold';
    }
    
    // After many clicks, auto-click yes (playful)
    if (noClickCount >= 8) {
        setTimeout(() => {
            handleYesClick();
        }, 1000);
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ============================================
// SUCCESS SCREEN EFFECTS
// ============================================

function createEnhancedConfetti() {
    // Use canvas-confetti library for amazing effects
    if (typeof confetti !== 'undefined') {
        // Multiple bursts for celebration
        const duration = 3000;
        const end = Date.now() + duration;
        
        const interval = setInterval(() => {
            if (Date.now() > end) {
                clearInterval(interval);
                return;
            }
            
            // Heart-shaped confetti
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff6b9d', '#ff1493', '#ff1744', '#ffb3d9', '#ffffff']
            });
            
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff6b9d', '#ff1493', '#ff1744', '#ffb3d9', '#ffffff']
            });
        }, 200);
        
        // Final big burst
        setTimeout(() => {
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff6b9d', '#ff1493', '#ff1744', '#ffb3d9', '#ffffff']
            });
        }, 500);
    } else {
        // Fallback to original confetti if library not loaded
        createConfetti();
    }
}

function createConfetti() {
    const colors = ['#ff6b9d', '#ff1493', '#ff1744', '#ffb3d9', '#ffffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 50);
    }
    
    // Add confetti animation
    if (!document.getElementById('confettiStyle')) {
        const confettiStyle = document.createElement('style');
        confettiStyle.id = 'confettiStyle';
        confettiStyle.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);
    }
}

function playSuccessSound() {
    // You can add a success sound here
    // For example, using Web Audio API or an audio file
    // This is optional and can be customized
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function setupSmoothScrolling() {
    // Add scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    [messageSection, question1Section, question2Section, question3Section].forEach(section => {
        if (section && section.style.display !== 'none') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        }
    });
}

// ============================================
// ADDITIONAL ENHANCEMENTS
// ============================================

// Add cursor trail effect (optional)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Create a subtle heart trail on special sections
    if (Math.random() > 0.95) {
        const heart = document.createElement('span');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = '1rem';
        heart.style.opacity = '0.5';
        heart.style.zIndex = '999';
        heart.style.animation = 'fadeOut 1s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
});

// Add fadeOut animation
if (!document.getElementById('fadeOutStyle')) {
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.id = 'fadeOutStyle';
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(-20px) scale(0.5);
            }
        }
    `;
    document.head.appendChild(fadeOutStyle);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Prevent right-click context menu (optional - for a more polished feel)
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// Add page visibility handling (if needed for other features)
// document.addEventListener('visibilitychange', () => {
//     // Handle page visibility changes
// });

// ============================================
// LOVE COUNTER
// ============================================

function initializeLoveCounter() {
    if (!CONFIG.enableLoveCounter || !CONFIG.relationshipStartDate) {
        return;
    }
    
    const loveCounterSection = document.getElementById('loveCounterSection');
    if (!loveCounterSection) return;
    
    const startDate = new Date(CONFIG.relationshipStartDate);
    const daysCounter = document.getElementById('daysCounter');
    const hoursCounter = document.getElementById('hoursCounter');
    const minutesCounter = document.getElementById('minutesCounter');
    
    if (!daysCounter || !hoursCounter || !minutesCounter) return;
    
    // Show the counter section
    loveCounterSection.classList.remove('hidden');
    loveCounterSection.style.display = 'flex';
    
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update counters with smooth transitions
        if (daysCounter.textContent !== days.toString()) {
            daysCounter.textContent = days;
            daysCounter.style.animation = 'numberPulse 0.5s ease';
        }
        
        const hoursStr = hours.toString().padStart(2, '0');
        if (hoursCounter.textContent !== hoursStr) {
            hoursCounter.textContent = hoursStr;
            hoursCounter.style.animation = 'numberPulse 0.5s ease';
        }
        
        const minutesStr = minutes.toString().padStart(2, '0');
        if (minutesCounter.textContent !== minutesStr) {
            minutesCounter.textContent = minutesStr;
            minutesCounter.style.animation = 'numberPulse 0.5s ease';
        }
    }
    
    // Update immediately
    updateCounter();
    
    // Update every second for live timer
    setInterval(updateCounter, 1000);
    
    // Also update when page becomes visible (if user switches tabs)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateCounter();
        }
    });
}

// Photo gallery is now static - no carousel functionality needed

// ============================================
// SHARE BUTTON
// ============================================

function setupShareButton() {
    const shareButton = document.getElementById('shareButton');
    if (!shareButton) return;
    
    shareButton.addEventListener('click', async () => {
        const url = window.location.href;
        const title = `Will You Be My Valentine? 💕`;
        const text = `Check out this special Valentine's Day website! 💕`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                shareButton.innerHTML = '<span>✓</span>';
                shareButton.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
                setTimeout(() => {
                    shareButton.innerHTML = '<span>🔗</span>';
                    shareButton.style.background = '';
                }, 2000);
            } catch (err) {
                // Fallback: Show URL in alert
                alert(`Share this link: ${url}`);
            }
        }
    });
}

// ============================================
// INTERACTIVE HEARTS
// ============================================

function setupInteractiveHearts() {
    // Make floating hearts clickable
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach(heart => {
        heart.style.cursor = 'pointer';
        heart.addEventListener('click', (e) => {
            createHeartBurst(e.clientX, e.clientY);
            
            // Add reaction
            const reactions = ['💕', '💖', '💗', '💝', '💓', '✨', '💫'];
            const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
            heart.textContent = randomReaction;
            heart.style.animation = 'bounce 0.5s ease';
            
            setTimeout(() => {
                heart.style.animation = '';
            }, 500);
        });
    });
}

function createHeartBurst(x, y) {
    const burstCount = 8;
    
    for (let i = 0; i < burstCount; i++) {
        const heart = document.createElement('span');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / burstCount;
        const distance = 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        heart.style.animation = `heartBurst 1s ease-out forwards`;
        heart.style.setProperty('--end-x', endX + 'px');
        heart.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
    
    // Add burst animation
    if (!document.getElementById('heartBurstStyle')) {
        const style = document.createElement('style');
        style.id = 'heartBurstStyle';
        style.textContent = `
            @keyframes heartBurst {
                to {
                    transform: translate(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

console.log('💕 Valentine\'s Day Website Loaded! 💕');
console.log('Don\'t forget to update the CONFIG object with your personal information!');

