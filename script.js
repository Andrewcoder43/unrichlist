document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const nameSearch = document.getElementById('name-search');
    const rankingItems = document.querySelectorAll('.ranking-item');
    const blogPosts = document.querySelectorAll('.blog-post');
    const nominateBtn = document.querySelector('.nominate-btn');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Filter items based on search input
    function filterItems() {
        const nameValue = nameSearch.value.toLowerCase();

        rankingItems.forEach(item => {
            const personName = item.querySelector('.person-name').textContent.toLowerCase();
            item.style.display = nameValue === '' || personName.includes(nameValue) ? 'flex' : 'none';
        });
    }

    // Dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    // Show nomination form
    function showNominationForm() {
        const formHTML = `
            <div id="nomination-popup" class="popup">
                <div class="popup-content">
                    <span class="close-btn">&times;</span>
                    <h2>Nominate a Changemaker</h2>
                    <form id="nomination-form">
                        <input type="text" id="first-name" placeholder="First Name" required>
                        <input type="text" id="last-name" placeholder="Last Name" required>
                        <textarea id="description" placeholder="Description of the person" required></textarea>
                        <button type="submit">Submit Nomination</button>
                    </form>
                </div>
            </div>
        `;
    
        document.body.insertAdjacentHTML('beforeend', formHTML);

        document.querySelector('.close-btn').addEventListener('click', closeNominationForm);
        document.getElementById('nomination-form').addEventListener('submit', handleNomination);
    }

    // Close nomination form
    function closeNominationForm() {
        const popup = document.getElementById('nomination-popup');
        if (popup) {
            popup.remove();
        }
    }

    // Handle nomination form submission
    function handleNomination(event) {
        event.preventDefault();
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const description = document.getElementById('description').value;

        // Here you would typically send this data to a server
        console.log('Nomination submitted:', { firstName, lastName, description });

        // For demonstration, we'll just show an alert
        alert(`Thank you for nominating ${firstName} ${lastName}!`);
        closeNominationForm();
    }

    // Update button styles based on vote status
    function updateButtonStyles(upvoteButton, downvoteButton, currentVote) {
        upvoteButton.style.color = currentVote === 1 ? '#4CAF50' : '#888';
        downvoteButton.style.color = currentVote === -1 ? '#f44336' : '#888';
    }

    // Initialize voting functionality for each ranking item and blog post
    function initializeVoting() {
        const voteableItems = [...rankingItems, ...blogPosts];

        voteableItems.forEach(item => {
            const upvoteButton = item.querySelector('.upvote');
            const downvoteButton = item.querySelector('.downvote');
            const voteCount = item.querySelector('.vote-count');
            let currentVote = 0; // 0 for no vote, 1 for upvote, -1 for downvote

            if (upvoteButton && downvoteButton && voteCount) {
                upvoteButton.addEventListener('click', () => {
                    if (currentVote === 1) {
                        currentVote = 0;
                        voteCount.textContent = parseInt(voteCount.textContent) - 1;
                    } else {
                        voteCount.textContent = parseInt(voteCount.textContent) - currentVote + 1;
                        currentVote = 1;
                    }
                    updateButtonStyles(upvoteButton, downvoteButton, currentVote);
                });

                downvoteButton.addEventListener('click', () => {
                    if (currentVote === -1) {
                        currentVote = 0;
                        voteCount.textContent = parseInt(voteCount.textContent) + 1;
                    } else {
                        voteCount.textContent = parseInt(voteCount.textContent) - currentVote - 1;
                        currentVote = -1;
                    }
                    updateButtonStyles(upvoteButton, downvoteButton, currentVote);
                });

                updateButtonStyles(upvoteButton, downvoteButton, currentVote); // Initialize button styles
            }
        });
    }

    // Initialize share functionality for blog posts
    function initializeSharing() {
        blogPosts.forEach(post => {
            const shareBtn = post.querySelector('.share-btn');
            const shareOptions = post.querySelector('.share-options');

            if (shareBtn && shareOptions) {
                shareBtn.addEventListener('click', () => {
                    shareOptions.style.display = shareOptions.style.display === 'none' ? 'flex' : 'none';
                });

                // Add click events for share buttons (you'd typically implement actual sharing here)
                const shareBtns = shareOptions.querySelectorAll('button');
                shareBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log(`Sharing via ${btn.getAttribute('aria-label')}`);
                        // Implement actual sharing functionality here
                    });
                });
            }
        });
    }

    // Initialize blog post links
    function initializeBlogPostLinks() {
        blogPosts.forEach(post => {
            const link = post.querySelector('.blog-content');
            
            if (link) {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const slug = this.getAttribute('data-slug');
                    if (slug) {
                        window.location.href = `/blog/${slug}`;
                    }
                });
            }
        });
    }

    // Event listeners
    if (nameSearch) nameSearch.addEventListener('input', filterItems);
    if (nominateBtn) nominateBtn.addEventListener('click', showNominationForm);

    // Initialize functionalities
    initializeVoting();
    initializeSharing();
    initializeBlogPostLinks();
});