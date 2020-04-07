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
        public void UpdateQuality_ForGeneralItem_ShouldContainTheCorrectItem()
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
    }
}
