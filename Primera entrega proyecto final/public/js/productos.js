const productosApi = {
    get: () => {
        return fetch('/api/productos')
            .then(data => data.json())
    },
    post: (nuevoProd) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProd)
        }
        return fetch('/api/productos', options)
    },
    put: (idProd, nuevoProd) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(nuevoProd),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return fetch(`/api/productos/${idProd}`, options)
    },
    delete: (idProd) => {
        const options = {
            method: 'DELETE'
        }
        return fetch(`/api/productos/${idProd}`, options)
    },
}

//-------------------------------------------------------------------
// productos

actualizarListaProductos()

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = leerProductoDelFormulario()
    productosApi.post(producto)
        .then(actualizarListaProductos)
        .then(() => {
            formAgregarProducto.reset()
        })
        .catch((err) => {
            alert(err.message)
        })
})

function leerProductoDelFormulario() {
    const producto = {
        producto: formAgregarProducto[0].value,
        descripcion: formAgregarProducto[1].value,
        codigo:formAgregarProducto[2].value,
        precio: formAgregarProducto[3].value,
        stock: formAgregarProducto[4].value,
        thumbnail: formAgregarProducto[5].value
    }
    return producto
}

function actualizarListaProductos() {
    return productosApi.get()
        .then(prods => makeHtmlTable(prods))
        .then(html => {
            document.getElementById('productos').innerHTML = html
        })
}

function borrarProducto(idProd) {
    productosApi.delete(idProd)
        .then(actualizarListaProductos)
}

function actualizarProducto(idProd) {
    const nuevoProd = leerProductoDelFormulario()
    productosApi.put(idProd, nuevoProd)
        .then(actualizarListaProductos)
}


function llenarFormulario(producto = '', descripcion = '', codigo = '', precio = '', stock = '', thumbnail = '') {
    formAgregarProducto[0].value = producto
    formAgregarProducto[1].value = descripcion
    formAgregarProducto[2].value = codigo
    formAgregarProducto[3].value = precio
    formAgregarProducto[4].value = stock
    formAgregarProducto[5].value = thumbnail
}

function makeHtmlTable(productos) {
    let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`

    if (productos.length > 0) {
        html += `
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Producto</th>
                    <th>Descripcion</th>
                    <th>Codigo</th>}
                    <th>Precio</th>
                    <th>Stock (un)</th>
                    <th>Foto</th>
                </tr>`
        for (const prod of productos) {
            html += `
                    <tr>
                        <td><a type="button" onclick="llenarFormulario('${prod.producto}','${prod.descripcion}','${prod.codigo}','${prod.precio}','${prod.stock}','${prod.thumbnail}')" title="copiar a formulario...">${prod.producto}</a></td>
                        <td>${prod.descripcion}</td>
                        <td>${prod.codigo}</td>
                        <td>$${prod.precio}</td>
                        <td>${prod.stock}</td>
                        <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                        <td><a type="button" onclick="borrarProducto('${prod.id}')">borrar</a></td>
                        <td><a type="button" onclick="actualizarProducto('${prod.id}')">actualizar</a></td>
                    </tr>`
        }
        html += `
            </table>
        </div >`
    }
    return Promise.resolve(html)
}
