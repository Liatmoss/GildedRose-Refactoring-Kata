const legendaryItems = ['Sulfuras, Hand of Ragnaros'];
const specialItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert']

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
            this.updateExpiredItems(item);
        }

        return this.items;
    }

    updateItemQuality(i: Item) {
        if (this.isNormalItem(i.name)) {
            if (i.quality > 0) {
                    i.quality = i.quality - 1
            }
        } else if (!this.isLegendaryItem(i.name)) {
            if (i.quality < 50) {
                i.quality = i.quality + 1
                if (i.name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (i.sellIn < 11) {
                        if (i.quality < 50) {
                            i.quality = i.quality + 1
                        }
                    }
                    if (i.sellIn < 6) {
                        if (i.quality < 50) {
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

    updateExpiredItems(i: Item) {
        if (i.sellIn < 0) {
            if (this.isNormalItem(i.name)) {
                if (i.quality > 0) {
                    i.quality = i.quality - 1
                }
            } else if (i.name === 'Aged Brie') {
                if (i.quality < 50) {
                    i.quality = i.quality + 1
                }
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
}
