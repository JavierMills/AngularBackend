const express = require('express');
const router = express.Router();

const Portafolio = require('../models/portafolio');

router.get('/', (req, res) => {
    res.render('index', {titulo: 'Mensaje mandado desde el render'});
  })
  
  router.get('/servicios', (req, res) =>{
      res.render('servicios', {titulo:'Titulo desde render servicios'})
  
  })


  router.get('/portafolio', async (req, res) => { 
    try {
      const arrayPortafolioDB = await Portafolio.find()
      console.log(arrayPortafolioDB)
      res.render('vistaPortafolio',  { 
        arrayPortafolio:  arrayPortafolioDB

       })
    } catch (error) {
      console.log(error)
    }
    

})



 

  module.exports = router;

// {/* <tbody>

// <% if (ArrayPortafolio.length > 0) { %>
//     <% ArrayPortafolio.forEach(item => { %>
//         <tr>
//             <th scope="row"><%= item.id %> </th>
//             <td><%= item.name %></td>
//             <td><%= item.description %></td>
//             <td><%= item.categot %></td>
//             <td><%= item.lengs %></td>
//             <td><%= item.yera %></td>
            
//           </tr>
//     <% }) %>    
// <% } %>
// </tbody> */}