# Tools globales que hay que instalar

```
dotnet tool install dotnet-ef -g
dotnet tool install swashbuckle.aspnetcore.cli -g
dotnet tool install nswag.consolecore -g
```

# BD

## Crear BD local

1- Instalar Docker

2- Descargar la imagen del contenedor
`docker pull mcr.microsoft.com/azure-sql-edge`

3- Creamos el contenedor
`docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' -e 'MSSQL_SA_PASSWORD=Pas$word!39' -p 1433:1433 --name azuresqledge -d mcr.microsoft.com/azure-sql-edge`

4- Entrar con:

```
Authentication type: SQL Login
server: localhost
username: sa
password: Pas$word!39
```

## Alias para migraciones (en .zshrc)

```
alias add-migration="dotnet ef migrations add"
alias update-database="dotnet ef database update"
alias remove-migration="dotnet ef migrations remove"
```

## Migraciones

- Agregar: `add-migration NombreDeLaMigracion`
- Borar la última (sin aplicar): `remove-migration`
- Actualizar la BD: `update-database`
- Revertir migraciones aplicadas: `update-database NombreUltimaMigracionBuena`
