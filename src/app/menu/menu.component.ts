import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ContentService } from '../services/content.service';
import { ToasterService } from '../services/toaster.service';
declare var $;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  navData: any;
  contentData: any;
  imageName: any[];
  showMenuForm: any = false;
  showSelectPage: any = false;
  image: any;
  title: any;

  summerNoteArray: any = ['descriptionId', 'descriptionIdHindi']
  formData: any = {};
  constructor(private navigationService: NavigationService, private contentService: ContentService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.allNavigation();
    this.allContent();
  }

  allNavigation() {
    this.navigationService.getAllNavigation().subscribe((result: any) => {
      this.navData = result.data;
    });
  }

  allContent() {
    this.contentService.getAllContentPage().subscribe((res: any) => {
      this.contentData = res.data;
      console.log("test", this.contentData)
    });
  }

  setTargetUrl(val) {
    console.log("innn", val);
    this.formData.target_url = "/Content/" + val;
  }

  onFileChange(fileInput: any) {
    this.imageName = [];
    let files = fileInput.srcElement.files;
    for (let i = 0; i < files.length; i++) {

      this.imageName.push(files[i]['name']);
    }
    this.image = files[0];

  }


  saveMenu(data) {
    console.log("data", data);
    this.navigationService.createNavigation(data).subscribe((res: any) => {
      console.log("aaa", res);
      if (res.value) {
        this.formData = {};
        this.toasterService.show(res.message, "success");
        this.showMenuForm = false;
        this.allNavigation();
      } else {
        this.toasterService.show(res.message, "success");

      }
    }, err => console.log(err));
  }

  deleteMenu(data) {
    this.navigationService.deleteNavigation(data.id).subscribe((res: any) => {
      this.toasterService.show(res.message, "success");
      this.allNavigation();
    }, err => console.log(err));
  }

  addMenu() {
    this.formData = {};
    this.showMenuForm = !this.showMenuForm;
  }

  editMenu(rowData) {
    this.showMenuForm = !this.showMenuForm;
    console.log(rowData);
    this.formData = rowData;
  }

  showPagetype(pgtype) {
    if (pgtype == "dynamic") {
      this.showSelectPage = true;
    }
    else {
      // alert('this is static page');
      this.formData.targetUrl = "";
      this.showSelectPage = false;
    }
  }
}
