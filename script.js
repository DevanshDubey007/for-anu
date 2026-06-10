/* ============================================
   FOR ANU 💕 — Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. FLOATING HEARTS & PETALS
    // =============================================
    const floatingContainer = document.getElementById('floatingElements');

    function createFloatingElement() {
        const isHeart = Math.random() > 0.5;

        if (isHeart) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = ['♥', '♡', '❤', '💕', '🌸'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 16 + 10) + 'px';
            heart.style.animationDuration = (Math.random() * 12 + 10) + 's';
            heart.style.animationDelay = (Math.random() * 8) + 's';
            floatingContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 25000);
        } else {
            const petal = document.createElement('div');
            petal.classList.add('floating-petal');
            petal.style.left = Math.random() * 100 + '%';
            const size = Math.random() * 8 + 8;
            petal.style.width = size + 'px';
            petal.style.height = (size * 1.3) + 'px';
            petal.style.animationDuration = (Math.random() * 14 + 12) + 's';
            petal.style.animationDelay = (Math.random() * 10) + 's';
            petal.style.transform = `rotate(${Math.random() * 360}deg)`;
            floatingContainer.appendChild(petal);

            setTimeout(() => petal.remove(), 28000);
        }
    }

    // Create initial batch
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createFloatingElement(), i * 400);
    }

    // Keep generating
    setInterval(createFloatingElement, 2500);


    // =============================================
    // 2. SCROLL REVEAL ANIMATIONS
    // =============================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // =============================================
    // 3. MUSIC PLAYER
    // =============================================
    const musicPlayer = document.getElementById('musicPlayer');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const progressBar = document.getElementById('progressBar');
    let isPlaying = false;

    // Show music player after scrolling past hero
    const heroSection = document.getElementById('hero');
    const playerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                musicPlayer.classList.add('visible');
            } else {
                musicPlayer.classList.remove('visible');
            }
        });
    }, { threshold: 0.3 });

    playerObserver.observe(heroSection);

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            audioPlayer.play().catch(() => {
                // Audio play failed — likely no file or autoplay blocked
                console.log('Audio playback requires user gesture or file not found.');
            });
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
        isPlaying = !isPlaying;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = pct + '%';
        }
    });

    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        progressBar.style.width = '0%';
    });


    // =============================================
    // 4. LIGHTBOX (Photo Gallery)
    // =============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const photos = ['photo_1.jpg', 'photo_2.jpg', 'photo_3.jpg', 'photo_4.jpg', 'photo_5.jpg', 'photo_6.jpg', 'photo_7.jpg', 'photo_8.jpg'];
    let currentPhotoIndex = 0;

    function openLightbox(index) {
        currentPhotoIndex = index;
        lightboxImg.src = photos[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = photos[currentPhotoIndex];
            lightboxImg.style.opacity = '1';
        }, 200);
    }

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Smooth transition for lightbox image
    lightboxImg.style.transition = 'opacity 0.2s ease';


    // =============================================
    // 5. SCROLL ARROW
    // =============================================
    const scrollArrow = document.getElementById('scrollArrow');
    scrollArrow.addEventListener('click', () => {
        document.getElementById('moments').scrollIntoView({ behavior: 'smooth' });
    });


    // =============================================
    // 6. FOOTER FLOATING HEARTS
    // =============================================
    const footerHearts = document.getElementById('footerHearts');

    function createFooterHeart() {
        const heart = document.createElement('span');
        heart.classList.add('footer-heart');
        heart.textContent = ['♥', '❤', '💕'][Math.floor(Math.random() * 3)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.animationDelay = (Math.random() * 2) + 's';
        heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
        footerHearts.appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }

    // Observe footer for heart creation
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => createFooterHeart(), i * 300);
                }
            }
        });
    }, { threshold: 0.3 });

    footerObserver.observe(document.getElementById('footer'));

    // Keep generating footer hearts while visible
    setInterval(() => {
        const footer = document.getElementById('footer');
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            createFooterHeart();
        }
    }, 1500);


    // =============================================
    // 7. PARALLAX SUBTLE EFFECT ON HERO
    // =============================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    }, { passive: true });

});
