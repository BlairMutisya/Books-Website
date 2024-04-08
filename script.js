document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const loginButton = document.getElementById('loginButton');
  const signupButton = document.getElementById('signupButton');
  const resultsContainer = document.getElementById('results');
  const loadingIcon = document.getElementById('loadingIcon');

  searchButton.addEventListener('click', function() {
      const query = searchInput.value.trim();
      const subject = document.getElementById('subjectInput').value.trim(); // Assuming subjectInput is the input field for selecting subjects
      if (query !== '') {
          loadingIcon.style.display = 'block'; // Show loading icon
          fetchBooks(query, subject);
      }
  });
  

  // Rest of your JavaScript code remains unchanged

});

loginButton.addEventListener('click', function() {
  // Implement login functionality
  console.log('Login button clicked');
});

signupButton.addEventListener('click', function() {
  // Implement sign-up functionality
  console.log('Sign Up button clicked');
});

async function fetchBooks(query, subject) {
  try {
      let url = `https://openlibrary.org/.json`;
      if (subject) {
          url = `https://openlibrary/subjects/{subject}.json?q=${query}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      displayBooks(data);
  } catch (error) {
      console.error('Error fetching books:', error);
  }
}


function displayBooks(data) {
  resultsContainer.innerHTML = '';
  const books = data.docs.slice(0, 5); // Display only the first 5 books
  books.forEach(book => {
    const bookElement = createBookElement(book);
    resultsContainer.appendChild(bookElement);
  });
}

function createBookElement(book) {
  const bookElement = document.createElement('div');
  bookElement.classList.add('book');
  const title = document.createElement('h2');
  title.textContent = book.title;
  const author = document.createElement('p');
  author.textContent = `Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
  const publishedYear = document.createElement('p');
  publishedYear.textContent = `Published Year: ${book.first_publish_year || 'Unknown'}`;
  bookElement.appendChild(title);
  bookElement.appendChild(author);
  bookElement.appendChild(publishedYear);
  return bookElement;
};
