import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-import-card',
  templateUrl: './import-card.component.html',
  styleUrls: ['./import-card.component.css']
})
export class ImportCardComponent {
  records: any[] = [];

  constructor(private papa: Papa) {}

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
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
}