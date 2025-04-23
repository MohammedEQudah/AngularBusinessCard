import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { HomeserviceService } from '../services/homeservice.service';


@Component({
  selector: 'app-import-card',
  templateUrl: './import-card.component.html',
  styleUrls: ['./import-card.component.css']
})
export class ImportCardComponent {
  records: any[] = [];
  selectedFile: File | null = null;

  constructor(private papa: Papa, public home:HomeserviceService) {}

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.processFile(this.selectedFile);
    }
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile = file;
      this.processFile(file);
    }
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  processFile(file: File) {
    const reader = new FileReader();
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    reader.onload = () => {
      const fileContent = reader.result as string;
      if (fileExtension === 'csv') {
        this.parseCSV(fileContent);
      } else if (fileExtension === 'xml') {
        this.parseXML(fileContent);
      } else {
        console.error('Unsupported file type');
      }
    };

    reader.readAsText(file);
  }

  parseCSV(csvContent: string) {
    this.papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        this.records = result.data.map((item: any) => ({
          Id: item.Id,
          Name: item.Name,
          Email: item.Email,
          Gender: item.Gender,
          Dateofbirth: item.Dateofbirth,
          Phone: item.Phone,
          Imagepath: item.Imagepath || '../../assets/Images/businessCard.png',
          Address: item.Address
        }));
      }
    });
  }

  parseXML(xmlContent: string) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'application/xml');
    const items = xmlDoc.getElementsByTagName('BusinessCard');

    const parsed: any[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const getText = (tag: string) => {
        const element = item.getElementsByTagName(tag)[0];
        return element ? element.textContent : '';
      };

      parsed.push({
        Id: i + 1,
        Name: getText('Name'),
        Email: getText('Email'),
        Gender: getText('Gender'),
        Dateofbirth: getText('DateOfBirth'),
        Phone: getText('Phone'),
        Imagepath: getText('ImagePath') === 'null' ? '../../assets/Images/businessCard.png' : getText('ImagePath'),
        Address: getText('Address')
      });
    }

    this.records = parsed;
  }

  submit() {
    if (this.selectedFile) {
      const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'csv') {
        this.home.uploadCsv(this.selectedFile).subscribe(
          (response:any) => {
            alert('CSV Saved Successfully');
            console.log('CSV file uploaded successfully:', response);
            location.reload();
          },
          (error:any) => {
            console.error('Error uploading CSV:', error);
          }
        );
      } else if (fileExtension === 'xml') {
        this.home.uploadXml(this.selectedFile).subscribe(
          (response:any) => {
            alert('XML Saved Successfully');
            console.log('XML file uploaded successfully:', response);
            location.reload();
          }
        );
      } else {
        alert('Unspported file type')
        console.error('Unsupported file type');
        location.reload();

      }
    } else {
      alert('No File Selected')
      console.error('No file selected');
      location.reload();

    }
  }
}
