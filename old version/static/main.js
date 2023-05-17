// Get all card elements
const cards = document.querySelectorAll('.card-body');

// Add event listeners for mouseenter and mouseleave
cards.forEach(card => {
  // card.addEventListener('mouseenter', showDefinition);
  // card.addEventListener('mouseleave', hideDefinition);
  card.addEventListener('click', toggleDefinition);
});

// Show the definition of the hovered card
function showDefinition() {
  const definition = this.dataset.definition;
  this.innerHTML = `<p class="card-text">${definition}</p>`;
}

// Hide the definition when the mouse leaves the card
function hideDefinition() {
  const originalWord = this.dataset.word;
  this.innerHTML = `<h5 class="card-title">${originalWord}</h5>`;
}

// Toggle the definition when the card is clicked
function toggleDefinition() {
  const originalWord = this.dataset.word;
  const definition = this.dataset.definition;
  const isExpanded = this.classList.contains('expanded');
  if (isExpanded) {
    this.innerHTML = `<h5 class="card-title">${originalWord}</h5>`;
  } else {
    this.innerHTML = `<p class="card-text">${definition}</p>`;
  }
  this.classList.toggle('expanded');
}
