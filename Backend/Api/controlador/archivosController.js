var archivosController = {}
var multer = require ('multer')


archivosController.subirProductos = function (request, response){

    var post = {
        nombre: request.params.nombre
    }


    var upload = multer ({
        storage: multer.diskStorage ({
            destination:(req,file, cb) => {
                cb(null, AppRoot + "/Productos" )
            },
            filename:(req, file, cb) => {
                cb(null, post.nombre + '.png')
            }
        })
    }).single("myFile")

    upload(request, response, function(error){
        if(error){
            console.log(error)
            response.json(error)
        }
        if (!request.file) {
            console.log("No se ha subido ningún archivo");
        }
        else{
            response.json({state:true})
        }
    })
}

//Avatar

archivosController.subirAvatar = function (request, response){

    var post = {
        nombre: request.params.nombre
    }


    var upload = multer ({
        storage: multer.diskStorage ({
            destination:(req,file, cb) => {
                cb(null, AppRoot + "/Avatar" )
            },
            filename:(req, file, cb) => {
                cb(null, post.nombre + '.png')
            }
        })
    }).single("myFile")

    upload(request, response, function(error){
        if(error){
            console.log(error)
            response.json(error)
        }
        if (!request.file) {
            console.log("No se ha subido ningún archivo");
        }
        else{
            response.json({state:true})
        }
    })
}


module.exports.archivosController = archivosController 