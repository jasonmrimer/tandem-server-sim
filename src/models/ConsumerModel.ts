export class ConsumerModel {
  public waitTime: number;

  constructor(
    public seed: number,
    public interarrivalTime: number,
    public arrivalTime: number
  ) {
  }
}