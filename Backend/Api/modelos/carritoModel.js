var carritoModel = {}

const mongoose = require('mongoose')

var Schema = mongoose.Schema

var carritoSchema = new Schema({
    nombre: String,
    _idProducto:String,
    cantidad: Number,
    precio: Number,
    _idUsuario:String,
}) 


const myModel = mongoose.model("carrito", carritoSchema)



carritoModel.guardar = function (post, callback){

    const instancia = new myModel
    instancia.nombre = post.nombre
    instancia._idProducto = post._idProducto 
    instancia.cantidad = post.cantidad
    instancia.precio = post.precio
    instancia._idUsuario = post._idUsuario

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje: "Producto Guardado en el carrito"})
    }).catch((error) => {
        return callback({state:false, mensaje: 'Se presento un error en carrito'})
    })
}


carritoModel.ExisteCodigo = function (post, callback){
    myModel.findOne({_idProducto:post._idProducto, _idUsuario:post._idUsuario}, {}). then((respuesta) => {
        if(respuesta == null){
            return callback({existe: 'No'})
        }
        else{
            return callback({existe: 'Si'})
        }
    })
}


carritoModel.listar = function (post, callback){

    myModel.find({_idUsuario:post._idUsuario},{}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) =>{
        return callback({state:false, datos:[], error:error, mensaje: 'Se presento un error al listar'})
    })


}

carritoModel.listarId = function (post, callback){

    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) =>{
        return callback({state:false, datos:[], error:error, mensaje: 'Se presento un error al listar'})
    })


}

carritoModel.actualizar = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id, _idUsuario:post._idUsuario}, 
        {
            cantidad:post.cantidad
        }).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Actualizado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Actualizar", error:error})
        })
}

carritoModel.eliminar = function(post, callback){
    myModel.findOneAndDelete({_id:post._id, _idUsuario:post._idUsuario}, {}).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Eliminado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Eliminar", error:error})
        })
}

module.exports.carritoModel = carritoModel