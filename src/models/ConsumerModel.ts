export class ConsumerModel {
  public waitForServerOneTime: number;
  public waitForServerTwoTime: number;

  constructor(
    public seed: number,
    public interarrivalTime: number,
    public arrivalTime: number,
  ) {
  }
}