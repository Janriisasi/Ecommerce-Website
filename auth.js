// Check authentication status on index page
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPage = window.location.pathname.split('/').pop();

    // If on index.html and logged in, show full content
    if (currentPage === 'index.html' || currentPage === '') {
        if (isLoggedIn) {
            // Show all sections
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'block';
            });
            
            // Change Shop Now button to scroll down
            const shopNowBtn = document.querySelector('.main-btn');
            if (shopNowBtn) {
                shopNowBtn.href = '#trending';
                shopNowBtn.onclick = null;
            }

            // Update user icon
            const userIcon = document.getElementById('user-icon');
            if (userIcon) {
                userIcon.title = 'Welcome, ' + localStorage.getItem('username');
            }

            // Show logout button
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.style.display = 'inline-block';
            }
        } else {
            // Hide sections except hero
            const trending = document.getElementById('trending');
            const clientReviews = document.querySelector('.client-reviews');
            const updateNews = document.querySelector('.update-news');
            const contact = document.querySelector('.contact');
            const endText = document.querySelector('.end-text');

            if (trending) trending.style.display = 'none';
            if (clientReviews) clientReviews.style.display = 'none';
            if (updateNews) updateNews.style.display = 'none';
            if (contact) contact.style.display = 'none';
            if (endText) endText.style.display = 'none';
        }
    }

    // Handle auth-required links
    const authRequiredLinks = document.querySelectorAll('.auth-required');
    authRequiredLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!isLoggedIn) {
                e.preventDefault();
                alert('Please login or sign up to access this feature!');
                window.location.href = 'signup.html';
            }
        });
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                window.location.href = 'index.html';
            }
        });
    }
});