import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'colorCell'
})

export class ColorCellPipe implements PipeTransform {
  transform(value: number): string {
    return value >= 40000 ? 'high-sales' : 'low-sales';
  }
}
