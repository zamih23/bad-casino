export const getRandomNumber = () => {
  return Math.floor(Math.random() * (9 - 1 + 1)) + 1;
};

export const getFinalSlots = () => {
    return [getRandomNumber(),getRandomNumber(),getRandomNumber()]
};
