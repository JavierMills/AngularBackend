import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  //cargamos nuetros servicios en nuestro providers
  providers:[ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url : string;
  constructor(
    //corgamos en elservicio una propiedad de la clase  en el constructor pra injectarla
    private _projectService: ProjectService
  ) { 
    this.projects = new Array();
    this.url = Global.url;
  }

  ngOnInit(){
    this.getProjects();
  }
  getProjects(){
    //EL METODO subscribe para subscribirnos en el observable y optener las respuesta que nos devuelve el observable de la API
    this. _projectService.getProjects().subscribe(
      response =>{
        if(response.projects){
          this.projects = response.projects
        }
      },
      error =>{
        console.log(error);
      }
    );
  }
}
