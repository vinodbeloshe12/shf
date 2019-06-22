import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ToasterService } from '../services/toaster.service';
import { imgUrl } from '../app.constants';
declare var require: any;
let googleTransliterate = require('google-input-tool');
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
  image: any;
  imageServer = imgUrl;
  categoryData: any = {
    id: "",
    nameEnglish: "",
    nameHindi: "",
    image: "",
    order: "",
    status: "",
    date: ""
  }
  imageName: string = '';
  translatedTextArray = [];
  toggleDiv: boolean = false;
  categoriesTableData: any;
  showCategoryForm: boolean = false;
  constructor(private categoryService: CategoryService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  changeText(text, ngmodel) {
    ngmodel = ngmodel + "Hindi";
    console.log("text", text);
    let inputLanguage = 'mr-t-i0-und';
    let maxResult = 8;
    let request = new XMLHttpRequest();
    let model = this;
    googleTransliterate(request, text, inputLanguage, maxResult)
      .then(function (response) {
        console.log('Transliterated Text: ', response);
        // return response;
        model.translatedTextArray = [];
        model.translatedTextArray = response;
        model.categoryData[ngmodel] = response[0];
      });
  }

  setText(textInHindi) {
    console.log(textInHindi);
    if (textInHindi) {
      this.categoryData.nameHindi = textInHindi;
      this.toggleDiv = false;
    }
  }

  onEnglishTextKeyUp(event) {
    this.toggleDiv = true;
  }

  submitCategory(data) {
    data['image'] = this.image;
    console.log("data", data);
    this.categoryService.createCategory(data).subscribe((result: any) => {
      console.log("result", result);
      if (result.value) {
        this.toasterService.show('Category added', 'success');
      } else {
        this.toasterService.show(result.message, 'warning');
      }
      this.showCategoryForm = !this.showCategoryForm;
      this.getAllCategories();
    });
  }

  onFileChange(fileInput: any) {
    let files = fileInput.srcElement.files;
    this.imageName = files[0].name;
    this.image = files[0];
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((result: any) => {
      console.log("categories", result);
      if (result && result.data.length > 0) {
        this.categoriesTableData = result.data;
      }
    });
  }


  clearData() {
    this.categoryData = {
      id: "",
      nameEnglish: "",
      nameHindi: "",
      image: "",
      order: "",
      status: "",
      date: ""
    }
  }



  deletePreviousImage(imageId) {
    alert("Image Deleted" + imageId);
  }


  addCategory() {
    this.showCategoryForm = !this.showCategoryForm;
    this.clearData();
  }

  editCategory(data) {
    if (data) {
      this.showCategoryForm = !this.showCategoryForm;
      this.categoryData = {
        id: data.id,
        nameEnglish: data.name_english,
        nameHindi: data.name_hindi,
        image: data.image_name,
        order: data.order,
        status: data.status,
        date: data.date
      }
    }
  }

  deleteCategory(data) {
    if (data) {
      let id = data.id
      this.categoryService.deleteCategory(id).subscribe((res: any) => {
        if (res.value) {
          this.toasterService.show('Category deleted Successfully.', 'success');
          this.getAllCategories();
        }
      });
    }
  }
}
