import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { DetailsComponent } from './details/details.component';
import { SwiperComponent } from './swiper/swiper.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrderComponent } from './order/order.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { FaqsComponent } from './faqs/faqs.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PhotogalleryComponent } from './photogallery/photogallery.component';
import { VideogalleryComponent } from './videogallery/videogallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
// import { RatingModule } from "ng2-rating";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { DropdownModule } from 'primeng/dropdown';
import { DataTableModule } from 'primeng/datatable';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { EscapeHtmlPipe } from 'src/app/pipes/keep-html.pipe';
import { OrderByPipe } from './pipes/orderBy';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { QuickviewComponent } from './quickview/quickview.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NgxStarsModule } from 'ngx-stars';
import { BlogComponent } from './blog/blog.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { ImageZoomModule } from 'angular2-image-zoom';

import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './content/content.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { PopupComponent } from './popup/popup.component';
import { EmbedVideo } from 'ngx-embed-video';
import { PresenceComponent } from './presence/presence.component';
import { PageComponent } from './page/page.component';
import { ScientificEvidenceComponent } from './scientific-evidence/scientific-evidence.component';
import { AuthenticatedMeasuresComponent } from './authenticated-measures/authenticated-measures.component';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { CertificateComponent } from './certificate/certificate.component';

import { ShareButtonsModule } from '@ngx-share/buttons';
import { ToasterComponent } from './toaster/toaster.component';
import { MenuComponent } from './menu/menu.component';
import { AddBlogComponent } from './add-blog/add-blog.component';

import { TagInputModule } from 'ngx-chips';
import { NgxSummernoteModule } from 'ngx-summernote';
import { LocationComponent } from './location/location.component';
import { SliderComponent } from './slider/slider.component';
import { NgxPaginationModule } from 'ngx-pagination';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ListingComponent,
    DetailsComponent,
    SwiperComponent,
    CartComponent,
    WishlistComponent,
    OrderComponent,
    OrderdetailsComponent,
    FaqsComponent,
    MyaccountComponent,
    AboutusComponent,
    ContactusComponent,
    PhotogalleryComponent,
    VideogalleryComponent,
    LoginComponent,
    CategoryComponent,
    ProductComponent,
    CheckoutComponent,
    EscapeHtmlPipe,
    OrderByPipe,
    PagenotfoundComponent,
    QuickviewComponent,
    GalleryComponent,
    BlogComponent,
    BlogdetailsComponent,
    ContentComponent,
    UserComponent,
    ProfileComponent,
    PopupComponent,
    PresenceComponent,
    PageComponent,
    ScientificEvidenceComponent,
    AuthenticatedMeasuresComponent,
    CertificateComponent,
    ToasterComponent,
    MenuComponent,
    AddBlogComponent,
    LocationComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxGalleryModule,
    // RatingModule,
    FormsModule,
    SwiperModule,
    DropdownModule,
    AutoCompleteModule,
    DataTableModule,
    NgxStarsModule,
    CalendarModule,
    BrowserAnimationsModule,
    ImageZoomModule,
    EmbedVideo.forRoot(),
    NgProgressModule.forRoot(),
    NgProgressHttpModule.forRoot(),
    ShareButtonsModule,
    TagInputModule,
    NgxSummernoteModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
