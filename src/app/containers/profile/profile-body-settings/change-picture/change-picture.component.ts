import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileSystemFileEntry, UploadEvent, UploadFile} from "ngx-file-drop";
import {UserService} from "../../../../shared/services/user.service";
import {User} from "../../../../shared/models/user.model";
import {AppState} from "../../../../store/app.state";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/index";
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import {LoadProfile} from "../../../../store/actions/user.action";

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.scss']
})
export class ChangePictureComponent implements OnInit, OnDestroy {



  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  cropperSettings = new CropperSettings();
  data = {};

  public files: UploadFile[] = [];
  storeSub: Subscription;
  userServiceSub: Subscription;
  user: User;
  picture;

  constructor(private userService: UserService, private store: Store<AppState>) {

    this.cropperSettings.width = 150;
    this.cropperSettings.height = 200;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 400;

  }

  ngOnInit() {
    this.storeSub = this.store.select('userPage').subscribe(({user}) => {
      this.user = user;
    });
  }


  dropped(event: UploadEvent) {
    this.files = event.files;
    const that = this;
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          const reader: any = new FileReader();
          reader.onload = function(e: any) {
            this.picture = e.currentTarget.result;
            const image = new Image();
            image.src = reader.result;
            that.cropper.setImage(image);
          };
          reader.readAsDataURL(file);

        });
      }
    }
  }

  handleFiles(event) {
    const reader: any = new FileReader();
    const that = this;
    reader.onload = function(e: any) {
      this.picture = e.currentTarget.result;
      const image = new Image();
      image.src = reader.result;
      that.cropper.setImage(image);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  sendFile() {
    const cropPhoto = document.getElementById('crop').getAttribute('src');
    this.user.photo = cropPhoto;
    this.userServiceSub = this.userService.updateUser(this.user)
      .subscribe(data => {
        this.store.dispatch(new LoadProfile (data));
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.userServiceSub) {
      this.userServiceSub.unsubscribe();
    }
  }
}
