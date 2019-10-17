import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './layouts/home/home.component';
import { TodosComponent } from './layouts/todos/todos.component';
import { EditTodoComponent } from './layouts/edit-todo/edit-todo.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { TodoState } from './store/states/todo.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

const STATES = [TodoState];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodosComponent,
    EditTodoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    NgxsModule.forRoot(STATES, {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
