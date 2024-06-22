import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserformComponent } from './userform/userform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { ParentComponent } from './parent/parent.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PdfDownloadComponent } from './pdf-download/pdf-download.component';


@NgModule({
  declarations: [
    AppComponent,
    UserformComponent,
    TableComponent,
    ParentComponent,
    PdfViewerComponent,
    
   
    SidebarComponent,
        PdfDownloadComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
