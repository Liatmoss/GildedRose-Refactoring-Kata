import { Item } from '../app/item';

const minQuality = 0;
const maxQuality = 50;

export interface ItemRules {
    updateItemQuality(Item): void;
    updateItemSellIn(Item): void;
    updateItemQualityExpired(Item): void;
}

export class DefaultItemRules implements ItemRules {
    updateItemQuality(i: Item): void {
        decrementQuality(i);
    }

    updateItemSellIn(i: Item): void {
        i.sellIn = i.sellIn - 1;
    }

    updateItemQualityExpired(i: Item): void {
        decrementQuality(i); 
    }
}

export class LegendaryItemRules implements ItemRules {
    updateItemQuality(i: Item): void {
        return;
    }

    updateItemSellIn(i: Item): void {
        return;
    }

    updateItemQualityExpired(i: Item): void {
        return; 
    }
}

export class AgedBrieItemRules implements ItemRules {
    updateItemQuality(i: Item): void {
        incrementQuality(i);
    }

    updateItemSellIn(i: Item): void {
        i.sellIn = i.sellIn - 1;
    }

    updateItemQualityExpired(i: Item): void {
        incrementQuality(i);
    }
}

export class BackstagePassItemRules implements ItemRules {
    updateItemQuality(i: Item): void {
        incrementQuality(i);

        if (i.sellIn < 11) {
            incrementQuality(i);
        }

        if (i.sellIn < 6) {
            incrementQuality(i);
        }
    }

    updateItemSellIn(i: Item): void {
        i.sellIn = i.sellIn - 1;
    }

    updateItemQualityExpired(i: Item): void {
        i.quality = 0;
    }
}

function decrementQuality(i: Item): void {
    if(i.quality > minQuality) {
        i.quality = i.quality - 1;
    }
}

function incrementQuality(i: Item): void {
    if(i.quality < maxQuality) {
        i.quality = i.quality + 1;
    }
}