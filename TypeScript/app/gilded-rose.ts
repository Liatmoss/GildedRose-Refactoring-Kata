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
        else if(name === 'Aged Brie') {
            return new Rules.AgedBrieItemRules();
        }
        else if(name === 'Backstage passes to a TAFKAL80ETC concert') {
            return new Rules.BackstagePassItemRules();
        }
        
        return new Rules.DefaultItemRules();
    }
    
    isExpired(i: Item) {
        return i.sellIn < 0;
    }

    isLegendaryItem(name: string): boolean {
            return legendaryItems.indexOf(name) > -1;
    }
}
