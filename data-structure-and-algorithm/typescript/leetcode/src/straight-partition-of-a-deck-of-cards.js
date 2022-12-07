/**
 * 
 * @param { number[] } cards 
 * @returns { boolean }
 */
function strightPartitionOfDeckOfCards(cards) {
    const counts = new Map();
    cards.forEach(card => {
        const count = counts.has(card) ? counts.get(card) : 0;
        counts.set(card, count + 1);
    });

    for (const i = 0; i < cards.length;) {
        if (counts.get(cards[i]) !== 0) {
            for (const curr = cards[i]; curr < cards[i] + 5; ++curr) {
                if (!counts.has(curr) || counts.get(curr) === 0) {
                    return false;
                }
                counts.set(curr, counts.get(curr) - 1);
            }
        } else {
            ++i;
        }
    }

    return true;   
}