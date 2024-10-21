        // Initial data
        let adminCredentials = {
            username: 'jamshed',
            password: 'qw4HD123!@#'
        };

        let books = [
            { id: 1, title: "The Quran", image: "/placeholder.svg?height=200&width=150", description: "The holy book of Islam.", downloadUrl: "#" },
            { id: 2, title: "Sahih Al-Bukhari", image: "/placeholder.svg?height=200&width=150", description: "A collection of hadith compiled by Imam Al-Bukhari.", downloadUrl: "#" },
            { id: 3, title: "The Sealed Nectar", image: "/placeholder.svg?height=200&width=150", description: "Biography of Prophet Muhammad.", downloadUrl: "#" },
        ];

        let islamicContent = [
            { id: 1, title: "Daily Duas", image: "/placeholder.svg?height=200&width=300", description: "A collection of daily duas for Muslims.", link: "#" },
            { id: 2, title: "Ramadan Guide", image: "/placeholder.svg?height=200&width=300", description: "A comprehensive guide for Ramadan.", link: "#" },
            { id: 3, title: "Islamic History", image: "/placeholder.svg?height=200&width=300", description: "An overview of Islamic history.", link: "#" },
        ];

        let comments = [
            { id: 1, contentType: 'book', contentId: 1, text: "Great book!" },
            { id: 2, contentType: 'islamic', contentId: 1, text: "Very helpful content." },
        ];

        // Load data from local storage if available
        if (localStorage.getItem('adminCredentials')) {
            adminCredentials = JSON.parse(localStorage.getItem('adminCredentials'));
        }
        if (localStorage.getItem('books')) {
            books = JSON.parse(localStorage.getItem('books'));
        }
        if (localStorage.getItem('islamicContent')) {
            islamicContent = JSON.parse(localStorage.getItem('islamicContent'));
        }
        if (localStorage.getItem('comments')) {
            comments = JSON.parse(localStorage.getItem('comments'));
        }

        // Save data to local storage
        function saveData() {
            localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
            localStorage.setItem('books', JSON.stringify(books));
            localStorage.setItem('islamicContent', JSON.stringify(islamicContent));
            localStorage.setItem('comments', JSON.stringify(comments));
        }

        // Login functionality
        document.getElementById('login').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === adminCredentials.username && password === adminCredentials.password) {
                document.getElementById('login-form').classList.add('hidden');
                document.getElementById('admin-panel').classList.remove('hidden');
                loadAdminPanel();
            } else {
                alert('Invalid credentials');
            }
        });

        // Logout functionality
        document.getElementById('logout').addEventListener('click', function() {
            document.getElementById('login-form').classList.remove('hidden');
            document.getElementById('admin-panel').classList.add('hidden');
        });

        // Change admin credentials
        document.getElementById('change-credentials').addEventListener('submit', function(e) {
            e.preventDefault();
            const newUsername = document.getElementById('new-username').value;
            const newPassword = document.getElementById('new-password').value;
            adminCredentials.username = newUsername;
            adminCredentials.password = newPassword;
            saveData();
            alert('Admin credentials updated');
        });

        // Add book
        document.getElementById('add-book').addEventListener('submit', function(e) {
            e.preventDefault();
            const newBook = {
                id: Date.now(),
                title: document.getElementById('book-title').value,
                image: document.getElementById('book-image').value,
                description: document.getElementById('book-description').value,
                downloadUrl: document.getElementById('book-download').value
            };
            books.push(newBook);
            saveData();
            loadBooks();
            this.reset();
        });

        // Add Islamic content
        document.getElementById('add-content').addEventListener('submit', function(e) {
            e.preventDefault();
            const newContent = {
                id: Date.now(),
                title: document.getElementById('content-title').value,
                image: document.getElementById('content-image').value,
                description: document.getElementById('content-description').value,
                link: document.getElementById('content-link').value
            };
            islamicContent.push(newContent);
            saveData();
            loadIslamicContent();
            this.reset();
        });

        // Load admin panel
        function loadAdminPanel() {
            loadBooks();
            loadIslamicContent();
            loadComments();
        }

        // Load books
        function loadBooks() {
            const booksTable = document.getElementById('books-table').getElementsByTagName('tbody')[0];
            booksTable.innerHTML = '';
            books.forEach(book => {
                const row = booksTable.insertRow();
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>
                        <button onclick="editBook(${book.id})">Edit</button>
                        <button onclick="deleteBook(${book.id})">Delete</button>
                    </td>
                `;
            });
        }

        // Load Islamic content
        function loadIslamicContent() {
            const contentTable = document.getElementById('content-table').getElementsByTagName('tbody')[0];
            contentTable.innerHTML = '';
            islamicContent.forEach(content => {
                const row = contentTable.insertRow();
                row.innerHTML = `
                    <td>${content.title}</td>
                    <td>
                        <button onclick="editContent(${content.id})">Edit</button>
                        <button onclick="deleteContent(${content.id})">Delete</button>
                    </td>
                `;
            });
        }

        // Load comments
        function loadComments() {
            const commentsTable = document.getElementById('comments-table').getElementsByTagName('tbody')[0];
            commentsTable.innerHTML = '';
            comments.forEach(comment => {
                const row = commentsTable.insertRow();
                row.innerHTML = `
                    <td>${comment.contentType === 'book' ? 'Book' : 'Islamic Content'}: ${getContentTitle(comment.contentType, comment.contentId)}</td>
                    <td>${comment.text}</td>
                    <td>
                        <button onclick="deleteComment(${comment.id})">Delete</button>
                        <button onclick="replyToComment(${comment.id})">Reply</button>
                    </td>
                `;
            });
        }

        // Helper function to get content title
        function getContentTitle(contentType, contentId) {
            if (contentType === 'book') {
                return books.find(book => book.id === contentId)?.title || 'Unknown Book';
            } else {
                return islamicContent.find(content => content.id === contentId)?.title || 'Unknown Content';
            }
        }

        // Edit book
        function editBook(id) {
            const book = books.find(b => b.id === id);
            if (book) {
                document.getElementById('book-title').value = book.title;
                document.getElementById('book-image').value = book.image;
                document.getElementById('book-description').value = book.description;
                document.getElementById('book-download').value = book.downloadUrl;
                document.getElementById('add-book').onsubmit = function(e) {
                    
                    e.preventDefault();
                    book.title = document.getElementById('book-title').value;
                    book.image = document.getElementById('book-image').value;
                    book.description = document.getElementById('book-description').value;
                    book.downloadUrl = document.getElementById('book-download').value;
                    saveData();
                    loadBooks();
                    this.reset();
                    this.onsubmit = null;
                };
            }
        }

        // Delete book
        function deleteBook(id) {
            if (confirm('Are you sure you want to delete this book?')) {
                books = books.filter(b => b.id !== id);
                saveData();
                loadBooks();
            }
        }

        // Edit Islamic content
        function editContent(id) {
            const content = islamicContent.find(c => c.id === id);
            if (content) {
                document.getElementById('content-title').value = content.title;
                document.getElementById('content-image').value = content.image;
                document.getElementById('content-description').value = content.description;
                document.getElementById('content-link').value = content.link;
                document.getElementById('add-content').onsubmit = function(e) {
                    e.preventDefault();
                    content.title = document.getElementById('content-title').value;
                    content.image = document.getElementById('content-image').value;
                    content.description = document.getElementById('content-description').value;
                    content.link = document.getElementById('content-link').value;
                    saveData();
                    loadIslamicContent();
                    this.reset();
                    this.onsubmit = null;
                };
            }
        }

        // Delete Islamic content
        function deleteContent(id) {
            if (confirm('Are you sure you want to delete this content?')) {
                islamicContent = islamicContent.filter(c => c.id !== id);
                saveData();
                loadIslamicContent();
            }
        }

        // Delete comment
        function deleteComment(id) {
            if (confirm('Are you sure you want to delete this comment?')) {
                comments = comments.filter(c => c.id !== id);
                saveData();
                loadComments();
            }
        }

        // Reply to comment
        function replyToComment(id) {
            const reply = prompt('Enter your reply:');
            if (reply) {
                const comment = comments.find(c => c.id === id);
                if (comment) {
                    comment.text += `\nAdmin reply: ${reply}`;
                    saveData();
                    loadComments();
                }
            }
        }

        // Initial load
        loadAdminPanel();