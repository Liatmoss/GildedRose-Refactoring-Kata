const legendaryItems = ['Sulfuras, Hand of Ragnaros'];
const specialItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert'];
const minQuality = 0;
const maxQuality = 50;

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            this.updateItemQuality(item);
            this.updateItemSellIn(item);
            this.updateExpiredItem(item);
        }

        return this.items;
    }

    updateItemQuality(i: Item) {
        if (this.isNormalItem(i.name)) {
            this.decrementQuality(i);
        } else if (!this.isLegendaryItem(i.name)) {
            if (i.quality < maxQuality) {
                i.quality = i.quality + 1
                if (i.name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (i.sellIn < 11) {
                        if (i.quality < maxQuality) {
                            i.quality = i.quality + 1
                        }
                    }
                    if (i.sellIn < 6) {
                        if (i.quality < maxQuality) {
                            i.quality = i.quality + 1
                        }
                    }
                }
            }
        }
    }

    updateItemSellIn(i: Item) {
        if (!this.isLegendaryItem(i.name)) {
            i.sellIn = i.sellIn - 1;
        }
    }

    updateExpiredItem(i: Item) {
        if (i.sellIn < minQuality) {
            if (this.isNormalItem(i.name)) {
                this.decrementQuality(i);
            } else if (i.name === 'Aged Brie') {
                this.incrementQuality(i);
            } else if (i.name === 'Backstage passes to a TAFKAL80ETC concert') {
                i.quality = 0;
            }
        }
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

    decrementQuality(i: Item) {
        if(i.quality > minQuality) {
            i.quality = i.quality - 1;
        }
    }

    incrementQuality(i: Item) {
        if(i.quality < maxQuality) {
            i.quality = i.quality + 1;
        }
    }
}
