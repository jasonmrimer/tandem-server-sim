import { ConsumerModel } from '../models/ConsumerModel';

export class ConsumerService {
  private _simClock: number = 0.0;
  private _consumers: ConsumerModel[] = [];

  constructor(private maxTime: number) {

  }

  public hydrate() {
    while (this._simClock < this.maxTime) {
      const seed = Math.random();
      const interarrivalTime = (-1) * Math.log(seed);
      const arrivalTime = this._simClock + interarrivalTime;

      if (arrivalTime < this.maxTime) {
        this._consumers.push(new ConsumerModel(seed, interarrivalTime, arrivalTime));
      }

      this._simClock += interarrivalTime;
    }
  }

  public get simClock() {
    return this._simClock;
  }

  public get consumers() {
    return this._consumers;
  }
}