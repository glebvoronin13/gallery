import './styles.css';
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/map';

class Gallery {
  constructor(config) {
    if (!config) {
      return;
    }
    if (config.selector) {
      this.instance = document.querySelector(config.selector);
    }
    if (config.width) {
      this.instance.style.width=`${+config.width}px`;
    }
    if (config.height) {
      this.instance.style.height=`${+config.height}px`;
    }
    this.items = this.instance.querySelectorAll('.gallery-item');
    if ( !this.items || !this.items.length ) {
      try {
        this.instance.querySelector('.gallery-wrapper').innerHTML = `
        <span> Gallery has no items </span>
        `;
      } catch ($e) {
        console.error($e);
      }
      return;
    }
    this.nextButton = this.instance.querySelector('.gallery-next');
    this.prevButton = this.instance.querySelector('.gallery-prev');
    this.countElement = this.instance.querySelector('.gallery-count');
    this.activeIndex = 0;
    this.totalSlides = this.items.length;
    this.setEventListeners();
    this.setTransform();
    this.setActiveSlide(0);
  }

  setTransform() {
    const instanceWidth = this.instance.clientWidth;
    let count = 0;
    for (let item of this.items) {
      const translateX = count * instanceWidth;
      item.style.transform = `translate3d(-${translateX}px, 0px, 0px)`;
      count++;
    }
  }

  setActiveSlide(index) {
    this.items[index].classList.add('gallery-item-active');
    if (index !== this.activeIndex) {
      this.items[this.activeIndex].classList.remove('gallery-item-active');
    }
    this.activeIndex = index;
    if (this.countElement) {
      this.countElement.innerHTML = `Slide: ${this.activeIndex + 1} / ${this.totalSlides}`
    }
  }

  setNextSlide() {
    if (this.activeIndex + 1 < this.totalSlides) {
      this.setActiveSlide(this.activeIndex + 1);
    } else {
      this.setActiveSlide(0);
    }
  }

  setPrevSlide() {
    if (this.activeIndex > 0) {
      this.setActiveSlide(this.activeIndex - 1);
    } else {
      this.setActiveSlide(this.totalSlides - 1);
    }
  }

  setEventListeners() {
    const isTouchAvailable = 'ontouchend' in document;
    const clickEvent = (isTouchAvailable) ? 'touchend' : 'click';
    this.instance.addEventListener(clickEvent, ($e) => {
      const target = (isTouchAvailable) ? $e.changedTouches[0].target.className : $e.target.className;
      switch (target) {
        case 'gallery-prev':
          this.setPrevSlide();
          break;
        case 'gallery-next':
          this.setNextSlide();
          break;
      }
    })
    window.addEventListener('resize', () => {
      this.setTransform();
    })
    this.attachSwipeListener();
  }

  attachSwipeListener() {
    const swipeTimeout = 1000;
    const swipeDistance = 50;
    let touchStartX = 0;
    let touchStartTime = 0;
    const isTouchAvailable = 'ontouchend' in document;
    const touchStartEvent = (isTouchAvailable) ? 'touchstart' : 'mousedown';
    const touchEndEvent = (isTouchAvailable) ? 'touchend' : 'mouseup';

    this.instance.addEventListener(touchStartEvent, ($e) => {
      $e.preventDefault();
      touchStartTime = $e.timeStamp;
      touchStartX = $e.changedTouches ? $e.changedTouches[0].pageX : $e.pageX;
    })

    this.instance.addEventListener(touchEndEvent, ($e) => {
      $e.preventDefault();
      const currentX = $e.changedTouches ? $e.changedTouches[0].pageX : $e.pageX;
      const currentDistance = (touchStartX === 0) ? 0 : Math.abs(currentX - touchStartX);
      const currentTime = $e.timeStamp;
      if (touchStartTime !== 0 && currentTime - touchStartTime < swipeTimeout && currentDistance > swipeDistance) {
        switch (true) {
          case (currentX < touchStartX):
            this.setNextSlide();
            break;
          case (currentX > touchStartX):
            this.setPrevSlide();
            break;
        }
        touchStartTime = 0;
        touchStartX = 0;
      }
    })
  }

}

window.Gallery = Gallery;
