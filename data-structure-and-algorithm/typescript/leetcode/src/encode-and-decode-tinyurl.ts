/*
535. Encode and Decode TinyURL

Note: This is a companion problem to the System Design problem: Design TinyURL.
TinyURL is a URL shortening service where you enter a URL
such as https://leetcode.com/problems/design-tinyurl and it returns a short URL such as http://tinyurl.com/4e9iAk.

Design the encode and decode methods for the TinyURL service.
There is no restriction on how your encode/decode algorithm should work.
You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.

Time:  O(1)
Space: O(n)
*/

class TinyUrl {
  readonly k_len = 6;
  readonly k_tiny = 'http://tinyurl.com/';
  readonly k_alphabet =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  lookup: Map<string, string>;

  constructor() {
    this.lookup = new Map<string, string>();
  }

  // Encodes a URL to a shortened URL.
  encode(longUrl: string): string {
    let key = this.getRand();
    while (this.lookup.has(key)) {
      key = this.getRand();
    }
    this.lookup.set(key, longUrl);
    return this.k_tiny + key;
  }

  // Decodes a shortened URL to its original URL.
  decode(shortUrl: string): string {
    return this.lookup.get(shortUrl.substring(this.k_tiny.length))!;
  }

  private getRand(): string {
    const random: string[] = [];
    for (let i = 0; i < this.k_len; ++i) {
      random.push(
        this.k_alphabet[Math.trunc(Math.random() * this.k_alphabet.length)]
      );
    }
    return random.join('');
  }
}
