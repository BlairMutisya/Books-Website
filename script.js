// script.js
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', searchBooks);

async function searchBooks() {
  resultsDiv.innerHTML = ''; // Clear previous results
  
  const query = searchInput.value.trim();
  if (query === '') {
    return;
  }

  const apiUrl = `https://openlibrary.org/search.json?q=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const books = data.docs.slice(0, 10); // Limiting to 10 books

    books.forEach(book => {
      const title = book.title ? book.title : 'Title not available';
      const author = book.author_name ? book.author_name.join(', ') : 'Author not available';
      const year = book.first_publish_year ? book.first_publish_year : 'Year not available';

      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.innerHTML = `
        <h2>${title}</h2>
        <p>Author(s): ${author}</p>
        <p>Year: ${year}</p>
      `;
      resultsDiv.appendChild(bookDiv);
    });
  } catch (error) {
    console.error('Error fetching and parsing data:', error);
  }
}

// Event listener for hitting enter key to search
searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    searchBooks();
  }
});

