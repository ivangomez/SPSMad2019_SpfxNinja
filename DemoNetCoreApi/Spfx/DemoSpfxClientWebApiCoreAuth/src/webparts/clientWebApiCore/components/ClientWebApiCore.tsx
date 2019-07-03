import * as React from 'react';
import styles from './ClientWebApiCore.module.scss';
import { IClientWebApiCoreProps } from './IClientWebApiCoreProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {PrimaryButton} from "office-ui-fabric-react";
import {AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

import { DetailsList, DetailsListLayoutMode, Selection, IColumn, Fabric } from 'office-ui-fabric-react';

export interface IClientWebApiCoreState{
  values: string[];
}

export default class ClientWebApiCore extends React.Component<IClientWebApiCoreProps, IClientWebApiCoreState> {

  constructor(props:IClientWebApiCoreProps) {
    super(props);
    
    this.state = {
      values:[]
    };
  }

  private doSomeAction = (): void => {
    this.props
    .client
    .getClient('ClientId')
    .then((client : AadHttpClient) : void => {      
      client.get("https://myAzureFunctionUrl.azurewebsites.net/api/values", AadHttpClient.configurations.v1)
        .then((response : HttpClientResponse) : Promise < string[] >=> {
          return response.json();
        })
        .then((things: string[]): void => {
          this.setState({values:things});
          console.log(things);
        });
    });
  }
  public render(): React.ReactElement<IClientWebApiCoreProps> {
    return (
      <div className={ styles.clientWebApiCore }>
          <DetailsList
            items={this.state.values.map(
              v => {
                return { office: v };
              })}
            columns={[{ key: "OfficeColumn", name: "Offices", fieldName: "office", minWidth: 100, isRowHeader:true }]}
            layoutMode={DetailsListLayoutMode.fixedColumns}
          />
          <PrimaryButton text="Load" onClick={this.doSomeAction} className={styles.actionbutton} />
      </div>
    );
  }
}
