using System;
using System.Collections.Generic;

namespace csharp
{
    public class GildedRose
    {
        private IList<Item> items;

        public GildedRose(IList<Item> items)
        {
            this.items = items;
        }

        public IList<Item> GetItems()
        {
            return items;
        }

        public void UpdateQuality()
        {
            for (var i = 0; i < items.Count; i++)
            {
                var currentItem = items[i];
                var modifiedItem = UpdateItem(currentItem);
                 items[i] = modifiedItem;
                
            }
        }

        private Item UpdateItem(Item item)
        {
            
            if (item.Name != "Aged Brie" && item.Name != "Backstage passes to a TAFKAL80ETC concert")
            {
                if (item.Quality > 0)
                {
                    DecreaseQualityIfNotLegendary(item);
                }
            }
            else
            {
                if (item.Quality < 50)
                {
                    item.Quality = item.Quality + 1;

                    if (item.Name == "Backstage passes to a TAFKAL80ETC concert")
                    {
                        if (item.SellIn < 11)
                        {
                            if (item.Quality < 50)
                            {
                                item.Quality = item.Quality + 1;
                            }
                        }

                        if (item.SellIn < 6)
                        {
                            if (item.Quality < 50)
                            {
                                item.Quality = item.Quality + 1;
                            }
                        }
                    }
                }
            }

            if (item.Name != "Sulfuras, Hand of Ragnaros")
            {
                DecreaseItemSellinIfNotLegendary(item);
            }

            if (item.SellIn < 0)
            {
                if (item.Name != "Aged Brie")
                {
                    if (item.Name != "Backstage passes to a TAFKAL80ETC concert")
                    {
                        if (item.Quality > 0)
                        {
                            if (item.Name != "Sulfuras, Hand of Ragnaros")
                            {
                                item.Quality = item.Quality - 1;
                            }
                        }
                    }
                    else
                    {
                        item.Quality = item.Quality - item.Quality;
                    }
                }
                else
                {
                    if (item.Quality < 50)
                    {
                        item.Quality = item.Quality + 1;
                    }
                }
            }

            return item;
        }

        private bool IsLegendary(Item item)
        {
           return  (item.Name == "Sulfuras, Hand of Ragnaros");
           
        }

        private void DecreaseQualityIfNotLegendary(Item item)
        {
            if (!IsLegendary(item))
            {
                item.Quality -= 1;
            }
        }

        private void DecreaseItemSellinIfNotLegendary(Item item)
        {
            if (!IsLegendary(item))
                item.SellIn -= 1;
        }

    }

}
