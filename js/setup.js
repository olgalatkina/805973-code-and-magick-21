"use strict";

const NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`,
];
const SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`,
];
const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`,
];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const WIZARDS_QUANTITY = 4;

const USER_NAME_DEFAULT = `Синий Пендальф`;
const ValidationMessage = {
  MIN_CHARS: `Имя должно состоять минимум из 2-х символов`,
  MAX_CHARS: `Имя не должно превышать 25-ти символов`,
  REQUIRED_FIELD: `Обязательное поле`,
  EMPTY_MESSAGE: ``
};

const setup = document.querySelector(`.setup`);
const wizardsList = setup.querySelector(`.setup-similar-list`);
const wizardTemplate = document
  .querySelector(`#similar-wizard-template`)
  .content.querySelector(`.setup-similar-item`);
const userNameInput = setup.querySelector(`.setup-user-name`);
const wizardCoat = setup.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = setup.querySelector(`.setup-wizard .wizard-eyes`);
const fireball = setup.querySelector(`.setup-fireball-wrap`);
const inputCoat = setup.querySelector(`input[name="coat-color"]`);
const inputEyes = setup.querySelector(`input[name="eyes-color"]`);
const inputFireball = setup.querySelector(`input[name="fireball-color"]`);

// utils

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

// create wizards

const getWizards = (names, surnames, eyesColor, coatColors, quantity) => {
  let wizards = [];
  const namesCopy = shuffleArray([...names]);
  const surnamesCopy = shuffleArray([...surnames]);

  namesCopy.forEach((name, i) => {
    wizards.push({
      name: `${name} ${surnamesCopy[i]}`,
      eyesColor: getRandomElement(eyesColor),
      coatColor: getRandomElement(coatColors),
    });
  });

  return wizards.slice(0, quantity);
};

const wizards = getWizards(
    NAMES,
    SURNAMES,
    EYES_COLORS,
    COAT_COLORS,
    WIZARDS_QUANTITY
);

const createWizard = (wizardObj) => {
  const wizard = wizardTemplate.cloneNode(true);

  wizard.querySelector(`.setup-similar-label`).textContent = wizardObj.name;
  wizard.querySelector(`.wizard-eyes`).style.fill = wizardObj.eyesColor;
  wizard.querySelector(`.wizard-coat`).style.fill = wizardObj.coatColor;

  return wizard;
};

let fragment = document.createDocumentFragment();

wizards.forEach((wizard) => {
  fragment.append(createWizard(wizard));
});

wizardsList.append(fragment);

setup.querySelector(`.setup-similar`).classList.remove(`hidden`);

// open/close popup

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

// form

userNameInput.addEventListener(`focus`, (evt) => {
  evt.target.value = ``;
  document.removeEventListener(`keydown`, onPopupEscPress);
});

userNameInput.addEventListener(`blur`, (evt) => {
  if (evt.target.value === ValidationMessage.EMPTY_MESSAGE) {
    evt.target.value = USER_NAME_DEFAULT;
  }
  document.addEventListener(`keydown`, onPopupEscPress);
});

userNameInput.addEventListener(`invalid`, () => {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity(ValidationMessage.MIN_CHARS);
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity(ValidationMessage.MAX_CHARS);
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity(ValidationMessage.REQUIRED_FIELD);
  } else {
    userNameInput.setCustomValidity(ValidationMessage.EMPTY_MESSAGE);
  }
});

userNameInput.addEventListener(`input`, () => {
  const valueLength = userNameInput.value.length;

  if (valueLength < ValidationMessage.MIN_CHARS) {
    userNameInput.setCustomValidity(`Ещё ${ValidationMessage.MIN_CHARS - valueLength} симв.`);
  } else if (valueLength > ValidationMessage.MAX_CHARS) {
    userNameInput.setCustomValidity(`Удалите лишние ${valueLength - ValidationMessage.MAX_CHARS} симв.`);
  } else {
    userNameInput.setCustomValidity(ValidationMessage.EMPTY_MESSAGE);
  }

  userNameInput.reportValidity();
});

const fillElement = (el, color) => {
  el.style.fill = color;
};

const setBackgroundColor = (el, color) => {
  el.style.backgroundColor = color;
};

const changeColor = (arr, element, input, cb) => {
  const color = getRandomElement(arr);
  input.value = color;
  cb(element, color);
};

const onWizardCoatClick = () => {
  changeColor(COAT_COLORS, wizardCoat, inputCoat, fillElement);
};

const onWizardEyesClick = () => {
  changeColor(EYES_COLORS, wizardEyes, inputEyes, fillElement);
};

const onWizardFireballClick = () => {
  changeColor(FIREBALL_COLORS, fireball, inputFireball, setBackgroundColor);
};

wizardCoat.addEventListener(`click`, onWizardCoatClick);
wizardEyes.addEventListener(`click`, onWizardEyesClick);
fireball.addEventListener(`click`, onWizardFireballClick);
