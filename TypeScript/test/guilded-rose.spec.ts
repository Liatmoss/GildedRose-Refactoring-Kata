import 'mocha';
import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    describe('updateQuality()', function () {

        describe('general item tests', function() {

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
                //Arrange
                const gildedRose = new GildedRose([ new Item('foo', 10, 10)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].sellIn).to.equal(9);
            });
        
            it('quality decreases by 1 if sell by date has not expired', function() {
                //Arrange
                const gildedRose = new GildedRose([ new Item('foo', 10, 10)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].quality).to.equal(9);
            });
        
            it('quality decreases by 2 if sell by date has expired', function() {
                //Arrange
                const gildedRose = new GildedRose([ new Item('foo', 0, 10)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].quality).to.equal(8);
            });
        
            it('quality does not become negative', function() {
                //Arrange
                const gildedRose = new GildedRose([ new Item('foo', 10, 0)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].quality).to.equal(0);
            })

        })

        describe('Aged Brie tests', function() {

            it('Aged Brie increases in quality the older it gets', function () {
                //Arrange
                const gildedRose = new GildedRose([ new Item('Aged Brie', 10, 10)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].quality).to.equal(11);
            })
        
            it('quality cannot increase beyond 50', function () {
                //Arrange
                const gildedRose = new GildedRose([ new Item('Aged Brie', 10, 50)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].quality).to.equal(50);
            })

        })
    
        describe('Legendary item tests', function () {

            it('Sulfuras never has to be sold or loses value', function () {
                //Arrange
                const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 10, 25)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].sellIn).to.equal(10);
                expect(items[0].quality).to.equal(25);
            })

        })
    
        describe('Backstage passes tests', function () {

            it('Backstage Passes increase in quality when > 10 days left', function () {
                //Arrange
                const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].quality).to.equal(11);
            })
        
            it('Backstage Passes increase in quality by 2 when <= 10 days left', function () {
                //Arrange
                const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].quality).to.equal(12);
            })
        
            it('Backstage Passes increase in quality by 3 when <= 5 days left', function () {
                //Arrange
                const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].quality).to.equal(13);
            })
        
            it('Backstage Passes become worthless after the concert', function () {
                //Arrange
                const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
                //Act
                const items = gildedRose.updateQuality();
                //Assert
                expect(items[0].quality).to.equal(0);
            })

        })

    })

});
