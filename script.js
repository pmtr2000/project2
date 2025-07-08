document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input'); 
  const searchButton = document.getElementById('search-button'); 
  const resultsContainer = document.getElementById('results-container'); 

  
  const apiKey = 'juIC1RY40o33FT25MWwsbddj1F8hUAID';

  
  async function searchGiphy() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
      return; 
    }

   
    resultsContainer.innerHTML = '';

    
    const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=24`; 
    try {
      const response = await fetch(giphyAPI, { mode: 'cors' }); 
      const data = await response.json(); 

    
      if (data.data && data.data.length > 0) { 
        data.data.forEach(gif => {
          const img = document.createElement('img');
          img.src = gif.images.fixed_height.url; 
          img.alt = gif.title; 
          resultsContainer.appendChild(img); 
        });
      } else {
        resultsContainer.innerHTML = '<p>No GIFs found for your search.</p>'; 
      }

    } catch (error) {
      console.error('Error fetching Giphy data:', error); 
      resultsContainer.innerHTML = '<p>Error fetching Giphy data. Please try again later.</p>'; 
    }
  }

 
  searchButton.addEventListener('click', searchGiphy);
  
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      searchGiphy(); 
    }
  });
});