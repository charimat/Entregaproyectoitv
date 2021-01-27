const express= require("express")
const rtCitas=express.Router()
const fs =require("fs")
const QRCode = require('qrcode')
const daoCitas=require('../dao/daoCitas')
const Cita=require('../models/Cita')

let citas=JSON.parse(fs.readFileSync("./dao/todascitas.json",  "utf-8"))

//Rutas de las plantillas hbs

rtCitas.get("/nueva", function (req, res){
    res.render("principal", {citas})
})

rtCitas.get("/modificarcita", function (req, res){
    res.render("modificarcita")
})

rtCitas.get("/vercita", function (req, res){
    res.render("vercita")
})
//Aquí las validaciones del envío del email para ver sus citas
rtCitas.post("/ver", function (req, res){

    let miEmail=req.body.email
    console.log(miEmail)
    let citasEncontradas=citas.filter(cita=>cita.email==miEmail)
    console.log(citasEncontradas)

    res.render("mostrarcitas", {citasEncontradas})
})
//Búsqueda por email
rtCitas.get('/modificarcita/:id', (req,res)=>{
    let Id=req.params.id
    
    let citaporId=citas.find(cita=>cita.id==Id)
    
    var i = citas.indexOf(citaporId);
    
    citas.splice( i, 1 );
   
    //Actualizar archivo datos        
    fs.writeFileSync("dao/todascitas.json", JSON.stringify(citas), "utf-8")  
    res.render("citaeliminada")        
})

//Búsqueda por localizador

rtCitas.post("/modificar", function (req, res){

    let miId=req.body.id
    let citaporId=citas.find(cita=>cita.id==miId)
    var i = citas.indexOf(citaporId);
    if (citaporId==undefined){
        res.render("sincitaasociada")
    }
    else res.render("eliminar", {citaporId})

        //Eliminar
        rtCitas.get("/citaeliminada", function (req, res){
           citas.splice(i, 1)
                   
        //Actualizar        
        fs.writeFileSync("dao/todascitas.json", JSON.stringify(citas), "utf-8")  
        res.render("citaeliminada")
    
        })
})

//Validaciones formulario
rtCitas.post("/procesar", function (req, res){

    let datosCita=new Cita(req.body)
    let errores=datosCita.validar()
 
//Enviar errores

if (errores.length!==0) res.render("principal", {errores, citas})
//Comprobar que fecha y hora no se repite

   let repeticion=[] 
    for (let i = 0; i < citas.length; i++) {
    
        if (citas[i].fecha==datosCita.fecha && citas[i].hora===datosCita.hora){   
            console.log("La fecha ya está reservada")
            res.render("citarepetida", {datosCita})
            repeticion.push( citas[i])
            console.log(repeticion)

        }
    }            

//Crear la cita

    if (errores.length==0 && repeticion.length==0){
        
       daoCitas.guardar(datosCita)
       .then(cita=>res.render("resultado", {datosCita}))
   
    }
})
module.exports=rtCitas






