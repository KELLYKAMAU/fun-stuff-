// ============================================
// VALENTINE'S DAY WEBSITE - JAVASCRIPT
// ============================================

// Configuration - UPDATE THESE VALUES
const CONFIG = {
    herName: "Reemie Wambui",           // Replace with her name
    yourName: "Kelly Kamau",     // Replace with your name
    personalMessage: "Hey wamboo ,I know ur wondering but I do know u might have a pretty good guess,it may seem odd but I do have a request?",  // Replace with your personal message
    relationshipStartDate: "2024-01-01",  // Format: YYYY-MM-DD (when you started dating/met - optional)
    enableLoveCounter: true,  // Set to false to hide love counter
    // Romantic background music - Sweet and colorful tune
    // Beautiful romantic music - Replace with your own sweet & romantic tune!
    // Recommended sources for free romantic music:
    // - Pixabay Music: https://pixabay.com/music/search/romantic/
    // - Bensound: https://www.bensound.com/royalty-free-music/romantic
    // - YouTube Audio Library (download and host)
    // - Or upload your own MP3 to a hosting service
    // Romantic music by VibeHorn from Pixabay (Track ID: 431010)
    // Get the direct MP3 download link from: https://pixabay.com/music/431010/
    musicUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_431010.mp3"  // Direct MP3 link for romantic music
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
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIcon = document.getElementById('musicIcon');
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializePersonalization();
    setupEventListeners();
    setupSmoothScrolling();
    checkImageLoad();
    setupMusic();
});

// ============================================
// MUSIC SETUP
// ============================================

function setupMusic() {
    const musicSource = document.getElementById('musicSource');
    if (backgroundMusic && musicSource && CONFIG.musicUrl) {
        musicSource.src = CONFIG.musicUrl;
        backgroundMusic.load();
        backgroundMusic.volume = 0.5; // Set to 50% volume for pleasant background music
    }
}

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
        continueButton.addEventListener('click', () => showQuestion3());
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
    
    // Music toggle
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
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

function showQuestion3() {
    question2Section.classList.add('hidden');
    question3Section.classList.remove('hidden');
    question3Section.style.display = 'flex';
    question3Section.style.opacity = '1';
    question3Section.style.transform = 'translateY(0)';
    question3Section.scrollIntoView({ behavior: 'smooth' });
    currentQuestion = 3;
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
    
    // Stop background music
    if (backgroundMusic) {
        backgroundMusic.pause();
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
// MUSIC TOGGLE
// ============================================

let isMusicPlaying = false;
const musicVisualizer = document.getElementById('musicVisualizer');

function toggleMusic() {
    if (!backgroundMusic) return;
    
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicIcon.textContent = '🔇';
        musicToggle.classList.add('muted');
        musicToggle.classList.remove('playing');
        if (musicVisualizer) {
            musicVisualizer.classList.remove('active');
        }
        isMusicPlaying = false;
    } else {
        // Try to play music (may require user interaction first)
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    musicIcon.textContent = '🎵';
                    musicToggle.classList.remove('muted');
                    musicToggle.classList.add('playing');
                    if (musicVisualizer) {
                        musicVisualizer.classList.add('active');
                    }
                    isMusicPlaying = true;
                })
                .catch(() => {
                    // Autoplay was prevented - user needs to interact first
                    musicIcon.textContent = '🔇';
                    musicToggle.classList.add('muted');
                    if (musicVisualizer) {
                        musicVisualizer.classList.remove('active');
                    }
                    console.log('Music autoplay prevented. User interaction required.');
                });
        }
    }
}

// Update visualizer when music plays/pauses
if (backgroundMusic) {
    backgroundMusic.addEventListener('play', () => {
        if (musicVisualizer) {
            musicVisualizer.classList.add('active');
        }
        if (musicToggle) {
            musicToggle.classList.add('playing');
        }
    });
    
    backgroundMusic.addEventListener('pause', () => {
        if (musicVisualizer) {
            musicVisualizer.classList.remove('active');
        }
        if (musicToggle) {
            musicToggle.classList.remove('playing');
        }
    });
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
        
        daysCounter.textContent = days;
        hoursCounter.textContent = hours.toString().padStart(2, '0');
        minutesCounter.textContent = minutes.toString().padStart(2, '0');
    }
    
    updateCounter();
    setInterval(updateCounter, 60000); // Update every minute
}

// ============================================
// PHOTO CAROUSEL
// ============================================

let currentSlide = 0;
const photos = document.querySelectorAll('.carousel-photo');
const dots = document.querySelectorAll('.dot');

function initializePhotoCarousel() {
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    
    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => showSlide(currentSlide - 1));
    }
    
    if (carouselNext) {
        carouselNext.addEventListener('click', () => showSlide(currentSlide + 1));
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-advance carousel
    if (photos.length > 0) {
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
}

function showSlide(index) {
    if (photos.length === 0) return;
    
    if (index >= photos.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = photos.length - 1;
    } else {
        currentSlide = index;
    }
    
    photos.forEach((photo, i) => {
        photo.classList.toggle('active', i === currentSlide);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

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

