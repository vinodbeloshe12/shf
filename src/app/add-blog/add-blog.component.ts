import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { imgUrl } from '../app.constants';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.less']
})
export class AddBlogComponent implements OnInit {
  imageServer = imgUrl;
  image: any;
  imageName: any;
  blogData: any;
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

  formData: any = {
    titleEnglish: "",
    titleHindi: "",
    image: "",
    relatedProduct: [],
    descriptionEnglish: "",
    descriptionHindi: "",
    status: ""
  };
  showProductsForm: boolean = false;

  constructor(private blogService: BlogService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.getAllBlog();
  }

  toggleBlogAddForm() {
    this.showProductsForm = !this.showProductsForm;
  }

  getAllBlog() {
    this.blogService.getAllBlog().subscribe((res: any) => {
      if (res.value) {
        this.blogData = res.data
      }
    }, err => console.log(err));
  }

  editBlog(data) {
    console.log("data", data);
    if (data) {
      this.showProductsForm = !this.showProductsForm;
      this.formData = {
        id: data.id,
        titleEnglish: data.title_english,
        titleHindi: data.hindi,
        image: data.image_name,
        relatedProduct: [],
        descriptionEnglish: data.description,
        descriptionHindi: "",
        status: data.status
      }
    }
  }

  onFileChange(fileInput: any) {
    let files = fileInput.srcElement.files;
    this.imageName = files[0].name;
    this.image = files[0];
    console.log("image", this.image);
  }


  createBlog(data) {
    data['image'] = this.image;
    this.blogService.createBlog(data).subscribe((result: any) => {
      if (result.value) {
        this.formData = {};
        this.image = "";
        this.toasterService.show('Blog added', 'success');
        this.getAllBlog();
      } else {
        this.toasterService.show(result.message, 'warning');
      }
      this.showProductsForm = !this.showProductsForm;
    });
  }

  deleteBlog(data) {
    console.log("data", data);
    this.blogService.deleteBlog(data.id).subscribe((res: any) => {
      if (res.value) {
        this.toasterService.show('Blog Deleted', 'success');
        this.getAllBlog();
      }
    }, err => console.log(err));
  }
}
