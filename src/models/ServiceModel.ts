export class ServiceModel {
  public idleTime: number;
  private _endTime: number;

  constructor(
    public startTime: number,
    public seed: number = 0,
    public duration: number = 0,
  ) {
    this._endTime = startTime + duration;
  }

  public get endTime() {
    return this._endTime;
  }
}