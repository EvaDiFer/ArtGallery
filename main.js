import './style.css';
import PAINTING from './data';

// Primer paso: Crear en el DOM cada producto que queremos mostrar en nuestro HTMl. En este caso son cuadros.

const createPaintingElement = (artwork) => {
  const paintingElement = document.createElement('div');
  paintingElement.classList.add('painting');

  // Crear y configurar la imagen
  const imageContainer = document.createElement('div');
  imageContainer.className = 'img-container';
  const paintingImage = document.createElement('img');
  paintingImage.src = artwork.image;
  paintingImage.alt = artwork.name;
  paintingImage.className = 'img-one';
  imageContainer.appendChild(paintingImage);
  paintingElement.appendChild(imageContainer);

  // Crear y configurar los datos
  const paintingName = document.createElement('h2');
  paintingName.textContent = artwork.name;
  paintingElement.appendChild(paintingName);

  const paintingArtist = document.createElement('h3');
  paintingArtist.textContent = artwork.artist;
  paintingArtist.className = 'author';
  paintingElement.appendChild(paintingArtist);

  const priceSold = document.createElement('p');
  priceSold.textContent = `$ ${artwork.priceSold}k`;
  paintingElement.appendChild(priceSold);

  const yearSold = document.createElement('p');
  yearSold.textContent = `Year Sold: ${artwork.yearSold}`;
  paintingElement.appendChild(yearSold);

  return paintingElement;
};

// Como el resto de contenido es estático, he optado por crear templates y añadirlos al HTML

const addHTML = (html) => {
  document.body.innerHTML += html;
};

addHTML(`
<header class="container">
    <h1>ART GALLERY</h1>
    <nav>
      <ul class='nav-list'>
        <li><a href='#'>Home</a></li>
        <li><a href='#style'>ArtWorks</a></li>
        <li><a href='#contact'>Contact</a></li>
      </ul>
    </nav>
    <button id="menu-toggle"><img src="https://res.cloudinary.com/djhjuxyes/image/upload/v1701366043/PROYECTO-2-NEW/painting_bzrwga.png" alt=""></button>

  </header>
`);

addHTML(`
<section>
<p>From the Renaissance to the avant-garde, including pop art and modern art. These paintings set records with their prices in the art market.
</p>

<div id="filter-container">
  <div id="style">
    <select id="style-select">
      <option value="All Styles">All Styles</option>
      <option value="Cubism">Cubism</option>
      <option value="Mannerism">Mannerism</option>
      <option value="Expressionism">Expressionism</option>
      <option value="Post-Impressionism">Post-Impressionism</option>
      <option value="Baroque">Baroque</option>
      <option value="Art Nouveau">Art Nouveau</option>
      <option value="Surrealism">Surrealism</option>
      <option value="Abstract Expressionism">Abstract Expressionism</option>
      <option value="Renaissance">Renaissance</option>
    </select>
  </div>

  <div id="filter-btns">
    <input id="in-price" type="number" min="5" placeholder="Sale Price in M USD">
    <button id="btn-search">Search</button>
    <button id="btn-reset">Reset</button>
  </div>
</div>

`);

const divContainer = document.createElement('div');
divContainer.id = 'artworks-container';

PAINTING.forEach((artwork) => {
  const artworkElement = createPaintingElement(artwork);
  divContainer.appendChild(artworkElement);
});

document.body.appendChild(divContainer);

// FUNCION PARA RENDERIZAR
const renderArtwork = (artworks) => {
  const divContainer = document.getElementById('artworks-container');
  divContainer.innerHTML = '';
  artworks.forEach((artwork) => {
    const artworkElement = createPaintingElement(artwork);
    divContainer.appendChild(artworkElement);
  });
};

addHTML(`
  <footer>
    <div id="contact" class="footer-content">
      <p>&copy; Art Gallery</p>
      <p>Created by <a target="_blank" href="https://www.linkedin.com/in/eva-diaz-485880168/">Eva Díaz</a></p>
      <p>Rock The Code🚀</p>

    </div>
  </footer>
`);

// FUNCION PARA EL PRECIO
const filterByPrice = () => {
  const maxPrice = Number(document.querySelector('#in-price').value);
  const filteredArtworksByPrice = PAINTING.filter(
    (artwork) => artwork.priceSold <= maxPrice
  );

  renderArtwork(filteredArtworksByPrice);
};

// ESCUCHADOR DE EVENTOS PARA EL FILTRO POR PRECIO

const listenerPrice = document.querySelector('#btn-search');
listenerPrice.addEventListener('click', filterByPrice);

// FUNCION DE FILTRO POR ESTILO ARTÍSTICO
const filterArtworksByStyle = (selectedStyle) => {
  if (selectedStyle === 'All Styles') {
    return PAINTING;
  } else {
    return PAINTING.filter((artwork) => artwork.style === selectedStyle);
  }
};
// ESCUCHADOR DE EVENTOS PARA EL FILTRO POR ESTILO ARTISTICO
const styleSelect = document.getElementById('style-select');
styleSelect.addEventListener('change', () => {
  const selectedStyle = styleSelect.value;
  const filteredArtworks = filterArtworksByStyle(selectedStyle);
  renderArtwork(filteredArtworks);
});

// FILTRO MULTIPLE(POR ESTILO ARTISTICO Y PRECIO)
const FilterByStyleAndPrice = () => {
  const maxPrice = Number(document.querySelector('#in-price').value);
  const styleSelect = document.getElementById('style-select').value;

  let showNoResultsMessage = maxPrice > 450;

  const filteredArtworks = PAINTING.filter(
    (artwork) =>
      artwork.priceSold <= maxPrice &&
      (styleSelect === 'All Styles' || artwork.style === styleSelect)
  );

  if (filteredArtworks.length === 0 || showNoResultsMessage) {
    const noResultsMessage = document.createElement('h2');
    noResultsMessage.textContent = 'No se encuentran coincidencias de búsqueda';

    document.getElementById('artworks-container').innerHTML = ''; // Limpiar contenido anterior
    document.getElementById('artworks-container').appendChild(noResultsMessage);
  } else {
    renderArtwork(filteredArtworks);
  }
};

const listenerStyleAndPrice = document.querySelector('#btn-search');
listenerStyleAndPrice.addEventListener('click', FilterByStyleAndPrice);

// RESET VALUES
const priceInput = document.querySelector('#in-price');
const resetButton = document.querySelector('#btn-reset');

resetButton.addEventListener('click', () => {
  renderArtwork(PAINTING);
  priceInput.value = '';
});

const StyleOption = document.querySelector('#style-select');
const resetInput = document.querySelector('#btn-reset');
resetInput.addEventListener('click', () => {
  StyleOption.value = 'All Styles';
});

const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});

navList.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    navList.classList.remove('active');
  }
});
