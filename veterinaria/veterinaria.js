let cerradas = [];
let anuladas = [];
let citas = [];

let mascotas = [
  { id: 1, nombre: "perro", img: "https://i.gifer.com/U2B8.gif" },
  { id: 2, nombre: "gato", img: "https://i.gifer.com/yuJ.gif" },
  {
    id: 3,
    nombre: "ave",
    img: "https://i.pinimg.com/originals/cb/52/63/cb52630790d49db7883f5a3729fbfca0.gif",
  },
  {
    id: 4,
    nombre: "conejo",
    img: "https://usagif.com/wp-content/uploads/gifs/cute-bunny-gif-6.gif",
  },
  {
    id: 5,
    nombre: "ardilla",
    img: "https://pa1.aminoapps.com/6803/40bf00b22cd2301ad6ea960bd51b5fda2d3d5dab_00.gif",
  },
  {
    id: 6,
    nombre: "hamster ",
    img: "https://i.pinimg.com/originals/96/7b/9f/967b9ff33d6067322730c0904e3c4ea1.gif",
  },
];

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function resetForm() {
  document.getElementById("cita-form").reset();
}

function showAlert() {
  document.getElementById("alert").style.display = "block";
}

function closeAlert() {
  document.getElementById("alert").style.display = "none";
}

function crear_cita() {
  let cita = {
    nombre: document.getElementById("nombre").value,
    tipo: document.getElementById("tipo").value,
    propietario: document.getElementById("propietario").value,
    fecha: document.getElementById("fecha").value,
    telefono: document.getElementById("telefono").value,
    hora: document.getElementById("hora").value,
    sintomas: document.getElementById("sintomas").value,
  };

  citas.push(cita);
  console.log(citas);
  resetForm();
}

function pintar(filtro) {
  document.getElementById("contenedor_citas").innerHTML = ""; // Clear previous content

  let citasArray = [];

  switch (filtro) {
    case "citas":
      citasArray = citas;
      break;
    case "cerradas":
      citasArray = cerradas;
      break;
    case "anuladas":
      citasArray = anuladas;
      break;
  }
  let fragment = document.createDocumentFragment();
  citasArray.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cards");

    let img = document.createElement("img");
    img.classList.add("imgs");
    let mascota = mascotas.find((m) => m.nombre === item.tipo);
    img.src = mascota ? mascota.img : "";

    let inputNombre = document.createElement("p");
    inputNombre.classList.add("nombre");
    inputNombre.textContent = ` Nombre  : ${item.nombre}`;
    let inputTipo = document.createElement("p");
    inputTipo.classList.add("tipo");
    inputTipo.textContent = `Tipo: ${item.tipo}`;
    let inputpropietario = document.createElement("p");
    inputpropietario.textContent = `Propietario: ${item.propietario}`;
    inputpropietario.classList.add("propietario");
    let inputfecha = document.createElement("p");
    inputfecha.textContent = `Fecha: ${item.fecha}`;
    inputfecha.classList.add("fecha");
    let inputTelefono = document.createElement("p");
    inputTelefono.textContent = `Teléfono: ${item.telefono}`;
    inputTelefono.classList.add("telefono");
    let inputHora = document.createElement("p");
    inputHora.textContent = `Hora: ${item.hora}`;
    inputHora.classList.add("hora");
    let inputSintomas = document.createElement("p");
    inputSintomas.textContent = `Síntomas: ${item.sintomas}`;
    inputSintomas.classList.add("sintomas");

    let editarButton = document.createElement("button");
    editarButton.classList.add("boton-editar");

    editarButton.textContent = "Editar";
    editarButton.addEventListener("click", () => {
      edita(item, index);
    });

    let estado = document.createElement("select");
    estado.id = "estado";
    estado.classList.add("botonc");
    let opciones = ["Abierta", "Cerrada", "Anulada"];
    opciones.forEach((opcion, index) => {
      let option = document.createElement("option");
      option.value = index;
      option.textContent = opcion;
      estado.appendChild(option);
    });

    estado.addEventListener("change", () => {
      let selectedValue = estado.value;

      switch (selectedValue) {
        case "0":
          citas.push(citasArray[index]);

          break;
        case "1":
          cerradas.push(citasArray[index]);

          break;
        case "2":
          anuladas.push(citasArray[index]);

          break;
      }
      borrar(index, filtro);
      console.log(filtro);
      console.log(index);
    });

    div.appendChild(img);
    div.appendChild(inputNombre);
    div.appendChild(inputTipo);
    div.appendChild(inputpropietario);
    div.appendChild(inputfecha);
    div.appendChild(inputTelefono);
    div.appendChild(inputHora);
    div.appendChild(inputSintomas);
    div.appendChild(editarButton);
    div.appendChild(estado);
    fragment.appendChild(div);
  });
  document.getElementById("contenedor_citas").appendChild(fragment);
}

