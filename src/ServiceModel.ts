export class ServiceModel {
  private _endTime: number;

  constructor(
    public startTime: number,
    public seed: number,
    public duration: number,
  ) {
    this._endTime = startTime + duration;
  }

  public get endTime() {
    return this._endTime;
  }
}