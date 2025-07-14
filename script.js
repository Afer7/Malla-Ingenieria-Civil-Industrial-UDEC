
const ramos = [
  { codigo: "520145", nombre: "INTRODUCCIÓN A LA MATEMÁTICA UNIVERSITARIA", semestre: 1, creditos: 6, prerrequisitos: [] },
  { codigo: "530023", nombre: "INTRODUCCIÓN A LA QUÍMICA UNIVERSITARIA", semestre: 1, creditos: 3, prerrequisitos: [] },
  { codigo: "510145", nombre: "INTRODUCCIÓN A LA FÍSICA UNIVERSITARIA", semestre: 1, creditos: 3, prerrequisitos: [] },
  { codigo: "546498", nombre: "LIDERAZGO Y COMUNICACIÓN", semestre: 1, creditos: 2, prerrequisitos: [] },
  { codigo: "525147", nombre: "ÁLGEBRA I", semestre: 1, creditos: 3, prerrequisitos: [] },
  { codigo: "427147", nombre: "CÁLCULO I", semestre: 1, creditos: 3, prerrequisitos: [] },
  { codigo: "510147", nombre: "FÍSICA I", semestre: 1, creditos: 3, prerrequisitos: [] },
  { codigo: "530024", nombre: "QUÍMICA GENERAL I", semestre: 1, creditos: 3, prerrequisitos: [] },
  { codigo: "525148", nombre: "ÁLGEBRA II", semestre: 2, creditos: 3, prerrequisitos: ["525147"] },
  { codigo: "527148", nombre: "CÁLCULO II", semestre: 2, creditos: 3, prerrequisitos: ["427147"] },
  { codigo: "510148", nombre: "FÍSICA II", semestre: 2, creditos: 3, prerrequisitos: ["510147"] },
  { codigo: "530025", nombre: "QUÍMICA GENERAL II", semestre: 2, creditos: 3, prerrequisitos: ["530024"] },
  { codigo: "525223", nombre: "ECUACIONES DIFERENCIALES", semestre: 3, creditos: 4, prerrequisitos: ["525148", "527148"] },
  { codigo: "523219", nombre: "ESTADÍSTICA", semestre: 3, creditos: 4, prerrequisitos: ["525147", "527148"] },
];

const malla = document.getElementById("malla");
let aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));

function actualizarColores() {
  document.querySelectorAll(".ramo").forEach(div => {
    const codigo = div.dataset.codigo;
    const ramo = ramos.find(r => r.codigo === codigo);
    const cumplePrerreq = ramo.prerrequisitos.every(p => aprobados.has(p));

    if (aprobados.has(codigo)) {
      div.style.backgroundColor = "#a7dbe6"; // celeste más fuerte: aprobado
    } else if (cumplePrerreq && ramo.prerrequisitos.length > 0) {
      div.style.backgroundColor = "#dff6fb"; // celeste más claro: habilitado
    } else {
      div.style.backgroundColor = "#f5f5dc"; // beige: por defecto
    }
  });
}

// Crear columnas por semestre
for (let i = 1; i <= 11; i++) {
  const col = document.createElement("div");
  col.className = "semestre";
  col.innerHTML = `<h2>Semestre ${i}</h2>`;
  col.id = `sem-${i}`;
  malla.appendChild(col);
}

// Insertar ramos en cada columna
ramos.forEach(ramo => {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = `${ramo.nombre}\n(${ramo.creditos} créditos)`;
  div.title = `Prerrequisitos: ${ramo.prerrequisitos.join(", ") || "Ninguno"}`;
  div.dataset.codigo = ramo.codigo;

  div.addEventListener("click", () => {
    if (aprobados.has(ramo.codigo)) {
      aprobados.delete(ramo.codigo);
    } else {
      aprobados.add(ramo.codigo);
    }
    actualizarColores();
    localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
  });

  document.getElementById(`sem-${ramo.semestre}`).appendChild(div);
});

actualizarColores();
