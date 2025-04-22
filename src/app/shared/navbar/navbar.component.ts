import { Component } from '@angular/core';
import { HomeserviceService } from 'src/app/services/homeservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public home:HomeserviceService){}
  ExportCSV()
  {
    this.home.ExportCSV();
  }
  ExportXML()
  {
    this.home.ExportXML();
  }
}
