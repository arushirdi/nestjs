// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { TableComponent } from './table/table.component';
import { UserformComponent } from './userform/userform.component';
import { PdfGeneratorService } from './service/pdf-generator.service';
import { PdfDownloadComponent } from './pdf-download/pdf-download.component';

const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form', component: UserformComponent },
  { path: 'table', component: TableComponent },
  
  { path: 'pdf-download', component: PdfDownloadComponent },
  { path: 'pdf-viewer', component: PdfViewerComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
