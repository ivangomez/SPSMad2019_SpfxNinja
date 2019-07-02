import * as React from 'react';
import styles from './ClientAzureFunctionAadAuth.module.scss';

import {Selection, PrimaryButton, DetailsList, DetailsListLayoutMode} from "office-ui-fabric-react";
import {AadHttpClient, HttpClientResponse} from '@microsoft/sp-http';

export interface IClientAzureFunctionAadAuthState{
  clients: IClient[];
  clientSelected: string;
}

export interface IClient{
  Name:string;
}

export interface IClientAzureFunctionAadAuthProps {
  factory:any;
}

export default class ClientAzureFunctionAadAuth extends React.Component < IClientAzureFunctionAadAuthProps, IClientAzureFunctionAadAuthState > {

  constructor(props:IClientAzureFunctionAadAuthProps) {
    super(props);
    
    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ ...this.state, clientSelected: this._getSelection() })
    });

    this.state = {
      clients:[],
      clientSelected: ""
    };
  }

  private _selection:Selection;

  private _getSelection = (): string => {
    console.log(this._selection.getSelection()[0]);
    let selection:any = this._selection.getSelection()[0];
    return selection? selection.client:"";
  }

  private doSomeAction = (): void => {
      this.props.factory
      .getClient('ClientId')
      .then((client : AadHttpClient) : void => {
        client.get("https://myAzureFunctionUrl.azurewebsites.net/api/clients", AadHttpClient.configurations.v1)        
          .then((response : HttpClientResponse) : Promise < IClient[] >=> {
            return response.json();
          })
          .then((things: IClient[]): void => {
            this.setState({clients:things});
            console.log(things);
          });
      });
  }

  private promoteClient = ():void => {
    this.props.factory
    .getClient('ClientId')
    .then((client : AadHttpClient) : void => {
      client.get("https://myAzureFunctionUrl.azurewebsites.net/api/promote?name="+this.state.clientSelected, AadHttpClient.configurations.v1)        
        .then((response : HttpClientResponse) : Promise < any >=> {
          return response.json();
        })
        .then((things: any): void => {          
          console.log(things);
        });
    });
  }

  public render(): React.ReactElement < IClientAzureFunctionAadAuthProps > {
    return(
      <div className={styles.clientAzureFunctionAadAuth}>
          <DetailsList
            items={this.state.clients.map(
              (client:IClient) => {
                return { client: client.Name };
              })}
            columns={[{ key: "ClientColumn", name: "Clients", fieldName: "client", minWidth: 100, isRowHeader:true }]}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            setKey="set"
            selection ={this._selection}
            selectionPreservedOnEmptyClick={true}
          />
          <PrimaryButton text="Load" onClick={this.doSomeAction} className={styles.actionbutton} />
          <PrimaryButton text="Promote" onClick={this.promoteClient} className={styles.actionbutton} />
      </div>
    );
  }
}
