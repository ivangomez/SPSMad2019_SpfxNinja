# ASP.NET Core API as Custom API REST


## Configuración del proyecto

Para esta API recomiendo crear el proyecto desde cero para que Visual Studio se encargue de la configuración base del registro de la aplicación en Azure Active Directory. Una vez hecho agregaremos al código los cambios que expongo más abajo y ya tendremos el API funcional. Aún así incluyo mi aplicación en el repo para que sirva de modelo.

En primer lugar creamos la aplicación web ASP.NET Core.

![alt text](https://raw.githubusercontent.com/ivangomez/SPSMad2019_SpfxNinja/master/DemoNetCoreApi/Api/Screenshot1.png)

A continuación seleccionamos tipo API, .NET Core y ASP.NET Core 2.2, tal y como se muestra en la imagen.

![alt text](https://raw.githubusercontent.com/ivangomez/SPSMad2019_SpfxNinja/master/DemoNetCoreApi/Api/Screenshot2.png)

Pulsamos el botón *"Change Authentication"* y sobre la nueva ventana seleccionamos *"Work or School Accounts"*, *"Cloud-Single Organization"* y en *"Domain"* debemos rellanar el dominio del tenant sobre el que queremos registrar la aplicación, que lógicamente debe ser el mismo sobre el que consumiremos el API desde SharePoint.

![alt text](https://raw.githubusercontent.com/ivangomez/SPSMad2019_SpfxNinja/master/DemoNetCoreApi/Api/Screenshot3.png)

Con todo listo pulsamos sobre el botón *"OK"* para que Visual Studio cree la aplicación web, así como realice el registro sobre Azure Active Directory.

Una vez finalizado el proceso y creada la aplicación veremos que en el archivo de configuración *__appsettings.json__* tendremos la configuración que necesita la aplicación para validar los tokens de AAD. De esa configuración necesitamos anotar el ClientId que lo necesitaremos para la aplicación cliente Spfx.


## Cambios en el código

### Startup.cs

En el método *__ConfigureServices__* añadiremos el siguiente código que configurará el CORS en nuestra API, sustituyendo el dominio de ejemplo por el dominio del SharePoint desde donde vamos a llamar al API.


```c#
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("https://mydomain.sharepoint.com")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
```

Añadiremos la siguiente propiedad a la clase *__Startup__*
```c#
readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
```

Por último añadiremos en el método *__Configure__* la siguiente línea de código para activar el CORS:
```c#
            app.UseCors(MyAllowSpecificOrigins);
```

### ValuesController.cs

Sustituiremos el método *__Get__* por el siguiente código, o por cualquier otro que devuelva una colección de valores:

```c#
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {            
            return new string[] { "Madrid", "Barcelona", "Bilbao", "León", "Sevilla", "Seattle", "London", "Dubai" };
        }
```


## Despliegue de la aplicación

Una vez tenemos listo el proyecto solo nos queda desplegarlo sobre un Azure Web App y tomar nota de la url de la misma ya que tendremos que configurar la aplicación cliente Spfx para que haga las llamadas a esa url.








