// Metro station data with coordinates and connections
const metroStations = {
    'wardha-central': {
        name: 'Wardha Central',
        coordinates: [20.7453, 78.6022],
        connections: ['railway-station', 'market-square'],
        type: 'terminal'
    },
    'railway-station': {
        name: 'Railway Station',
        coordinates: [20.7489, 78.6028],
        connections: ['wardha-central', 'hospital'],
        type: 'interchange'
    },
    'market-square': {
        name: 'Market Square',
        coordinates: [20.7432, 78.6001],
        connections: ['wardha-central', 'college'],
        type: 'regular'
    },
    'hospital': {
        name: 'Civil Hospital',
        coordinates: [20.7501, 78.6050],
        connections: ['railway-station', 'industrial'],
        type: 'regular'
    },
    'college': {
        name: 'Wardha College',
        coordinates: [20.7400, 78.5980],
        connections: ['market-square', 'industrial'],
        type: 'regular'
    },
    'industrial': {
        name: 'Industrial Area',
        coordinates: [20.7550, 78.6100],
        connections: ['hospital', 'college'],
        type: 'terminal'
    }
};

// Route finding function
function findRoute() {
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const departureTime = document.getElementById('departure-time').value;

    if (!source || !destination) {
        alert('Please select both source and destination stations');
        return;
    }

    if (source === destination) {
        alert('Source and destination cannot be the same');
        return;
    }

    // Show loading state
    const findRouteBtn = document.getElementById('find-route-btn');
    const originalText = findRouteBtn.innerHTML;
    findRouteBtn.innerHTML = '<span class="loading"></span> Finding Routes...';
    findRouteBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        const routes = calculateRoutes(source, destination);
        displayRoutes(routes);
        
        // Update map
        updateRouteMap(source, destination, routes);
        
        // Reset button
        findRouteBtn.innerHTML = originalText;
        findRouteBtn.disabled = false;
        
        // Show results
        document.getElementById('route-results').style.display = 'block';
        document.getElementById('route-results').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Calculate possible routes using simple pathfinding
function calculateRoutes(source, destination) {
    const routes = [];
    
    // Simple route calculation (in real app, this would use proper pathfinding algorithms)
    if (source === 'wardha-central' && destination === 'industrial') {
        routes.push({
            id: 1,
            title: 'Direct Route via Railway Station',
            type: 'Fastest',
            stops: 3,
            time: '18 min',
            distance: '2.8 km',
            fare: '₹25',
            eta: '8:45 AM',
            route: ['wardha-central', 'railway-station', 'hospital', 'industrial']
        });
        routes.push({
            id: 2,
            title: 'Alternative Route via Market Square',
            type: 'Scenic',
            stops: 4,
            time: '22 min',
            distance: '3.1 km',
            fare: '₹25',
            eta: '8:49 AM',
            route: ['wardha-central', 'market-square', 'college', 'industrial']
        });
    } else if (source === 'railway-station' && destination === 'college') {
        routes.push({
            id: 1,
            title: 'Direct Route via Hospital',
            type: 'Fastest',
            stops: 2,
            time: '12 min',
            distance: '1.9 km',
            fare: '₹20',
            eta: '8:39 AM',
            route: ['railway-station', 'hospital', 'college']
        });
    } else {
        // Generic route for other combinations
        const sourceStation = metroStations[source];
        const destStation = metroStations[destination];
        
        routes.push({
            id: 1,
            title: `Route from ${sourceStation.name} to ${destStation.name}`,
            type: 'Standard',
            stops: Math.floor(Math.random() * 3) + 2,
            time: `${Math.floor(Math.random() * 15) + 10} min`,
            distance: `${(Math.random() * 2 + 1).toFixed(1)} km`,
            fare: `₹${Math.floor(Math.random() * 10) + 15}`,
            eta: '8:42 AM',
            route: [source, destination]
        });
    }

    return routes;
}

// Display route results
function displayRoutes(routes) {
    const routesList = document.getElementById('routes-list');
    routesList.innerHTML = '';

    routes.forEach(route => {
        const routeCard = document.createElement('div');
        routeCard.className = 'route-card fade-in';
        routeCard.innerHTML = `
            <div class="route-header">
                <div class="route-title">${route.title}</div>
                <div class="route-badge">${route.type}</div>
            </div>
            <div class="route-details">
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <div class="detail-label">Travel Time</div>
                        <div class="detail-value">${route.time}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <div class="detail-label">Stops</div>
                        <div class="detail-value">${route.stops}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-route"></i>
                    <div>
                        <div class="detail-label">Distance</div>
                        <div class="detail-value">${route.distance}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-ticket-alt"></i>
                    <div>
                        <div class="detail-label">Fare</div>
                        <div class="detail-value">${route.fare}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar-check"></i>
                    <div>
                        <div class="detail-label">ETA</div>
                        <div class="detail-value">${route.eta}</div>
                    </div>
                </div>
            </div>
            <div class="route-actions">
                <button class="btn btn-secondary" onclick="selectRoute(${route.id})">
                    <i class="fas fa-info-circle"></i> Details
                </button>
                <button class="btn btn-primary" onclick="bookTicket(${route.id})">
                    <i class="fas fa-ticket-alt"></i> Book Ticket
                </button>
            </div>
        `;
        routesList.appendChild(routeCard);
    });
}

// Update route map (placeholder for now)
function updateRouteMap(source, destination, routes) {
    const mapContainer = document.getElementById('route-map');
    mapContainer.innerHTML = `
        <div class="map-placeholder">
            <i class="fas fa-route"></i>
            <p>Route from ${metroStations[source].name}</p>
            <p>to ${metroStations[destination].name}</p>
            <p style="font-size: 1rem; margin-top: 1rem; color: var(--success-color);">
                ${routes.length} route(s) found
            </p>
        </div>
    `;
}

// Route selection
function selectRoute(routeId) {
    alert(`Route ${routeId} selected. Detailed view will be implemented with backend integration.`);
}

// Ticket booking
function bookTicket(routeId) {
    alert(`Booking ticket for Route ${routeId}. Payment gateway will be integrated with backend.`);
}

// Voice input functionality
function toggleVoiceInput() {
    const voiceBtn = document.getElementById('voice-btn');
    const icon = voiceBtn.querySelector('i');
    
    if (voiceBtn.classList.contains('voice-active')) {
        // Stop voice input
        voiceBtn.classList.remove('voice-active');
        icon.className = 'fas fa-microphone';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Voice Input';
    } else {
        // Start voice input
        voiceBtn.classList.add('voice-active');
        icon.className = 'fas fa-microphone-slash';
        voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Voice';
        
        // Simulate voice recognition
        setTimeout(() => {
            if (voiceBtn.classList.contains('voice-active')) {
                simulateVoiceInput();
            }
        }, 3000);
    }
}

// Simulate voice input (placeholder)
function simulateVoiceInput() {
    const voiceBtn = document.getElementById('voice-btn');
    voiceBtn.classList.remove('voice-active');
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Voice Input';
    
    // Simulate setting source and destination
    document.getElementById('source').value = 'wardha-central';
    document.getElementById('destination').value = 'industrial';
    
    alert('Voice input detected: "From Wardha Central to Industrial Area"');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set default departure time to current time + 30 minutes
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    document.getElementById('departure-time').value = now.toISOString().slice(0, 16);
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Feedback Form Functionality
let selectedRating = 0;

// Initialize feedback form
document.addEventListener('DOMContentLoaded', function() {
    initializeFeedbackForm();
});

function initializeFeedbackForm() {
    // Star rating functionality
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingText = document.querySelector('.rating-text');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            selectedRating = rating;
            updateStarDisplay(rating);
            updateRatingText(rating);
        });

        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            updateStarDisplay(rating);
        });

        star.addEventListener('mouseleave', function() {
            updateStarDisplay(selectedRating);
        });
    });

    // Form submission
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmission);
    }
}

