





 // Global Search Handler in Navbar
 document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchInput = this.querySelector('input[name="query"]').value.trim();
    if (searchInput) {
        // Redirect to books.html with the search query parameter
        window.location.href = `books.html?query=${encodeURIComponent(searchInput)}`;
    }
});

// Check for Search Query on books.html
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('query');
    if (searchTerm) {
        // Call the searchBooks function with the search term
        searchBooks(searchTerm);
        // Remove the "View More" button on search
        document.getElementById('viewMoreBtn').style.display = 'none';
    }
});

// Books data (your provided books list)
const books = [
    { title: "The Prisoner's Dream", link: "https://tetfund.bookhub.ng/books/588923ce-2fde-411b-bf1e-6eaa3b2bbf4b/", image: "assets/images/a_prisoners_dream.png" },
    { title: "Elementary Statistical Methods in Education", link: "https://tetfund.bookhub.ng/books/b22f4688-055b-4385-a3c8-ff03f7ac3175/", image: "assets/images/elementary-statistical-method-in-education.png" },
    { title: "Excursions into Gender & Sexuality", link: "https://tetfund.bookhub.ng/books/baec025f-7d86-4bb6-97fb-e9e335624808/", image: "assets/images/excursion-into-gender-and-sexuality.png" },
    { title: "Fundamental Principles of Human Relations", link: "https://tetfund.bookhub.ng/books/3582caa0-f504-4c2e-9e7c-7838ac622ba1/", image: "assets/images/fundamental-principles-of-human-relations-for-students-of-tertiary-institution.png" },
    { title: "Handbook of Cognitive Mathematics Education", link: "https://tetfund.bookhub.ng/books/74329711-803d-4ce8-9c2e-41e1e6c591e8/", image: "assets/images/handbook-on-cognitive-maths.png" },
    { title: "Introduction to Marketing", link: "https://tetfund.bookhub.ng/books/b2ab8f6a-190a-4575-aa28-ed7191d27b5f/", image: "assets/images/introduction-to-marketing.png" },
    { title: "Israel From Monarchy to Exile", link: "https://tetfund.bookhub.ng/books/255715e9-abec-4280-a650-ed9e63f9c402/", image: "assets/images/isreal-from-monarchy-to-excile.png" },
    { title: "Issues in Multi-Disciplinary African History", link: "https://tetfund.bookhub.ng/books/5a3f4b2d-0c92-43ca-84d6-c3464362bc45/", image: "assets/images/issues-in-the-multi-disciplinary-and-methodological-approach-to-african-history-and-international-studies.png" },
    { title: "Mineral Resources of North-Central Nigeria", link: "https://tetfund.bookhub.ng/books/c7bd9b69-5712-4015-9a5e-9c6285fda98c/", image: "assets/images/mineral-resources.png" },
    { title: "Multimedia Resources for Teaching", link: "https://tetfund.bookhub.ng/books/53b7a366-946d-41a1-9d53-95837319dbb5/", image: "assets/images/multimedia- resources-and-electronic-based-instructional-strategies-for-teaching-social-studies.png" },
    { title: "Phytoplankton Algae of Nigeria", link: "https://tetfund.bookhub.ng/books/ffd50c09-ba05-4b5d-b3fe-d7a6a9f81925/", image: "assets/images/algae.png" },
    { title: "Research Skills in Science Education", link: "https://tetfund.bookhub.ng/books/9b1488c1-1e24-490f-8ce7-2ab435b6a459/", image: "assets/images/research-skills-in-science-and-technology-education-for-tertiary-institution-in-nigeria.png" },
    { title: "Library Automation in Nigeria", link: "https://tetfund.bookhub.ng/books/c24b9c03-91d9-4605-8fba-aab49d345eba/", image: "assets/images/library-automation.png" },
    { title: "Selected Topics in Biology", link: "https://tetfund.bookhub.ng/books/ee5cac1f-f8fc-42e4-90f8-95c2a4e20c42/", image: "assets/images/selected-topics-in-biology.png" }
];

const booksGrid = document.getElementById('booksGrid');
const viewMoreBtn = document.getElementById('viewMoreBtn');
const notFoundMessage = document.getElementById('notFoundMessage');

// Render Books
function renderBooks(bookList, hideExcess = true) {
    booksGrid.innerHTML = ""; // Clear previous results
    bookList.forEach((book, index) => {
        const isHidden = hideExcess && index >= 8 ? 'd-none' : '';
        booksGrid.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4 book-item ${isHidden}">
                <div class="card h-100 shadow-sm">
                    <img src="${book.image}" alt="${book.title}" class="card-img-top book-image">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${book.title}</h5>
                        <a href="${book.link}" target="_blank" class="btn mt-auto" style="background-color: #310627; color: #fff;">Read</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Search Books Function
function searchBooks(searchTerm) {
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredBooks.length > 0) {
        notFoundMessage.style.display = "none";
        renderBooks(filteredBooks, false); // Show all filtered books
    } else {
        booksGrid.innerHTML = "";
        notFoundMessage.style.display = "block"; // Show not found message
    }
}

// "View More" Button Handler
viewMoreBtn.addEventListener('click', () => {
    renderBooks(books, false); // Show all books
    viewMoreBtn.style.display = "none"; // Hide "View More" button
});

// Initial Render on Books Page
if (!window.location.search.includes('query')) {
    renderBooks(books); // Show first 8 books by default
    viewMoreBtn.style.display = "block"; // Show "View More" button initially
}















