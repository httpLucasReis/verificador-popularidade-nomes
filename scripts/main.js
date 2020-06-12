const result = document.querySelector("#result")
document.querySelector("button").addEventListener("click", getNames);

function getNames(){
    result.innerHTML = '';

    const name = document.querySelector("input").value;
    const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`;

    const list_time = document.createElement("ul");
    list_time.setAttribute("id","time");

    const list_quantity = document.createElement("ul")
    list_quantity.setAttribute("id","quantity")

    fetch(url)
      .then((res) => res.json())
      .then((names) => {
        for(let index = 0; index < names[0].res.length; index++){

            let item_t = document.createElement("li");
            item_t.textContent = `${names[0].res[index].periodo}`;

            let item_q = document.createElement("li");
            item_q.textContent = `${names[0].res[index].frequencia}`;

            list_time.appendChild(item_t);
            list_quantity.appendChild(item_q);

        
        }
    
        result.appendChild(list_time);
        result.appendChild(list_quantity);

      })

}
