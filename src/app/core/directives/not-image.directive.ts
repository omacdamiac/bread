import { Directive, ElementRef, HostListener } from '@angular/core';
// import { DataPresenterService } from '@data/repository/data-presenter.service';
@Directive({
  selector: '[appNotImage]',
})
export class NotImageDirective {
  constructor(
    private imgAll: ElementRef,
    // private dataPresenterService: DataPresenterService
  ) {}
  @HostListener('error')
  onError(): void {
    this.imgAll.nativeElement.src = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
  }
}
