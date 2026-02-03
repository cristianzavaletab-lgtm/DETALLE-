// —————————————————————————————————————————————
// Scrapbook Romántico Premium
// Experiencia Ultra Profesional
// —————————————————————————————————————————————

// Elementos del DOM
const startBtn = document.getElementById('startBtn');
const finalBtn = document.getElementById('finalBtn');
const farewellContainer = document.getElementById('farewellContainer');
const interactiveElement = document.getElementById('interactiveElement');
const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

// Textos para typing effect
const texts = {
    typing1: "Hay personas que no necesitan gritar para ser notadas.",
    typing2: "Se sienten. En los detalles. En la forma en que escuchan.",
    typing3: "Eres de esas personas."
};

// —————————————————————————————————————————————
// Crear decoraciones florales fijas
// —————————————————————————————————————————————

function createFloralDecorations() {
    const florals = [
        { class: 'floral-corner-tl', content: '❀' },
        { class: 'floral-corner-tr', content: '✿' },
        { class: 'floral-corner-bl', content: '🌸' },
        { class: 'floral-corner-br', content: '🌺' }
    ];
    
    florals.forEach(floral => {
        const div = document.createElement('div');
        div.className = floral.class;
        div.textContent = floral.content;
        document.body.appendChild(div);
    });
}

window.addEventListener('load', createFloralDecorations);

// —————————————————————————————————————————————
// Añadir fecha elegante a las páginas
// —————————————————————————————————————————————

document.querySelectorAll('.content-center').forEach(page => {
    const today = new Date();
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dateStr = `${today.getDate()} de ${months[today.getMonth()]}, ${today.getFullYear()}`;
    page.setAttribute('data-date', dateStr);
});

// —————————————————————————————————————————————
// Configuración de música premium
// —————————————————————————————————————————————

if (music) {
    music.volume = 0.18;
}

let isMusicPlaying = false;

if (musicToggle) {
    // Icono inicial
    musicToggle.innerHTML = '<span class="music-icon">♪</span>';
    
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            musicToggle.innerHTML = '<span class="music-icon">♪</span>';
            musicToggle.style.opacity = '0.6';
        } else {
            music.play().catch(err => console.log('Error al reproducir:', err));
            musicToggle.innerHTML = '<span class="music-icon">♫</span>';
            musicToggle.style.opacity = '1';
        }
        isMusicPlaying = !isMusicPlaying;
    });
}

// Pausar música al cambiar de pestaña
document.addEventListener('visibilitychange', () => {
    if (document.hidden && music) {
        music.pause();
    } else {
        if (isMusicPlaying && music && music.currentTime > 0) {
            music.play().catch(err => console.log('Error:', err));
        }
    }
});

// —————————————————————————————————————————————
// Animaciones de entrada premium
// —————————————————————————————————————————————

window.addEventListener('load', () => {
    // Pequeño delay para que se vea la transición del body
    setTimeout(() => {
        document.querySelectorAll('.section-welcome .fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 400 + 300);
        });
    }, 100);
});

// —————————————————————————————————————————————
// Botón "Seguir leyendo" con transición suave
// —————————————————————————————————————————————

if (startBtn) {
    startBtn.addEventListener('click', () => {
        // Iniciar música con fade in
        if (music) {
            music.volume = 0;
            music.play().then(() => {
                // Fade in gradual de la música
                let volume = 0;
                const fadeIn = setInterval(() => {
                    if (volume < 0.18) {
                        volume += 0.01;
                        music.volume = Math.min(volume, 0.18);
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 50);
                
                isMusicPlaying = true;
                if (musicToggle) {
                    musicToggle.innerHTML = '<span class="music-icon">♫</span>';
                    musicToggle.style.opacity = '1';
                }
            }).catch(err => {
                console.log('No se pudo reproducir automáticamente:', err);
            });
        }
        
        // Animación de salida de la sección welcome
        const welcomeSection = document.querySelector('.section-welcome');
        if (welcomeSection) {
            welcomeSection.style.opacity = '0';
            welcomeSection.style.transform = 'scale(0.98)';
            welcomeSection.style.transition = 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
                welcomeSection.style.display = 'none';
            }, 1500);
        }
        
        // Scroll suave a la siguiente sección
        setTimeout(() => {
            const observationSection = document.getElementById('observation');
            if (observationSection) {
                observationSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Iniciar typing después del scroll
                setTimeout(() => {
                    typeText('typing1', texts.typing1, 38, () => {
                        setTimeout(() => {
                            typeText('typing2', texts.typing2, 38, () => {
                                setTimeout(() => {
                                    typeText('typing3', texts.typing3, 38);
                                }, 1700);
                            });
                        }, 1500);
                    });
                }, 1000);
            }
        }, 800);
    });
}

// —————————————————————————————————————————————
// Efecto typing premium con pausas naturales
// —————————————————————————————————————————————

function typeText(elementId, text, speed, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let index = 0;
    element.style.opacity = '1';
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            
            // Pausas más naturales y dramáticas
            let delay = speed;
            const currentChar = text.charAt(index - 1);
            
            if (currentChar === '.') {
                delay = speed * 14; // Pausa larga en puntos
            } else if (currentChar === ',') {
                delay = speed * 7; // Pausa media en comas
            } else if (currentChar === ' ') {
                delay = speed * 1.2; // Espacios ligeramente más lentos
            } else if (currentChar === '…') {
                delay = speed * 18; // Pausa muy larga en suspensivos
            }
            
            setTimeout(type, delay);
        } else {
            // Permitir selección después de terminar
            setTimeout(() => {
                element.style.userSelect = 'text';
            }, 500);
            
            if (callback) {
                setTimeout(callback, 600);
            }
        }
    }
    
    type();
}

