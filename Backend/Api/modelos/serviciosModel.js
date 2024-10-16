var serviciosModel = {}

const mongoose = require('mongoose')

var Schema = mongoose.Schema

var serviciosSchema = new Schema({
    nombre: String,
    codigo: String,
    precio: String,
}) 


const myModel = mongoose.model("servicios", serviciosSchema)



serviciosModel.guardar = function (post, callback){

    const instancia = new myModel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo 
    instancia.precio = post.precio

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje: "Producto Guardado"})
    }).catch((error) => {
        return callback({state:false, mensaje: 'Se presento un error'})
    })
}


serviciosModel.ExisteCodigo = function (post, callback){
    myModel.findOne({codigo: post.codigo}, {}). then((respuesta) => {
        if(respuesta == null){
            return callback({existe: 'No'})
        }
        else{
            return callback({existe: 'Si'})
        }
    })
}


serviciosModel.listar = function (post, callback){

    myModel.find({},{}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) =>{
        return callback({state:false, datos:[], error:error, mensaje: 'Se presento un error al listar'})
    })


}

serviciosModel.listarId = function (post, callback){

    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) =>{
        return callback({state:false, datos:[], error:error, mensaje: 'Se presento un error al listar'})
    })


}

serviciosModel.actualizar = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id}, 
        {
            nombre:post.nombre
        }).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Actualizado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Actualizar", error:error})
        })
}

serviciosModel.eliminar = function(post, callback){
    myModel.findOneAndDelete({_id:post._id}).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Eliminado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Eliminar", error:error})
        })
}

module.exports.serviciosModel = serviciosModel