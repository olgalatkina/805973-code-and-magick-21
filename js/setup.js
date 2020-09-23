'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLOR = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARDS_QUANTITY = 4;

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

// const getWizardName = (arr1, arr2) => {
//   const name = getRandomElement(arr1);
//   const surname = getRandomElement(arr2);

//   return `${name} ${surname}`;
// };

const getWizards = (names, surnames, eyesColor, coatColors) => {
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

  return wizards.slice(0, WIZARDS_QUANTITY);
};

const wizards = getWizards(NAMES, SURNAMES, EYES_COLOR, COAT_COLOR);

const setup = document.querySelector(`.setup`);
const wizardsList = setup.querySelector(`.setup-similar-list`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const renderWizard = (wizardObj) => {
  const wizard = wizardTemplate.cloneNode(true);

  wizard.querySelector(`.setup-similar-label`).textContent = wizardObj.name;
  wizard.querySelector(`.wizard-eyes`).style.fill = wizardObj.eyesColor;
  wizard.querySelector(`.wizard-coat`).style.fill = wizardObj.coatColor;

  return wizard;
};

let fragment = document.createDocumentFragment();

wizards.forEach((wizard) => {
  fragment.append(renderWizard(wizard));
});

wizardsList.append(fragment);

setup.classList.remove(`hidden`);
setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