function borrar(i, filtro) {
  index = i;

  switch (filtro) {
    case "citas":
      citas.splice(index, 1);
      break;
    case "cerradas":
      cerradas.splice(index, 1);
      break;
    case "anuladas":
      anuladas.splice(index, 1);
      break;
  }

  document.getElementById("contenedor_citas").innerHTML = "";
  pintar(filtro);
}

function validar() {
  const telefono = /^\d{10}$/;
  const fechaactual = new Date();
  const fechaingresada = new Date(
    `${document.getElementById("fecha").value} 23:00:00`
  );

  const hora_ingresada = new Date(
    `2023-01-01 ${document.getElementById("hora").value}`
  );
  const inicio_mañana = new Date(`2023-01-01 08:00`);
  const fin_mañana = new Date(`2023-01-01 11:30`);
  const inicio_tarde = new Date(`2023-01-01 14:00`);
  const fin_tarde = new Date(`2023-01-01 17:30`);

  if (document.getElementById("nombre").value == "") {
    document.getElementById("alert-content").textContent =
      " Debe ingresar un nombre para continuar";
    showAlert();
  } else if (document.getElementById("tipo").value == "Seleccione") {
    document.getElementById("alert-content").textContent =
      " Debe seleccionar un tipo para continuar";
    showAlert();
  } else if (document.getElementById("propietario").value == "") {
    document.getElementById("alert-content").textContent =
      " Debe ingresar nombre del propietario para continuar";
    showAlert();
  } else if (!telefono.test(document.getElementById("telefono").value)) {
    document.getElementById("alert-content").textContent =
      " Ingrese un numero de telefono valido";
    showAlert();
  } else if (fechaingresada < fechaactual) {
    document.getElementById("alert-content").textContent =
      " Debe ingresar una fecha valida";
    showAlert();
  } else if (
    !(
      (hora_ingresada >= inicio_mañana && hora_ingresada <= fin_mañana) ||
      (hora_ingresada >= inicio_tarde && hora_ingresada <= fin_tarde)
    )
  ) {
    document.getElementById("alert-content").textContent =
      "Debe ingresar una hora válida (entre 8:00am y 11:30am o entre 02:00pm y 05:30pm)";
    showAlert();
  } else if (document.getElementById("sintomas").value == "") {
    document.getElementById("alert-content").textContent =
      " Debe ingresar una descripcion de los sintomas para continuar";
    showAlert();
  } else {
    crear_cita();
    closeForm();
    document.getElementById("contenedor_citas").innerHTML = "";
    pintar("citas");
  }
}

function edita(r, i) {
  op = true;
  indice = i;
  console.log(r);
  document.getElementById("nombre").value = r.nombre;
  document.getElementById("tipo").value = r.tipo;
  document.getElementById("propietario").value = r.tipo_documento;
  document.getElementById("fecha").value = r.numero_documento;
  document.getElementById("telefono").value = r.telefono;
  document.getElementById("hora").value = r.hora;
  document.getElementById("sintomas").value = r.sintomas;
}
