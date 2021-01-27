const { v4: uuidv4 } = require('uuid')
module.exports=class Cita{

    //constructor
    
        constructor(cita){
            this.nombre=cita.nombre
            this.email=cita.email
            this.telefono=cita.telefono
            this.fecha=cita.fecha
            this.hora=cita.hora
            this.id=uuidv4().substr(-7)
    
        }
//metodos privados
    
  //Validar y crear la cita

    validar(){
    let errores=[]

    //Validar Nombre
        let nombre = this.nombre
        if (nombre=="") errores.push({ mensaje1: "Dinos tu nombre ¡no seas tímido!"})

    //Validar email 
        let email=this.email
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        if(emailRegex.test(email)){console.log("Mail OK.")}
        
        else{errores.push({ mensaje2: "Uy, revisa tu email, parece que no está bien escrito :("})}

    //Validar Teléfono
        let telefono=this.telefono
        if (telefono=="") errores.push({ mensaje3: "Échale un ojo al teléfono"})

    //Validar fecha 
        let fecha = this.fecha
        let f= new Date()
        let fechaactual=f.getFullYear() + "-0" + (f.getMonth() +1) + "-" + f.getDate()

        if(fecha < fechaactual){errores.push({ mensaje4: "¿Ahora viajas en el tiempo? Nosotros no :( Elije una fecha de hoy en adelante please"})}

        return errores
    }



  
}
    
    