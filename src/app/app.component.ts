import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MetaService } from './services/meta.service';
// declare ga as a function to set and sent the events
declare let ga: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'shreeyantra';
  loderUrl = '/assets/images/photoShopLoader.gif';

  constructor(private router: Router, private meta: MetaService) {
    this.loadAnalytics();
  }
  loadAnalytics() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).gtag('config', 'UA-136945779-1', { 'page_path': event.urlAfterRedirects });
        //set meta tags on route change
        this.onActivate(event.urlAfterRedirects);
      }

    });
  }

  onActivate(path) {
    // let path: any = location.pathname;
    var re = new RegExp("%20", 'g');
    if (path.includes('/listing/') || path.includes('/details/')) {
      path = (path.substring(9, path.length)).replace(re, " ");
    }
    else if (path.includes('/blogdetails/')) {
      path = (path.substring(13, path.length)).replace(re, " ");
    } else {
      if (path.includes('/Content/')) {
        path = (path.replace(re, " ")).replace("/Content/", "");
      }
      else {
        path = (path.substring(1, 2)).toUpperCase() + path.substring(2, path.length);
      }
    }
    path = path.substring(path.indexOf('/') + 1, path.length);
    const sitename = "Shree Yantra India";
    this.meta.setTitle(path + ' | ' + sitename);
    this.meta.setTag('description', sitename + ' ' + path);
    this.meta.setTag('keywords', sitename + ' ' + path);
  }

  ngAfterViewInit() {
    const ement: any = document.getElementsByClassName('ng-spinner');
    if (ement && ement[0] && ement[0].style) {
      ement[0].style.backgroundImage = 'url(assets/images/shree.gif)';
    }
  }
}
