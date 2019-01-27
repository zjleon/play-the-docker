import {EventManager, querySeats} from './utils'
import AI from './AI'

export default class AIControl {
  // private HTTPEndpoint: string
  private AIs: AI[] = []

  constructor() {
    // this.HTTPEndpoint = process.env.HTTP_ENDPOINT
  }

  async fillInAI(): Promise<void> {
    const seats = await querySeats();

    let p = [];
    for (let i = 0; i < seats.length; i++) {
      const AIInstance = new AI();
      this.AIs.push(AIInstance);
      p.push(AIInstance.ready);
    }

    return Promise.all(p)
    .then(() => {
      const teamAmount = Math.floor(seats.length / 2)

      for(let i = 0; i<teamAmount ; i++) {
        const AI1 = this.AIs[i]
        const AI2 = this.AIs[teamAmount + i]
        AI1.addTeammate.call(AI1, AI2.id)
        AI2.addTeammate.call(AI2, AI1.id)
      }
    });
  }

  getAIs() {
    return this.AIs
  }

  AIGetout(): void {
    this.AIs.forEach((AIInstance) => {
      AIInstance.leave()
    })
    this.AIs = []
  }
}