// —————————————————————————————————————————————
// Scroll reveal mejorado con stagger
// —————————————————————————————————————————————

const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Pequeño delay para que se vea más profesional
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 150);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// —————————————————————————————————————————————
// Elemento interactivo premium
// —————————————————————————————————————————————

if (interactiveElement) {
    const hiddenMessage = interactiveElement.querySelector('#hiddenMessage');
    const hoverText = interactiveElement.querySelector('.hover-text');
    
    interactiveElement.addEventListener('mouseenter', () => {
        if (hiddenMessage && hoverText) {
            hoverText.style.opacity = '0';
            hoverText.style.transform = 'translateY(-15px)';
            
            setTimeout(() => {
                hiddenMessage.style.opacity = '1';
                hiddenMessage.style.transform = 'translate(-50%, -50%) scale(1.05)';
            }, 250);
        }
    });
    
    interactiveElement.addEventListener('mouseleave', () => {
        if (hiddenMessage && hoverText) {
            hiddenMessage.style.opacity = '0';
            hiddenMessage.style.transform = 'translate(-50%, -50%) scale(1)';
            
            setTimeout(() => {
                hoverText.style.opacity = '1';
                hoverText.style.transform = 'translateY(0)';
            }, 250);
        }
    });
}

// —————————————————————————————————————————————
// Botón final con animación de despedida
// —————————————————————————————————————————————

if (finalBtn) {
    finalBtn.addEventListener('click', () => {
        // Animación del botón
        finalBtn.style.opacity = '0';
        finalBtn.style.transform = 'translateY(-30px) scale(0.9)';
        finalBtn.style.pointerEvents = 'none';
        
        // Revelar despedida con efecto cascada
        setTimeout(() => {
            if (farewellContainer) {
                const elements = farewellContainer.querySelectorAll('.farewell, .signature');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, index * 800);
                });
            }
        }, 600);
    });
}

// —————————————————————————————————————————————
// Parallax suave en frases al scroll
// —————————————————————————————————————————————

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax en frases
            document.querySelectorAll('.admiration-phrase').forEach((el, index) => {
                const speed = 0.3 + (index * 0.05);
                const yPos = -(scrolled * speed / 100);
                el.style.transform = `translateY(${yPos}px)`;
            });
            
            // Parallax en flores decorativas
            document.querySelectorAll('[class*="floral-corner"]').forEach((el, index) => {
                const speed = 0.2 + (index * 0.03);
                const yPos = scrolled * speed / 80;
                el.style.transform = `translateY(${yPos}px) rotate(${yPos/5}deg)`;
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// —————————————————————————————————————————————
// Efecto de profundidad 3D en tarjetas
// —————————————————————————————————————————————

document.querySelectorAll('.content-center').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
            scale(1.005)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// —————————————————————————————————————————————
// Animación de brillo en botones
// —————————————————————————————————————————————

document.querySelectorAll('.btn-continue, .btn-final').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--mouse-x', `${x}px`);
        btn.style.setProperty('--mouse-y', `${y}px`);
    });
});

// —————————————————————————————————————————————
// Suavizar scroll en enlaces internos
// —————————————————————————————————————————————

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

// —————————————————————————————————————————————
// Easter eggs y detalles premium
// —————————————————————————————————————————————

// Contar tiempo de lectura
let readingStartTime = Date.now();

window.addEventListener('beforeunload', () => {
    const readingTime = Math.floor((Date.now() - readingStartTime) / 1000);
    
    if (readingTime > 120) {
        console.log(
            '%c✨ Gracias por tomarte el tiempo de leer esto con calma. %cEso habla muy bien de ti.',
            'color: #C9A24D; font-size: 14px; font-family: serif; font-weight: bold;',
            'color: #8B6B4F; font-size: 14px; font-family: serif; font-style: italic;'
        );
    }
});

// Efecto de partículas sutiles al hacer click
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'linear-gradient(135deg, #C9A24D, #D4AF37)';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.opacity = '1';
    sparkle.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.style.opacity = '0';
        sparkle.style.transform = `translate(${Math.random() * 40 - 20}px, ${-30 - Math.random() * 20}px) scale(0)`;
    }, 50);
    
    setTimeout(() => {
        sparkle.remove();
    }, 850);
}

document.querySelectorAll('.phrase-container').forEach(container => {
    container.addEventListener('click', (e) => {
        // Crear múltiples chispas
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createSparkle(
                    e.clientX + Math.random() * 20 - 10,
                    e.clientY + Math.random() * 20 - 10
                );
            }, i * 100);
        }
    });
});

// —————————————————————————————————————————————
// Mensaje en consola con estilo
// —————————————————————————————————————————————

console.log(
    '%c💌 Un detalle hecho con cariño',
    'color: #4A3728; font-size: 16px; font-weight: bold; font-family: serif; padding: 10px;'
);

console.log(
    '%cSi estás leyendo esto en la consola, %ceres alguien curioso. %cEso me gusta. ✨',
    'color: #8B6B4F; font-size: 13px; font-family: serif;',
    'color: #C9A24D; font-size: 13px; font-family: serif; font-weight: bold;',
    'color: #6B4E3D; font-size: 13px; font-family: serif; font-style: italic;'
);

// —————————————————————————————————————————————
// Precargar fuentes para evitar FOUT
// —————————————————————————————————————————————

if ('fonts' in document) {
    Promise.all([
        document.fonts.load('400 1em "Playfair Display"'),
        document.fonts.load('400 1em "Mrs Saint Delafield"'),
        document.fonts.load('400 1em "Crimson Text"'),
        document.fonts.load('400 1em "Cormorant Garamond"')
    ]).then(() => {
        document.body.style.opacity = '1';
    });
}

// —————————————————————————————————————————————
// Lo importante se siente, no solo se ve
// —————————————————————————————————————————————