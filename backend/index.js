const express = require('express');
const app = express();
const appB = require('./appParser');

const port = 3600;
const portServ = 3800;
//coneccion a base de datos

const mongoose = require('mongoose');

// const user ="masterjava";
// const password="minato5533824406";
// const namebd= 'portafolio';
const uri='mongodb+srv://javiermills:mills5533824406@cluster0.x4491.mongodb.net/portafolio?retryWrites=true&w=majority';

mongoose.connect(uri,
{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log('Conexion a base de datos en el puerto: 3600')
//conectandome al servidor 
  appB.listen(portServ, () =>{
    console.log('Servidor corriendo correctamente en en el purto:' + portServ);
  })
})

.catch(e => console.log(e))
//motor de plantillas
app.set('view engine', 'ejs');

//ruta de donde se estaran extrayendo las vistas en ejs
app.set('views', __dirname + '/views');

// const mongosee = require('mongoose
//direccion estatica con el directorio mas la carpeta donde estan las vistas 
app.use(express.static(__dirname + '/public'));

app.use('/', require('./router/Rutas'));


//lineas que contienen la base de datos

app.listen(port, () => {
  console.log('mandando respuesta en el :' ,port)
})

//cuando no se encuentr la paguina se redireccionara a esta paguina con un error 404
app.use((req, res, next)=> {
  res.status(404).render('404', {titulo: "Error dinamico 404",
description : 'hola'})
 
})






   

    
