"use strict";
(() => {
  const fillElement = (el, color) => {
    el.style.fill = color;
  };

  const setBackgroundColor = (el, color) => {
    el.style.backgroundColor = color;
  };

  const changeColor = (arr, element, input, cb) => {
    const color = window.util.getRandomElement(arr);
    input.value = color;
    cb(element, color);
  };

  window.colorize = {
    fillElement,
    setBackgroundColor,
    changeColor,
  };
})();
