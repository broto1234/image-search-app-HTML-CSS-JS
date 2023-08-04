const accessKey = "qhQPW9Ofh89OxnpqqVk-ngxkfh43CSIY1RY7GX2sxXo";

const searchForm = document.getElementById('search-form');
const formInput = document.querySelector('#form-input');
const noResult = document.querySelector('.no-result');
const searchResult = document.querySelector('#search-result');
const morePhotos = document.querySelector('#add-more-btn');

let pageNumber = 1;

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  pageNumber = 1;
  searchPhotos();
})

morePhotos.addEventListener('click', ()=> {
  pageNumber++;
  searchPhotos();
})


async function searchPhotos() {
  const inputValue = formInput.value;
  
  if (inputValue === '') {
    noResult.textContent = 'Input is empty';
    noResult.classList.add('no-result');
    return;
  } else {
    noResult.remove();
  }

  const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${inputValue}&client_id=${accessKey}`);

  const data = await response.json();
  
  if(pageNumber === 1) {
    searchResult.innerHTML = '';
  }
  
  const results = data.results;
  
  results.map((result)=> {
    const card = document.createElement('div');
    card.classList.add('photo-card');

    const cardImage = document.createElement('img');
    cardImage.src = result.urls.small;
    cardImage.alt = result.alt_description;

    const cardimageLink = document.createElement('a');
    cardimageLink.href = result.links.html;
    cardimageLink.target = '_blank';
    cardimageLink.textContent = result.alt_description;

    card.appendChild(cardImage);
    card.appendChild(cardimageLink);
    searchResult.appendChild(card);
  })

  morePhotos.style.display = 'block';
}
