var bdusuarios = []

var usuariosModel = {}

const mongoose = require('mongoose')

var Schema = mongoose.Schema

var usuariosSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    fechalogin: Date,
    errorlogin: Number,
    azar:String,
    estado:String,
    codepass: String,
    ultlogin: Date,
    rol: String,
}) 


const myModel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.actualizarErrores = function(post, callback){
    myModel.findOneAndUpdate({email: post.email}, 
        {
            errorlogin: post.cantidad,
            fechalogin: new Date()

        }).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Actualizado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Actualizar", error:error})
        })
}


usuariosModel.Registrar = function (post, callback){

    const instancia = new myModel
    instancia.nombre = post.nombre
    instancia.email = post.email 
    instancia.password = post.password
    instancia.fechalogin = new Date()
    instancia.errorlogin = 0;
    instancia.estado = "0"
    instancia.azar = post.azar
    instancia.rol = "3"

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje: "Usuario Guardado"})
    }).catch((error) => {
        return callback({state:false, mensaje: 'Se presento un error'})
    })

    // bdusuarios.push(post)
    // return callback({state:true, mensaje: "Usuario Guardado"})
}

usuariosModel.ValidaLogin = function (post, callback){
    myModel.findOne({email:post.email}, {fechalogin:1, errorlogin:1}). then((respuesta) => {
        return callback (respuesta)
    }).catch((error) => {
        return callback (error)
    })

}

usuariosModel.guardar = function (post, callback){

    const instancia = new myModel
    instancia.nombre = post.nombre
    instancia.email = post.email 
    instancia.password = post.password
    instancia.estado = "1"
    instancia.rol = post.rol // 1 admin 2 facturador 3 cliente

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje: "Usuario Guardado"})
    }).catch((error) => {
        return callback({state:false, mensaje: 'Se presento un error'})
    })

    // bdusuarios.push(post)
    // return callback({state:true, mensaje: "Usuario Guardado"})
}


usuariosModel.ExisteEmail = function (post, callback){
    myModel.findOne({email: post.email}, {}). then((respuesta) => {
        if(respuesta == null){
            return callback({existe: 'No'})
        }
        else{
            return callback({existe: 'Si'})
        }
    })



    // var position = bdusuarios.findIndex((item) => item.email == post.email)
    // if(position >= 0){
    //     return callback({existe:'Si'})
    // }
    // else{
    //     return callback({existe: 'No'})
    // }
}

usuariosModel.login = function(post, callback){
    myModel.find({email:post.email, password:post.password, estado: "1"},{}).then((respuesta) => {
        if(respuesta.length == 1){
            return callback({state: true, mensaje: "Bienvenido: " + respuesta[0].nombre, data:respuesta})
        }
        else{
            return callback({state: false, mensaje: "Credenciales invalidas o cuenta Sin Activar"})
        }
    }).catch((error) => {
        return callback({state: false, datos:[], error:error, mensaje: "Se presento un error al loguear"})
    })
}


usuariosModel.listar = function (post, callback){

    myModel.find({},{password:0  }).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) =>{
        return callback({state:false, datos:[], error:error, mensaje: 'Se presento un error al listar'})
    })


}

usuariosModel.listarId = function (post, callback){

    myModel.find({_id:post._id},{password:0  }).then((respuesta) => {
        return callback({state:true, datos:respuesta})
    }).catch((error) =>{
        return callback({state:false, datos:[], error:error, mensaje: 'Se presento un error al listar'})
    })


}

usuariosModel.Actualizar = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id}, 
        {
            nombre:post.nombre,
            rol: post.rol,
            estado: post.estado
            
        }).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Actualizado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Actualizar", error:error})
        })
}

usuariosModel.actualizarFechalogin = function(post, callback){
    myModel.findOneAndUpdate({email: post.email, password: post.password}, 
        {
            ultlogin:new Date()
            
        }).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Actualizado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Actualizar", error:error})
        })
}

usuariosModel.GuardarCodigoRecuperacion = function (post, callback){
    myModel.findOneAndUpdate({email: post.email}, 
        {
            codepass:post.codigo
        }).then((respuesta) =>{
            return callback({state:true, mesnaje: "Hemos enviado un correo, por favor verifica tu email"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Enviar el codigo, por favor intente nuevamente", error:error})
        })
}

usuariosModel.recuperarpass = function(post, callback){
    myModel.findOneAndUpdate({email:post.email, codepass:post.codigo}, 
        {
            password: post.password

        }).then((respuesta) =>{
            console.log(respuesta)
            if(respuesta == null){
                return callback({state:false, error:error})
            }
            else{
                return callback({state:true})
            }
            
        }).catch((error) => {
            return callback({state:false, error: error})
        })
}

usuariosModel.Activar = function(post, callback){
    myModel.findOneAndUpdate({email: post.email, azar: post.azar}, 
        {
            estado: "1"
        }).then((respuesta) =>{
            console.log("------------------------")
            console.log(respuesta)
            if(respuesta == null){
                return callback({state: false, mensaje: "Su email no es valido para activar la cuenta"})
            }
            else{
                return callback ({state:true, mensaje: "Su cuenta ha sido activada"})
            }
        }).catch((error) => {
            // return callback({state:false, mesnaje: "Error al Actualizar", error:error})
        })
}


usuariosModel.eliminar = function(post, callback){
    myModel.findOneAndDelete({_id:post._id}).then((respuesta) =>{
            return callback({state:true, mesnaje: "Elemento Eliminado"})
        }).catch((error) => {
            return callback({state:false, mesnaje: "Error al Eliminar", error:error})
        })
}




module.exports.usuariosModel = usuariosModel