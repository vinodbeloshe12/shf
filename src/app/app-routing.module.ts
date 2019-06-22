import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { DetailsComponent } from './details/details.component';
import { PhotogalleryComponent } from './photogallery/photogallery.component';
import { VideogalleryComponent } from './videogallery/videogallery.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CartComponent } from './cart/cart.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FaqsComponent } from './faqs/faqs.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { OrderComponent } from './order/order.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { LoginComponent } from 'src/app/login/login.component';
import { CategoryComponent } from 'src/app/category/category.component';
import { ProductComponent } from 'src/app/product/product.component';
import { CheckoutComponent } from 'src/app/checkout/checkout.component';
import { PagenotfoundComponent } from 'src/app/pagenotfound/pagenotfound.component';
import { QuickviewComponent } from 'src/app/quickview/quickview.component';
import { GalleryComponent } from 'src/app/gallery/gallery.component';
import { BlogComponent } from 'src/app/blog/blog.component';
import { BlogdetailsComponent } from 'src/app/blogdetails/blogdetails.component';

import { ContentComponent } from 'src/app/content/content.component';
import { AuthGuard } from './auth/auth.guard';
import { PopupComponent } from './popup/popup.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { PresenceComponent } from './presence/presence.component';
import { PageComponent } from './page/page.component';
import { ScientificEvidenceComponent } from './scientific-evidence/scientific-evidence.component';
import { AuthenticatedMeasuresComponent } from './authenticated-measures/authenticated-measures.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { CertificateComponent } from './certificate/certificate.component';
import { MenuComponent } from './menu/menu.component';
import { LocationComponent } from './location/location.component';
import { SliderComponent } from './slider/slider.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listing/:name', component: ListingComponent },
  { path: 'details/:product_id/:product_name', component: DetailsComponent },
  { path: 'pictures', component: PhotogalleryComponent },
  { path: 'video-gallery', component: VideogalleryComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'myaccount', component: MyaccountComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'orderdetails/:id', component: OrderdetailsComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'quickview', component: QuickviewComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blogdetails/:id/:name', component: BlogdetailsComponent },
  { path: 'Content/:str', component: ContentComponent },
  { path: 'popup', component: PopupComponent },
  { path: 'user', component: UserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'presence', component: PresenceComponent },
  { path: 'patent-certificate', component: CertificateComponent },
  { path: 'page', component: PageComponent },
  { path: 'scientificevidence', component: ScientificEvidenceComponent },
  { path: 'authenticatedmeasures', component: AuthenticatedMeasuresComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'add-blog', component: AddBlogComponent },
  { path: 'location', component: LocationComponent },
  { path: 'slider', component: SliderComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
