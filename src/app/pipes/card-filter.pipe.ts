import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardFilter'
})
export class CardFilterPipe implements PipeTransform {

  transform(cards: any[], searchText: string, filterType: string): any[] {
    if (!cards || !searchText || !filterType) {
      return cards;
    }

    searchText = searchText.toLowerCase();

    return cards.filter(card => {
      const value = card[filterType];
      
      if (value) {
        return value.toString().toLowerCase().includes(searchText);
      }

      return false;
    });
  }

}
