import { Component, OnInit } from '@angular/core';
import { MyaccountService } from '../services/myaccount.service';
import { PaginatorModule } from 'primeng/paginator';
import { CategoryService } from '../services/category.service';
import { NavigationService } from '../services/navigation.service';
import { ProductService } from 'src/app/services/product.service';
import { race } from 'rxjs/internal/observable/race';
import { imgUrl } from '../app.constants';

declare var $;
declare var require: any;
let googleTransliterate = require('google-input-tool');
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  imageServer = imgUrl;
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

  isEditable: boolean = false;
  selectedProducts: any = [];
  summerNoteArray: any = ['descriptionId', 'recommendationsId']
  productsTableData: any;
  formData: any = {
    productNameEnglish: "",
    productNameHindi: "",
    imagePath: "",
    relatedProduct: [],
    descriptionEnglish: "",
    descriptionHindi: "",
    recommendationEnglish: "",
    recommendationHindi: "",
    category: "",
    stockQuantity: "",
    status: ""
  };
  element: number;
  allCategories: any = [];
  showProductsForm: boolean = false;
  allProductsData: any = {};
  priceData: any;
  imageName: any = [];
  image: any;

  translatedTextArray = [];
  toggleDiv: boolean = false;
  onProductSelectEvent: any;
  nameEnglish: boolean = false;
  nameHindi: boolean = false;
  relatedProducts: boolean = false;
  descriptionEnglish: boolean = false;
  descriptionHindi: boolean = false;
  category: boolean = false;
  stockQuantity: boolean = false;
  status: boolean = false;
  recommendationEnglish: boolean;
  recommendationHindi: boolean;

  constructor(private myaccountService: MyaccountService,
    private categoryService: CategoryService,
    private navigationService: NavigationService, private productService: ProductService) { }

  ngOnInit() {
    this.getAllCategories();
    this.getMyAccountAllProductsForTable();
  }



  getMyAccountAllProductsForTable() {
    this.myaccountService.getMyAccountAllProducts().subscribe((res: any) => {
      if (res && res.value) {
        this.productsTableData = res.data;
        if (this.productsTableData.length > 0) {
          this.element = this.productsTableData.length - 1;
        }
        console.log("result", res, this.productsTableData);
      }
    });
  }



  onProductSelect(event) {
    this.onProductSelectEvent = event;
    this.myaccountService.getProductByIdAdmin(event.id).subscribe((res: any) => {
      if (res && res.value) {
        this.allProductsData = res;
        this.formData = {
          id: res.details.id,
          productNameEnglish: res.details.name_english,
          productNameHindi: res.details.name_hindi,
          imagePath: "",
          descriptionEnglish: res.details.description_english,
          descriptionHindi: res.details.description_hindi,
          recommendationEnglish: res.details.recommendation_english,
          recommendationHindi: res.details.recommendation_hindi,
          category: res.details.category_id,
          stockQuantity: res.details.stock,
          status: res.details.status,
          enquiry: res.details.enquiry

        }
        console.log("FormData", this.formData);
        console.log("result data", res);
        this.showProductsForm = true;
        this.isEditable = true;
      }
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      if (res && res.value) {
        this.allCategories = res.data;
      }
    });
  }

  toggleproductForm() {
    this.showProductsForm = false;
    this.formData = {
      productNameEnglish: "",
      productNameHindi: "",
      imagePath: [],
      descriptionEnglish: "",
      descriptionHindi: "",
      recommendationEnglish: "",
      recommendationHindi: "",
      category: "",
      stockQuantity: "",
      status: "",
      price: [],
    };
  }

  addProduct() {
    this.showProductsForm = !this.showProductsForm;
    if (this.showProductsForm) {
      this.navigationService.getNavigation().subscribe((res: any) => {
        if (res.value) {
          this.allProductsData = res.data;
          this.allProductsData.price = res.currency;
        }
      }, err => console.log(err));

      // this.showProductsForm = !this.showProductsForm;
    } else {
      this.formData = {
        productNameEnglish: "",
        productNameHindi: "",
        descriptionEnglish: "",
        descriptionHindi: "",
        recommendationEnglish: "",
        recommendationHindi: "",
        category: "",
        stockQuantity: "",
        status: "",
        enquiry: ""
      };

    }


  }

  calculateExchangeRates(data) {
    if (data.currency_name == 'INR') {
      this.allProductsData.price.forEach(element => {
        if (element.currency_name != 'INR') {
          element.price = element.exchange_rate * data.price;
          element.price = parseFloat(element.price).toFixed(8);
        }
      });

    }
  }

  calculateDiscount(data) {
    data.regular_price = data.price - (data.price * (data.discount / 100));
    data.regular_price = parseFloat(data.regular_price).toFixed(2);
    // regular_price
  }

  onFileChange(fileInput: any) {
    this.imageName = [];
    let files = fileInput.srcElement.files;
    for (let i = 0; i < files.length; i++) {
      this.imageName.push(files[i]);
    }
    this.image = files;
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
        model.formData[ngmodel] = response[0];
      });
  }

  onEnglishTextKeyUp(event) {
    this.toggleDiv = true;
  }

  setText(textInHindi) {
    console.log(textInHindi);
    if (textInHindi) {
      this.formData.productNameHindi = textInHindi;
      this.toggleDiv = false;
    }
  }

  deleteProduct(data) {
    console.log("Product deleted" + data.id);
  }

  remove(item) {
    let fIndex = this.selectedProducts && this.selectedProducts.length > 0 ? this.selectedProducts.findIndex(i => item.id == i) : -1;
    if (fIndex != -1) {
      this.selectedProducts.splice(fIndex, 1);
    }
    console.log("aaaaa", item, this.selectedProducts);
  }

  setSelectedRelatedProducts(item) {
    let fIndex = this.selectedProducts && this.selectedProducts.length > 0 ? this.selectedProducts.findIndex(i => item.id == i) : -1;
    if (fIndex == -1) {
      this.selectedProducts.push(item.id);
    }
  }

  saveFormData() {
    if (this.validateForm()) {
      this.showProductsForm = false;
      this.formData.price = this.allProductsData.price;
      this.formData.imagePath = this.imageName;
      this.formData.relatedProduct = this.selectedProducts;
      console.log("this.formData", this.formData);
      this.productService.createProduct(this.formData).subscribe((res: any) => {
        console.log(res);
        this.formData = {};
        this.imageName = [];
        this.selectedProducts = [];
        this.getAllCategories();
        this.getMyAccountAllProductsForTable();
      })
    } else {
      return false;
    }
  }

  validateForm() {
    if (this.formData.productNameEnglish == "" || this.formData.productNameEnglish == null) {
      this.nameEnglish = true;
    } else {
      this.nameEnglish = false;
    }
    if (this.formData.productNameHindi == "" || this.formData.productNameHindi == null) {
      this.nameHindi = true;
    } else {
      this.nameHindi = false;
    }

    if (this.formData.relatedProduct == "" || this.formData.relatedProduct == null) {
      this.relatedProducts = true;
    } else {
      this.relatedProducts = false;
    }

    if (this.formData.descriptionEnglish == "" || this.formData.descriptionEnglish == null) {
      this.descriptionEnglish = true;
    } else {
      this.descriptionEnglish = false;
    }

    if (this.formData.descriptionHindi == "" || this.formData.descriptionHindi == null) {
      this.descriptionHindi = true;
    } else {
      this.descriptionHindi = false;
    }
    if (this.formData.recommendationEnglish == "" || this.formData.recommendationEnglish == null) {
      this.recommendationEnglish = true;
    } else {
      this.recommendationEnglish = false;
    }
    if (this.formData.recommendationHindi == "" || this.formData.recommendationHindi == null) {
      this.recommendationHindi = true;
    } else {
      this.recommendationHindi = false;
    }

    if (this.formData.category == "" || this.formData.category == null) {
      this.category = true;
    } else {
      this.category = false;
    }

    if (this.formData.stockQuantity == "" || this.formData.stockQuantity == null) {
      this.stockQuantity = true;
    } else {
      this.stockQuantity = false;
    }

    if (this.formData.status == "" || this.formData.status == null) {
      this.status = true;
    } else {
      this.status = false;
    }
    if ((this.nameEnglish) && (this.nameHindi) && (this.relatedProducts) && (this.descriptionEnglish) && (this.descriptionHindi) && (this.category) && (this.stockQuantity) && (this.status) && (this.recommendationEnglish) && (this.recommendationHindi)) {
      return false;
    } else {
      return true;
    }
  }

  deletePreviousImage(imageId) {
    this.productService.deleteProductImage(imageId).subscribe((res: any) => {
      console.log("Image deleted successfully" + res);
      this.onProductSelect(this.onProductSelectEvent);
    });
  }

}
