const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const portafolioSchema = new Schema({
    name: String,
    description: String,
    category: String,
    lengs: String,
    year: Number,
    image: String,
})
//mongoose guarda el parametro minuscla y le lo pruraliza par por conectarse a la base de datos en la colllecion
const Portafolio = mongoose.model('Portafolio', portafolioSchema )

module.exports = Portafolio;

