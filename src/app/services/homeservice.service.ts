import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {
  Cards:any=[];
  display_image:any;
  constructor(private http:HttpClient) { }

  GetAllCards()
  {
    this.http.get('https://localhost:7035/api/Card/GetAllCards').subscribe((resp:any)=>{
      this.Cards=resp;
      console.log(this.Cards);
    },(err:any)=>{console.log(err.status)}
   )
  }
  uploadImage(file:FormData)
  {
    debugger
    this.http.post('https://localhost:7035/api/Card/UploadImage',file).subscribe((resp:any)=>{
      this.display_image=resp.imagepath;
      alert("Image Uploaded")
    }),
    (err:any)=>
      {
        alert('Something Wrong')
      }
  }
  CreateCard(body:any)
  {
    debugger
    body.imagepath=this.display_image
    this.http.post('https://localhost:7035/api/Card/CreateCard',body).subscribe((resp:any)=>{
      alert("Card Added Successfully")
      location.reload()
    }),(err:any)=>
      {
        alert('Something Error')
      }
  }
  DeleteCard(id:any)
  {
    debugger
    this.http.delete('https://localhost:7035/api/Card/DeleteCard/'+id).subscribe((resp:any)=>{
      alert("Card Deleted")
      location.reload()
    }),(err:any)=>{
      alert('Something Wrong')
    }
  }

}
