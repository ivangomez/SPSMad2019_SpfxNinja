import {AadHttpClientFactory } from '@microsoft/sp-http';

export interface IClientWebApiCoreProps {
  description: string;
  client: AadHttpClientFactory;
}
