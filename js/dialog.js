"use strict";

(() => {
  const setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = setup.querySelector(`.setup-close`);

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = () => {
    setup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = () => {
    setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  setupOpen.addEventListener(`click`, () => {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });

  setupClose.addEventListener(`click`, () => {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      closePopup();
    }
  });

  window.dialog = {
    onPopupEscPress,
  };
})();
