document.addEventListener('DOMContentLoaded', () => {


    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-cyan-400/30', 'shadow-lg', 'shadow-cyan-400/20');
        } else {
            navbar.classList.remove('bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-cyan-400/30', 'shadow-lg', 'shadow-cyan-400/20');
        }
    });


    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex'); 
        });

       
        mobileMenu.querySelectorAll('button[data-section]').forEach(button => {
            button.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) { 
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                }
            });
        });
    }

   
    document.querySelectorAll('nav button[data-section], #view-projects-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            let sectionId;
            if (e.currentTarget.id === 'view-projects-btn') {
                sectionId = 'projects';
            } else {
                sectionId = e.currentTarget.dataset.section;
            }
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    const hireMeBtn = document.querySelector('.hero-content button:first-child'); 
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

  
    function animateText(element) {
        const text = element.dataset.text;
        const delay = parseInt(element.dataset.delay || '0');
        let i = 0;
        let displayText = '';
        element.style.opacity = '0';

        setTimeout(() => {
            element.style.opacity = '1';
            const interval = setInterval(() => {
                displayText = text.slice(0, i + 1);
                element.textContent = displayText;
                
                element.innerHTML += '<span class="animate-pulse-custom">|</span>';
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    
                    element.innerHTML = text;
                }
            }, 50);
        }, delay);
    }

    document.querySelectorAll('.animated-text').forEach(animateText);


    function ParticleBackground(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        
        container.innerHTML = '';

        const particles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.1, 
            speedY: (Math.random() - 0.5) * 0.1, 
            element: null
        }));

        particles.forEach(p => {
            const div = document.createElement('div');
            div.className = "absolute bg-cyan-400/20 rounded-full animate-pulse-custom";
            div.style.width = `${p.size}px`;
            div.style.height = `${p.size}px`;
            div.style.left = `${p.x}%`;
            div.style.top = `${p.y}%`;
            p.element = div;
            container.appendChild(div);
        });

        function animateParticles() {
            particles.forEach(p => {
                p.x = (p.x + p.speedX + 100) % 100;
                p.y = (p.y + p.speedY + 100) % 100;
                p.element.style.left = `${p.x}%`;
                p.element.style.top = `${p.y}%`;
            });
            requestAnimationFrame(animateParticles);
        }
        requestAnimationFrame(animateParticles);
    }
   
    ParticleBackground('particle-background-container'); 
    ParticleBackground('particle-background-container-skills'); 
    ParticleBackground('particle-background-container-achievements');
    ParticleBackground('particle-background-container-education'); 


    function MatrixRain(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

       
        container.innerHTML = '';

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const drops = Array.from({ length: 15 }, (_, i) => {
            const div = document.createElement('div');
            div.className = "absolute text-cyan-400 text-xs font-mono matrix-drop";
            div.style.left = `${Math.random() * 100}%`;
            div.style.top = '0%';
            div.style.animationDuration = `${Math.random() * 5 + 5}s`; 
            div.style.animationDelay = `${Math.random() * -5}s`; 

            let chars = '';
            for (let j = 0; j < 20; j++) {
                chars += `<div class="opacity-70">${characters[Math.floor(Math.random() * characters.length)]}</div>`;
            }
            div.innerHTML = chars;
            container.appendChild(div);
            return { element: div, characters: chars.split(/(<div class="opacity-70">|<\/div>)/).filter(Boolean) };
        });

        let lastFrameTime = 0;
        const frameInterval = 300; 

        function animateMatrix(currentTime) {
            if (currentTime - lastFrameTime > frameInterval) {
                drops.forEach(drop => {
                    let newChars = '';
                    for (let j = 0; j < 20; j++) {
                        newChars += `<div class="opacity-70">${characters[Math.floor(Math.random() * characters.length)]}</div>`;
                    }
                    drop.element.innerHTML = newChars;
                });
                lastFrameTime = currentTime;
            }
            requestAnimationFrame(animateMatrix);
        }
        requestAnimationFrame(animateMatrix);
    }
    MatrixRain('matrix-rain-container'); 


    
    const mouseOrb = document.getElementById('mouse-orb');
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentOrbX = 0;
    let currentOrbY = 0;
    const easingFactor = 0.1; 

    if (mouseOrb) {
        window.addEventListener('mousemove', (e) => {
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;
        });

        function animateOrb() {
            currentOrbX += (targetMouseX - currentOrbX) * easingFactor;
            currentOrbY += (targetMouseY - currentOrbY) * easingFactor;
            
            
            mouseOrb.style.left = `${currentOrbX - mouseOrb.offsetWidth / 2}px`;
            mouseOrb.style.top = `${currentOrbY - mouseOrb.offsetHeight / 2}px`;
            
            requestAnimationFrame(animateOrb);
        }
        requestAnimationFrame(animateOrb);
    }

    
    const sectionObserverOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionContent = entry.target.querySelector('.section-content') || entry.target.querySelector('.hero-content');
                const heroAvatar = entry.target.querySelector('.hero-avatar');

                if (sectionContent) {
                    sectionContent.classList.remove('opacity-0', 'translate-y-10', '-translate-x-10', 'translate-x-10');
                    sectionContent.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
                }
                if (heroAvatar) {
                    heroAvatar.classList.remove('opacity-0', 'translate-x-10');
                    heroAvatar.classList.add('opacity-100', 'translate-x-0');
                }
                
                
                if (entry.target.id === 'skills') {
                    document.querySelectorAll('#skills .skill-bar-level').forEach((bar, index) => {
                        const level = parseInt(bar.dataset.level);
                        setTimeout(() => {
                            bar.style.width = `${level}%`;
                        }, index * 100 + 500); 
                    });
                    
                    document.querySelectorAll('#skills .grid > div').forEach((skillCard, index) => {
                        setTimeout(() => {
                            skillCard.classList.remove('opacity-0', 'translate-y-10');
                            skillCard.classList.add('opacity-100', 'translate-y-0');
                        }, index * 100 + 200); 
                    });
                }
                
                
                if (entry.target.id === 'projects') {
                    document.querySelectorAll('#projects-container > div').forEach((projectCard, index) => {
                        setTimeout(() => {
                            projectCard.classList.remove('opacity-0', 'translate-y-10');
                            projectCard.classList.add('opacity-100', 'translate-y-0');
                        }, index * 100 + 200); 
                    });
                }

                
                if (entry.target.id === 'achievements') {
                    document.querySelectorAll('#achievements-container > div').forEach((achievementCard, index) => {
                        setTimeout(() => {
                            achievementCard.classList.remove('opacity-0', 'translate-y-10');
                            achievementCard.classList.add('opacity-100', 'translate-y-0');
                        }, index * 100 + 200); 
                    });
                }

                
                if (entry.target.id === 'education') {
                    document.querySelectorAll('#education-timeline-container .timeline-item').forEach((timelineItem, index) => {
                        setTimeout(() => {
                            timelineItem.classList.remove('opacity-0', 'translate-x-20', '-translate-x-20');
                            timelineItem.classList.add('opacity-100', 'translate-x-0');
                        }, index * 150 + 200); 
                    });
                }

                if (entry.target.id === 'contact') {
                    document.querySelectorAll('#social-links > a').forEach((socialLink, index) => {
                        setTimeout(() => {
                            socialLink.classList.remove('opacity-0', 'translate-y-10');
                            socialLink.classList.add('opacity-100', 'translate-y-0');
                        }, index * 100 + 200); 
                    });
                }

                
            } else {
               
                const sectionContent = entry.target.querySelector('.section-content') || entry.target.querySelector('.hero-content');
                const heroAvatar = entry.target.querySelector('.hero-avatar');

                if (sectionContent && entry.target.id !== 'hero') { 
                    sectionContent.classList.add('opacity-0', 'translate-y-10');
                }
                if (heroAvatar) {
                    heroAvatar.classList.add('opacity-0', 'translate-x-10');
                }

                if (entry.target.id === 'skills') {
                    document.querySelectorAll('#skills .skill-bar-level').forEach(bar => {
                        bar.style.width = '0%'; 
                    });
                    document.querySelectorAll('#skills .grid > div').forEach(skillCard => {
                        skillCard.classList.add('opacity-0', 'translate-y-10'); 
                    });
                }

                if (entry.target.id === 'projects') {
                    document.querySelectorAll('#projects-container > div').forEach(projectCard => {
                        projectCard.classList.add('opacity-0', 'translate-y-10');
                    });
                }

                if (entry.target.id === 'achievements') {
                    document.querySelectorAll('#achievements-container > div').forEach(achievementCard => {
                        achievementCard.classList.add('opacity-0', 'translate-y-10');
                    });
                }

                if (entry.target.id === 'education') {
                    document.querySelectorAll('#education-timeline-container .timeline-item').forEach((timelineItem, index) => {
                        const isLeft = index % 2 === 0;
                        const translateClass = isLeft ? '-translate-x-20' : 'translate-x-20';
                        timelineItem.classList.add('opacity-0', translateClass);
                    });
                }

                if (entry.target.id === 'contact') {
                    document.querySelectorAll('#social-links > a').forEach(socialLink => {
                        socialLink.classList.add('opacity-0', 'translate-y-10');
                    });
                }
            }
        });
    }, sectionObserverOptions);
       
    const skillsData = [
        { name: "Python", image: "https://placehold.co/150x150/333/FFF?text=Python" },
        { name: "HTML/CSS", image: "https://placehold.co/150x150/333/FFF?text=HTML/CSS" },
        { name: "React", image: "https://placehold.co/150x150/333/FFF?text=React" },
        { name: "TensorFlow", image: "https://placehold.co/150x150/333/FFF?text=TensorFlow" },
        { name: "OpenCV", image: "https://placehold.co/150x150/333/FFF?text=OpenCV" },
        { name: "Power BI", image: "https://placehold.co/150x150/333/FFF?text=Power+BI" }
    ];

    function populateSkillsSlider() {
        const skillsSliderTrack = document.getElementById('skills-slider-track');
        if (!skillsSliderTrack) return;
        skillsSliderTrack.innerHTML = '';
        
        const allSkills = [...skillsData, ...skillsData];

        allSkills.forEach(skill => {
            const img = document.createElement('img');
            img.src = skill.image;
            img.alt = skill.name;
            img.onerror = function() { this.src = `https://placehold.co/150x150/333/FFF?text=${encodeURIComponent(skill.name)}`; };
            skillsSliderTrack.appendChild(img);
        });
    }

    
    document.querySelectorAll('.snap-section').forEach(section => {
        sectionObserver.observe(section);
    });

   
    const projectsData = [
        {
            title: " A Flipkart Clone",
            desc: "A modern, responsive e-commerce storefront inspired by Flipkart. Showcasing top deals, product categories, and special offers in a clean, user-friendly layout.",
            tech: ["HTML", "CSS", "JSON"],
            icon: "🛒",
            color: "from-purple-400 to-pink-400",
            website: "https://flip-k-redesign.vercel.app/" 
        },
        {
            title: "Musthaq  Vision",
            desc: "A modern e-commerce eyewear store with discounts, wishlist, cart, and responsive design for a smooth shopping experience.",
            tech:    ["HTML", "JSON", "CSS"],
            icon: "👓",
            color: "from-green-400 to-blue-400",
            website: "https://e-commerce-website-two-iota.vercel.app/" 
        },
        {
            title: "My Deen Routine",
            desc: "My Deen Routine – A responsive web app to track daily prayers, habits, dhikr, prayer times, and daily Quranic verses.",
            tech:    ["TYPESCRIPT", "TAILWIND", "CSS"],
            icon: "📿",
            color: "from-green-400 to-blue-400",
            website: "https://my-deen-journey.vercel.app/" 
        },
        {
            title: "Musthaq Portfolio — Full-Stack Developer ",
            desc: "A personal developer portfolio highlighting MERN, Java & Python projects, skills, work experience, and real-world apps.",
            tech: ["NEXRJS", "TAILWIND", "JS"],
            icon: "🌐",
            color: "from-yellow-400 to-orange-400",
            website: "https://musthaq-portflio.vercel.app/" 
        },
        
    ];

    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsData.forEach((proj, index) => {
            const projectDiv = document.createElement('div');
            projectDiv.className = `group relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/30 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/30 cursor-pointer translate-y-10 opacity-0`; // Initial hidden state
            
            const techBadges = proj.tech.map(tech => `
                <span class="bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-400/30 hover:bg-cyan-400/20 transition-all duration-300 transform hover:scale-105">
                    ${tech}
                </span>
            `).join('');

            projectDiv.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br ${proj.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"></div>
                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center gap-3">
                            <div class="text-2xl">${proj.icon}</div>
                            <h3 class="text-xl text-cyan-400 font-semibold font-mono group-hover:text-white transition-colors duration-300">
                                ${proj.title}
                            </h3>
                        </div>
                        <a href="${proj.website ? proj.website : '#'}" target="_blank" rel="noopener noreferrer" class="external-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                    </div>
                    <p class="text-gray-300 text-sm mb-4 text-left leading-relaxed">
                        ${proj.desc}
                    </p>
                    <div class="flex flex-wrap gap-2 justify-center">
                        ${techBadges}
                    </div>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>
            `;
            projectsContainer.appendChild(projectDiv);
        });
    }

   
    const achievementsData = [
        {
            title: "Google AI/ML Certification",
            description: "Completed the Google AI/ML Professional Certificate, mastering advanced machine learning concepts and applications.",
            icon: "🏆", 
            color: "from-blue-500 to-indigo-500"
        },
        {
            title: "Hackathon Winner 2023",
            description: "Led a team to victory in the annual university hackathon, developing an innovative solution for smart city logistics.",
            icon: "🥇", 
            color: "from-yellow-500 to-orange-500"
        },
        {
            title: "Published Research Paper",
            description: "Co-authored a research paper on predictive analytics for renewable energy, published in a peer-reviewed journal.",
            icon: "📄",
            color: "from-green-500 to-teal-500"
        },
        {
            title: "Community Service Award",
            description: "Recognized for significant contributions to local community tech initiatives, providing free coding workshops.",
            icon: "🙌", 
            color: "from-red-500 to-pink-500"
        }
    ];

    const achievementsContainer = document.getElementById('achievements-container');
    if (achievementsContainer) {
        achievementsData.forEach((achievement, index) => {
            const achievementDiv = document.createElement('div');
            achievementDiv.className = `group relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-cyan-400/30 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/30 cursor-pointer translate-y-10 opacity-0`; // Initial hidden state
            
            achievementDiv.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"></div>
                
                <div class="relative z-10 text-center">
                    <div class="text-4xl mb-4">${achievement.icon}</div>
                    <h3 class="text-xl text-cyan-400 font-semibold font-mono group-hover:text-white transition-colors duration-300 mb-2">
                        ${achievement.title}
                    </h3>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        ${achievement.description}
                    </p>
                </div>
            `;
            achievementsContainer.appendChild(achievementDiv);
        });
    }

    
    const educationData = [
        {
            degree: "B.Tech CSE ",
            institution: "Nimra Institute of Eng & Tech, Vijayawada",
            period: "2022 - Present",
            description: "Currently pursuing a Bachelor of Technology in Computer Science & Engineering.",
            icon: "🎓"
        },
        {
            degree: "Intermediate Education(MPC)",
            institution: "Pratibha jr college, Macherla",
            period: "2020 - 2022",
            description: "Completed Intermediate Education with a focus on  Mathematics, Physics and Chemistry.",
            icon: "📖"
        },
         {
            degree: "Secondary School",
            institution: "Adarsh public school, Macherla",
            period: "2020",
            description: "Completed Higher Secondary Education with a focus on studies",
            icon: "📚"
        },
    ];

    const educationTimelineContainer = document.getElementById('education-timeline-container');
    if (educationTimelineContainer) {
        educationData.forEach((entry, index) => {
            const isLeft = index % 2 === 0; 
            const contentAlignClass = isLeft ? 'md:text-right' : 'md:text-left';
            const contentMarginClass = isLeft ? 'md:mr-10' : 'md:ml-10'; 
            const arrowClass = isLeft ? 'md:border-l-8 md:border-l-gray-800/80 md:right-full md:translate-x-full' : 'md:border-r-8 md:border-r-gray-800/80 md:left-full md:-translate-x-full';
            const translateClass = isLeft ? '-translate-x-20' : 'translate-x-20'; 
            const flexOrderClass = isLeft ? 'md:flex-row-reverse' : 'md:flex-row'; 

            const timelineItemDiv = document.createElement('div');
            timelineItemDiv.className = `timeline-item flex flex-col items-center mb-16 last:mb-0 relative transition-all duration-700 ${translateClass} opacity-0 ${flexOrderClass}`;
            
            timelineItemDiv.innerHTML = `
                <div class="flex-shrink-0 w-full md:w-auto flex justify-center mb-4 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:z-10">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-white border-2 border-blue-200/50 shadow-lg">
                        <span class="text-xl">${entry.icon}</span>
                    </div>
                </div>

                <div class="timeline-content w-full md:w-1/2 p-6 sm:p-8 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/20 relative ${contentMarginClass} ${contentAlignClass}">
                    <div class="absolute w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent top-1/2 -translate-y-1/2 hidden md:block ${arrowClass}"></div>
                    
                    <h3 class="font-semibold text-white text-lg sm:text-xl mb-1">${entry.degree}</h3>
                    <p class="text-sm sm:text-base text-gray-400 mb-2">${entry.institution} - ${entry.period}</p>
                    <p class="text-sm sm:text-base text-gray-300 leading-relaxed">${entry.description}</p>
                </div>
            `;
            
            educationTimelineContainer.appendChild(timelineItemDiv);
        });
    }


  
    const socialLinksData = [
        { href: "http://www.linkedin.com/in/mustaq888", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`, label: "LinkedIn" },
        { href: "https://www.instagram.com/mr.nick____07", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>`, label: "Instagram" },
        { href: "https://github.com/mustaq888", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.492.998.108-.77.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.399.006 0 .012 0 .018 0 1.02-.001 2.046.133 3.004.399 2.292-1.552 3.299-1.23 3.299-1.23.653 1.653.242 2.873.118 3.176.767.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.8.576C20.566 22.186 24 17.684 24 12c0-6.627-5.373-12-12-12z"/></svg>`, label: "GitHub" },
        { href: "shaikmustaqahammed786@gmail.com", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`, label: "Email" }
    ];

    const socialLinksContainer = document.getElementById('social-links');
    if (socialLinksContainer) {
        socialLinksData.forEach((social, index) => {
            const anchor = document.createElement('a');
            anchor.href = social.href;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.className = `group relative bg-gray-800/80 backdrop-blur-sm p-4 rounded-full border border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50 translate-y-10 opacity-0`; // Initial hidden state
            anchor.innerHTML = `
                ${social.icon}
                <span class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ${social.label}
                </span>
            `;
            socialLinksContainer.appendChild(anchor);
        });
    }

});

const skillsData = [
    { name: "sql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
    { name: "java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg"  },
    { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "HTMl", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "JS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg" },
    { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "css", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg" },
    { name: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    { name: "git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "nodejs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain.svg" },
   
];
function populateSkillsSlider() {
    const skillsSliderTrack = document.getElementById('skills-slider-track');
    if (skillsSliderTrack) {
        // Duplicate the skills to create a seamless loop
        const allSkills = [...skillsData, ...skillsData];

        allSkills.forEach(skill => {
            const img = document.createElement('img');
            img.src = skill.image;
            img.alt = skill.name;
            img.title = skill.name; // Add title for tooltip on hover
            img.className = 'skill-icon'; // Add a class for potential specific styling
            img.onerror = function() {
                this.onerror = null;
                this.src = `https://placehold.co/100x100/333/FFF?text=${encodeURIComponent(skill.name.split(' ')[0])}`;
            };
            skillsSliderTrack.appendChild(img);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
  

    populateSkillsSlider(); 
});

