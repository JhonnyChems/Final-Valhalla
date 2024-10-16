var config = {
    email:{},
    sesiones: {}
}

config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "crewpeligrososkal@gmail.com"
config.email.pass = "oajaadgcbdxxvsvz"

config.sesiones.secret = "yourUserName"
config.sesiones.expiracion = 60000*5


config.bd = "FinalIbero006"
config.palabraClave = 'abajsnhjsjdpsnk561650.03Ds65d1fd4s6465456sf4164fg6a4fas98f4asf4a6f4a6f4hfsaff6a545fd6A10FAS1FA6SF54S132F10A63F4S3F0S1FD'
config.origins = [
    "http://localhost:4200"
]
module.exports.config = config