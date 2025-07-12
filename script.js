document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  function actualizarEstado() {
    const completados = Array.from(ramos)
      .filter(r => r.classList.contains("completado"))
      .map(r => r.dataset.nombre);

    ramos.forEach(ramo => {
      const prereqs = ramo.dataset.prerrequisitos
        .split(",")
        .map(p => p.trim())
        .filter(p => p);

      const habilitado = prereqs.every(pr => completados.includes(pr));

      if (!ramo.classList.contains("completado") && prereqs.length && !habilitado) {
        ramo.classList.add("bloqueado");
      } else {
        ramo.classList.remove("bloqueado");
      }
    });
  }

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("bloqueado")) {
        ramo.classList.toggle("completado");
        actualizarEstado();
      }
    });
  });

  actualizarEstado();
});

function resetMalla() {
  document.querySelectorAll(".ramo").forEach(ramo => {
    ramo.classList.remove("completado", "bloqueado");
  });
  location.reload();
}
