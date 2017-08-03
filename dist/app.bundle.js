/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gallery = function () {
  function Gallery(config) {
    _classCallCheck(this, Gallery);

    if (!config) {
      return;
    }
    if (config.selector) {
      this.instance = document.querySelector(config.selector);
    }
    if (config.width) {
      this.instance.style.width = +config.width + 'px';
    }
    if (config.height) {
      this.instance.style.height = +config.height + 'px';
    }
    this.items = this.instance.querySelectorAll('.gallery-item');
    if (!this.items || !this.items.length) {
      try {
        this.instance.querySelector('.gallery-wrapper').innerHTML = '\n        <span> Gallery has no items </span>\n        ';
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

  _createClass(Gallery, [{
    key: 'setTransform',
    value: function setTransform() {
      var instanceWidth = this.instance.clientWidth;
      var count = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          var translateX = count * instanceWidth;
          item.style.transform = 'translate3d(-' + translateX + 'px, 0px, 0px)';
          count++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'setActiveSlide',
    value: function setActiveSlide(index) {
      this.items[index].classList.add('gallery-item-active');
      if (index !== this.activeIndex) {
        this.items[this.activeIndex].classList.remove('gallery-item-active');
      }
      this.activeIndex = index;
      if (this.countElement) {
        this.countElement.innerHTML = 'Slide: ' + (this.activeIndex + 1) + ' / ' + this.totalSlides;
      }
    }
  }, {
    key: 'setNextSlide',
    value: function setNextSlide() {
      if (this.activeIndex + 1 < this.totalSlides) {
        this.setActiveSlide(this.activeIndex + 1);
      } else {
        this.setActiveSlide(0);
      }
    }
  }, {
    key: 'setPrevSlide',
    value: function setPrevSlide() {
      if (this.activeIndex > 0) {
        this.setActiveSlide(this.activeIndex - 1);
      } else {
        this.setActiveSlide(this.totalSlides - 1);
      }
    }
  }, {
    key: 'setEventListeners',
    value: function setEventListeners() {
      var _this = this;

      this.instance.addEventListener('click', function ($e) {
        switch ($e.target.className) {
          case 'gallery-prev':
            _this.setPrevSlide();
            break;
          case 'gallery-next':
            _this.setNextSlide();
            break;
        }
      });
      window.addEventListener('resize', function () {
        _this.setTransform();
      });
      this.attachSwipeListener();
    }
  }, {
    key: 'attachSwipeListener',
    value: function attachSwipeListener() {
      var _this2 = this;

      var swipeTimeout = 1000;
      var swipeDistance = 50;
      var touchStartX = 0;
      var touchStartTime = 0;
      var isTouchAvailable = 'ontouchend' in document;
      var touchStartEvent = isTouchAvailable ? 'touchstart' : 'mousedown';
      var touchEndEvent = isTouchAvailable ? 'touchend' : 'mouseup';

      this.instance.addEventListener(touchStartEvent, function ($e) {
        $e.preventDefault();
        touchStartTime = $e.timeStamp;
        touchStartX = $e.changedTouches ? $e.changedTouches[0].pageX : $e.pageX;
      });

      this.instance.addEventListener(touchEndEvent, function ($e) {
        $e.preventDefault();
        var currentX = $e.changedTouches ? $e.changedTouches[0].pageX : $e.pageX;
        var currentDistance = touchStartX === 0 ? 0 : Math.abs(currentX - touchStartX);
        var currentTime = $e.timeStamp;
        if (touchStartTime !== 0 && currentTime - touchStartTime < swipeTimeout && currentDistance > swipeDistance) {
          switch (true) {
            case currentX < touchStartX:
              _this2.setNextSlide();
              break;
            case currentX > touchStartX:
              _this2.setPrevSlide();
              break;
          }
          touchStartTime = 0;
          touchStartX = 0;
        }
      });
    }
  }]);

  return Gallery;
}();

window.Gallery = Gallery;

var galInstance = new Gallery({
  selector: '.js-gallery'
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjBlZTM3Yzg2MjNmZDdiMDI3MzUiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzLmNzcyJdLCJuYW1lcyI6WyJHYWxsZXJ5IiwiY29uZmlnIiwic2VsZWN0b3IiLCJpbnN0YW5jZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpZHRoIiwic3R5bGUiLCJoZWlnaHQiLCJpdGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJpbm5lckhUTUwiLCIkZSIsImNvbnNvbGUiLCJlcnJvciIsIm5leHRCdXR0b24iLCJwcmV2QnV0dG9uIiwiY291bnRFbGVtZW50IiwiYWN0aXZlSW5kZXgiLCJ0b3RhbFNsaWRlcyIsInNldEV2ZW50TGlzdGVuZXJzIiwic2V0VHJhbnNmb3JtIiwic2V0QWN0aXZlU2xpZGUiLCJpbnN0YW5jZVdpZHRoIiwiY2xpZW50V2lkdGgiLCJjb3VudCIsIml0ZW0iLCJ0cmFuc2xhdGVYIiwidHJhbnNmb3JtIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwidGFyZ2V0IiwiY2xhc3NOYW1lIiwic2V0UHJldlNsaWRlIiwic2V0TmV4dFNsaWRlIiwid2luZG93IiwiYXR0YWNoU3dpcGVMaXN0ZW5lciIsInN3aXBlVGltZW91dCIsInN3aXBlRGlzdGFuY2UiLCJ0b3VjaFN0YXJ0WCIsInRvdWNoU3RhcnRUaW1lIiwiaXNUb3VjaEF2YWlsYWJsZSIsInRvdWNoU3RhcnRFdmVudCIsInRvdWNoRW5kRXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRpbWVTdGFtcCIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJjdXJyZW50WCIsImN1cnJlbnREaXN0YW5jZSIsIk1hdGgiLCJhYnMiLCJjdXJyZW50VGltZSIsImdhbEluc3RhbmNlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNB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SUFBSXpELE9BQUosQ0FBWTtBQUM5QkUsWUFBVTtBQURvQixDQUFaLENBQXBCLEM7Ozs7OztBQ2xJQSx5QyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjBlZTM3Yzg2MjNmZDdiMDI3MzUiLCJpbXBvcnQgJy4vc3R5bGVzLmNzcyc7XG5cbmNsYXNzIEdhbGxlcnkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnNlbGVjdG9yKSB7XG4gICAgICB0aGlzLmluc3RhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcuc2VsZWN0b3IpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLndpZHRoKSB7XG4gICAgICB0aGlzLmluc3RhbmNlLnN0eWxlLndpZHRoPWAkeytjb25maWcud2lkdGh9cHhgO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmhlaWdodCkge1xuICAgICAgdGhpcy5pbnN0YW5jZS5zdHlsZS5oZWlnaHQ9YCR7K2NvbmZpZy5oZWlnaHR9cHhgO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pbnN0YW5jZS5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeS1pdGVtJyk7XG4gICAgaWYgKCAhdGhpcy5pdGVtcyB8fCAhdGhpcy5pdGVtcy5sZW5ndGggKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmluc3RhbmNlLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXdyYXBwZXInKS5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxzcGFuPiBHYWxsZXJ5IGhhcyBubyBpdGVtcyA8L3NwYW4+XG4gICAgICAgIGA7XG4gICAgICB9IGNhdGNoICgkZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5uZXh0QnV0dG9uID0gdGhpcy5pbnN0YW5jZS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1uZXh0Jyk7XG4gICAgdGhpcy5wcmV2QnV0dG9uID0gdGhpcy5pbnN0YW5jZS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcmV2Jyk7XG4gICAgdGhpcy5jb3VudEVsZW1lbnQgPSB0aGlzLmluc3RhbmNlLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LWNvdW50Jyk7XG4gICAgdGhpcy5hY3RpdmVJbmRleCA9IDA7XG4gICAgdGhpcy50b3RhbFNsaWRlcyA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgIHRoaXMuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIHRoaXMuc2V0QWN0aXZlU2xpZGUoMCk7XG4gIH1cblxuICBzZXRUcmFuc2Zvcm0oKSB7XG4gICAgY29uc3QgaW5zdGFuY2VXaWR0aCA9IHRoaXMuaW5zdGFuY2UuY2xpZW50V2lkdGg7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZVggPSBjb3VudCAqIGluc3RhbmNlV2lkdGg7XG4gICAgICBpdGVtLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgtJHt0cmFuc2xhdGVYfXB4LCAwcHgsIDBweClgO1xuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cblxuICBzZXRBY3RpdmVTbGlkZShpbmRleCkge1xuICAgIHRoaXMuaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnktaXRlbS1hY3RpdmUnKTtcbiAgICBpZiAoaW5kZXggIT09IHRoaXMuYWN0aXZlSW5kZXgpIHtcbiAgICAgIHRoaXMuaXRlbXNbdGhpcy5hY3RpdmVJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnZ2FsbGVyeS1pdGVtLWFjdGl2ZScpO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgaWYgKHRoaXMuY291bnRFbGVtZW50KSB7XG4gICAgICB0aGlzLmNvdW50RWxlbWVudC5pbm5lckhUTUwgPSBgU2xpZGU6ICR7dGhpcy5hY3RpdmVJbmRleCArIDF9IC8gJHt0aGlzLnRvdGFsU2xpZGVzfWBcbiAgICB9XG4gIH1cblxuICBzZXROZXh0U2xpZGUoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggKyAxIDwgdGhpcy50b3RhbFNsaWRlcykge1xuICAgICAgdGhpcy5zZXRBY3RpdmVTbGlkZSh0aGlzLmFjdGl2ZUluZGV4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0QWN0aXZlU2xpZGUoMCk7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJldlNsaWRlKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ID4gMCkge1xuICAgICAgdGhpcy5zZXRBY3RpdmVTbGlkZSh0aGlzLmFjdGl2ZUluZGV4IC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0QWN0aXZlU2xpZGUodGhpcy50b3RhbFNsaWRlcyAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuaW5zdGFuY2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoJGUpID0+IHtcbiAgICAgIHN3aXRjaCAoJGUudGFyZ2V0LmNsYXNzTmFtZSkge1xuICAgICAgICBjYXNlICdnYWxsZXJ5LXByZXYnOlxuICAgICAgICAgIHRoaXMuc2V0UHJldlNsaWRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2dhbGxlcnktbmV4dCc6XG4gICAgICAgICAgdGhpcy5zZXROZXh0U2xpZGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNldFRyYW5zZm9ybSgpO1xuICAgIH0pXG4gICAgdGhpcy5hdHRhY2hTd2lwZUxpc3RlbmVyKCk7XG4gIH1cblxuICBhdHRhY2hTd2lwZUxpc3RlbmVyKCkge1xuICAgIGNvbnN0IHN3aXBlVGltZW91dCA9IDEwMDA7XG4gICAgY29uc3Qgc3dpcGVEaXN0YW5jZSA9IDUwO1xuICAgIGxldCB0b3VjaFN0YXJ0WCA9IDA7XG4gICAgbGV0IHRvdWNoU3RhcnRUaW1lID0gMDtcbiAgICBjb25zdCBpc1RvdWNoQXZhaWxhYmxlID0gJ29udG91Y2hlbmQnIGluIGRvY3VtZW50O1xuICAgIGNvbnN0IHRvdWNoU3RhcnRFdmVudCA9IChpc1RvdWNoQXZhaWxhYmxlKSA/ICd0b3VjaHN0YXJ0JyA6ICdtb3VzZWRvd24nO1xuICAgIGNvbnN0IHRvdWNoRW5kRXZlbnQgPSAoaXNUb3VjaEF2YWlsYWJsZSkgPyAndG91Y2hlbmQnIDogJ21vdXNldXAnO1xuXG4gICAgdGhpcy5pbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyKHRvdWNoU3RhcnRFdmVudCwgKCRlKSA9PiB7XG4gICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdG91Y2hTdGFydFRpbWUgPSAkZS50aW1lU3RhbXA7XG4gICAgICB0b3VjaFN0YXJ0WCA9ICRlLmNoYW5nZWRUb3VjaGVzID8gJGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiAkZS5wYWdlWDtcbiAgICB9KVxuXG4gICAgdGhpcy5pbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyKHRvdWNoRW5kRXZlbnQsICgkZSkgPT4ge1xuICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRYID0gJGUuY2hhbmdlZFRvdWNoZXMgPyAkZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCA6ICRlLnBhZ2VYO1xuICAgICAgY29uc3QgY3VycmVudERpc3RhbmNlID0gKHRvdWNoU3RhcnRYID09PSAwKSA/IDAgOiBNYXRoLmFicyhjdXJyZW50WCAtIHRvdWNoU3RhcnRYKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gJGUudGltZVN0YW1wO1xuICAgICAgaWYgKHRvdWNoU3RhcnRUaW1lICE9PSAwICYmIGN1cnJlbnRUaW1lIC0gdG91Y2hTdGFydFRpbWUgPCBzd2lwZVRpbWVvdXQgJiYgY3VycmVudERpc3RhbmNlID4gc3dpcGVEaXN0YW5jZSkge1xuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIChjdXJyZW50WCA8IHRvdWNoU3RhcnRYKTpcbiAgICAgICAgICAgIHRoaXMuc2V0TmV4dFNsaWRlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIChjdXJyZW50WCA+IHRvdWNoU3RhcnRYKTpcbiAgICAgICAgICAgIHRoaXMuc2V0UHJldlNsaWRlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0b3VjaFN0YXJ0VGltZSA9IDA7XG4gICAgICAgIHRvdWNoU3RhcnRYID0gMDtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbn1cblxud2luZG93LkdhbGxlcnkgPSBHYWxsZXJ5O1xuXG5jb25zdCBnYWxJbnN0YW5jZSA9IG5ldyBHYWxsZXJ5KHtcbiAgc2VsZWN0b3I6ICcuanMtZ2FsbGVyeScsXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3R5bGVzLmNzc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9