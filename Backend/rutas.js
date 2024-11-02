var Soloadmin = function (request, response, next){
    if(request.session.rol == "1"){
        next()
    }
    else{
        response.json({state: false, mensaje: "Esta API es para uso exclusivo del administrador"})
    }
}

const { request, response } = require('express')


var usuariosController = require('./Api/controlador/usuariosController.js').usuariosController

//cualquier usuario
app.post('/usuarios/registro', function(request, response){
    usuariosController.registro(request, response)
})

// app.post('/usuarios/actualizarPerfil', function(request, response){
//     usuariosController.actualizar(request, response)
// })


// Guardar usuarios admin


app.post('/usuarios/guardar', Soloadmin, function(request, response){
    usuariosController.guardar(request, response)
})


//listar usuarios

app.post('/usuarios/listar', Soloadmin, function(request, response){
    usuariosController.listar(request, response)
})

//Activar

app.get('/activar/:email/:azar', function(request, response){
    usuariosController.Activar(request, response)
})

//ListarId

app.post('/usuarios/listarId', Soloadmin, function(request, response){
    usuariosController.listarId(request, response)
})

//Actualizar

app.post('/usuarios/actualizar', Soloadmin, function(request, response){
    usuariosController.Actualizar(request, response)
})

//Eliminar

app.post('/usuarios/eliminar', Soloadmin, function(request, response){
    usuariosController.eliminar(request, response)
})

//LOGIN

app.post('/usuarios/login', function(request, response){
    usuariosController.login(request, response)
})

//solicitar codigo de recuperacion de password

app.post('/usuarios/solicitarcodigo', function(request, response){
    usuariosController.solicitarcodigo(request, response)
})

//recuperarpass

app.post('/usuarios/recuperarpass', function(request, response){
    usuariosController.recuperarpass(request, response)
})

//status cookie

app.post('/status', function(request, response){
    response.json(request.session)
})

//logout

app.post('/logout', function(request, response){
    request.session.destroy()
    response.json({state:true, mensaje: "Se ha cerrado su sesion correctamente"})
})

//Exportar Exel

app.get('/usuarios/ExportarExel', function(request, response){
    usuariosController.ExportarExel(request, response)
})

//Exportar PDF

app.get('/usuarios/ExportarPDF', function(request, response){
    usuariosController.ExportarPDF(request, response)
})

// <------------------------------//Productos------------------------------------->

var productosController = require('./Api/controlador/productosController.js').productosController


// Guardar


app.post('/productos/guardar', function(request, response){
    productosController.guardar(request, response)
})


//listar

app.post('/productos/listar', function(request, response){
    productosController.listar(request, response)
})

//listar productos activos
app.post('/productos/listarProductosActivos', function(request, response){
    productosController.listarProductosActivos(request, response)
})

//ListarId

app.post('/productos/listarId', function(request, response){
    productosController.listarId(request, response)
})

//Actualizar

app.post('/productos/actualizar', function(request, response){
    productosController.actualizar(request, response)
})

//Eliminar

app.post('/productos/eliminar', function(request, response){
    productosController.eliminar(request, response)
})



// <------------------------------//Servicios------------------------------------->

var serviciosController = require('./Api/controlador/serviciosController.js').serviciosController


// Guardar


app.post('/servicios/guardar', function(request, response){
    serviciosController.guardar(request, response)
})


//listar

app.post('/servicios/listar', function(request, response){
    serviciosController.listar(request, response)
})

//ListarId

app.post('/servicios/listarId', function(request, response){
    serviciosController.listarId(request, response)
})

//Actualizar

app.post('/servicios/actualizar', function(request, response){
    serviciosController.actualizar(request, response)
})

//Eliminar

app.post('/servicios/eliminar', function(request, response){
    serviciosController.eliminar(request, response)
})





// <------------------------------ ANEXOS --------------------------->

var archivosController = require('./Api/controlador/archivosController.js').archivosController

app.post('/subirProductos/:nombre', function(request, response){
    archivosController.subirProductos(request, response)
})

app.post('/subirAvatar/:nombre', function(request, response){
    archivosController.subirAvatar(request, response)
})


// <------------------------------ Carrito --------------------------->


var carritoController = require('./Api/controlador/carritoController.js').carritoController


// Guardar


app.post('/carrito/guardar', function(request, response){
    carritoController.guardar(request, response)
})


//listar

app.post('/carrito/listar', function(request, response){
    carritoController.listar(request, response)
})

//ListarId

app.post('/carrito/listarId', function(request, response){
    carritoController.listarId(request, response)
})

//Actualizar

app.post('/carrito/actualizar', function(request, response){
    carritoController.actualizar(request, response)
})

//Eliminar

app.post('/carrito/eliminar', function(request, response){
    carritoController.eliminar(request, response)
})