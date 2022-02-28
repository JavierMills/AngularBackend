import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';



@Component({
  selector: 'app-create-projects',
  templateUrl: './create-projects.component.html',
  styleUrls: ['./create-projects.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateProjectsComponent implements OnInit {
  public title: string;
  // creamos propiedad para mi proyecto que va a ser un objeto de tipo proyecto
  public project: Project;
  public status: string = "";
  public filesToUpload: Array<File>;
  public save_project;
  public url:string;
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = 'Crear Proyecto',
    this.project = new Project("", "", "", "", "" ,2022, "");
    this.filesToUpload = new Array();
    this.url= Global.url;
    
  }

  ngOnInit() {
}
    onSubmit(form:any){
           console.log(this.project);
           //Guardar datos basicos
           this._projectService.saveProject(this.project).subscribe(
           response =>{
            
             if(response.project){
               

              this._uploadService.makeFileRequest(Global.url +"uploadimagen/" + response.project._id,[], this.filesToUpload, 'image')
              .then((result:any)=>{
                this.status= 'success';
               this.save_project= result.project;
                form.reset();
              });
            

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
