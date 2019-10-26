import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {
  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.style.backgroundColor = '#116193';
  }
}
@Directive({
  selector: '[appPadding]'
})
export class PaddingDirective {
  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.style.paddingLeft = '20px';
    elementRef.nativeElement.style.paddingRight = '20px';
    elementRef.nativeElement.style.maxWidth = '100%';
  }
}
@Directive({
  selector: '[appFull]'
})
export class FullDirective {
  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.style.display = 'block';
    elementRef.nativeElement.style.width = '100%';
  }
}
@Directive({
  selector: '[appCenter]'
})
export class CenterDirective {
  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.style.display = 'flex';
    elementRef.nativeElement.style.justifyContent = 'center';
  }
}
