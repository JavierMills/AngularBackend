import { Injectable } from "@angular/core";
import { Global } from "./global";


@Injectable()
export class UploadService{
    public url: string;
    constructor(){
        this.url = Global.url;
    }
    // url: a la cualsehara la peticion ajax
    // params:posobles parametros que vamos a enviar
    // files: 
    // name: nombre del parametro que va recibier el backend

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
        //creamos promesa resolve= promesa resuelta, reject:no se ha resuelto
        return new Promise(function(resolve, reject){
            //simularemos un formulario
            var formData:any = new FormData();
            //xhr sinonimo de ajax
            //XMLHttpun objeto de peticiones asincronasde java script
            var xhr = new XMLHttpRequest();
           
            for(var i = 0; i < files.length; i ++){
                //recorre todos los ficheros que vallan llegando y adjuntalos al formulario con el
                // parametro name que llega luego añade el archivo y recoge el nombre
                formData.append(name, files[i], files[i].name);              
            }
            
            xhr.onreadystatechange = function(){
                if(xhr.readyState== 4){
                    if(xhr.status ==200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}