import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {
  Cards:any=[];
  display_image:any;
  XMLFILE:any;
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
  ExportCSV() {
    this.http.get('https://localhost:7035/api/Card/ExportCsv', { responseType: 'blob' }).subscribe(
      (response: any) => {
        // Create a link element to simulate a download
        const blob = new Blob([response], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'business_cards.csv';  // The filename you want to save as
        link.click();  // Simulate a click to download
      },
      (err: any) => {
        alert('Something went wrong!');
      }
    );
  }

  ExportXML() {
    this.http.get('https://localhost:7035/api/Card/ExportXml', { responseType: 'blob' }).subscribe(
      (response: any) => {
        // Create a blob from the response and create a link to download it
        const blob = new Blob([response], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'business_cards.xml';  // The filename you want to save as
        link.click();  // Simulate a click to trigger the download
      },
      (err: any) => {
        alert('Something went wrong!');
      }
    );
  }
 
  //  upload CSV
  uploadCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`https://localhost:7035/api/Card/ImportCsv`, formData, {
      responseType: 'text' as 'json'
    });
  }
  
  uploadXml(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`https://localhost:7035/api/Card/ImportXml`, formData, {
      responseType: 'text' as 'json'
    });
  }
  
  
  
}
