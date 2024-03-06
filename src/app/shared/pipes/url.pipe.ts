import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'url',
  standalone: true
})
export class UrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${location.protocol}//${value}`);
  }

}
