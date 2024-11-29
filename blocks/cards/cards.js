import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-container';
  
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-card';
    
    while (row.firstElementChild) li.append(row.firstElementChild);
    
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) =>
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    )
  );

  block.textContent = '';

  // Check for carousel variant
  if (block.classList.contains('carousel')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-wrapper';

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-prev';
    prevButton.textContent = '‹';

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-next';
    nextButton.textContent = '›';

    wrapper.append(prevButton, ul, nextButton);
    block.append(wrapper);

    // Carousel functionality
    const cards = ul.querySelectorAll('.cards-card');
    const totalCards = cards.length;
    const visibleCards = 3; // Number of cards visible at a time
    let currentIndex = 0;

    const updateCarousel = () => {
      const cardWidth = cards[0].offsetWidth;
      const gap = parseInt(getComputedStyle(ul).gap) || 16; // Gap between cards
      const offset = -(currentIndex * (cardWidth + gap));
      ul.style.transform = `translateX(${offset}px)`;

      // Enable/disable navigation buttons
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex + visibleCards >= totalCards;
    };

    prevButton.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = Math.min(totalCards - visibleCards, currentIndex + 1);
      updateCarousel();
    });

    // Initialize the carousel display
    updateCarousel();
  } else {
    // Default banner or simple list behavior
    block.append(ul);
  }
}
