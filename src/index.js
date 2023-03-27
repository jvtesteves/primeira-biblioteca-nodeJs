// no topo do arquivo importamos o código
import chalk from 'chalk';
import fs from 'fs';

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]] : [captura[2]]}))
    return resultados.length !== 0 ? resultados : 'Nao ha links no arquivo';
}

function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

// forma mais atual de resolver o problema da sincronia async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro)
    }
}

// A função trataErro não está mais sendo chamada. Por isso, vamos inserir também a função catch,
// que serve para pegar erros de forma assíncrona.

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises.readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro)
// }

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//             if (erro) {
//                 trataErro(erro);
//             }
//         console.log(chalk.green(texto))
//     })
// }

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (_, texto) => {
//         console.log(chalk.green(texto))
//     })
// }

export default pegaArquivo;