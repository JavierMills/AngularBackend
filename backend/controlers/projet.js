//el controlador es un especie de clase que va a tener un serie de  metodos n acciones que va a poder hacer relaionandos con la entidad de projets
'use strict'
const ProjectModel = require('../models/portafolio');
var fs = require('fs');
var path = require('path');


const { exists } = require('../models/portafolio');
var controller = {
    
    home: function (req, res){
        return res.status(200).send({
            message : 'Soy la home desde controller'
        });
    },

    test: function (req, res){
        return res.status(200).send({
            message: 'Soy el test desde el controller del proyecto'
        });
    },

    saveProject: function(req, res){
        var newProject = new ProjectModel();

        var params = req.body;
        // console.log(newProject);
        // console.log(params);
        newProject.name = params.name;
        newProject.description = params.description;
        newProject.category = params.category;
        newProject.lengs = params.lengs;
        newProject.year = params.year;
        newProject.image = null;

        //guardar eb la base de datos
        
        newProject.save((err, projectStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar el documento'})

            if(!projectStored) return res.status(404).send({message: 'No se a podido guardar el documento' })

            return res.status(200).send({project: projectStored})
            
        })
    },
    //obtener proyecto con id 
    getProject: function(req, res){
        
        var projectID = req.params.id;

        if(projectID == null) return res.status(404).send({message: "Error del servidor POR ID"});

        ProjectModel.findById(projectID, (err, project) => {
            if(err) return res.status(500).send({message: "Error al recoppilar datos"});
            
            if(!project) return res.status(404).send({message: "Error del servidor"});

            return res.status(200).send({
                project
            });
        });
       
    },
  //obtener listado deproyectos
    getProjects: function(req, res){
        //metodo find recogetooslos documentos quehay en una coleccio de datos
        ProjectModel.find({}).exec((err, projects) =>{

            if(err) return res.status(500).send({ message: 'Error al devolver los datos'});

            if(!projects) return res.status(404).send({message : 'Error al conectarce al servidor... '});

            return res.status(200).send({
                projects
            });

        });

    },
    //actualizar informacion del proyecto
    updateProject: function(req, res){
        
        var projectID = req.params.id;
        var update = req.body;

        ProjectModel.findByIdAndUpdate (projectID, update, {new:true},(err, projectUpdated) => {

            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!projectUpdated) return res.status(404).send({message: 'No se existe el proyecto para actulizar'});

            return res.status(200).send({

                project: projectUpdated
            });
        });
    },
    deleteProject: function(req, res){
        var projectID = req.params.id;


        ProjectModel.findByIdAndDelete(projectID, (err, projectDelate) =>{

            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!projectDelate) return res.status(404).send({message: 'No se puede eliminar'});

            return res.status(200).send({
                project: projectDelate
            });
        });
    },

    uploadImagen: function(req, res){
    var projectID= req.params.id;
    var fileName = "Imagen no subida...";

    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[1];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' ){

            ProjectModel.findByIdAndUpdate(projectID, {image: fileName}, {new:true}, (err, imagenUpdated) =>{

                if(err) return res.status(500).send({ message: 'La imagen no se ha subido'});
    
                if(!imagenUpdated) return res.status(404).send({ message: 'Error de servidor'});
    
                return res.status(200).send({project:imagenUpdated})
            });

        }else{
            fs.unlink(filePath, (err)=>{
                return res.status(200).send({massege: 'La extencion no es valida'})
            });
        }
         }else{
            return res.status(200).send({
                message: fileName
    
             }); 
        }
    },

    getImageFile: function(req, res){
        var image = req.params.image;
        var path_file = './subidas/'+ image;
//
       fs.exists(path_file, (exists)=>{
        if(exists){
            //path es un modulo de node para acceder a las rutas fidis de nuestro sistema de archivos
            return res.sendFile(path.resolve(path_file));
        }else{
            return res.status(200).send({massage : 'No existe la imagen'
        
            });
          }
       });
    }
 
};

module.exports = controller;