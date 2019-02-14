import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {


  @ViewChild('top') scrollElem: ElementRef;

  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset) {
      this.scrollElem.nativeElement.style.opacity = '1';
    } else {
      this.scrollElem.nativeElement.style.opacity = '0';
    }
  }

  ngOnInit() {
    if (window.pageYOffset) {
      this.scrollElem.nativeElement.style.opacity = '1';
    } else {
      this.scrollElem.nativeElement.style.opacity = '0';
    }
  }

  scrollToTop() {
    document.documentElement.scrollTop = 0;
  }

}
