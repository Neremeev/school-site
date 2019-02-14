import {Component, OnInit} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from "ngx-file-drop";
import {UserService} from "../../../../shared/services/user.service";
import {User} from "../../../../shared/models/user.model";
import {AppState} from "../../../../store/app.state";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/index";
import Cropper from 'cropperjs';

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.scss']
})
export class ChangePictureComponent implements OnInit {

  public files: UploadFile[] = [];
  storeSub: Subscription;
  user: User;
  output;

  constructor(private userService: UserService, private store: Store<AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('userPage').subscribe(({user}) => {
      this.user = user;
    });
  }


  dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  fileOver(event) {
    console.log(event);
  }

  fileLeave(event) {
    console.log(event);
  }

  handleFiles(event) {
    let picture;
    const reader = new FileReader();
    reader.onload = function(e: any) {
      picture = e.currentTarget.result;
      this.output = document.getElementById('output_image');
      this.output.src = reader.result;
      const cropper = new Cropper(this.output, {
        aspectRatio: 2 / 3,
        crop: function(e) {
          console.log(e.detail);
        },
        ready: function() {
          console.log('123123');
          let data = cropper.getCropBoxData();

          setTimeout(function() {
            data.left = 100;
            data.top = 200;
            cropper.setCropBoxData(data);
          }, 1000);
        }
      });
    };
    reader.readAsDataURL(event.target.files[0]);
    this.userService.getUser(this.user.login)
      .subscribe((user: User) => {
          user[0]['photo'] = picture;
          this.userService.updateUser(user[0])
            .subscribe(data => {
            });
    });
  }


}
