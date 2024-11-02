var carritoModel = require('../modelos/carritoModel.js').carritoModel
var carritoController = {}

// nombre: String,
//     _idProducto:String,
//     cantidad: String,
//     precio: String,
//     _idUsuario:String,


carritoController.guardar = function (request, response){
    
    console.log(request.body);


    var post = {
        nombre: request.body.nombre,
        _idProducto: request.body._idProducto,
        cantidad: request.body.cantidad,
        precio: request.body.precio,
        _idUsuario: request.session._id,
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "El campo nombre es obligatorio"})
        return false
    }

    if(post._idProducto == undefined || post._idProducto == null || post._idProducto == ""){
        response.json({state:false, mensaje: "El campo _idProducto es obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje: "El campo cantidad es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje: "El campo precio es obligatorio"})
        return false
    }

    carritoModel.ExisteCodigo(post, function(res){
        if(res.existe == 'Si'){
            response.json({state: false, mensaje: 'Este producto ya existe en tu carrito de compras, por favor actualice la cantidad'})
            return false
        }
        else{
            carritoModel.guardar(post, function(respuesta){
                response.json(respuesta)
            })
        }
    })
    

}

carritoController.listar = function (request, response){

    var post = {
        _idUsuario: request.session._id,
    }

    if(post._idUsuario == undefined || post._idUsuario == null || post._idUsuario == ""){
        response.json({state:false, mensaje: "El campo _idUsuario es obligatorio"})
        return false
    }

    carritoModel.listar(post, function(respuesta){
        response.json(respuesta)
    })
}

carritoController.listarId = function (request, response){

    var post = {
        _id: request.body._id
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }
    carritoModel.listarId(post, function(respuesta){
        response.json(respuesta)
    })  
}

carritoController.actualizar = function (request, response) {
    var post = {
        _id: request.body._id,
        cantidad: request.body.cantidad,
        _idUsuario: request.session._id,
    }


    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }

    carritoModel.actualizar(post, function(respuesta){
        response.json(respuesta)
    })



}

carritoController.eliminar = function (request, response) {
    var post = {
        _id: request.body._id,
        _idUsuario:request.session._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }

    carritoModel.eliminar(post, function(respuesta){
        response.json(respuesta)
    })



}




module.exports.carritoController = carritoController