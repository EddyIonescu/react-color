'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var calculateChange = exports.calculateChange = function calculateChange(e, direction, hsl, container) {
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;

  if (direction === 'vertical') {
    var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
    var top = y - (container.getBoundingClientRect().top + window.pageYOffset);

    var h = void 0;
    if (top < 0) {
      h = 359;
    } else if (top > containerHeight) {
      h = 0;
    } else {
      var percent = -(top * 100 / containerHeight) + 100;
      h = 360 * percent / 100;
    }

    if (hsl.h !== h) {
      return {
        h: h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: 'hsl'
      };
    }
  } else {
    var prevH = hsl.h;
    // Each step is a 0.5% movement in the slider. Repeated key press is supported when
    // onChange is used, but not onChangeComplete.
    var ArrowStep = containerWidth / 200;
    var prevLeft = prevH * containerWidth / 360;
    var left = void 0;
    if (e.key === 'ArrowLeft') {
      left = prevLeft - ArrowStep;
    }
    if (e.key === 'ArrowRight') {
      left = prevLeft + ArrowStep;
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      // Prevent web-app from scrolling horizontally, only the slider should be moving.
      e.preventDefault();
    }
    if (!left && left !== 0) {
      var x = void 0;
      if (typeof e.pageX === 'number') {
        x = e.pageX;
      } else if (e.touches && e.touches.length) {
        x = e.touches[0].pageX;
      }
      left = x - (container.getBoundingClientRect().left + window.pageXOffset);
    }

    var _h = void 0;
    if (left < 0) {
      _h = 0;
    } else if (left > containerWidth) {
      _h = 359;
    } else {
      _h = 360 * left / containerWidth;
    }
    if ((_h || _h === 0) && prevH !== _h) {
      return {
        h: _h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: 'hsl'
      };
    }
  }
  return null;
};