import 'mocha';
import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should contain the correct item', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items.length).to.equal(1);
        expect(items[0].name).to.equal('foo');
    });

    it('sellIn should decrease at end of day', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(9);
    });

    it('quality decreases by 1 if sell by date has not expired', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(9);
    });

    it('quality decreases by 2 if sell by date has expired', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
    });

    it('quality does not become negative', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    })

    it('Aged Brie increases in quality the older it gets', function () {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(11);
    })

    it('quality cannot increase beyond 50', function () {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 10, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
    })

    it('Sulfuras never has to be sold or loses value', function () {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 10, 25)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(10);
        expect(items[0].quality).to.equal(25);
    })

});
