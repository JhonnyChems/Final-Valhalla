var productosModel = require('../modelos/productosModel.js').productosModel
var productosController = {}




productosController.guardar = function (request, response){
    
    var post = {
        nombre: request.body.nombre,
        codigo: request.body.codigo,
        precio:request.body.precio,
        descripcion: request.body.descripcion,
        imagen: request.body.imagen,
        tipo: request.body.tipo,
        estado:request.body.estado
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "El campo nombre es obligatorio"})
        return false
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje: "El campo codigo es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje: "El campo precio es obligatorio"})
        return false
    }

    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje: "El campo descripcion es obligatorio"})
        return false
    }

    if(post.tipo == undefined || post.tipo == null || post.tipo == ""){
        response.json({state:false, mensaje: "El campo tipo es obligatorio"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje: "El campo estado es obligatorio"})
        return false
    }

    productosModel.ExisteCodigo(post, function(res){
        if(res.existe == 'Si'){
            response.json({state: false, mensaje: 'Este codigo ya esta registrado'})
            return false
        }
        else{
            productosModel.guardar(post, function(respuesta){
                response.json(respuesta)
            })
        }
    })
    

}

productosController.listar = function (request, response){
    productosModel.listar(null, function(respuesta){
        response.json(respuesta)
    })
}

productosController.listarProductosActivos = function (request, response){
    productosModel.listarProductosActivos(null, function(respuesta){
        response.json(respuesta)
    })
}

productosController.listarId = function (request, response){

    var post = {
        _id: request.body._id
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }
    productosModel.listarId(post, function(respuesta){
        response.json(respuesta)
    })  
}

productosController.actualizar = function (request, response) {
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        precio: request.body.precio,
        descripcion: request.body.descripcion,
        imagen: request.body.imagen,
        estado: request.body.estado,
        tipo: request.body.tipo
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "El campo nombre es obligatorio"})
        return false
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje: "El campo precio es obligatorio"})
        return false
    }

    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje: "El campo descripcion es obligatorio"})
        return false
    }

    productosModel.actualizar(post, function(respuesta){
        response.json(respuesta)
    })



}

productosController.eliminar = function (request, response) {
    var post = {
        _id: request.body._id,
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }

    productosModel.eliminar(post, function(respuesta){
        response.json(respuesta)
    })



}




module.exports.productosController = productosController