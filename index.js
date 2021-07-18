const express = require('express');
const app = express();
const port = 8080 || 8085;
const { Octokit } = require("@octokit/core");
const token = "";

app.use(express.json());

app.get('/', function (req, res){
    res.redirect("https://github.com/arrthurrr/takeblip_teste#readme");
});

app.post('/api/gitrepo/', async function (req, res) {
    async function busca_repositorio(git_lang, git_quant, git_org, git_type, git_sort, git_direction) {
        const octokit = new Octokit({auth: token});
        var quantidade_encontrada = 0;
        var paginacao = 0;
        var repositorios = [];

        while (quantidade_encontrada < git_quant){
            const response = await octokit.request("GET /orgs/{org}/repos", {
                org: git_org,
                type: git_type,
                sort: git_sort,
                direction: git_direction,
                per_page: 1,
                page: paginacao + 1,
            });

            let repo_atual = response['data'][0]
            if (repo_atual['language'] === "C#"){
                console.log("Achou")
                repositorios.push(repo_atual)
                quantidade_encontrada += 1
            }
        }

        return repositorios;
    }
    console.log(req.body);

    let git_org = req.body.org;
    let git_type = req.body.type;
    let git_sort = req.body.sort;
    let git_direction = req.body.direction;
    let git_quant = req.body.quant;
    let git_lang = req.body.linguagem;

    console.log("json req:", git_org, git_sort, git_type, git_direction, git_quant);

    let res_repositorios = await busca_repositorio(git_lang, git_quant, git_org, git_type, git_sort, git_direction);

    res.json(res_repositorios);
    res.end();
});


app.listen(port, function() {
    console.log('Servidor rodando na porta', port)
});