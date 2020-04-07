using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;

namespace csharp
{
    [TestFixture]
    public class GildedRoseTest
    {
        [Test]
        public void UpdateQuality_ForGeneralItem_ContainsTheCorrectItem()
        {
            var itemName = "foo";
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item(itemName, 0, 0)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Should().HaveCount(1);
            gildedRose.GetItems().Single().Name.Should().Be(itemName);
        }

        [Test]
        public void UpdateQuality_ForGeneralItem_DecreasesSellInByOne()
        {
            var initialSellIn = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("foo", initialSellIn, 0)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().SellIn.Should().Be(initialSellIn - 1);
        }

        [Test]
        public void UpdateQuality_ForGeneralItemWhenNotExpired_DecreasesQualityByOne()
        {
            var initialQuality = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("foo", 10, initialQuality)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(initialQuality - 1);
        }

        [Test]
        public void UpdateQuality_ForGeneralItemWhenExpired_DecreasesQualityByTwo()
        {
            var initialQuality = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("foo", 0, initialQuality)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(initialQuality - 2);
        }

        [Test]
        public void UpdateQuality_ForGeneralItem_QualityNeverBecomesNegative()
        {
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("foo", 10, 0)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(0);
        }

        [Test]
        public void UpdateQuality_ForAgedBrieWhenNotExpired_IncreasesQualityByOne()
        {
            var initialQuality = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("Aged Brie", 10, initialQuality)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(initialQuality + 1);
        }

        [Test]
        public void UpdateQuality_ForAgedBrieWhenExpired_IncreasesQualityByTwo()
        {
            var initialQuality = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("Aged Brie", 0, initialQuality)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(initialQuality + 2);
        }

        [Test]
        public void UpdateQuality_ForAgedBrie_QualityCannotIncreaseAboveFifty()
        {
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("Aged Brie", 10, 50)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(50);
        }

        [Test]
        public void UpdateQuality_ForLegendaryItem_DoesNotExpire()
        {
            var initialSellIn = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("Sulfuras, Hand of Ragnaros", initialSellIn, 10)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().SellIn.Should().Be(initialSellIn);
        }

        [Test]
        public void UpdateQuality_ForLegendaryItem_DoesNotChangeInQuality()
        {
            var initialQuality = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("Sulfuras, Hand of Ragnaros", 10, initialQuality)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(initialQuality);
        }

        [Test]
        public void UpdateQuality_ForBackstagePassesWhenMoreThanTenDaysLeft_IncreasesQualityByOne()
        {
            var initialQuality = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("Backstage passes to a TAFKAL80ETC concert", 20, initialQuality)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(initialQuality + 1);
        }

        [Test]
        public void UpdateQuality_ForBackstagePassesWhenBetweenSixAndTenDaysLeft_IncreasesQualityByTwo()
        {
            var initialQuality = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("Backstage passes to a TAFKAL80ETC concert", 10, initialQuality)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(initialQuality + 2);
        }

        [Test]
        public void UpdateQuality_ForBackstagePassesWhenLessThanSixDaysLeft_IncreasesQualityByThree()
        {
            var initialQuality = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("Backstage passes to a TAFKAL80ETC concert", 5, initialQuality)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(initialQuality + 3);
        }

        [Test]
        public void UpdateQuality_ForBackstagePassesWhenExpired_SetQualityToZero()
        {
            var initialQuality = 10;
            var gildedRose = new GildedRose(new List<Item>
            {
                new Item("Backstage passes to a TAFKAL80ETC concert", 0, initialQuality)
            });

            gildedRose.UpdateQuality();

            gildedRose.GetItems().Single().Quality.Should().Be(0);
        }
    }
}
