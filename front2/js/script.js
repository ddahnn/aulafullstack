const URL_API="http://localhost:8001";
const endpointCategoria= URL_API + "/category";
const endpointProduto= URL_API + "/product";


const formulario = document.getElementById("formCategoria");

const campoId = document.getElementById("idCat");

const campoNome = document.getElementById("txtNome");

const listaCategorias =  document.getElementById("listaCategorias");


async function loadCategorias(){
    
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
                    <button class="btn btn-info" onClick="preencherForm(${cat.id}, '${cat.nome}')">Editar</button>
                    <button class="btn btn-danger" onClick="excluirCategoia(${cat.id})">Excluir</button>
                    
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



async function addCategoria(categoria){
    const resposta = await fetch(
        `${endpointCategoria}`,
        {
            method:"POST",  
            headers:{
                "Content-Type": "application/json",
                
            },
            body:JSON.stringify(categoria)
            
    }
    )

    if (resposta.ok) {loadCategorias()}
}




async function  excluirCategoia(id){
    const confirma = confirm("Dejeja mesmo ecluir a categoria? ")

    if (!confirma) return;

    try{
        const resposta = await fetch( `${endpointCategoria}/${id}`, {method:"delete"})

        if (resposta.ok){
            alert(" Categoria excluida com sucesso!");
            loadCategorias()
        }


    }catch (erro){
        console.log(erro)
        alert("Erro ao adicionar!")
    }
}




function preencherForm(idCat, nomeCategoria){
    campoId.value= idCat
    campoNome.value = nomeCategoria
    

}

async  function editarCategoria(idcat, categoria){
    try {
            const resposta = await fetch(
                `${endpointCategoria}/${idcat}`,
                {
                    method:"PUT",
                    headers:{
                        'Content-Type': "application/json"
                    },
                    body : JSON.stringify(categoria)
                }
            )
            if (resposta.ok) alert("categoria criada com sucesso!")
    } catch (error) {
        console.log(error)
        alert("Erro ao tentar editar!")
    }
}

formulario.addEventListener( "submit", async function (evento) {
    evento.preventDefault();
    const idCat = campoId.value
    // virar objeto antes de enviar para API
    const categoria = { nome:campoNome.value }


    try{
        if (idCat) {
                editarCategoria(idCat, categoria)
        }else{
           await addCategoria(categoria)
        }

        formulario.reset()
        campoId.value=""
    }catch(erro){
        
        }

        
})



