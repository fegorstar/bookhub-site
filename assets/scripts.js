/* scripts.js */

/* Mobile Navigation Menu Toggle */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelector('.navbar-collapse');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});

/* Books Search Functionality */
function searchBooks() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const books = document.getElementsByClassName('book-item');

    for (let i = 0; i < books.length; i++) {
        let title = books[i].getElementsByTagName('h5')[0].innerText.toLowerCase();
        let description = books[i].getElementsByTagName('p')[0].innerText.toLowerCase();
        if (title.includes(input) || description.includes(input)) {
            books[i].style.display = 'block';
        } else {
            books[i].style.display = 'none';
        }
    }
}


    // Function to get query parameters from URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Function to search books based on query parameter
    function searchBooksOnPage(query) {
        const filter = query.toLowerCase();
        const books = document.getElementsByClassName('book-item');
        let found = false;

        Array.from(books).forEach(function(book) {
            const title = book.querySelector('.card-title').innerText.toLowerCase();
            const description = book.querySelector('.card-text').innerText.toLowerCase();
            if (title.includes(filter) || description.includes(filter)) {
                book.style.display = '';
                found = true;
            } else {
                book.style.display = 'none';
            }
        });

        // Display "Not Found" message if no matches
        const notFoundMessage = document.getElementById('notFoundMessage');
        if (found) {
            notFoundMessage.style.display = 'none';
        } else {
            notFoundMessage.style.display = 'block';
        }
    }

    // Function to handle in-page search (Optional Enhancement)
    function searchBooksInPage() {
        const input = document.getElementById('booksPageSearchInput');
        const filter = input.value.toLowerCase();
        const books = document.getElementsByClassName('book-item');
        let found = false;

        Array.from(books).forEach(function(book) {
            const title = book.querySelector('.card-title').innerText.toLowerCase();
            const description = book.querySelector('.card-text').innerText.toLowerCase();
            if (title.includes(filter) || description.includes(filter)) {
                book.style.display = '';
                found = true;
            } else {
                book.style.display = 'none';
            }
        });

        // Display "Not Found" message if no matches
        const notFoundMessage = document.getElementById('notFoundMessage');
        if (found) {
            notFoundMessage.style.display = 'none';
        } else {
            notFoundMessage.style.display = 'block';
        }
    }

    // Execute search on page load if query parameter exists
    window.onload = function() {
        const query = getQueryParam('query');
        if (query) {
            searchBooksOnPage(query);
        }

        // Optional: Pre-fill the in-page search box with the query
        if (query) {
            const inPageSearchInput = document.getElementById('booksPageSearchInput');
            if (inPageSearchInput) {
                inPageSearchInput.value = query;
            }
        }
    };

    // View More Functionality
    document.getElementById('viewMoreBtn').addEventListener('click', function() {
        const hiddenBooks = document.querySelectorAll('.book-item.d-none');
        hiddenBooks.forEach(function(book) {
            book.classList.remove('d-none');
        });
        this.style.display = 'none'; // Hide the button after clicking
    });