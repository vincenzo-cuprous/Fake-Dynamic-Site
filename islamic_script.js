        // Include all scripts from index.html

        // Islamic content data (replace with actual content data)
        const islamicContent = [
            { id: 1, title: "Daily Duas", image: "/placeholder.svg?height=200&width=300", description: "A collection of daily duas for Muslims.", link: "#" },
            { id: 2, title: "Ramadan Guide", image: "/placeholder.svg?height=200&width=300", description: "A comprehensive guide for Ramadan.", link: "#" },
            { id: 3, title: "Islamic History", image: "/placeholder.svg?height=200&width=300", description: "An overview of Islamic history.", link: "#" },
            // Add more content as needed
        ];

        const contentGrid = document.getElementById('content-grid');
        const contentPreview = document.getElementById('content-preview');
        const closePreview = document.getElementById('close-preview');
        const previewTitle = document.getElementById('preview-title');
        const previewImage = document.getElementById('preview-image');
        const previewDescription = document.getElementById('preview-description');
        const previewLink = document.getElementById('preview-link');
        const contentSearch = document.getElementById('content-search');
        const commentForm = document.getElementById('comment-form');
        const commentsList = document.getElementById('comments-list');

        // Display Islamic content
        function displayContent(contentToDisplay) {
            contentGrid.innerHTML = '';
            contentToDisplay.forEach(content => {
                const contentItem = document.createElement('div');
                contentItem.classList.add('content-item');
                contentItem.innerHTML = `
                    <img src="${content.image}" alt="${content.title}">
                    <h3>${content.title}</h3>
                `;
                contentItem.addEventListener('click', () => showContentPreview(content));
                contentGrid.appendChild(contentItem);
            });
        }

        // Show content preview
        function showContentPreview(content) {
            previewTitle.textContent = content.title;
            previewImage.src = content.image;
            previewImage.alt = content.title;
            previewDescription.textContent = content.description;
            previewLink.href = content.link;
            contentPreview.classList.add('active');
        }

        // Close content preview
        closePreview.addEventListener('click', () => {
            contentPreview.classList.remove('active');
        });

        // Search functionality
        contentSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredContent = islamicContent.filter(content => 
                content.title.toLowerCase().includes(searchTerm) || 
                content.description.toLowerCase().includes(searchTerm)
            );
            displayContent(filteredContent);
        });

        // Comment functionality
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const commentText = document.getElementById('comment-text').value;
            if (commentText.trim() !== '') {
                const commentItem = document.createElement('li');
                commentItem.classList.add('comment-item');
                commentItem.textContent = commentText;
                commentsList.appendChild(commentItem);
                document.getElementById('comment-text').value = '';
            }
        });

        // Initial display of Islamic content
        displayContent(islamicContent);

        // Scroll animation
        const sections = document.querySelectorAll('section');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
                        // Mobile menu toggle
                        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const dropdowns = document.querySelectorAll('.dropdown');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && e.target !== menuToggle) {
                navLinks.classList.remove('active');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });

        // Resize handler to reset menu state
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });