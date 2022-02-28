import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { Router, Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]

})
    export class DetailComponent implements OnInit {
      public project: Project;
      public url : string;
      public confirm: boolean;
      constructor(
        private _projectService: ProjectService,
        private _router: Router,
        private _route: ActivatedRoute
      ) { 
     
      this.url= Global.url;
      this.project = new Project("", "", "", "", "" ,2022, "");
      this.confirm =false;
      
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

      setConfirm(confirm){
         this.confirm = confirm;
      }

      delateProject(id:any){
        this._projectService.delateProject(id).subscribe(
          response =>{
            if(response.project){
              this._router.navigate(['/proyectos']);
            }
          },
          error =>{
          console.log(<any>error);
          }
        )

      }
    }

