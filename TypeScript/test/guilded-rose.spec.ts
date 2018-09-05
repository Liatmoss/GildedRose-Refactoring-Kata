import 'mocha';
import { expect } from 'chai';
import { Item } from '../app/item';
import { GildedRose } from '../app/gilded-rose';

function testSellIn(testItem: Item, expectedSellIn: number) {
    //Arrange
    const gildedRose = new GildedRose([testItem]);
    //Act
    const items = gildedRose.updateQuality();
    //Assert
    expect(items[0].sellIn).to.equal(expectedSellIn);
}

function testQuality(testItem: Item, expectedQuality: number) {
    //Arrange
    const gildedRose = new GildedRose([testItem]);
    //Act
    const items = gildedRose.updateQuality();
    //Assert
    expect(items[0].quality).to.equal(expectedQuality);
}

function testBoth(testItem: Item, expectedSellIn: number, expectedQuality: number) {
    testSellIn(testItem, expectedSellIn);
    testQuality(testItem, expectedQuality);
}

describe('Gilded Rose', function () {

    describe('updateQuality()', function () {

        describe('General item tests', function() {

            it('should contain the correct item', function() {
                //Arrage
                const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items.length).to.equal(1);
                expect(items[0].name).to.equal('foo');
            });
        
            it('sellIn should decrease at end of day', function() {
                testSellIn(new Item('foo', 10, 10), 9);
            });
        
            it('quality decreases by 1 if sell by date has not expired', function() {
                testQuality(new Item('foo', 10, 10), 9);
            });
        
            it('quality decreases by 2 if sell by date has expired', function() {
                testQuality(new Item('foo', 0, 10), 8);
            });
        
            it('quality does not become negative', function() {
                testQuality(new Item('foo', 10, 0), 0);
            })

        })

        describe('Aged Brie tests', function() {

            it('Aged Brie increases in quality the older it gets', function () {
                testQuality(new Item('Aged Brie', 10, 10), 11);
            })
        
            it('quality cannot increase beyond 50', function () {
                testQuality(new Item('Aged Brie', 10, 50), 50);
            })

        })
    
        describe('Legendary item tests', function () {

            it('Sulfuras never has to be sold or loses value', function () {
                testBoth(new Item('Sulfuras, Hand of Ragnaros', 10, 25), 10, 25);
            })

        })
    
        describe('Backstage passes tests', function () {

            it('Backstage Passes increase in quality when > 10 days left', function () {
                testQuality(new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10), 11);
            })
        
            it('Backstage Passes increase in quality by 2 when <= 10 days left', function () {
                testQuality(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10), 12);
            })
        
            it('Backstage Passes increase in quality by 3 when <= 5 days left', function () {
                testQuality(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10), 13);
            })
        
            it('Backstage Passes become worthless after the concert', function () {
                testQuality(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10), 0);
            })

        })

        describe('Conjured item tests', function() {

            it('decays in quality twice as fast before expiring', function() {
                testQuality(new Item('Conjured foo', 10, 10), 8);
            })

            it('decays in quality twice as fast after expiring', function() {
                testQuality(new Item('Conjured foo', 0, 10), 6);
            })

            it('conjured special items change in quality twice as fast before expiring', function() {
                testQuality(new Item('Conjured Aged Brie', 10, 10), 12);
            })

            it('conjured special items change in quality twice as fast after expiring', function() {
                testQuality(new Item('Conjured Aged Brie', 10, 10), 14);
            })

            it('conjured legendary items do not need to be sold or lose value', function() {
                testBoth(new Item('Conjured Sulfuras, Hand of Ragnaros', 10, 10), 10, 10);
            })

        })

    })

});
