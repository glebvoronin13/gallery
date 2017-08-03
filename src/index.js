import './styles.css';

class Gallery {
  constructor(config) {
    if (!config) {
      return;
    }
    if (config.selector) {
      this.instance = document.querySelector(config.selector);
    }
    this.items = this.instance.querySelectorAll('.gallery-item');
    this.setEventListeners();
  }
  setEventListeners() {
    this.instance.addEventListener('click', ($e) => {
      switch ($e.target.className) {
        case 'gallery-prev':
          console.log('click-prev');
          break;
        case 'gallery-next':
          console.log('click-next');
          break;
      }
    })
  }
}

window.Gallery = Gallery;

const galInstance = new Gallery({
  selector: '.js-gallery'
})
