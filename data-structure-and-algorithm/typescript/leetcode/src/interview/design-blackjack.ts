class Card {
  Suit: Object;
  Face: Object;
  constructor() {
    this.Suit = Object.freeze({
      Hearts: Symbol('Hearts'),
      Spades: Symbol('Spades'),
      Clubs: Symbol('Clubs'),
      Diamonds: Symbol('Diamonds'),
    });

    this.Face = Object.freeze({
      Ace: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      Jack: 11,
      Queen: 12,
      King: 13,
    });
  }
}
