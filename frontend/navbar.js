// navbar.js
function initializeNavbar() {

    // Set active navigation link based on the current page
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.parentElement.classList.add('active');
        }
    });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Auth Modal Functionality
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const closeLoginModal = document.getElementById('closeLoginModal');
        const closeSignupModal = document.getElementById('closeSignupModal');
        const switchToSignup = document.getElementById('switchToSignup');
        const switchToLogin = document.getElementById('switchToLogin');
        const mobileAuthBtn = document.getElementById('mobileAuthBtn');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        // Open modals
        function openModal(modal) {
            document.body.style.overflow = 'hidden';
            modal.classList.add('active');
        }

        // Close modals
        function closeModal(modal) {
            document.body.style.overflow = 'auto';
            modal.classList.remove('active');
        }

        // Event listeners
        loginBtn.addEventListener('click', () => openModal(loginModal));
        signupBtn.addEventListener('click', () => openModal(signupModal));
        mobileAuthBtn.addEventListener('click', () => openModal(loginModal));

        closeLoginModal.addEventListener('click', () => closeModal(loginModal));
        closeSignupModal.addEventListener('click', () => closeModal(signupModal));

        switchToSignup.addEventListener('click', () => {
            closeModal(loginModal);
            setTimeout(() => openModal(signupModal), 300);
        });

        switchToLogin.addEventListener('click', () => {
            closeModal(signupModal);
            setTimeout(() => openModal(loginModal), 300);
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) closeModal(loginModal);
            if (e.target === signupModal) closeModal(signupModal);
        });

        // Form validation
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            
            // Validate email
            if (!validateEmail(email.value)) {
                email.parentElement.classList.add('error');
                isValid = false;
            } else {
                email.parentElement.classList.remove('error');
            }
            
            // Validate password
            if (password.value.length < 1) {
                password.parentElement.classList.add('error');
                isValid = false;
            } else {
                password.parentElement.classList.remove('error');
            }
            
            if (isValid) {
                // Here you would typically send the data to your server
                alert('Login successful!');
                closeModal(loginModal);
                loginForm.reset();
            }
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('signupName');
            const email = document.getElementById('signupEmail');
            const password = document.getElementById('signupPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            
            // Validate name
            if (name.value.length < 2) {
                name.parentElement.classList.add('error');
                isValid = false;
            } else {
                name.parentElement.classList.remove('error');
            }
            
            // Validate email
            if (!validateEmail(email.value)) {
                email.parentElement.classList.add('error');
                isValid = false;
            } else {
                email.parentElement.classList.remove('error');
            }
            
            // Validate password
            if (password.value.length < 8) {
                password.parentElement.classList.add('error');
                isValid = false;
            } else {
                password.parentElement.classList.remove('error');
            }
            
            // Validate confirm password
            if (password.value !== confirmPassword.value) {
                confirmPassword.parentElement.classList.add('error');
                isValid = false;
            } else {
                confirmPassword.parentElement.classList.remove('error');
            }
            
            if (isValid) {
                // Here you would typically send the data to your server
                alert('Account created successfully!');
                closeModal(signupModal);
                signupForm.reset();
            }
        });

        // Clear validation on input
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
            });
        });
}