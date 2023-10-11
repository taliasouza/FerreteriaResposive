let productos = [];
const url = "api/productos.json";
let prices = []

function mostrarToast() {
  var miToast = document.getElementById("miToast");
  var cartel = new bootstrap.Toast(miToast);
  cartel.show();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarToast();
});

// similar a  función getJSONData.
let obtener = (url) => {
  var resultado = {};
  return fetch(url)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else {
        throw Error(respuesta.statusText);
      }
    })
    .then((respuesta) => {
      resultado.status = "ok";
      resultado.data = respuesta;

      return resultado;
    })
    .catch((error) => {
      resultado.status = "error";
      resultado.data = error;

      return resultado;
    });
};

document.addEventListener("DOMContentLoaded", () => {
  var labelInpt = document.getElementById("SelectInpt")
  obtener(url).then((resultado) => {
    //Agrego los productos a la lista
    if (resultado.status === "ok") {
      productos = resultado.data;
      //cargarProductos(productos); funcion que carga productos en la lista disponible
      

      productos.forEach(element => {
        labelInpt.innerHTML += `
        <option> ${element.producto} $${element.precio} </option>
      `
      });
      
      console.log(labelInpt.value);
      console.log(productos);
    }
  });

  /* addEventListener al botón que agrega productos */
  let btnSend = document.getElementById("BtnSend")

  btnSend.addEventListener("submit", function(event){
    event.preventDefault()
    let listGroup = document.getElementById("list-group")

    const price = labelInpt.value.split("$")[1]


    prices.push(Number(price))


    listGroup.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${labelInpt.value}
      <span class="badge">${price}</span>
      <button type="button" class="btn btn-primary mt-2"> x </button>
    </li>
    `
    console.log(prices)
    
    let totalP = document.getElementById("total-general")
    let total = 0
    for(let i of prices) total+=i;

    console.log(total)

    totalP.innerText = total 

  })
  

  

});



