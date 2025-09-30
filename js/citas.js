document.addEventListener('DOMContentLoaded', function() {
    cargarCitas();
});
function cargarCitas() {
    const cuerpoTabla = document.getElementById('cuerpo-tabla-citas');
    const sinCitas = document.getElementById('sin-citas');
    const tablaCitas = document.getElementById('tabla-citas');
    if (!cuerpoTabla) return;
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    cuerpoTabla.innerHTML = '';
    if (citas.length === 0) {
        sinCitas.classList.remove('d-none');
        tablaCitas.classList.add('d-none');
    } else {
        sinCitas.classList.add('d-none');
        tablaCitas.classList.remove('d-none');
        citas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        citas.forEach(cita => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${cita.nombre}</td>
                <td>${cita.dni}</td>
                <td>${cita.especialidad}</td>
                <td>${formatearFecha(cita.fecha)}</td>
                <td>${cita.hora}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarCita(${cita.id})">
                        Cancelar
                    </button>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    }
}
function eliminarCita(id) {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
        let citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas = citas.filter(cita => cita.id !== id);
        localStorage.setItem('citas', JSON.stringify(citas));
        cargarCitas();
        mostrarAlerta('Cita cancelada exitosamente', 'success');
    }
}
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    alerta.style.top = '20px';
    alerta.style.right = '20px';
    alerta.style.zIndex = '1050';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alerta);
    
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.remove();
        }
    }, 5000);
}
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}