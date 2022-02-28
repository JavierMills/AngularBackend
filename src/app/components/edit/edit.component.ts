import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create-projects/create-projects.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  // creamos propiedad para mi proyecto que va a ser un objeto de tipo proyecto
  public project: Project;
  public status: string = "";
  public filesToUpload: Array<File>;
  public save_project;
  public url: string;
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    this.title = 'Editar Proyecto',
    this.project = new Project("", "", "", "", "" ,2022, "");
    this.filesToUpload = new Array();
    this.url = Global.url;
  }

  ngOnInit(){

    this._route.params.subscribe(params =>{
        let id = params['id'];
        
        this.getProject(id);
    })
}
  getProject(id:any){
    this._projectService.getProject(id).subscribe(
      response =>{
      this.project= response.project;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  onSubmit(form){
    console.log(this.project);
    //Guardar datos basicos
    this._projectService.updateProject(this.project).subscribe(
    response =>{
     
      if(response.project){
        //subir
        if(this.filesToUpload){
          this._uploadService.makeFileRequest(Global.url +"uploadimagen/" + response.project._id,[], this.filesToUpload, 'image')
       .then((result:any)=>{
         this.status= 'success';
        this.save_project= result.project;
        
       });
     

        }else{
          this.status= 'success';
          this.save_project= response.project;
        }
       
      }else{
       this.status= 'failed';
       console.log(response);
      }
    },
    error =>{
      console.log(<any>error);
   } 
);
}
fileChangeEvent(fileInput:any){
this.filesToUpload = <Array<File>>fileInput.target.files;

}

}
