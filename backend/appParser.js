const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
var project_routers = require('./router/RutaController');


//midlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//RUTAS
app.use('/api', project_routers);

// app.get('/test', (req, res) =>{
//     res.status(200).send({
//         message: 'hola desde mi API con node.js'
//     })
// });

// app.get('/', (req, res) =>{
//     res.status(200).send(
//      '<h1> Hola desde pagina de inicio </h1>'
//     )
// });

// app.post('/testPost/:id', (req, res) =>{
//     //recoge valores del body
//     console.log(req.body.name);
//     //recoge valores del body mandados por nosotros
//     console.log(req.body.Apellidos);
//     // recoe valore de la we tipo:testPost?web=??????
//     console.log(req.query.web);
//     //reoge parametros tipo id de la url
//     console.log(req.params.id);
//     res.status(200).send(
//      '<h1> Hola desde pagina de testPost </h1>'
//     )
// });


module.exports = app;
