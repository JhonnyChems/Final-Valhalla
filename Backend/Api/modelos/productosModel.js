var productosModel = {}

const mongoose = require('mongoose')

var Schema = mongoose.Schema

var productosSchema = new Schema({
    nombre: String,
    codigo: String,
    precio: Number,
    descripcion: String,
    imagen: String,
    estado: Number
}) 


const myModel = mongoose.model("productos", productosSchema)



productosModel.guardar = function (post, callback){

    const instancia = new myModel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo 
    instancia.precio = parseInt(post.precio)
    instancia.descripcion = post.descripcion
    instancia.estado = post.estado
    if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
        instancia.imagen = "assets/default.jpg"
    }
    else{
        instancia.imagen = post.imagen
    }



    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje: "Producto Guardado"})
    }).catch((error) => {
        return callback({state:false, mensaje: 'Se presento un error'})
    })
}


productosModel.ExisteCodigo = function (post, callback){
    myModel.findOne({codigo: post.codigo}, {}). then((respuesta) => {
        if(respuesta == null){
            return callback({existe: 'No'})
        }
        else{
            return callback({existe: 'Si'})
        }
    })
}


productosModel.listar = function (post, callback){

    myModel.find({},{}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) =>{
        return callback({state:false, datos:[], error:error, mensaje: 'Se presento un error al listar'})
    })


}

productosModel.listarProductosActivos = function (post, callback){

    myModel.find({estado: 1},{}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) =>{
        return callback({state:false, datos:[], error:error, mensaje: 'Se presento un error al listar'})
    })


}



productosModel.listarId = function (post, callback){

    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) =>{
        return callback({state:false, datos:[], error:error, mensaje: 'Se presento un error al listar'})
    })


}

productosModel.actualizar = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id}, 
        {
            nombre:post.nombre,
            precio: post.precio,
            descripcion: post.descripcion,
            imagen:post.imagen,
            estado:post.estado
        }).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Actualizado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Actualizar", error:error})
        })
}

productosModel.eliminar = function(post, callback){
    myModel.findOneAndDelete({_id:post._id}).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Eliminado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Eliminar", error:error})
        })
}

module.exports.productosModel = productosModel