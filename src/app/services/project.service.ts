import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "../models/project";
import { Global } from "./global";


@Injectable()
export class ProjectService{
    public url : string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }
    testService(){
        return 'Probando respuesta desde Angular'
    }
    // le pasmos el parametro que es un objeto del tipo project
    saveProject(projects: Project): Observable<any>{
        //la variable params son los parametros  que vamos a envir o sea todos os datos del objeto
        // tiene que ser jsonString para que el api pueda leerlo
        let params = JSON.stringify(projects);
        // establecemos las cabeceras pra que defina como se va a pasar la informacion y va a viajar en formato json
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        // peticion del post para crear algo en el API  se utiliza el metodo HTTP
        return this._http.post(this.url + 'save-project', params, {headers: headers});
    }
    //crear metodo para sacar de la base de datos y consumir de la api todos los proyectos

    getProjects(): Observable<any>{
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        
        return this._http.get(this.url+'projects', {headers: headers});
    }
    getProject(id:any): Observable<any>{
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        return this._http.get(this.url+'projectid/'+ id, {headers: headers});
    }
    delateProject(id:any): Observable<any>{
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        return this._http.delete(this.url+'projectid/'+ id, {headers: headers});
    }
    updateProject(project): Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        
        //el metodo put sirve para actulizar un recurso en el backend
        return this._http.put(this.url+'projectid/'+ project._id, params, {headers: headers})



    }
}
