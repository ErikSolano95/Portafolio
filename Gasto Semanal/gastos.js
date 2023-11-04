

function showAlert() {
    document.getElementById('alert').style.display = 'block';
}

function closeAlert() {
    document.getElementById('alert').style.display = 'none';
}

let controlnumerico = /^[0-9]+$/;
let presupuesto = 0
let saldo = 0

function closeAlertpres() {

    if (controlnumerico.test(document.getElementById('presopuesto').value)) {
        document.getElementById('alertpres').style.display = 'none';
        var presupuestox = document.getElementById('presupuesto').value
        presupuesto = parseInt(document.getElementById("presopuesto").value);
        saldo = parseInt(document.getElementById("presopuesto").value);
        document.getElementById('texpres').textContent = presupuesto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        document.getElementById('texsaldo').textContent = saldo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

    }
    else {
        document.getElementById('press').textContent = "ingrese un monto para continuar"
    }
}



let registros = []

let op = null
let indice = null

function registrar(precio_gasto) {

    let gasto = {
        nombre: document.getElementById("gasto").value,
        cantidad: precio_gasto
    }

    registros.push(gasto)


    document.getElementById("gasto").value = ""
    document.getElementById("cantidad").value = ""
    console.log(registros)
}



function validar() {

    if (document.getElementById("gasto").value == "") {
        document.getElementById("alert-content").textContent = " Ingrese un nombre en la casilla  para continuar con el proceso"
        showAlert()
    }
    else if (controlnumerico.test(document.getElementById("cantidad").value)) {
        let precio_gasto = parseInt(document.getElementById("cantidad").value)


        if (saldo > 0) {
            if (saldo>=precio_gasto){
            registrar(precio_gasto)

            document.getElementById("tabla").innerHTML = "";

            pintar()
            saldo = saldo - precio_gasto
            document.getElementById('texsaldo').textContent = saldo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            document.getElementById("alerta1").style.display = "flex"
            setTimeout(() => {
                document.getElementById("alerta1").style.display = "none"
            }, 3000);
        }
        else{ document.getElementById("alert-content").textContent = "Sin saldo"
        showAlert()

        }
            if (saldo < 1) {
                document.getElementById("alerta2").style.display = "flex"

                const boton = document.getElementById('boton');

                boton.addEventListener('mouseover', function() {
                  boton.style.backgroundColor = 'rgb(49, 49, 49)';
                });
            }
        }
        else {
            document.getElementById("boton").disable = true
           
        }
        if (saldo <= 20000) {
            document.getElementById("conr").style.backgroundColor = "red"
        }

    }
    else {
        document.getElementById("alert-content").textContent = " Ingrese un valor para continuar con el proceso"
        showAlert()
    }

}
console.log(registros)




function pintar() {
    let frag = document.createDocumentFragment()

    registros.forEach((item, index) => {
        let tr = document.createElement("tr")
        tr.classList.add("filas");

        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let eliminar = document.createElement("button")

        td1.classList.add("columna1")

     

        eliminar.textContent = "Borrar"
        eliminar.classList.add("boton_borrar");

        eliminar.addEventListener("click", () => {
            borrar(index, item)
        })

        td1.textContent = item.nombre
        td2.textContent = item.cantidad.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        td2.classList.add("valor_gasto");

      

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(eliminar)

        frag.appendChild(tr)
        document.getElementById("tabla").appendChild(frag)
    
    })
}




function borrar(i, x) {
    index = i
    registros.splice(index, 1);
    document.getElementById("tabla").innerHTML = "";
    pintar();
    saldo = saldo + x.cantidad
    document.getElementById('texsaldo').textContent = saldo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    document.getElementById("alerta2").style.display = "none"
    document.getElementById("conr").style.backgroundColor = "rgb(223, 170, 224)"
    console.log(registros)
}
