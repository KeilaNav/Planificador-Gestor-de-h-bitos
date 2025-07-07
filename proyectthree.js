// -------------------
// Registro y Login
// -------------------

function iniciarRegistroLogin() {
  const registroSection = document.getElementById('registroSection');
  const loginSection = document.getElementById('loginSection');

  const registroForm = document.getElementById('registroForm');
  const loginForm = document.getElementById('loginForm');

  const mensajeRegistro = document.getElementById('mensajeRegistro');
  const mensajeLogin = document.getElementById('mensajeLogin');

  const btnMostrarLogin = document.getElementById('btnMostrarLogin');
  const btnMostrarRegistro = document.getElementById('btnMostrarRegistro');

  btnMostrarLogin.addEventListener('click', () => {
    registroSection.style.display = 'none';
    registroSection.setAttribute('aria-hidden', 'true');
    loginSection.style.display = 'block';
    loginSection.setAttribute('aria-hidden', 'false');
    mensajeRegistro.textContent = '';
    mensajeLogin.textContent = '';
  });

  btnMostrarRegistro.addEventListener('click', () => {
    loginSection.style.display = 'none';
    loginSection.setAttribute('aria-hidden', 'true');
    registroSection.style.display = 'block';
    registroSection.setAttribute('aria-hidden', 'false');
    mensajeRegistro.textContent = '';
    mensajeLogin.textContent = '';
  });

  registroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    mensajeRegistro.textContent = '';

    const nombre = document.getElementById('nombre').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value;

    if (nombre.length < 3) {
      mensajeRegistro.textContent = 'El nombre debe tener al menos 3 caracteres.';
      return;
    }
    if (usuario.length < 3) {
      mensajeRegistro.textContent = 'El usuario debe tener al menos 3 caracteres.';
      return;
    }
    if (contrasena.length < 6) {
      mensajeRegistro.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    const perfil = { nombre, usuario, contrasena };
    localStorage.setItem('perfilGuardado', JSON.stringify(perfil));
    mensajeRegistro.style.color = 'green';
    mensajeRegistro.textContent = '✅ Perfil creado correctamente. Ahora podés iniciar sesión.';
    registroForm.reset();

    setTimeout(() => {
      btnMostrarLogin.click();
      mensajeRegistro.style.color = 'red';
      mensajeRegistro.textContent = '';
    }, 1500);
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    mensajeLogin.textContent = '';

    const usuario = document.getElementById('loginUsuario').value.trim();
    const contrasena = document.getElementById('loginContrasena').value;

    const perfilGuardado = JSON.parse(localStorage.getItem('perfilGuardado'));

    if (!perfilGuardado) {
      mensajeLogin.textContent = 'No hay perfiles registrados. Por favor, creá uno.';
      return;
    }

    if (usuario === perfilGuardado.usuario && contrasena === perfilGuardado.contrasena) {
      sessionStorage.setItem('usuarioActivo', JSON.stringify(perfilGuardado));
      mostrarSecciones(perfilGuardado.nombre);
    } else {
      mensajeLogin.textContent = '❌ Usuario o contraseña incorrectos.';
    }
  });
}

iniciarRegistroLogin();

// -------------------
// Mostrar Secciones
// -------------------

function mostrarSecciones(nombre) {
  const perfilGuardado = JSON.parse(localStorage.getItem("perfilGuardado"));
  document.getElementById("nombreUsuario").textContent = nombre;
  mostrarPerfil(perfilGuardado);
  document.getElementById("loginSection").classList.add("oculto");
  document.getElementById("perfilSection").classList.remove("oculto");
  document.getElementById("planificadorSection").classList.remove("oculto");
  document.getElementById("habitosSection").classList.remove("oculto");
  document.getElementById("objetivosSection").classList.remove("oculto");
  document.getElementById("notasSection").classList.remove("oculto");

}

window.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

  if (usuarioActivo) {
    document.getElementById("registroSection").classList.add("oculto");
    document.getElementById("loginSection").classList.add("oculto");
    mostrarSecciones(usuarioActivo.nombre);
  } else {
    document.getElementById("registroSection").classList.remove("oculto");
    document.getElementById("loginSection").style.display = "none";
  }
});

