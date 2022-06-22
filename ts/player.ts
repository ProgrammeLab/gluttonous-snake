// player.ts
class Player {
  public keys: Set<any>;
  public score: number;
  constructor() {
    this.keys = new Set();
    this.score = 0;
  }
}