import { ConsumerModel } from './ConsumerModel';
import { ServiceModel } from './ServiceModel';

export class ServerService {
  private _consumers: ConsumerModel[];
  private _services: ServiceModel[] = [];

  public hydrate(consumers: ConsumerModel[]) {
    this._consumers = consumers;
    this._consumers.map((consumer) => {
      const startTime = consumer.arrivalTime;
      const serviceSeed = Math.random();
      const serviceTime = (-0.7) * Math.log(serviceSeed);

      this._services.push({startTime, serviceSeed, serviceTime})
    })
  }

  public get services(){
    return this._services;
  }
}