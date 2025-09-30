document.addEventListener('DOMContentLoaded', function() {
    const formularioReserva = document.getElementById('formulario-reserva');
    if (formularioReserva) {
        formularioReserva.addEventListener('submit', function(evento) {
            evento.preventDefault();
            const nombreCompleto = document.getElementById('nombre-completo');
            const dni = document.getElementById('dni');
            const especialidad = document.getElementById('especialidad');
            const fechaCita = document.getElementById('fecha-cita');
            const horaCita = document.getElementById('hora-cita');    
            let formularioValido = true;   
            if (!nombreCompleto.value.trim()) {
                nombreCompleto.classList.add('is-invalid');
                formularioValido = false;
            } else {
                nombreCompleto.classList.remove('is-invalid');
            }
            if (!dni.value.trim()) {
                dni.classList.add('is-invalid');
                formularioValido = false;
            } else {
                dni.classList.remove('is-invalid');
            }
            if (!especialidad.value) {
                especialidad.classList.add('is-invalid');
                formularioValido = false;
            } else {
                especialidad.classList.remove('is-invalid');
            }
            if (!fechaCita.value) {
                fechaCita.classList.add('is-invalid');
                formularioValido = false;
            } else {
                fechaCita.classList.remove('is-invalid');
            }
            if (!horaCita.value) {
                horaCita.classList.add('is-invalid');
                formularioValido = false;
            } else {
                horaCita.classList.remove('is-invalid');
            }
            if (formularioValido) {
                procesarReserva();
            }
        });
    }
});
function procesarReserva() {
    const nombre = document.getElementById('nombre-completo').value;
    const dni = document.getElementById('dni').value;
    const especialidad = document.getElementById('especialidad').value;
    const fecha = document.getElementById('fecha-cita').value;
    const hora = document.getElementById('hora-cita').value;
    const selectEspecialidad = document.getElementById('especialidad');
    const textoEspecialidad = selectEspecialidad.options[selectEspecialidad.selectedIndex].text;
    const cita = {
        id: Date.now(), 
        nombre: nombre,
        dni: dni,
        especialidad: textoEspecialidad,
        fecha: fecha,
        hora: hora
    };
    guardarCita(cita);
    mostrarConfirmacion(cita);
    document.getElementById('formulario-reserva').reset();
}
function guardarCita(cita) {
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(citas));
}
function mostrarConfirmacion(cita) {
    document.getElementById('formulario-reserva').closest('section').classList.add('d-none');
    const confirmacion = document.getElementById('confirmacion-reserva');
    confirmacion.classList.remove('d-none');
    document.getElementById('resumen-nombre').textContent = cita.nombre;
    document.getElementById('resumen-dni').textContent = cita.dni;
    document.getElementById('resumen-especialidad').textContent = cita.especialidad;
    document.getElementById('resumen-fecha').textContent = formatearFecha(cita.fecha);
    document.getElementById('resumen-hora').textContent = cita.hora;
}
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}