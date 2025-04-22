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
      height: '400px',
      panelClass: 'custom-dialog-container' // Optional for custom styling
    });
  }
  OpenXMLDialog()
  {
    this.dialog.open(this.callXMLImport, {
      width: '600px',
      height: '400px',
      panelClass: 'custom-dialog-container' 
    });
  }
  onCSVSelected(event: any) {
    const file: File = event.target.files[0];
  
    if (file && file.name.endsWith('.csv')) {
      this.home.importCSV(file).subscribe({
        next: (res) => {
          alert('CSV imported successfully!');
          console.log(res);
        },
        error: (err) => {
          alert('Something went wrong while importing CSV.');
          console.error(err);
        }
      });
    } else {
      alert('Please select a valid CSV file.');
    }
  }
  
  
  
}
