import { ConsumerModel } from '../models/ConsumerModel';

export class ConsumerService {
  private _simClock: number = 0.0;
  private _consumers: ConsumerModel[] = [];
  private _maxTime: number;

  public hydrate(maxTime: number) {
    this._maxTime = maxTime;

    while (this._simClock < this._maxTime) {
      const seed = Math.random();
      const interarrivalTime = (-1) * Math.log(seed);
      const arrivalTime = this._simClock + interarrivalTime;

      if (arrivalTime < this._maxTime) {
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