import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ClientAzureFunctionAadAuthWebPartStrings';
import ClientAzureFunctionAadAuth from './components/ClientAzureFunctionAadAuth';
import { IClientAzureFunctionAadAuthProps } from './components/ClientAzureFunctionAadAuth';

export interface IClientAzureFunctionAadAuthWebPartProps {
  description: string;
}

export default class ClientAzureFunctionAadAuthWebPart extends BaseClientSideWebPart<IClientAzureFunctionAadAuthWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IClientAzureFunctionAadAuthProps > = React.createElement(
      ClientAzureFunctionAadAuth,
      {
        factory:this.context.aadHttpClientFactory,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
