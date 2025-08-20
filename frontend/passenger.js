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

    const findRouteBtn = document.getElementById('find-route-btn');
    const originalText = findRouteBtn.innerHTML;
    findRouteBtn.innerHTML = '<span class="loading"></span> Finding Routes...';
    findRouteBtn.disabled = true;

    setTimeout(() => {
        const routes = calculateRoutes(source, destination);
        displayRoutes(routes);
        updateRouteMap(source, destination, routes);
        findRouteBtn.innerHTML = originalText;
        findRouteBtn.disabled = false;

        document.getElementById('route-results').style.display = 'block';
        document.getElementById('route-results').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Calculate possible routes
function calculateRoutes(source, destination) {
    const routes = [];

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

// Display route cards
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
                <div class="detail-item"><i class="fas fa-clock"></i>
                    <div><div class="detail-label">Travel Time</div><div class="detail-value">${route.time}</div></div>
                </div>
                <div class="detail-item"><i class="fas fa-map-marker-alt"></i>
                    <div><div class="detail-label">Stops</div><div class="detail-value">${route.stops}</div></div>
                </div>
                <div class="detail-item"><i class="fas fa-route"></i>
                    <div><div class="detail-label">Distance</div><div class="detail-value">${route.distance}</div></div>
                </div>
                <div class="detail-item"><i class="fas fa-ticket-alt"></i>
                    <div><div class="detail-label">Fare</div><div class="detail-value">${route.fare}</div></div>
                </div>
                <div class="detail-item"><i class="fas fa-calendar-check"></i>
                    <div><div class="detail-label">ETA</div><div class="detail-value">${route.eta}</div></div>
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

// Update map placeholder
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

// Select route handler
function selectRoute(routeId) {
    alert(`Route ${routeId} selected. Detailed view will be implemented with backend integration.`);
}

// Ticket booking handler
function bookTicket(routeId) {
    alert(`Booking ticket for Route ${routeId}. Payment gateway will be integrated with backend.`);
}

// Feedback form logic
let selectedRating = 0;

document.addEventListener('DOMContentLoaded', () => {
    initializeFeedbackForm();

    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    document.getElementById('departure-time').value = now.toISOString().slice(0, 16);

    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

function initializeFeedbackForm() {
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingText = document.querySelector('.rating-text');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            selectedRating = rating;
            updateStarDisplay(rating);
            updateRatingText(rating);
        });

        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            updateStarDisplay(rating);
        });

        star.addEventListener('mouseleave', () => {
            updateStarDisplay(selectedRating);
        });
    });

    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmission);
    }
}

function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.rating-stars i');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

function updateRatingText(rating) {
    const descriptions = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
    };
    document.querySelector('.rating-text').textContent = descriptions[rating] || 'Click to rate';
}

function handleFeedbackSubmission(event) {
    event.preventDefault();

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

    if (!feedbackData.type || !feedbackData.category || !feedbackData.description || selectedRating === 0) {
        showFeedbackMessage('Please fill in all required fields and provide a rating.', 'error');
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
        const existingFeedback = JSON.parse(localStorage.getItem('wardhaMetroFeedback') || '[]');
        existingFeedback.push(feedbackData);
        localStorage.setItem('wardhaMetroFeedback', JSON.stringify(existingFeedback));

        showThankYouPopup();
        resetFeedbackForm();

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
    document.querySelectorAll('.success-message, .error-message').forEach(msg => msg.remove());
}

function showFeedbackMessage(message, type) {
    document.querySelectorAll('.success-message, .error-message').forEach(msg => msg.remove());

    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.style.display = 'flex';
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    const form = document.getElementById('feedback-form');
    form.insertBefore(messageDiv, form.firstChild);

    if (type === 'success') {
        setTimeout(() => messageDiv.remove(), 5000);
    }
}

// Thank You Popup
function showThankYouPopup() {
    const popupHTML = `
        <div class="thank-you-popup" id="thankYouPopup">
            <div class="thank-you-content">
                <div class="thank-you-icon"><i class="fas fa-heart"></i></div>
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
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    setTimeout(() => {
        document.getElementById('thankYouPopup').classList.add('show');
    }, 100);
}

function closeThankYouPopup() {
    const popup = document.getElementById('thankYouPopup');
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 300);
}
