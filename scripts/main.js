const result = document.querySelector("#result")
document.querySelector("button").addEventListener("click", getNames);



function getNames(){
    result.innerHTML = '';

    const name = document.querySelector("input").value;

    if(name.length == 0){
        alert("Campo vazio!");
        return;
    }

    const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`;


    // Lista que vai receber o período
    const list_time = document.createElement("ul");
    list_time.setAttribute("id","time");

    // Lista que vai receber a frequência em que o nome foi registrado
    const list_quantity = document.createElement("ul")
    list_quantity.setAttribute("id","quantity")

    fetch(url)
      .then((res) => res.json())
      .then((names) => {
        for(let index = 0; index < names[0].res.length; index++){
            
            // Regexp para retirar os colchetes 
            let periodo = names[0].res[index].periodo.replace(/(\[)|(\])/g,"");
            let frequencia = names[0].res[index].frequencia;

            // Cria um elemento para cada index do objeto
            let item_t = document.createElement("li");
            item_t.textContent = `Período: ${periodo}`;

            let item_q = document.createElement("li");
            item_q.textContent = `Frequência: ${frequencia}`;

            list_time.appendChild(item_t);
            list_quantity.appendChild(item_q);
        
        }
        result.appendChild(list_time);
        result.appendChild(list_quantity);
      })
}
