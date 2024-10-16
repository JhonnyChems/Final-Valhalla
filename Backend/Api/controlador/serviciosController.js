var serviciosModel = require('../modelos/serviciosModel.js').serviciosModel
var serviciosController = {}




serviciosController.guardar = function (request, response){
    
    var post = {
        nombre: request.body.nombre,
        codigo: request.body.codigo,
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "El campo nombre es obligatorio"})
        return false
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje: "El campo codigo es obligatorio"})
        return false
    }

    serviciosModel.ExisteCodigo(post, function(res){
        if(res.existe == 'Si'){
            response.json({state: false, mensaje: 'Este codigo ya esta registrado'})
            return false
        }
        else{
            serviciosModel.guardar(post, function(respuesta){
                response.json(respuesta)
            })
        }
    })
    

}

serviciosController.listar = function (request, response){
    serviciosModel.listar(null, function(respuesta){
        response.json(respuesta)
    })
}

serviciosController.listarId = function (request, response){

    var post = {
        _id: request.body._id
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }
    serviciosModel.listarId(post, function(respuesta){
        response.json(respuesta)
    })  
}

serviciosController.actualizar = function (request, response) {
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "El campo nombre es obligatorio"})
        return false
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }

    serviciosModel.actualizar(post, function(respuesta){
        response.json(respuesta)
    })



}

serviciosController.eliminar = function (request, response) {
    var post = {
        _id: request.body._id,
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }

    serviciosModel.eliminar(post, function(respuesta){
        response.json(respuesta)
    })



}




module.exports.serviciosController = serviciosController