import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeserviceService } from '../services/homeservice.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit{
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  searchValue: string = '';
  selectedFilter: string = 'name';
  constructor(public home:HomeserviceService,public dialog:MatDialog){}
  ngOnInit(): void {
    this.home.GetAllCards();
  }
  openDeleteDailog(id: number) {
    
    const dialogRef = this.dialog.open(this.callDeleteDialog); 
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes')
          this.home.DeleteCard(id);
        else if (result == 'no')
          console.log('Deleted');
      }
    });
  }
  
    
}
