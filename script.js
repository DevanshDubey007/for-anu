/* ============================================
   FOR ANU 💕 — Interactive Script (Mobile-First)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

    // =============================================
    // 1. INTRO OVERLAY
    // =============================================
    const introOverlay = document.getElementById('introOverlay');
    introOverlay.addEventListener('click', () => {
        introOverlay.classList.add('hidden');
        // Try to play music on user interaction
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.play().catch(() => {});
        isPlaying = true;
        document.getElementById('playIcon').style.display = 'none';
        document.getElementById('pauseIcon').style.display = 'block';
        document.getElementById('musicEq').classList.add('playing');
    });


    // =============================================
    // 2. TYPEWRITER EFFECT
    // =============================================
    const typewriterEl = document.getElementById('typewriter');
    const typewriterText = "Every moment with you is a world I never want to leave...";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < typewriterText.length) {
            typewriterEl.innerHTML = typewriterText.substring(0, charIndex + 1) + '<span class="cursor-blink"></span>';
            charIndex++;
            setTimeout(typeWriter, 55);
        } else {
            // Remove cursor after done
            setTimeout(() => {
                typewriterEl.innerHTML = typewriterText;
            }, 2000);
        }
    }

    // Start typewriter after intro closes
    const observer = new MutationObserver(() => {
        if (introOverlay.classList.contains('hidden')) {
            setTimeout(typeWriter, 1500);
            observer.disconnect();
        }
    });
    observer.observe(introOverlay, { attributes: true, attributeFilter: ['class'] });


    // =============================================
    // 3. FLOATING ELEMENTS (lighter on mobile)
    // =============================================
    const floatingContainer = document.getElementById('floatingElements');
    const maxFloating = isMobile ? 8 : 15;
    const floatInterval = isMobile ? 4000 : 2500;

    function createFloatingElement() {
        if (floatingContainer.children.length > maxFloating) return;

        const rand = Math.random();
        const el = document.createElement('div');

        if (rand > 0.4) {
            el.classList.add('floating-heart');
            el.innerHTML = ['♥', '♡', '✦', '⋆'][Math.floor(Math.random() * 4)];
            el.style.left = Math.random() * 100 + '%';
            el.style.fontSize = (Math.random() * 12 + 8) + 'px';
            el.style.animationDuration = (Math.random() * 12 + 12) + 's';
            el.style.animationDelay = (Math.random() * 5) + 's';
        } else {
            el.classList.add('floating-sparkle');
            el.innerHTML = '✦';
            el.style.left = Math.random() * 100 + '%';
            el.style.fontSize = (Math.random() * 8 + 6) + 'px';
            el.style.animationDuration = (Math.random() * 10 + 10) + 's';
            el.style.animationDelay = (Math.random() * 6) + 's';
        }

        floatingContainer.appendChild(el);
        setTimeout(() => el.remove(), 25000);
    }

    for (let i = 0; i < (isMobile ? 5 : 10); i++) {
        setTimeout(() => createFloatingElement(), i * 500);
    }
    setInterval(createFloatingElement, floatInterval);


    // =============================================
    // 4. CURSOR HEART TRAIL (desktop only)
    // =============================================
    if (!isMobile) {
        const cursorTrail = document.getElementById('cursorTrail');
        let lastTrailTime = 0;

        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTrailTime < 80) return;
            lastTrailTime = now;

            const heart = document.createElement('span');
            heart.classList.add('trail-heart');
            heart.textContent = ['♥', '✦', '♡', '⋆'][Math.floor(Math.random() * 4)];
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.color = ['#C9A0A0', '#d4a574', '#e8b4c8', '#d4b3b3'][Math.floor(Math.random() * 4)];
            heart.style.fontSize = (Math.random() * 8 + 10) + 'px';
            cursorTrail.appendChild(heart);

            setTimeout(() => heart.remove(), 1000);
        });
    }


    // =============================================
    // 5. CLICK BURST (hearts burst on tap/click)
    // =============================================
    const clickBurst = document.getElementById('clickBurst');

    function createBurst(x, y) {
        const count = isMobile ? 6 : 10;
        const emojis = ['♥', '💕', '✦', '♡', '⋆', '✧'];

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span');
            particle.classList.add('burst-particle');
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.fontSize = (Math.random() * 10 + 10) + 'px';
            particle.style.color = ['#C9A0A0', '#d4a574', '#e8b4c8'][Math.floor(Math.random() * 3)];

            const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5);
            const dist = Math.random() * 60 + 40;
            particle.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
            particle.style.setProperty('--by', Math.sin(angle) * dist + 'px');

            clickBurst.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
    }

    document.addEventListener('click', (e) => {
        // Don't burst on buttons/links
        if (e.target.closest('button, a, .lightbox, .intro-overlay')) return;
        createBurst(e.clientX, e.clientY);
    });


    // =============================================
    // 6. SCROLL REVEAL ANIMATIONS
    // =============================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger, .reveal-scatter');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // =============================================
    // 7. MUSIC PLAYER
    // =============================================
    const musicPlayer = document.getElementById('musicPlayer');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const progressBar = document.getElementById('progressBar');
    const musicEq = document.getElementById('musicEq');
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
            musicEq.classList.remove('playing');
        } else {
            audioPlayer.play().catch(() => {
                console.log('Audio playback failed.');
            });
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            musicEq.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            progressBar.style.width = (audioPlayer.currentTime / audioPlayer.duration) * 100 + '%';
        }
    });

    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        musicEq.classList.remove('playing');
        progressBar.style.width = '0%';
    });


    // =============================================
    // 8. LIGHTBOX
    // =============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
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

    function navigateLightbox(dir) {
        currentPhotoIndex = (currentPhotoIndex + dir + photos.length) % photos.length;
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        setTimeout(() => {
            lightboxImg.src = photos[currentPhotoIndex];
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 200);
    }

    // Lightbox image transition
    lightboxImg.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

    document.querySelectorAll('.polaroid').forEach((item) => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Swipe support for lightbox on mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) navigateLightbox(1);  // swipe left = next
            else navigateLightbox(-1);           // swipe right = prev
        }
    }, { passive: true });


    // =============================================
    // 9. 3D TILT ON POLAROIDS (desktop only)
    // =============================================
    if (!isMobile) {
        document.querySelectorAll('[data-tilt]').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                el.querySelector('.polaroid-inner').style.transform =
                    `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            el.addEventListener('mouseleave', () => {
                el.querySelector('.polaroid-inner').style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
                el.querySelector('.polaroid-inner').style.transition = 'transform 0.5s ease';
                setTimeout(() => {
                    el.querySelector('.polaroid-inner').style.transition = '';
                }, 500);
            });
        });
    }


    // =============================================
    // 10. SCROLL ARROW
    // =============================================
    document.getElementById('scrollArrow').addEventListener('click', () => {
        document.getElementById('moments').scrollIntoView({ behavior: 'smooth' });
    });


    // =============================================
    // 11. FOOTER HEARTS
    // =============================================
    const footerHearts = document.getElementById('footerHearts');

    function createFooterHeart() {
        const heart = document.createElement('span');
        heart.classList.add('footer-heart');
        heart.textContent = ['♥', '✦', '♡'][Math.floor(Math.random() * 3)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.animationDelay = (Math.random() * 2) + 's';
        heart.style.fontSize = (Math.random() * 8 + 8) + 'px';
        footerHearts.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }

    const footerObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => createFooterHeart(), i * 300);
                }
            }
        });
    }, { threshold: 0.3 });

    footerObs.observe(document.getElementById('footer'));

    setInterval(() => {
        const rect = document.getElementById('footer').getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) createFooterHeart();
    }, 2000);


    // =============================================
    // 12. PARALLAX (desktop only, subtle)
    // =============================================
    if (!isMobile) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
            }
        }, { passive: true });
    }


    // =============================================
    // 13. DOUBLE TAP HEART (mobile)
    // =============================================
    if (isMobile) {
        let lastTap = 0;
        document.querySelectorAll('.polaroid').forEach(el => {
            el.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTap < 300) {
                    // Double tap — show big heart
                    const rect = el.getBoundingClientRect();
                    const bigHeart = document.createElement('div');
                    bigHeart.textContent = '❤️';
                    bigHeart.style.cssText = `
                        position: fixed;
                        left: ${rect.left + rect.width / 2 - 25}px;
                        top: ${rect.top + rect.height / 2 - 25}px;
                        font-size: 50px;
                        z-index: 9999;
                        pointer-events: none;
                        animation: doubleTapHeart 0.8s ease-out forwards;
                    `;
                    document.body.appendChild(bigHeart);
                    setTimeout(() => bigHeart.remove(), 800);
                }
                lastTap = now;
            });
        });

        // Add the animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes doubleTapHeart {
                0% { opacity: 1; transform: scale(0.3); }
                50% { opacity: 1; transform: scale(1.2); }
                100% { opacity: 0; transform: scale(1.5) translateY(-30px); }
            }
        `;
        document.head.appendChild(style);
    }

});
