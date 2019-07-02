# Spfx webpart as client app for Azure Function Custom API REST

## Requisitos
Antes de desplegar el paquete de solución de Spfx, es imprescindible haber desplegado y configurado el Azure Function que funcionará a modo de Custom API y haber recuperado los siguientes valores:
1. Nombre del registro del API en Azure Active Directory.
2. ClientId del registro del API en Azure Active Directory.
3. Url del Azure Function para hacer las llamadas al API

## Reemplazo de los valores requeridos en el código

1. En el archivo *"package-solution.json"* en la sección de requerir permisos reemplazaremos el valor *"MyAppRegistration"* por el nombre del registro del API que hemos realizado anteriormente.
```json
"webApiPermissionRequests": [
      {
        "resource": "MyAppRegistration",
        "scope": "user_impersonation"
      }
```
2. En el archivo *"ClientAzureFunctionAadAuth.tsx"*, tanto en los métodos *"doSomeAction"* como *"promoteClient"*, sustituiremos *"ClientId"* por el ClientId de nuestro registro del API. Y actualizaremos la url de la llamada al API por la url correcta del AF.

```typescript
      this.props.factory
      .getClient('ClientId')
      .then((client : AadHttpClient) : void => {
        client.get("https://myAzureFunctionUrl.azurewebsites.net/api/clients", AadHttpClient.configurations.v1)        
          .then((response : HttpClientResponse) : Promise < IClient[] >=> {
            return response.json();
          })
```

## Paquetización y despligue

Para finalizar generariamos el bundle y el paquete de despligue. Una vez hecho esto, subimos el paquete al *"AppCatalog"* de nuestro tenant para tener la aplicación disponible para instalarla sobre cualquier sitio de SharePoint.

## Funcionamiento


