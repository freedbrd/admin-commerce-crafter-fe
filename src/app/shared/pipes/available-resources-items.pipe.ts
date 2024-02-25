import { Pipe, PipeTransform } from '@angular/core';
import { IProfileResource } from '../interfaces/business-profile.interface';

@Pipe({
  name: 'availableResourcesItems',
  standalone: true,
})
export class AvailableResourcesItemsPipe implements PipeTransform {

  transform(value: IProfileResource[]): Array<{
    label: string,
    value: string
  }> {
    return [
      ...value.map(item => ({
        label: item.name,
        value: item.id,
      }))];
  }

}
