const result = document.querySelector("#result");

const table = document.createElement('table')
const tableHead = document.createElement('thead');
const tableBody = document.createElement('tbody');

document.querySelector("button").addEventListener("click", getNames);

function getNames(){
    result.innerHTML = '';
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const name = document.querySelector("input").value;
    
    if(name.length == 0){
        alert("Campo vazio!");
        return;
    }
    
    // Título dinâmico
    const title = document.createElement("h1");
    title.textContent = `Popularidade do nome ${name}`

    const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`;

    fetch(url)
      .then((res) => res.json())
      .then((names) => {
        for(let index = 0; index < names[0].res.length; index++){
            
            // Regexp para retirar os colchetes 
            let periodo = names[0].res[index].periodo.replace(/(\[)|(\])/g,"");
            let frequencia = names[0].res[index].frequencia;

            tableBody.innerHTML += `<tr><td>${periodo}</td><td>${frequencia}</td></tr>`;
        
        }
        tableHead.innerHTML = `<tr><th>Período</th> <th>Frequência</th></tr>`;
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        result.appendChild(title)
        result.appendChild(table);
      })
      .catch(function(error){
        const errorText = document.createElement('h1');
        const contentText = document.createTextNode(`O nome ${name} é inválido ou não foi encontrado`);
        errorText.appendChild(contentText);
        result.appendChild(errorText);
      })
}
