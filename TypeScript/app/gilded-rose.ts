import { Item } from './item';
import * as Rules from './item-rules';

const legendaryItems = ['Sulfuras, Hand of Ragnaros'];
const specialItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert'];

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            
            let itemRules = new Rules.DefaultItemRules();
            if(this.isLegendaryItem(item.name)) {
                itemRules = new Rules.LegendaryItemRules();
            }
            else if(item.name === 'Aged Brie') {
                itemRules = new Rules.AgedBrieItemRules();
            }
            else if(item.name === 'Backstage passes to a TAFKAL80ETC concert') {
                itemRules = new Rules.BackstagePassItemRules();
            }

            itemRules.updateItemQuality(item);
            itemRules.updateItemSellIn(item);
            if(item.sellIn < 0) {
                itemRules.updateItemQualityExpired(item);
            }
        }

        return this.items;
    }

    isNormalItem(name: string): boolean {
        if(specialItems.indexOf(name) > -1 || legendaryItems.indexOf(name) > -1) {
            return false;
        }
        return true;
    }

    isLegendaryItem(name: string): boolean {
            return legendaryItems.indexOf(name) > -1;
    }
}
