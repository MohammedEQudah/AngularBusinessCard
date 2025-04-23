import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeserviceService } from 'src/app/services/homeservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('callCSVImport') callCSVImport!: TemplateRef<any>;
  @ViewChild('callXMLImport') callXMLImport!: TemplateRef<any>;

  constructor(public home:HomeserviceService,public dialog:MatDialog){}
  ExportCSV()
  {
    this.home.ExportCSV();
  }
  ExportXML()
  {
    this.home.ExportXML();
  }
  OpenCSVDialog()
  {
    this.dialog.open(this.callCSVImport, {
      width: '600px',
      height: '320px',
      panelClass: 'custom-dialog-container' // Optional for custom styling
    });
  }
  OpenXMLDialog()
  {
    this.dialog.open(this.callXMLImport, {
      width: '600px',
      height: '320px',
      panelClass: 'custom-dialog-container' 
    });
  }
  
  
  
}
