# Azure Function as Custom API REST

## Creación del App Service
Para crear en Azure el App Service sobre el que despelgar tenemos dos vías, o bien a través del portal de Azure:

![alt text](./screenshot1.png)

O bien, a través del propio Visual Studio:

![alt text](./screenshot2.png)
Si optamos por esta opción de VS, de momento obviamos este paso y lo realizaremos a la hora de desplegar el proyecto en el paso siguiente.


## Configuración del proyecto sobre el App Service

Una vez tenemos creado el App Service, para que funcione correctamente la demo tenemos que configurar algunos parámetros en el código.

En el archivo *__Function2.cs__* debemos sustir la url del ClientContext por la url del site de SharePoint desde donde vamos a consumir la API:
```c#
using (var clientContext = new ClientContext("https://domain.sharepoint.com/sites/MyDemoSite"))
```

Así mismo, en el archivo *__Utils.cs__* debemos reemplazar usuario y password de la cuenta de servicio que vayamos a utilizar.
```c#
    public static class Utils
    {
        public static string GetUserName()
        {
            return "myServiceAccountUserName@domain.onmicrosoft.com";
        }

        public static SecureString GetPassword()
        {
            var password = "xxxxxxxxxx";
            var secureString = new SecureString();
            password.ToList().ForEach(c => secureString.AppendChar(c));
            return secureString;
        }
    }
```

Por último, hay que crear una lista llamada *"PromotedLinks"* en el sitio desde donde se vaya a consumir el API.
```c#
    var list = clientContext.Web.Lists.GetByTitle("PromotedClients");
```


## Despliegue del proyecto sobre el App Service

Una vez finalizada la configuración, procedemos al despliegue desde Visual Studio.

Creamos un nuevo perfil de publicación y si hemos creado el App Service desde el Portal de Azure seleccionamos la opción *Select from existing*. 

En caso contrario seleccionaremos "Create new" y rellenaremos los parámetros de creación del App antes de publicar.

Si todo el proceso ha finalizado correctamente, desde el portal de Azure podremos observar que tenemos en nuestro App Service las dos funciones que acabamos de desplegar.

Así mismo, tomaremos nota de la url a través de la cual haremos las llamadas a nuestro API.

![alt text](./screenshot3.png)


## Securización del App Service con Azure Active Directory

Accedemos de nuevo al portal de Azure y desde el recién creado Function App accedemos al tab *"Platform features"*.

Hacemos click sobre *"Authentication/Authorization"*. A continuación debemos realizar los siguientes pasos tal y como aparece en la imagen.

![alt text](./screenshot4.png)

1. Activar *"App Service Authentication"*
2. Seleccionar *"Log in with Azure Active Directory"* en desplegable *"Action to take..."*
3. Configurar el *"Autentication Provider"* de Azure Active Directory.

Para la configuración de Azure Active Directory recomiendo usar el modo *"Express"*, al menos las primeras veces, y cuando dominemos este tema podemos pasar al Advanced y registrar las Apps nosotros mismos.

Una vez seleccionado el modo *"Express"*, se nos mostrará el directorio activo sobre el que se creará el registro y debemos indicar en el campo *"Create App"* el nombre con el que registraremos la App. Una vez pulsemos *"Ok"*, se nos creará y configurará el registro de manera correcta.

Una vez finalizado, si volvemos a acceder a la configuración del provider veremos los datos que se han generado al hacer el registro, es importante sobre todo que nos quedemos con el ClientId.


