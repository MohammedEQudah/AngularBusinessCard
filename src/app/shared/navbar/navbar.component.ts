import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeserviceService } from 'src/app/services/homeservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 

  constructor(public home:HomeserviceService,public dialog:MatDialog){}
  ExportCSV()
  {
    this.home.ExportCSV();
  }
  ExportXML()
  {
    this.home.ExportXML();
  }
  
  
  
  
}
