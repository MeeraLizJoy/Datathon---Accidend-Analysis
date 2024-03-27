const {Pool} =require("pg")

const pool=new Pool({
    user:"ayush",
    database:"yt_login_system",
    password:"password",
    host:"localhost",
    port:5433,
})


module.exports=pool