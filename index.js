const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const { Octokit } = require("@octokit/core");

app.use(express.json());

app.get('/', function (req, res){
    res.redirect("https://github.com/arrthurrr/takeblip_teste#readme");
});

app.post('/api/gitrepo/', async function (req, res) {
    async function busca_repositorio(git_lang, git_quant, git_org, git_type, git_sort, git_direction, git_token) {
        const octokit = new Octokit({auth: git_token});

        let qtde_encontrada = 0;
        let paginacao = 1;
        let repositorios = [];

        while (qtde_encontrada < git_quant){
            const response = await octokit.request("GET /orgs/{org}/repos", {
                org: git_org,
                type: git_type,
                sort: git_sort,
                direction: git_direction,
                per_page: 1,
                page: paginacao,
            });

            let repo_atual = response['data'][0]
            paginacao += 1

            if (repo_atual['language'] === "C#"){
                let repo = {
                    "titulo": repo_atual['name'],
                    "descricao": repo_atual['description'],
                    "imagem": (repo_atual['owner'])['avatar_url'],
                    "id": repo_atual['id'],
                    "url": repo_atual['html_url']
                }
                qtde_encontrada += 1
                repositorios.push(repo)
            }
        }

        return repositorios;
    }

    let git_org       = req.body.org;
    let git_type      = req.body.type;
    let git_sort      = req.body.sort;
    let git_direction = req.body.direction;
    let git_quant     = req.body.quant;
    let git_lang      = req.body.lang;
    let git_token     = req.body.token;

    let res_repositorios = await busca_repositorio(git_lang, git_quant, git_org, git_type, git_sort, git_direction, git_token);

    res.json(res_repositorios);
    res.end();
});

app.listen(port, function() {
    console.log('Servidor rodando na porta', port)
});
