import { Item } from '../app/item';
import { calculateModifier } from './item-modifiers';

const minQuality = 0;
const maxQuality = 50;

export interface ItemRules {
    updateQuality(Item): void;
    updateSellIn(Item): void;
    updateQualityExpired(Item): void;
}

export class DefaultItemRules implements ItemRules {
    updateQuality(i: Item): void {
        decrementQuality(i);
    }

    updateSellIn(i: Item): void {
        i.sellIn = i.sellIn - 1;
    }

    updateQualityExpired(i: Item): void {
        decrementQuality(i); 
    }
}

export class LegendaryItemRules implements ItemRules {
    updateQuality(i: Item): void {
        return;
    }

    updateSellIn(i: Item): void {
        return;
    }

    updateQualityExpired(i: Item): void {
        return; 
    }
}

export class AgedBrieItemRules implements ItemRules {
    updateQuality(i: Item): void {
        incrementQuality(i);
    }

    updateSellIn(i: Item): void {
        i.sellIn = i.sellIn - 1;
    }

    updateQualityExpired(i: Item): void {
        incrementQuality(i);
    }
}

export class BackstagePassItemRules implements ItemRules {
    updateQuality(i: Item): void {
        incrementQuality(i);

        if (i.sellIn < 11) {
            incrementQuality(i);
        }

        if (i.sellIn < 6) {
            incrementQuality(i);
        }
    }

    updateSellIn(i: Item): void {
        i.sellIn = i.sellIn - 1;
    }

    updateQualityExpired(i: Item): void {
        i.quality = 0;
    }
}

function decrementQuality(i: Item): void {
    if(i.quality > minQuality) {
        i.quality = i.quality - calculateModifier(i.name);
    }
}

function incrementQuality(i: Item): void {
    if(i.quality < maxQuality) {
        i.quality = i.quality + calculateModifier(i.name);
    }
}