function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.rating-stars i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateRatingText(rating) {
    const ratingText = document.querySelector('.rating-text');
    const ratingDescriptions = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
    };
    ratingText.textContent = ratingDescriptions[rating] || 'Click to rate';
}

function handleFeedbackSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const feedbackData = {
        type: document.getElementById('feedback-type').value,
        category: document.getElementById('feedback-category').value,
        station: document.getElementById('feedback-station').value,
        description: document.getElementById('feedback-description').value,
        rating: selectedRating,
        contact: document.getElementById('feedback-contact').value,
        anonymous: document.getElementById('feedback-anonymous').checked,
        timestamp: new Date().toISOString()
    };

    // Validate required fields
    if (!feedbackData.type || !feedbackData.category || !feedbackData.description || selectedRating === 0) {
        showFeedbackMessage('Please fill in all required fields and provide a rating.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Simulate API call (replace with actual backend integration)
    setTimeout(() => {
        // Store feedback in localStorage for demo purposes
        const existingFeedback = JSON.parse(localStorage.getItem('wardhaMetroFeedback') || '[]');
        existingFeedback.push(feedbackData);
        localStorage.setItem('wardhaMetroFeedback', JSON.stringify(existingFeedback));

        // Show thank you popup
        showThankYouPopup();
        
        // Reset form
        resetFeedbackForm();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function resetFeedbackForm() {
    const form = document.getElementById('feedback-form');
    form.reset();
    selectedRating = 0;
    updateStarDisplay(0);
    updateRatingText(0);
    
    // Remove any existing success/error messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
}

function showFeedbackMessage(message, type) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.style.display = 'flex';
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Insert message at the top of the form
    const form = document.getElementById('feedback-form');
    form.insertBefore(messageDiv, form.firstChild);

    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Thank You Popup Function
function showThankYouPopup() {
    // Create popup HTML
    const popupHTML = `
        <div class="thank-you-popup" id="thankYouPopup">
            <div class="thank-you-content">
                <div class="thank-you-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <h2 class="thank-you-title">Thank You!</h2>
                <p class="thank-you-message">
                    Your feedback has been submitted successfully. We appreciate your input and will use it to improve our services.
                </p>
                <button class="thank-you-btn" onclick="closeThankYouPopup()">
                    <i class="fas fa-check"></i> Got it!
                </button>
            </div>
        </div>
    `;
    
    // Add popup to body
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Show popup with animation
    setTimeout(() => {
        document.getElementById('thankYouPopup').classList.add('show');
    }, 100);
}

function closeThankYouPopup() {
    const popup = document.getElementById('thankYouPopup');
    popup.classList.remove('show');
    
    // Remove popup after animation
    setTimeout(() => {
        popup.remove();
    }, 300);
}

// Add error message styles
const style = document.createElement('style');
style.textContent = `
    .error-message {
        background: linear-gradient(135deg, var(--danger-color), #ef4444);
        color: white;
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* Thank You Popup Styles */
    .thank-you-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .thank-you-popup.show {
        opacity: 1;
        visibility: visible;
    }

    .thank-you-content {
        background: white;
        padding: 3rem 2rem;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }

    .thank-you-popup.show .thank-you-content {
        transform: scale(1);
    }

    .thank-you-icon {
        font-size: 4rem;
        color: var(--success-color);
        margin-bottom: 1rem;
    }

    .thank-you-title {
        font-size: 1.8rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-weight: 600;
    }

    .thank-you-message {
        color: #666;
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .thank-you-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 25px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .thank-you-btn:hover {
        background: var(--success-color);
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);