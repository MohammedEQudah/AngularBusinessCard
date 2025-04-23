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
  isDragging = false;
selectedFileName: string = '';

onDragOver(event: DragEvent) {
  event.preventDefault();
  this.isDragging = true;
}

onDragLeave(event: DragEvent) {
  event.preventDefault();
  this.isDragging = false;
}

onCSVSelected(event: any): void {
  event.preventDefault();
  this.isDragging = false;

  let file: File | null = null;

  if (event.dataTransfer?.files?.length) {
    file = event.dataTransfer.files[0]; // From drop
  } else if (event.target?.files?.length) {
    file = event.target.files[0]; // From input
  }

  if (file && file.name.toLowerCase().endsWith('.csv')) {
    this.selectedFileName = file.name;

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
    this.selectedFileName = '';
  }
}

selectedXMLFileName: string = '';

onXMLSelected(event: any): void {
  event.preventDefault();
  this.isDragging = false;

  let file: File | null = null;

  if (event.dataTransfer?.files?.length) {
    file = event.dataTransfer.files[0]; // Drag & drop
  } else if (event.target?.files?.length) {
    file = event.target.files[0]; // File input
  }

  if (file && file.name.toLowerCase().endsWith('.xml')) {
    this.selectedXMLFileName = file.name;

    this.home.importXML(file).subscribe({
      next: (res) => {
        alert('XML imported successfully!');
        console.log(res);
      },
      error: (err) => {
        alert('Something went wrong while importing XML.');
        console.error(err);
      }
    });
  } else {
    alert('Please select a valid XML file.');
    this.selectedXMLFileName = '';
  }
}





closeCSVDialog()
{
  this.dialog.closeAll();
}

closeXMLDialog()
{
  this.dialog.closeAll();
}
  
  
}
