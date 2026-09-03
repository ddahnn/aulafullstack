const URL_API="http://localhost:8001";
const endpointCategoria= URL_API + "/category";
const endpointProduto= URL_API + "/product";


const formulario = document.getElementById("formCategoria");

const campoId = document.getElementById("idCat");

const nome = document.getElementById("txtNome");

const listaCategorias =  document.getElementById("listaCategorias");


alert("oi")
async function loadCategorias(){
    alert("o")
    try{
        const resposta = await fetch(endpointCategoria);
        if (!resposta.ok){
            alert("Erro na requisição")
            return 
        }

        const categorias= await resposta.json()

        listaCategorias.innerHTML=""

        categorias.forEach(cat => {
            listaCategorias.innerHTML += `
                <tr>
                    <td>${cat.id}</td>
                    <td>${cat.nome}</td>
                    <td> 
                    <button class="btn btn-info" onClick=editarCategoria(${cat.id, cat.nome})>Informações</button>
                    <button class="btn btn-danger" onClick=excluirCategoia(${cat.id})>Informações</button>
                    
                    </td>
                    
                </tr>
            `
        });

    }catch(erro){
        console.error(erro)
        alert("Erro ao carregar categorias.")
    }
}

loadCategorias()