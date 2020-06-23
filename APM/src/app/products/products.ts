import { ISubscription } from './subscriptions';

export interface IProduct {
  name: string;
  displayName: string;
  sku: string;
  subscriptions: Array<ISubscription>;
}
