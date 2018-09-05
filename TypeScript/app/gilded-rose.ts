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
            this.updateItemQuality(i);
            this.updateItemSellIn(i);
            this.updateExpiredItems(i);
        }

        return this.items;
    }

    updateItemQuality(i: number) {
        if (this.isNormalItem(this.items[i].name)) {
            if (this.items[i].quality > 0) {
                    this.items[i].quality = this.items[i].quality - 1
            }
        } else if (!this.isLegendaryItem(this.items[i].name)) {
            if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
                if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (this.items[i].sellIn < 11) {
                        if (this.items[i].quality < 50) {
                            this.items[i].quality = this.items[i].quality + 1
                        }
                    }
                    if (this.items[i].sellIn < 6) {
                        if (this.items[i].quality < 50) {
                            this.items[i].quality = this.items[i].quality + 1
                        }
                    }
                }
            }
        }
    }

    updateItemSellIn(i: number) {
        if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].sellIn = this.items[i].sellIn - 1;
        }
    }

    updateExpiredItems(i: number) {
        if (this.items[i].sellIn < 0) {
            if (this.items[i].name != 'Aged Brie') {
                if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                    if (this.items[i].quality > 0) {
                        if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                            this.items[i].quality = this.items[i].quality - 1
                        }
                    }
                } else {
                    this.items[i].quality = this.items[i].quality - this.items[i].quality
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                }
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
        return name === 'Sulfuras, Hand of Ragnaros';
    }
}
