export class ConsumerModel {
  public waitTime: number;
  public waitForServerTwoTime: number;

  constructor(
    public seed: number,
    public interarrivalTime: number,
    public arrivalTime: number,
  ) {
  }
}