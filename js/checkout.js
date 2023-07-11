const imgFlecha = document.querySelector("img.flecha");
imgFlecha.src = "imagenes/flecha.png";
imgFlecha.addEventListener("click", ()=>{
    location.href = "index.html";
})

const tableBody = document.querySelector("tbody#carrito-destinos");

function armarFilaDestinos(carritoDestinos){
    return `<tr>
                <td>${carritoDestinos.paquete}</td>
                <td>$ ${carritoDestinos.importe}</td>
                <td><button id="${carritoDestinos.codigo}" class="button-heart-emoji">🤍</button></td>
            </tr>`
}

function armadoDeCheckout(destinos){
    tableBody.innerHTML = " ";
    if (destinos.length > 0) {
        destinos.forEach(destino => {
            tableBody.innerHTML += armarFilaDestinos(destino);
        });
    }
}
armadoDeCheckout(carritoDestinos);

const tableFoot = document.querySelector("tfoot#total-a-pagar");

function armadoDeTotalAPagar(carritoDestinos) {
    let totalAPagar = 0;
    if (carritoDestinos.length > 0) {
        carritoDestinos.forEach(destino => {
            totalAPagar += destino.importe ;
        });
    return `
        <tr>
            <td>TOTAL</td>
            <td>$ ${totalAPagar}</td>            
        </tr>`} 
    else {
    return `<p> Cuando realices tu compra verás aqui los destinos y su total </p>`
    }

}
tableFoot.innerHTML = armadoDeTotalAPagar(carritoDestinos);

function quitarDestinosCheckout() {
    const btnQuitar = document.querySelectorAll("button.button-heart-emoji");
    for (const boton of btnQuitar) {
        boton.addEventListener("click", (ev) => {
            const index = carritoDestinos.findIndex((promocion) => promocion.codigo === parseInt(ev.target.id));
            if (index !== -1) {
                carritoDestinos.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carritoDestinos));
                cargarDestinos(carritoDestinos); 
            }
        });
    }
    btnQuitar.addEventListener("click", quitarDestinosCheckout);
}
quitarDestinosCheckout()

