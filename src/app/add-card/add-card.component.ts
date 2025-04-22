import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeserviceService } from '../services/homeservice.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent {
  constructor(public home:HomeserviceService){}
  CardForm:FormGroup=new FormGroup(
    {
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.email,Validators.required]),
      gender:new FormControl('',[Validators.required]),
      dateofbirth:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
      imagepath:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required])
    }
  )
  UploadImage(file:any)
  {
    if(file.length==0)
      return
    let fileToUpload=<File>file[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name)
    this.home.uploadImage(formDate);
  }
  AddCard()
  {
    this.home.CreateCard(this.CardForm.value)
  }
}
