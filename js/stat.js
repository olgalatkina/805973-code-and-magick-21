"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 110;
const CLOUD_Y = 10;
const CLOUD_COLOR = `#fff`;
const CLOUD_SHADOW = `rgba(0, 0, 0, 0.3)`;
const GAP = 10;

const FONT = `PT Mono`;
const FONT_SIZE = 16;
const TEXT_FIRST_STROKE = `Ура вы победили!`;
const TEXT_SECOND_STROKE = `Список результатов:`;
const TEXT_COLOR = `#000`;

const BAR_WIDTH = 40;
const MAX_BAR_HEIGHT = 150;
const BAR_GAP = 50;

const PLAYER_COLOR = `rgba(255, 0, 0, 1)`;
const PLAYER_NAME = `Вы`;

const getMaxElement = (someArray) => {
  const shallowCopy = [...someArray];
  return shallowCopy.sort((a, b) => b - a)[0];
};

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = (ctx, text, x, y) => {
  ctx.textBaseline = `hanging`;
  ctx.fillText(text, x, y);
};

const getSaturation = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = `${FONT_SIZE}px ${FONT}`;
  renderText(ctx, TEXT_FIRST_STROKE, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  renderText(ctx, TEXT_SECOND_STROKE, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_SIZE * 1.2);

  const maxTime = getMaxElement(times);

  names.forEach((name, i) => {
    const barHeight = times[i] * MAX_BAR_HEIGHT / maxTime;
    const barX = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;
    const barY = CLOUD_Y + CLOUD_HEIGHT - barHeight - GAP * 2 - FONT_SIZE;

    if (names[i] === PLAYER_NAME) {
      ctx.fillStyle = PLAYER_COLOR;
    } else {
      ctx.fillStyle = `hsl(235, ${getSaturation(5, 100)}%, 50%)`;
    }

    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

    ctx.fillStyle = TEXT_COLOR;
    renderText(ctx, name, barX, CLOUD_Y + CLOUD_HEIGHT - GAP * 3);
    renderText(ctx, Math.round(times[i]), barX, barY - FONT_SIZE);
  });
};
