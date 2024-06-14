let id = 0;

document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });
    if (document.querySelectorAll('.is-invalid').length === 0) {
        const musica = {
            nombreCompleto: document.getElementById('nombreCompleto').value.trim(),
            mail: document.getElementById('mail').value.trim(),
            bandaArtista: document.getElementById('bandaArtista').value.trim(),
            cancion: document.getElementById('cancion').value.trim(),
            album: document.getElementById('album').value.trim(),
            fechaLanzamiento: document.getElementById('fechaLanzamiento').value
        };
        if (document.getElementById('btnGuardar').value === 'Guardar') {
            agregarFila(musica);
        } else {
            actualizarFila(id, musica);
            id = 0;
            document.getElementById('btnGuardar').value = 'Guardar';
        }
        limpiar();
    }
});

const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');
    if (input.value.trim() === '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
        if (id === 'fechaLanzamiento') {
            if (validarFecha(input.value) < 1) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">La fecha no puede ser futura</span>';
            }
        }
        if (id === 'mail') {
            if (!validaEmail(input.value)) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>';
            }
        }
    }
}

const limpiar = () => {
    document.querySelector('form').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        document.getElementById('e-' + item.name).innerHTML = '';
    });
}

const soloNumero = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true;
    return false;
}

const validarFecha = (fecha) => {
    const hoy = new Date();
    fecha = new Date(fecha);
    const resta = hoy - fecha;
    const dia = (resta / (1000 * 60 * 60 * 24));
    return dia.toFixed(0);
}

const validaEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return formato.test(email);
}

const agregarFila = (musica) => {
    const tabla = document.getElementById('contenido');
    const fila = tabla.insertRow();
    fila.insertCell(0).textContent = musica.nombreCompleto;
    fila.insertCell(1).textContent = musica.mail;
    fila.insertCell(2).textContent = musica.bandaArtista;
    fila.insertCell(3).textContent = musica.cancion;
    fila.insertCell(4).textContent = musica.album;
    fila.insertCell(5).textContent = musica.fechaLanzamiento;
    const acciones = fila.insertCell(6);
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn btn-warning btn-sm';
    btnEditar.onclick = () => {
        cargarDatos(fila.rowIndex, musica);
    };
    acciones.appendChild(btnEditar);
}

const actualizarFila = (indice, musica) => {
    const tabla = document.getElementById('contenido');
    const fila = tabla.rows[indice];
    fila.cells[0].textContent = musica.nombreCompleto;
    fila.cells[1].textContent = musica.mail;
    fila.cells[2].textContent = musica.bandaArtista;
    fila.cells[3].textContent = musica.cancion;
    fila.cells[4].textContent = musica.album;
    fila.cells[5].textContent = musica.fechaLanzamiento;
}

const cargarDatos = (indice, musica) => {
    document.getElementById('nombreCompleto').value = musica.nombreCompleto;
    document.getElementById('mail').value = musica.mail;
    document.getElementById('bandaArtista').value = musica.bandaArtista;
    document.getElementById('cancion').value = musica.cancion;
    document.getElementById('album').value = musica.album;
    document.getElementById('fechaLanzamiento').value = musica.fechaLanzamiento;
    document.getElementById('btnGuardar').value = 'Actualizar';
    id = indice;
}