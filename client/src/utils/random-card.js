// recursive function which receives 2 parameters: to -> an array which should append a random
// item from another array, and if it already appended that item, it should run again until
// all the items in the array are unique
const getRandomCard = (to, from) => {
  const randomCard = from[Math.floor(Math.random() * from.length)];
  const randomCardInTo = to.findIndex((c) => c.id === randomCard.id);

  if (randomCardInTo >= 0) {
    return getRandomCard(to, from);
  }

  return randomCard;
};

export default getRandomCard;
