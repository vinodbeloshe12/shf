import { Component, OnInit } from "@angular/core";
import { SliderService } from "../services/slider.service";
import { ToasterService } from "../services/toaster.service";
import { imgUrl } from '../app.constants';
@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.less"]
})
export class SliderComponent implements OnInit {
  imageServer = imgUrl;
  navData: any;
  isEdit: boolean = false;
  showForm: boolean = false;
  imageName: any[];
  image: any;
  formData: any = {
    description: "",
    image: "",
    title: "",
    status: "",
    order: ""
  };

  config: any = {
    height: "200px",
    uploadImagePath: "/api/upload",
    toolbar: [
      ["misc", ["codeview", "undo", "redo", "codeBlock"]],
      [
        "font",
        [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "superscript",
          "subscript",
          "clear"
        ]
      ],
      ["fontsize", ["fontname", "fontsize", "color"]],
      ["para", ["style0", "ul", "ol", "paragraph", "height"]],
      ["insert", ["table", "picture", "link", "video", "hr"]],
      ["customButtons", ["testBtn"]]
    ],
    buttons: {
      // 'testBtn': this.customButton()
    }
  };
  sliderData: any;
  constructor(
    private sliderService: SliderService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.getAllSlider();
  }

  onButtonclick() {
    this.showForm = !this.showForm;
    this.formData = {};
    this.isEdit = false;
    this.imageName = [];
  }

  getAllSlider() {
    this.sliderService.getAllSlider().subscribe(
      (res: any) => {
        if (res.value) {
          this.sliderData = res.data;
        }
      },
      err => console.log(err)
    );
  }

  submitSlider(data) {
    data.image = this.image;
    this.sliderService.createSlider(data).subscribe(
      (res: any) => {
        // if (res.value) {
        console.log("added");
        this.getAllSlider();
        this.toasterService.show("Slider added successfully", "success");
        this.showForm = false;
        this.formData = {};
        // }
      },
      err => console.log(err)
    );
  }

  onEditSelect(data) {
    this.imageName = data.link;
    this.isEdit = true;
    this.formData = data;
    this.formData.id = data.id;
    this.showForm = true;
  }



  deleteSlider(data) {
    console.log(data);
    this.sliderService.deleteSlider(data.id).subscribe((res: any) => {
      this.getAllSlider();
      this.toasterService.show("Record deleted successfully", "success");
    },
      err => console.log(err))
  }

  onFileChange(fileInput: any) {
    const files = fileInput.srcElement.files;
    this.imageName = files[0].name;
    this.image = files[0];
  }
}
