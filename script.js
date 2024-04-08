const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');

searchButton.addEventListener('click', searchBooks);
resetButton.addEventListener('click', resetSearch);
searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    searchBooks();
  }
});

async function searchBooks() {
  resultsDiv.innerHTML = ''; // Clear previous results
  loadingDiv.classList.remove('hidden'); // Show loading icon

  const query = searchInput.value.trim();
  if (query === '') {
    loadingDiv.classList.add('hidden'); // Hide loading icon if no query
    return;
  }

  const apiUrl = `https://openlibrary.org/search.json?q=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const books = data.docs.slice(0, 10); // Limiting to 10 books

    // Display number of results found
    const totalResults = data.numFound > 10 ? '10+' : data.numFound;
    resultsDiv.innerHTML = `<p>${totalResults} results found</p>`;

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
  } finally {
    loadingDiv.classList.add('hidden'); // Hide loading icon after results are displayed
  }
}

function resetSearch() {
  searchInput.value = '';
  resultsDiv.innerHTML = ''; // Clear results when resetting
}
