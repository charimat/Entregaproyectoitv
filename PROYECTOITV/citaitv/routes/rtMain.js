const express= require("express")

const rtMain=express.Router()

rtMain.get("/", function (req, res){
    res.render("home")
})
module.exports=rtMain

