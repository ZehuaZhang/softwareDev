/*
Define "Straight" as 5 cards with consecutive numbers.
Determine if the deck can be fully divided into sets of "Straight".

Example: 1, 2, 3, 4, 4, 5, 5, 6, 7, 8 -> True

You may assume the cards are sorted
 */
function strightPartitionOfDeckOfCards(cards: number[]): boolean {
  const countMap = new Map<number, number>();
  cards.forEach(card => {
    countMap.set(card, (countMap.get(card) || 0) + 1);
  });

  for (let i = 0; i < cards.length; ) {
    if (countMap.get(cards[i])) {
      for (let card = cards[i]; card < cards[i] + 5; ++card) {
        if (!countMap.get(card)) {
          return false;
        }
        countMap.set(card, countMap.get(card)! - 1);
      }
    } else {
      ++i;
    }
  }

  return true;
}
