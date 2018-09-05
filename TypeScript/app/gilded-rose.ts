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
            
            let itemRules = this.getItemRules(item.name);

            itemRules.updateItemQuality(item);
            itemRules.updateItemSellIn(item);
            if(item.sellIn < 0) {
                itemRules.updateItemQualityExpired(item);
            }
        }

        return this.items;
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

    isLegendaryItem(name: string): boolean {
            return legendaryItems.indexOf(name) > -1;
    }
}
