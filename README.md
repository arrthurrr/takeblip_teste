# Teste Take Blip

Teste do processo seletivo da Take Blip, realizado em NodeJS.

## URL live para teste da API:

https://takeblipteste.arrthurrr.repl.co

## Instalação

Utilize o NodeJS na versão >= 16.4 e rode o comando abaixo no terminal através da pasta principal do projeto.

```bash
npm install
```

## Como rodar

Vá até a pasta principal, abra o terminal e rode o comando a seguir. Estará utilizando a porta 8080 porém basta editar a linha 3 no arquivo server.js para alterar a porta.

```bash
node index.js
```

## Uso

A API irá retornar um JSON com uma lista de repositórios que atendam a requisição de acordo com o JSON de entrada:

```javascript
{
    "org": "nome do usuario no GitHub",
    "type": "tipo de repositório (public/private)",
    "sort": "ordenar por criação, atualização ou publicação",
    "direction": "ascendente ou descendente (asc/des)",
    "quant": "quantidade de repositórios que deseja puxar",
    "lang": "linguagem principal dos repositórios que deseja",
    "token": "personal token GitHub API"
"}
```

O retorno será uma lista com um ou mais JSON no modelo abaixo com o ID do repositório, seu título, descrição, imagem do proprietário, URL e datatime da criação dos repositórios.

```javascript
{
    "id": "ID do repositório",
    "titulo": "Título do repositório",
    "descricao": "Descrição do repositório",
    "imagem": "Imagem do avatar do proprietário",
    "url": "URL do repositório",
    "creation": "Datetime da criação do repositório"
}
```

## Exemplo de uso pelo terminal localmente:
```bash
# Inserir GitHub API Token ao fim da linha
curl http://localhost:8080/api/gitrepo -H "Content-Type: application/json" -d '{"org":"takenet", "type":"public", "sort":"created", "direction":"asc", "quant":"1", "lang":"C#", "token":"INSERIR_TOKEN"}'
```

## Retorno do exemplo:
```javascript
[{
    "titulo": "library.data",
    "descricao": "Provides a simple abstraction for implementing the repository and unit of work patterns for data-enabled applications",
    "imagem": "https://avatars.githubusercontent.com/u/4369522?v=4",
    "id": 13860708,
    "url": "https://github.com/takenet/library.data",
    "creation": "2013-10-25T13:04:51Z"
}]
```
