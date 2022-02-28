import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateProjectsComponent } from './components/create-projects/create-projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';


const appRouter : Routes =  [
  {path: '', component: AboutComponent},
  {path: 'sobreMi', component: AboutComponent},
  {path: 'proyectos', component: ProjectsComponent},
  {path: 'crear-proyecto', component: CreateProjectsComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'proyecto/:id', component: DetailComponent},
  {path: 'editar/:id', component: EditComponent},
  //** para decirle que redireccione a un error 404 
  {path: '**', component: ErrorComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateProjectsComponent,
    ContactComponent,
    ErrorComponent,
    DetailComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRouter, {
      enableTracing :true,
      paramsInheritanceStrategy: 'always',
      useHash: true
    }),
    HttpClientModule,
    FormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