const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo"))?.usuario || "default";
const claveTareas = `tareas_${usuario}`;
const claveHabitos = `habitos_${usuario}`;
const claveObjetivos = `objetivos_${usuario}`;
const claveNotas = `notas_${usuario}`;



document.getElementById("cerrarSesion").addEventListener("click", () => {
  sessionStorage.clear();
  location.reload();
});

// -------------------
// Perfil editable
// -------------------

const btnEditarPerfil = document.getElementById("btnEditarPerfil");
const formEditarPerfil = document.getElementById("formEditarPerfil");

const inputEdad = document.getElementById("inputEdad");
const inputPeso = document.getElementById("inputPeso");
const inputAltura = document.getElementById("inputAltura");
const inputHabitos = document.getElementById("inputHabitos");

btnEditarPerfil.addEventListener("click", () => {
  formEditarPerfil.classList.toggle("oculto");
});

formEditarPerfil.addEventListener("submit", (e) => {
  e.preventDefault();

  const archivo = document.getElementById("inputImagen").files[0];

if (archivo) {
  const reader = new FileReader();
  reader.onloadend = () => {
    nuevoPerfil.imagen = reader.result;
    guardarPerfil(nuevoPerfil);
  };
  reader.readAsDataURL(archivo);
} else {
  guardarPerfil(nuevoPerfil);
}
function guardarPerfil(perfil) {
  localStorage.setItem("perfilGuardado", JSON.stringify(perfil));
  sessionStorage.setItem("usuarioActivo", JSON.stringify(perfil));
  mostrarPerfil(perfil);
  formEditarPerfil.classList.add("oculto");
}


  const perfilGuardado = JSON.parse(localStorage.getItem("perfilGuardado"));

  const edad = inputEdad.value.trim();
  const peso = inputPeso.value.trim();
  const altura = inputAltura.value.trim();
  const habitosFav = inputHabitos.value.trim();

  const nuevoPerfil = {
    ...perfilGuardado,
    edad,
    peso,
    altura,
    habitosFav
  };

  localStorage.setItem("perfilGuardado", JSON.stringify(nuevoPerfil));
  sessionStorage.setItem("usuarioActivo", JSON.stringify(nuevoPerfil));
  mostrarPerfil(nuevoPerfil);
  formEditarPerfil.classList.add("oculto");
});

function mostrarPerfil(perfil) {
  document.getElementById("perfilNombre").textContent = perfil.nombre;
  document.getElementById("perfilEdad").textContent = perfil.edad || "-";
  document.getElementById("perfilPeso").textContent = perfil.peso || "-";
  document.getElementById("perfilAltura").textContent = perfil.altura || "-";
  document.getElementById("perfilHabitos").textContent = perfil.habitosFav || "-";
  const img = document.getElementById("imagenPerfil");
if (perfil.imagen) {
  img.src = perfil.imagen;
  img.style.display = "block";
} else {
  img.src = "";
  img.style.display = "none";
}

}

// -------------------
// Planificador Diario
// -------------------


const horaTarea = document.getElementById("horaTarea");
const descripcionTarea = document.getElementById("descripcionTarea");
const agregarTarea = document.getElementById("agregarTarea");
const listaTareas = document.getElementById("listaTareas");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

