# Imagem base
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copiar e restaurar os arquivos do projeto
COPY TesteViceriSeidor.Api/*.csproj .
RUN dotnet restore

# Copiar o restante dos arquivos e compilar
COPY TesteViceriSeidor.Api/ .
RUN dotnet publish -c Release -o /app/publish

# Criar imagem final
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TesteViceriSeidor.Api.dll"]
