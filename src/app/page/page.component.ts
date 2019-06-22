import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToasterService } from '../services/toaster.service';
declare var $;

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent implements OnInit {
  pageData: any;
  showForm: any = false;
  isEdit: boolean = false;
  imageName: any[];
  image: any;

  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']]
    ],
    buttons: {
      // 'testBtn': this.customButton()
    }
  };

  formData: any = {};
  constructor(private contentService: ContentService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.getAllContent();

  }


  onButtonclick() {
    this.showForm = !this.showForm;
    this.formData = {};
    this.isEdit = false;
  }

  onEditSelect(data) {
    this.isEdit = true;
    this.formData = data;
    this.formData.id = data.id;
    this.showForm = true;
  }

  submitPage(data) {
    this.contentService.createContent(data).subscribe((res: any) => {
      if (res.value) {
        this.showForm = false;
        this.formData = {};
        this.getAllContent();
        this.toasterService.show(res.message, 'success');
      } else {
        this.toasterService.show(res.message, 'warning');
      }
    }, err => console.log(err));
  }



  deletePage(data) {
    console.log("delete data", data);
  }

  getAllContent() {
    this.contentService.getAllContent().subscribe((res: any) => {
      this.pageData = res.data;
    })
  }



  onFileChange(fileInput: any) {
    this.imageName = [];
    let files = fileInput.srcElement.files;
    for (let i = 0; i < files.length; i++) {

      this.imageName.push(files[i]['name']);
    }
    this.image = files[0];

  }

}
