// Gestion du menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Cacher toutes les sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Afficher la section cible
            targetSection.classList.add('active');
            
            // Fermer le menu
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Slider automatique
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        // Défilement automatique toutes les 5 secondes
        setInterval(nextSlide, 5000);

        // Boutons de navigation
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
    }

    // Gestion des formulaires multi-étapes
    const formEtudier = document.getElementById('form-etudier');
    if (formEtudier) {
        const steps = formEtudier.querySelectorAll('.form-step');
        const nextBtns = formEtudier.querySelectorAll('.btn-next');
        const prevBtns = formEtudier.querySelectorAll('.btn-prev');
        let currentStep = 0;

        function showStep(stepIndex) {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === stepIndex);
            });
            currentStep = stepIndex;
        }

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep < steps.length - 1) {
                    // Validation basique du step actuel
                    const currentStepInputs = steps[currentStep].querySelectorAll('input[required], select[required]');
                    let isValid = true;
                    
                    currentStepInputs.forEach(input => {
                        if (!input.value) {
                            input.style.borderColor = 'red';
                            isValid = false;
                        } else {
                            input.style.borderColor = '#e1e1e1';
                        }
                    });

                    if (isValid) {
                        showStep(currentStep + 1);
                    } else {
                        alert('Veuillez remplir tous les champs obligatoires.');
                    }
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 0) {
                    showStep(currentStep - 1);
                }
            });
        });
    }

    // Gestion de l'envoi des formulaires
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(form);
            
            // Ajouter l'email de destination
            formData.append('_to', 'agenceboolky6@gmail.com');
            
            try {
                // Simulation d'envoi (à remplacer par votre service d'envoi d'emails)
                console.log('Données du formulaire:', Object.fromEntries(formData));
                
                // Afficher un message de succès
                alert('Votre demande a été envoyée avec succès. Nous vous contacterons sous peu.');
                
                // Réinitialiser le formulaire
                form.reset();
                
                // Retour à l'étape 1 si formulaire multi-étapes
                if (form.id === 'form-etudier') {
                    showStep(0);
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer plus tard.');
            }
        });
    });

    // Animation au scroll pour les sections
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

    document.querySelectorAll('.section:not(#accueil)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Gestion de la soumission réelle des formulaires avec Formspree
// Pour utiliser Formspree, remplacez l'action des formulaires par:
// action="https://formspree.io/f/your-formspree-id"

// Alternative avec EmailJS (si vous préférez)
// Vous devrez vous inscrire sur EmailJS et configurer votre service
function sendEmailWithEmailJS(formId, templateId) {
    emailjs.init('YOUR_USER_ID');
    
    const form = document.getElementById(formId);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        emailjs.sendForm('YOUR_SERVICE_ID', templateId, this)
            .then(() => {
                alert('Message envoyé avec succès!');
                form.reset();
            }, (error) => {
                alert('Erreur lors de l\'envoi: ' + JSON.stringify(error));
            });
    });
}