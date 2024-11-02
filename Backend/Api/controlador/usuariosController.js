var usuariosModel = require('../modelos/usuariosModel.js').usuariosModel
var nodemailer = require ('nodemailer')
const { config } = require('../../config.js')
var usuariosController = {}

function tiempoTranscurrido(fechaTexto) {
    // Convertir la fecha en texto a un objeto Date
    const fecha = new Date(fechaTexto);
    
    // Verificar si la fecha es válida
    if (isNaN(fecha)) {
        return "Fecha inválida";
    }

    // Obtener la fecha actual
    const ahora = new Date();
    
    // Calcular la diferencia en milisegundos
    const diferencia = ahora - fecha;

    // Convertir la diferencia a minutos
    const minutos = Math.floor(diferencia / (1000 * 60));

    return minutos;
}



usuariosController.registro = function (request, response){
    
    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: request.body.password,
    }



    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "El campo nombre es obligatorio"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "El campo email es obligatorio"})
        return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(post.email) == false){
        response.json({state: false, mensaje: "El email no es valido"})
        return false
    }



    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje: "El campo password es obligatorio"})
        return false
    }

    post.password = SHA256 (post.password + config.palabraClave)



    usuariosModel.ExisteEmail(post, function(res){
        if(res.existe == 'Si'){
            response.json({state: false, mensaje: 'Este email ya esta registrado'})
            return false
        }
        else{

            var azar = 'G-' + Math.floor(Math.random() * (9999 - 1000) + 1000);
            post.azar = azar

            usuariosModel.Registrar(post, function(respuesta){

            const transporter = nodemailer.createTransport({
                host:config.email.host,
                port: config.email.port,
                secure: false,
                requireTLS: true,
                auth:{
                    user:config.email.user,
                    pass:config.email.pass
                }
            });

            

            var mailOptions = {
                from: config.email.user,
                to:post.email,
                subject: "Verifica tu cuenta con el código: " + azar,
                html: `<div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                    <table width="100%" style="margin: 20px 0; padding: 0;">
                        <tr>
                            <td align="center">
                                <table width="600" style="background-color: #ffffff; border: 1px solid #dddddd; border-radius: 5px; overflow: hidden;">
                                    <tr>
                                        <td style="padding: 20px 0; text-align: center; background-color: #4CAF50; color: white;">
                                            <h1 style="margin: 0; font-size: 24px;">Activación de Cuenta</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px; text-align: center;">
                                            <p style="font-size: 16px; color: #333333;">Hola,</p>
                                            <p style="font-size: 16px; color: #333333;">Gracias por registrarte. Haz clic en el siguiente botón para activar tu cuenta:</p>
                                            <a href="http://localhost:3000/activar/${post.email}/${azar}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; margin: 20px 0;">Activar Cuenta</a>
                                            <p style="font-size: 16px; color: #333333;">O utiliza el siguiente código de activación:</p>
                                            <p style="font-size: 18px; font-weight: bold; color: #4CAF50; background-color: #f9f9f9; padding: 10px; border-radius: 5px; display: inline-block;">${azar}</p>
                                            <p style="font-size: 14px; color: #333333; margin-top: 20px;">Si prefieres, también puedes copiar y pegar el siguiente enlace en tu navegador:</p>
                                            <p style="font-size: 14px; color: #4CAF50; background-color: #f9f9f9; padding: 10px; border-radius: 5px; word-break: break-all;">
                                                http://localhost:3000/activar/${post.email}/${azar}
                                            </p>
                                            <p style="font-size: 14px; color: #666666;">Si no has solicitado esta cuenta, ignora este correo.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; background-color: #f4f4f4; text-align: center; font-size: 12px; color: #666666;">
                                            &copy; 2024 Valhalla Coffee. Todos los derechos reservados.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log(error)
                }
                else {
                    console.log(info)
                }
            })


                response.json(respuesta)
            })
        
        }
    })
    

}


usuariosController.guardar = function (request, response){
    
    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: request.body.password,
        estado: request.body.estado,
        rol: request.body.rol
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "El campo nombre es obligatorio"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "El campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje: "El campo password es obligatorio"})
        return false
    }
    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje: "El campo estado es obligatorio"})
        return false
    }
    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje: "El campo rol es obligatorio"})
        return false
    }

    post.password = SHA256 (post.password + config.palabraClave)

    usuariosModel.ExisteEmail(post, function(res){
        if(res.existe == 'Si'){
            response.json({state: false, mensaje: 'Este email ya esta registrado'})
            return false
        }
        else{
            usuariosModel.guardar(post, function(respuesta){
                response.json(respuesta)
            })
        }
    })
    

}

usuariosController.listar = function (request, response){
    usuariosModel.listar(null, function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.listarId = function (request, response){

    var post = {
        _id: request.body._id
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }

    usuariosModel.listarId(post, function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.Actualizar = function (request, response) {
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        rol: request.body.rol,
        estado: request.body.estado
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "El campo nombre es obligatorio"})
        return false
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }
    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje: "El campo estado es obligatorio"})
        return false
    }
    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje: "El campo rol es obligatorio"})
        return false
    }

    usuariosModel.Actualizar(post, function(respuesta){
        response.json(respuesta)
    })



}

usuariosController.Activar = function (request, response) {
    var post = {
        email: request.params.email,
        azar: request.params.azar,
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "El campo email es obligatorio"})
        return false
    }

    if(post.azar == undefined || post.azar == null || post.azar == ""){
        response.json({state:false, mensaje: "El campo azar es obligatorio"})
        return false
    }

    usuariosModel.Activar(post, function(respuesta){
        if(respuesta.state == true){
            response.send(`<div style="font-family: Arial, sans-serif; background-color: #f9f5f0; color: #4b3d3d; text-align: center; padding: 50px;">

    <div style="background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto;">
        <h1 style="color: #7a5c4c;">¡Cuenta Activada!</h1>
        <p style="font-size: 18px;">Tu cuenta ha sido activada exitosamente. Ahora puedes disfrutar de nuestros deliciosos servicios de cafetería.</p>
        <a herf="http://localhost:4200/login" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #7a5c4c; color: white; cursor:pointer; text-decoration: none; border-radius: 5px;">Iniciar Sesión</a>
    </div>

</div>`)
        }
        else{
            response.send(`<div style="font-family: Arial, sans-serif; background-color: #f9f5f0; color: #4b3d3d; text-align: center; padding: 50px;">

    <div style="background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto;">
        <h1 style="color: #7a5c4c;">¡Error de Activación!</h1>
        <p style="font-size: 18px;">No se pudo activar tu cuenta. Por favor, verifica tu enlace de activación o intenta nuevamente.</p>
        <a href="#" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #7a5c4c; color: white; text-decoration: none; border-radius: 5px;">Reenviar Código</a>
    </div>

</div>`)
        }
    })



}


usuariosController.eliminar = function (request, response) {
    var post = {
        _id: request.body._id,
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "El campo _id es obligatorio"})
        return false
    }

    usuariosModel.eliminar(post, function(respuesta){
        response.json(respuesta)
    })



}



usuariosController.login = function (request, response){
    var post = {
        email: request.body.email,
        password: request.body.password,
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "El campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje: "El campo password es obligatorio"})
        return false
    }

    post.password = SHA256 (post.password + config.palabraClave)
    
    usuariosModel.ValidaLogin(post, function(validacion){
        var tiempo = (tiempoTranscurrido(validacion.fechalogin))

        if(validacion.errorlogin < 3 ){
            usuariosModel.login(post, function(respuesta){
                if(respuesta.state == false) {
                    post.cantidad = validacion.errorlogin + 1 
                    usuariosModel.actualizarErrores(post, function(act){
                        response.json(respuesta)
                    })
                }
                else{

                    usuariosModel.actualizarFechalogin(post, function(actfecha){
                        
                    })


                    request.session.nombre = respuesta.data[0].nombre
                    request.session._id = respuesta.data[0]._id
                    request.session.ultimologin = respuesta.data[0].ultlogin
                    request.session.rol = respuesta.data[0].rol

                    response.json({state: true, mensaje: "Bienvenido: " + respuesta.data[0].nombre, rol: respuesta.data[0].rol})
                }
                
            })
        }
        else{
            if(tiempo < 2 ){
                response.json({state:false, mensaje: "Debe esperar al menos 2 minutos, han transcurrido: " +  tiempo + " minuto" })
            } 
            else{
                    usuariosModel.login(post, function(respuesta){
                        post.cantidad = 0
                        usuariosModel.actualizarErrores(post, function(act){
                            response.json(respuesta)
                        })
                    })
            }
        }
    })
    
}


usuariosController.solicitarcodigo = function (request, response){
    
    var post = {
        email: request.body.email,
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "El campo email es obligatorio"})
        return false
    }

    usuariosModel.ExisteEmail(post, function(res){
        if(res.existe == 'No'){
            response.json({state: false, mensaje: 'Este email no existe, por favor registrese'})
            return false
        }
        else{

            var codigo = 'PASS-' + Math.floor(Math.random() * (9999 - 1000) + 1000);
            post.codigo = codigo

            usuariosModel.GuardarCodigoRecuperacion(post, function(respuesta){

            const transporter = nodemailer.createTransport({
                host:config.email.host,
                port: config.email.port,
                secure: false,
                requireTLS: true,
                auth:{
                    user:config.email.user,
                    pass:config.email.pass
                }
            });

            

            var mailOptions = {
                from: config.email.user,
                to:post.email,
                subject: "Usa este codigo para restablecer tu contraseña: " + codigo,
                html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                                <h2 style="color: #333333; text-align: center;">Recuperación de contraseña</h2>
                                <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                                    Hola, 
                                </p>
                                <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                                    Has solicitado restablecer tu contraseña. Para continuar con el proceso, usa el siguiente código de recuperación:
                                </p>
                                <p style="text-align: center;">
                                    <span style="display: inline-block; background-color: #f7f7f7; border: 1px solid #ddd; padding: 10px 20px; font-size: 18px; font-weight: bold; color: #333333; letter-spacing: 2px;">
                                        ${codigo}
                                    </span>
                                </p>
                                <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                                    Si no solicitaste este cambio, por favor ignora este correo. Tu contraseña no se modificará hasta que uses este código en nuestra página web.
                                </p>
                                <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                                    Gracias,<br>
                                    El equipo de Soporte
                                </p>
                                <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
                                <p style="color: #999999; font-size: 12px; text-align: center;">
                                    Este correo fue enviado de forma automática. Por favor, no respondas a este mensaje.
                                </p>
                            </div>
                        </div>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log(error)
                }
                else {
                    console.log(info)
                }
            })


                response.json(respuesta)
            })
        
        }
    })
    

}

usuariosController.recuperarpass = function (request, response) {
    var post = {
        email: request.body.email,
        password: request.body.password,
        codigo: request.body.codigo
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "El campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje: "El campo password es obligatorio"})
        return false
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje: "El campo codigo es obligatorio"})
        return false
    }

    post.password = SHA256 (post.password + config.palabraClave)

    usuariosModel.recuperarpass(post, function(respuesta){
        if(respuesta.state == true){
            response.json({state: true, mensaje: "La contraseña se ha actualizado correctamente"})
        }
        else{
            response.json({state: false, mensaje: "Se presento un error al actualizar la contraseña"})
        }
    })



}

usuariosController.ExportarExel = function (request, response){

    usuariosModel.listar(null, function(respuesta){


    var random = Math.floor(Math.random() * (9999 - 1000) + 1000);

        const dataToExport = respuesta.datos.map(doc => doc._doc)
        var xls = json2xls(dataToExport)
        fs.writeFileSync('misusuarios'+random+'.xls', xls, 'binary')
        response.download('misusuarios'+random+'.xls', function(err){
            if(err){
                console.log(err)
            }
            else{
                console.log('Descarga completa')
                fs.unlinkSync('misusuarios'+random+'.xls')
            }
        })



    })
}

usuariosController.ExportarPDF = function (request, response){

    const PDFDocument = require('pdfkit')
    const doc = new PDFDocument();
    var writeStream = fs.createWriteStream('Informe.pdf')
    doc.pipe(writeStream)

    //titulo
    doc.fontSize(14).text("Lista Usuarios", 240, 70)

    doc.fontSize(14).text("Nombre", 50, 95)
    doc.fontSize(14).text("Email", 220, 95)

    usuariosModel.listar(null, function(respuesta){

        for (let a = 0; a < respuesta.datos.length; a++) {
            
            doc.fontSize(10).text(respuesta.datos[a].nombre, 50, 110 + (a*11))
            doc.fontSize(10).text(respuesta.datos[a].email, 220, 110 + (a*11))

            if(a == 20){
                doc.addPage()
            }

            if(a == respuesta.datos.length -1){
                doc.end()
            }
            
        }
    })

    writeStream.on('finish', function(){
        response.download('Informe.pdf', function(err){
            if(err){
                console.log(err)
            }
            else{
                console.log('Descarga completa')
                fs.unlinkSync('Informe.pdf')
            }
        })
    })

}




module.exports.usuariosController = usuariosController