agregarTarea.addEventListener("click", () => {
  const hora = horaTarea.value;
  const desc = descripcionTarea.value.trim();
  if (desc) {
    const nueva = { hora, desc };
    tareas.push(nueva);
    guardarTareas();
    renderTareas();
    descripcionTarea.value = "";
  }
});

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function renderTareas() {
  listaTareas.innerHTML = "";
  tareas.forEach((t, i) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    

    const texto = document.createElement("span");
    texto.textContent = `${t.hora}:00 - ${t.desc}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑️";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.background = "transparent";
    btnEliminar.style.border = "none";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.style.fontSize = "1.1em";
    btnEliminar.title = "Eliminar tarea";
    btnEliminar.addEventListener("click", () => {
      tareas.splice(i, 1);
      guardarTareas();
      renderTareas();
    });

    li.appendChild(texto);
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
  });
}

renderTareas();

// -------------------
// Objetivos
// -------------------
const nuevoObjetivo = document.getElementById("nuevoObjetivo");
const agregarObjetivo = document.getElementById("agregarObjetivo");
const listaObjetivos = document.getElementById("listaObjetivos");

let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];

agregarObjetivo.addEventListener("click", () => {
  const obj = nuevoObjetivo.value.trim();
  if (obj) {
    objetivos.push(obj);
    guardarObjetivos();
    renderObjetivos();
    nuevoObjetivo.value = "";
  }
});

function guardarObjetivos() {
  localStorage.setItem("objetivos", JSON.stringify(objetivos));
}

function renderObjetivos() {
  listaObjetivos.innerHTML = "";
  objetivos.forEach((o, i) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    const texto = document.createElement("span");
    texto.textContent = o;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑️";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.background = "transparent";
    btnEliminar.style.border = "none";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.style.fontSize = "1.1em";
    btnEliminar.title = "Eliminar objetivo";

    btnEliminar.addEventListener("click", () => {
      objetivos.splice(i, 1);
      guardarObjetivos();
      renderObjetivos();
    });

    li.appendChild(texto);
    li.appendChild(btnEliminar);
    listaObjetivos.appendChild(li);
  });
}

renderObjetivos();

// -------------------
// Notas
// -------------------
const notaTexto = document.getElementById("nuevaNota");
const guardarNota = document.getElementById("guardarNota");
const listaNotas = document.getElementById("listaNotas");

let notas = JSON.parse(localStorage.getItem("notas")) || [];

guardarNota.addEventListener("click", () => {
  const nota = nuevaNota.value.trim();
  if (nota) {
    notas.push(nota);
    guardarNotas();
    renderNotas();
    notaTexto.value = "";
  }
});

function guardarNotas() {
  localStorage.setItem("notas", JSON.stringify(notas));
}

function renderNotas() {
  listaNotas.innerHTML = "";
  notas.forEach((n, i) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    const texto = document.createElement("span");
    texto.textContent = n;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑️";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.background = "transparent";
    btnEliminar.style.border = "none";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.style.fontSize = "1.1em";
    btnEliminar.title = "Eliminar nota";

    btnEliminar.addEventListener("click", () => {
      notas.splice(i, 1);
      guardarNotas();
      renderNotas();
    });

    li.appendChild(texto);
    li.appendChild(btnEliminar);
    listaNotas.appendChild(li);
  });
}

renderNotas();


// -------------------
// Gestor de Hábitos
// -------------------

const nuevoHabito = document.getElementById("nuevoHabito");
const agregarHabito = document.getElementById("agregarHabito");
const listaHabitos = document.getElementById("listaHabitos");

let habitos = JSON.parse(localStorage.getItem("habitos")) || {};

agregarHabito.addEventListener("click", () => {
  const nombre = nuevoHabito.value.trim();

  if (nombre && !habitos[nombre]) {
    habitos[nombre] = [];
    guardarHabitos();
    renderHabitos();
  }

  // Limpiar y enfocar el input
  nuevoHabito.value = "";
  nuevoHabito.focus();
});

function guardarHabitos() {
  localStorage.setItem("habitos", JSON.stringify(habitos));
}

function renderHabitos() {
  listaHabitos.innerHTML = "";

  Object.keys(habitos).forEach((habito) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    const texto = document.createElement("span");
    texto.textContent = habito;

    const acciones = document.createElement("div");
    acciones.style.display = "flex";
    acciones.style.alignItems = "center";
    acciones.style.gap = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habitos[habito].includes(fechaHoy());

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        habitos[habito].push(fechaHoy());
      } else {
        habitos[habito] = habitos[habito].filter(d => d !== fechaHoy());
      }
      guardarHabitos();
      actualizarGrafico();
    });

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑️";
    btnEliminar.title = "Eliminar hábito";
    btnEliminar.style.border = "none";
    btnEliminar.style.background = "transparent";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.style.fontSize = "1.1em";

    btnEliminar.addEventListener("click", () => {
      delete habitos[habito];
      guardarHabitos();
      renderHabitos();
    });

    acciones.appendChild(checkbox);
    acciones.appendChild(btnEliminar);

    li.appendChild(texto);
    li.appendChild(acciones);
    listaHabitos.appendChild(li);
  });

  actualizarGrafico();
}

function fechaHoy() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

renderHabitos();




