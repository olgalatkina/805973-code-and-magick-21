"use strict";
(() => {
  const getMaxElement = (someArray) => {
    if (someArray.length === 0) {
      throw new Error(`Array must not be empty.`);
    }
    const shallowCopy = [...someArray];
    return shallowCopy.sort((a, b) => b - a)[0];
  };

  const getRandomInRange = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  window.util = {
    getMaxElement,
    getRandomInRange,
    getRandomElement,
    shuffleArray,
  };
})();
