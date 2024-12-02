export default function decorate(block) {
    const rows = [...block.children];
    if (block.classList.contains("carousel")) {
      block.classList.add("carousel-mode");
    } else {
      block.classList.add("grid-view");
      rows.forEach((row) => {
        row.classList.add("grid-row");
        const columns = [...row.children];
        columns.forEach((col) => {
          col.classList.add("grid-cell");
          const pictureElement = col.querySelector("picture");
          if (pictureElement) {
            pictureElement.classList.add("cell-picture");
          }
          const headingElement = col.querySelector("h3");
          if (headingElement) {
            headingElement.classList.add("cell-heading");
          }
        });
      });
    }
  }