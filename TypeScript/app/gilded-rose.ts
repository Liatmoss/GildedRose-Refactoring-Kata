import { Item } from './item';
import * as Rules from './item-rules';

const legendaryItems = ['Sulfuras, Hand of Ragnaros'];

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    updateQuality(): Array<Item> {

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            this.updateItemQuality(item);
        }

        return this.items;
    }

    updateItemQuality(item: Item): void {
        let itemRules = this.getItemRules(item.name);

        itemRules.updateQuality(item);
        itemRules.updateSellIn(item);
        if(this.isExpired(item)) {
            itemRules.updateQualityExpired(item);
        }
    }

    getItemRules(name: string): Rules.ItemRules {

        if(this.isLegendaryItem(name)) {
            return new Rules.LegendaryItemRules();
        }
        else if(this.isTypeOfItem(name, 'Aged Brie')) {
            return new Rules.AgedBrieItemRules();
        }
        else if(this.isTypeOfItem(name, 'Backstage passes to a TAFKAL80ETC concert')) {
            return new Rules.BackstagePassItemRules();
        }
        
        return new Rules.DefaultItemRules();
    }
    
    isExpired(i: Item) {
        return i.sellIn < 0;
    }

    isLegendaryItem(name: string): boolean {
        for(let j = 0; j < legendaryItems.length; j = j + 1) {
            if(this.isTypeOfItem(name, legendaryItems[j])) {
                return true;
            }
        }
        return false;
    }

    isTypeOfItem(name: string, itemType: string): boolean {
        return name.indexOf(itemType) > -1;
    }
}
