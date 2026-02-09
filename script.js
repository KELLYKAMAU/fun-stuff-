// ============================================
// VALENTINE'S DAY WEBSITE - JAVASCRIPT
// ============================================

// Configuration - UPDATE THESE VALUES
const CONFIG = {
    herName: "Reemie Wambui",           // Replace with her name
    yourName: "Kelly Kamau",     // Replace with your name
    personalMessage: "Hey wamboo ,will u be my valentines date?"  // Replace with your personal message
};

// DOM Elements
const scrollButton = document.getElementById('scrollButton');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const successScreen = document.getElementById('successScreen');
const messageSection = document.getElementById('messageSection');
const questionSection = document.getElementById('questionSection');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIcon = document.getElementById('musicIcon');
const hintText = document.getElementById('hintText');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializePersonalization();
    setupEventListeners();
    setupSmoothScrolling();
});

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
    
    // Yes button
    if (yesButton) {
        yesButton.addEventListener('click', handleYesClick);
    }
    
    // No button - with fun behavior
    if (noButton) {
        noButton.addEventListener('mouseenter', handleNoHover);
        noButton.addEventListener('click', handleNoClick);
    }
    
    // Music toggle
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'y' || e.key === 'Y') {
            handleYesClick();
        } else if (e.key === 'n' || e.key === 'N') {
            handleNoClick();
        }
    });
}

// ============================================
// YES BUTTON HANDLER
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
        
        // Add confetti effect
        createConfetti();
        
        // Play success sound (optional - you can add a sound file)
        playSuccessSound();
    }
    
    // Stop background music
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
}

// ============================================
// NO BUTTON HANDLER (Fun Behavior)
// ============================================

let noClickCount = 0;
const noMessages = [
    "Are you sure? 😊",
    "Maybe think about it? 💭",
    "Pretty please? 🥺",
    "Just one more chance? 💕",
    "I won't give up! 💪",
    "You know you want to say yes! 😉"
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
    
    // Make button smaller each time
    const currentScale = 1 - (noClickCount * 0.1);
    noButton.style.transform = `scale(${Math.max(0.5, currentScale)})`;
    
    // Shake animation
    noButton.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noButton.style.animation = '';
    }, 500);
    
    // After several clicks, make it easier
    if (noClickCount >= 3) {
        hintText.textContent = "💡 Come on, you know you want to! 😊";
        hintText.style.color = 'var(--deep-pink)';
        hintText.style.fontWeight = 'bold';
    }
    
    // After many clicks, auto-click yes (playful)
    if (noClickCount >= 10) {
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
// MUSIC TOGGLE
// ============================================

let isMusicPlaying = false;

function toggleMusic() {
    if (!backgroundMusic) return;
    
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicIcon.textContent = '🔇';
        musicToggle.classList.add('muted');
        isMusicPlaying = false;
    } else {
        // Try to play music (may require user interaction first)
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    musicIcon.textContent = '🎵';
                    musicToggle.classList.remove('muted');
                    isMusicPlaying = true;
                })
                .catch(() => {
                    // Autoplay was prevented - user needs to interact first
                    musicIcon.textContent = '🔇';
                    console.log('Music autoplay prevented. User interaction required.');
                });
        }
    }
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
    [messageSection, questionSection].forEach(section => {
        if (section) {
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

// Add page visibility handling
document.addEventListener('visibilitychange', () => {
    if (document.hidden && backgroundMusic && isMusicPlaying) {
        backgroundMusic.pause();
    } else if (!document.hidden && backgroundMusic && isMusicPlaying) {
        backgroundMusic.play().catch(() => {
            // Autoplay prevented
        });
    }
});

console.log('💕 Valentine\'s Day Website Loaded! 💕');
console.log('Don\'t forget to update the CONFIG object with your personal information!');

