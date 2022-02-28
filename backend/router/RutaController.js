const express = require('express');
const ProjectController = require('../controlers/projet');
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({ uploadDir: './subidas' });




router.get("/home", ProjectController.home);
router.post("/test", ProjectController.test);
router.post("/save-project", ProjectController.saveProject);
router.get("/projectid/:id?", ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put("/projectid/:id", ProjectController.updateProject);
router.delete("/projectid/:id", ProjectController.deleteProject);
router.post("/uploadimagen/:id", multipartMiddleware, ProjectController.uploadImagen);
router.get("/getimagen/:image", ProjectController.getImageFile);

module.exports = router;


