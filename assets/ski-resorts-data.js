/* 
   Expanded Ski Resort Dataset with Estimated Lift Ticket Prices (USD)
   Includes deduped additions, estimated peak-season window rates, 
   and ground transportation estimates.
*/
window.SKI_RESORTS = [
  // --- North America: Canada ---
  { name: "Whistler Blackcomb", country: "Canada", location: "Whistler, British Columbia", lat: 50.115, lon: -122.957, nearestIntlAirport: "Vancouver International (YVR)", priceUSD: 220, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Banff (Lake Louise)", country: "Canada", location: "Alberta", lat: 51.416, lon: -116.208, nearestIntlAirport: "Calgary International (YYC)", priceUSD: 115, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Sunshine Village", country: "Canada", location: "Banff, Alberta", lat: 51.078, lon: -115.782, nearestIntlAirport: "Calgary International (YYC)", priceUSD: 115, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Revelstoke", country: "Canada", location: "Revelstoke, British Columbia", lat: 50.998, lon: -118.196, nearestIntlAirport: "Kelowna International (YLW)", priceUSD: 120, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Fernie", country: "Canada", location: "Fernie, British Columbia", lat: 49.501, lon: -115.072, nearestIntlAirport: "Calgary International (YYC)", priceUSD: 110, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Big White", country: "Canada", location: "Big White, British Columbia", lat: 49.713, lon: -118.885, nearestIntlAirport: "Kelowna International (YLW)", priceUSD: 105, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Kicking Horse", country: "Canada", location: "Golden, British Columbia", lat: 51.298, lon: -117.632, nearestIntlAirport: "Calgary International (YYC)", priceUSD: 110, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Mont Tremblant", country: "Canada", location: "Mont-Tremblant, Quebec", lat: 46.212, lon: -74.559, nearestIntlAirport: "Montréal-Trudeau International (YUL)", priceUSD: 110, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Sun Peaks", country: "Canada", location: "Sun Peaks, British Columbia", lat: 50.884, lon: -119.882, nearestIntlAirport: "Kamloops Airport (YKA)", priceUSD: 105, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "RED Mountain Resort", country: "Canada", location: "Rossland, British Columbia", lat: 49.105, lon: -117.806, nearestIntlAirport: "Kelowna International (YLW)", priceUSD: 105, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Castle Mountain", country: "Canada", location: "Pincher Creek, Alberta", lat: 49.324, lon: -114.410, nearestIntlAirport: "Calgary International (YYC)", priceUSD: 90, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "SilverStar", country: "Canada", location: "Vernon, British Columbia", lat: 50.259, lon: -119.058, nearestIntlAirport: "Kelowna International (YLW)", priceUSD: 100, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Panorama", country: "Canada", location: "Panorama, British Columbia", lat: 50.461, lon: -116.239, nearestIntlAirport: "Calgary International (YYC)", priceUSD: 105, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Marmot Basin", country: "Canada", location: "Jasper, Alberta", lat: 52.827, lon: -118.096, nearestIntlAirport: "Edmonton International (YEG)", priceUSD: 95, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Kimberley", country: "Canada", location: "Kimberley, British Columbia", lat: 49.696, lon: -116.002, nearestIntlAirport: "Calgary International (YYC)", priceUSD: 95, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Apex Mountain", country: "Canada", location: "Penticton, British Columbia", lat: 49.378, lon: -119.914, nearestIntlAirport: "Kelowna International (YLW)", priceUSD: 85, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Cypress Mountain", country: "Canada", location: "West Vancouver, British Columbia", lat: 49.395, lon: -123.203, nearestIntlAirport: "Vancouver International (YVR)", priceUSD: 80, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },
  { name: "Nakiska", country: "Canada", location: "Kananaskis, Alberta", lat: 50.941, lon: -115.147, nearestIntlAirport: "Calgary International (YYC)", priceUSD: 90, carRentalPrice: 85, publicTransitPrice: 45, taxiPrice: 250 },

  // --- North America: United States ---
  { name: "Vail", country: "United States", location: "Vail, Colorado", lat: 39.640, lon: -106.374, nearestIntlAirport: "Denver International (DEN)", priceUSD: 299, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Aspen Snowmass", country: "United States", location: "Aspen, Colorado", lat: 39.208, lon: -106.949, nearestIntlAirport: "Denver International (DEN)", priceUSD: 264, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Breckenridge", country: "United States", location: "Breckenridge, Colorado", lat: 39.481, lon: -106.038, nearestIntlAirport: "Denver International (DEN)", priceUSD: 279, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Telluride", country: "United States", location: "Telluride, Colorado", lat: 37.936, lon: -107.821, nearestIntlAirport: "Denver International (DEN)", priceUSD: 245, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Jackson Hole", country: "United States", location: "Teton Village, Wyoming", lat: 43.587, lon: -110.827, nearestIntlAirport: "Salt Lake City International (SLC)", priceUSD: 255, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Park City", country: "United States", location: "Park City, Utah", lat: 40.646, lon: -111.498, nearestIntlAirport: "Salt Lake City International (SLC)", priceUSD: 299, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Snowbird", country: "United States", location: "Snowbird, Utah", lat: 40.583, lon: -111.655, nearestIntlAirport: "Salt Lake City International (SLC)", priceUSD: 180, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Mammoth Mountain", country: "United States", location: "Mammoth Lakes, California", lat: 37.630, lon: -119.033, nearestIntlAirport: "Reno-Tahoe International (RNO)", priceUSD: 249, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Heavenly", country: "United States", location: "South Lake Tahoe, California/Nevada", lat: 38.935, lon: -119.939, nearestIntlAirport: "Reno-Tahoe International (RNO)", priceUSD: 259, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Palisades Tahoe", country: "United States", location: "Olympic Valley, California", lat: 39.196, lon: -120.235, nearestIntlAirport: "Reno-Tahoe International (RNO)", priceUSD: 289, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Big Sky", country: "United States", location: "Big Sky, Montana", lat: 45.283, lon: -111.401, nearestIntlAirport: "Bozeman Yellowstone International (BZN)", priceUSD: 260, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Sun Valley", country: "United States", location: "Ketchum, Idaho", lat: 43.680, lon: -114.353, nearestIntlAirport: "Boise Airport (BOI)", priceUSD: 225, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Deer Valley", country: "United States", location: "Park City, Utah", lat: 40.637, lon: -111.495, nearestIntlAirport: "Salt Lake City International (SLC)", priceUSD: 329, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Steamboat", country: "United States", location: "Steamboat Springs, Colorado", lat: 40.457, lon: -106.804, nearestIntlAirport: "Denver International (DEN)", priceUSD: 279, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Winter Park", country: "United States", location: "Winter Park, Colorado", lat: 39.886, lon: -105.762, nearestIntlAirport: "Denver International (DEN)", priceUSD: 272, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Keystone", country: "United States", location: "Keystone, Colorado", lat: 39.608, lon: -105.943, nearestIntlAirport: "Denver International (DEN)", priceUSD: 249, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Copper Mountain", country: "United States", location: "Frisco, Colorado", lat: 39.501, lon: -106.156, nearestIntlAirport: "Denver International (DEN)", priceUSD: 264, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Crested Butte", country: "United States", location: "Crested Butte, Colorado", lat: 38.899, lon: -106.965, nearestIntlAirport: "Denver International (DEN)", priceUSD: 164, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Killington", country: "United States", location: "Killington, Vermont", lat: 43.625, lon: -72.797, nearestIntlAirport: "Boston Logan International (BOS)", priceUSD: 190, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Taos Ski Valley", country: "United States", location: "Taos, New Mexico", lat: 36.596, lon: -105.449, nearestIntlAirport: "Albuquerque International Sunport (ABQ)", priceUSD: 155, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Northstar", country: "United States", location: "Truckee, California", lat: 39.274, lon: -120.121, nearestIntlAirport: "Reno-Tahoe International (RNO)", priceUSD: 239, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Loveland", country: "United States", location: "Georgetown, Colorado", lat: 39.680, lon: -105.897, nearestIntlAirport: "Denver International (DEN)", priceUSD: 149, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Stratton", country: "United States", location: "Stratton Mountain, Vermont", lat: 43.113, lon: -72.906, nearestIntlAirport: "Albany International (ALB)", priceUSD: 180, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Whitefish", country: "United States", location: "Whitefish, Montana", lat: 48.480, lon: -114.349, nearestIntlAirport: "Calgary International (YYC)", priceUSD: 99, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Mt. Hood Meadows", country: "United States", location: "Mount Hood, Oregon", lat: 45.331, lon: -121.666, nearestIntlAirport: "Portland International (PDX)", priceUSD: 140, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Snowbasin", country: "United States", location: "Huntsville, Utah", lat: 41.216, lon: -111.856, nearestIntlAirport: "Salt Lake City International (SLC)", priceUSD: 199, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Alta", country: "United States", location: "Alta, Utah", lat: 40.588, lon: -111.638, nearestIntlAirport: "Salt Lake City International (SLC)", priceUSD: 179, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Bear Valley", country: "United States", location: "Bear Valley, California", lat: 38.498, lon: -120.040, nearestIntlAirport: "Sacramento International (SMF)", priceUSD: 119, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },
  { name: "Crystal Mountain", country: "United States", location: "Enumclaw, Washington", lat: 46.936, lon: -121.474, nearestIntlAirport: "Seattle-Tacoma International (SEA)", priceUSD: 180, carRentalPrice: 95, publicTransitPrice: 55, taxiPrice: 300 },

  // --- Europe: France ---
  { name: "Chamonix", country: "France", location: "Chamonix-Mont-Blanc", lat: 45.923, lon: 6.869, nearestIntlAirport: "Geneva Airport (GVA)", priceUSD: 90, carRentalPrice: 75, publicTransitPrice: 40, taxiPrice: 200 },
  { name: "Courchevel", country: "France", location: "Les Trois Vallées, Savoie", lat: 45.415, lon: 6.634, nearestIntlAirport: "Geneva Airport (GVA)", priceUSD: 95, carRentalPrice: 75, publicTransitPrice: 40, taxiPrice: 200 },
  { name: "Val Thorens", country: "France", location: "Les Trois Vallées, Savoie", lat: 45.297, lon: 6.580, nearestIntlAirport: "Geneva Airport (GVA)", priceUSD: 90, carRentalPrice: 75, publicTransitPrice: 40, taxiPrice: 200 },
  { name: "Val d'Isère", country: "France", location: "Tarentaise, Savoie", lat: 45.448, lon: 6.980, nearestIntlAirport: "Geneva Airport (GVA)", priceUSD: 95, carRentalPrice: 75, publicTransitPrice: 40, taxiPrice: 200 },
  { name: "Tignes", country: "France", location: "Tignes, Savoie", lat: 45.468, lon: 6.965, nearestIntlAirport: "Geneva Airport (GVA)", priceUSD: 90, carRentalPrice: 75, publicTransitPrice: 40, taxiPrice: 200 },

  // --- Europe: Switzerland ---
  { name: "Zermatt", country: "Switzerland", location: "Zermatt, Valais", lat: 46.020, lon: 7.746, nearestIntlAirport: "Geneva Airport (GVA)", priceUSD: 110, carRentalPrice: 100, publicTransitPrice: 60, taxiPrice: 350 },
  { name: "Verbier", country: "Switzerland", location: "Verbier, Valais", lat: 46.099, lon: 7.226, nearestIntlAirport: "Geneva Airport (GVA)", priceUSD: 100, carRentalPrice: 100, publicTransitPrice: 60, taxiPrice: 350 },
  { name: "St. Moritz", country: "Switzerland", location: "St. Moritz, Engadin", lat: 46.492, lon: 9.835, nearestIntlAirport: "Zurich Airport (ZRH)", priceUSD: 100, carRentalPrice: 100, publicTransitPrice: 60, taxiPrice: 350 },
  { name: "Davos Klosters", country: "Switzerland", location: "Davos, Graubünden", lat: 46.793, lon: 9.821, nearestIntlAirport: "Zurich Airport (ZRH)", priceUSD: 95, carRentalPrice: 100, publicTransitPrice: 60, taxiPrice: 350 },
  { name: "LAAX", country: "Switzerland", location: "Flims Laax Falera", lat: 46.835, lon: 9.229, nearestIntlAirport: "Zurich Airport (ZRH)", priceUSD: 105, carRentalPrice: 100, publicTransitPrice: 60, taxiPrice: 350 },

  // --- Europe: Austria ---
  { name: "St. Anton", country: "Austria", location: "St. Anton am Arlberg", lat: 47.128, lon: 10.264, nearestIntlAirport: "Innsbruck Airport (INN)", priceUSD: 85, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 220 },
  { name: "Kitzbühel", country: "Austria", location: "Kitzbühel, Tyrol", lat: 47.446, lon: 12.392, nearestIntlAirport: "Salzburg Airport (SZG)", priceUSD: 80, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 220 },
  { name: "Ischgl", country: "Austria", location: "Ischgl, Paznaun", lat: 47.010, lon: 10.324, nearestIntlAirport: "Innsbruck Airport (INN)", priceUSD: 85, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 220 },
  { name: "Sölden", country: "Austria", location: "Sölden, Tyrol", lat: 46.965, lon: 11.007, nearestIntlAirport: "Innsbruck Airport (INN)", priceUSD: 80, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 220 },

  // --- Europe: Italy ---
  { name: "Cortina d'Ampezzo", country: "Italy", location: "Dolomites, Veneto", lat: 46.540, lon: 12.135, nearestIntlAirport: "Venice Marco Polo (VCE)", priceUSD: 85, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 220 },
  { name: "Madonna di Campiglio", country: "Italy", location: "Trentino", lat: 46.283, lon: 10.827, nearestIntlAirport: "Verona Villafranca (VRN)", priceUSD: 85, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 220 },
  { name: "Val Gardena", country: "Italy", location: "South Tyrol", lat: 46.556, lon: 11.723, nearestIntlAirport: "Innsbruck Airport (INN)", priceUSD: 85, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 220 },
  { name: "Cervinia", country: "Italy", location: "Aosta Valley", lat: 45.934, lon: 7.629, nearestIntlAirport: "Turin Caselle (TRN)", priceUSD: 75, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 220 },

  // --- Europe: Other ---
  { name: "Åre", country: "Sweden", location: "Åre, Jämtland", lat: 63.398, lon: 13.080, nearestIntlAirport: "Åre Östersund (OSD)", priceUSD: 70, carRentalPrice: 65, publicTransitPrice: 30, taxiPrice: 150 },
  { name: "Hemsedal", country: "Norway", location: "Hemsedal, Viken", lat: 60.880, lon: 8.530, nearestIntlAirport: "Oslo Gardermoen (OSL)", priceUSD: 70, carRentalPrice: 65, publicTransitPrice: 30, taxiPrice: 150 },
  { name: "Bansko", country: "Bulgaria", location: "Bansko, Pirin", lat: 41.834, lon: 23.488, nearestIntlAirport: "Sofia Airport (SOF)", priceUSD: 50, carRentalPrice: 65, publicTransitPrice: 30, taxiPrice: 150 },
  { name: "Sierra Nevada", country: "Spain", location: "Granada", lat: 37.090, lon: -3.392, nearestIntlAirport: "Malaga Airport (AGP)", priceUSD: 70, carRentalPrice: 65, publicTransitPrice: 30, taxiPrice: 150 },
  { name: "Baqueira-Beret", country: "Spain", location: "Val d'Aran, Catalonia", lat: 42.704, lon: 0.873, nearestIntlAirport: "Barcelona-El Prat (BCN)", priceUSD: 75, carRentalPrice: 65, publicTransitPrice: 30, taxiPrice: 150 },

  // --- Asia: Japan ---
  { name: "Niseko", country: "Japan", location: "Hokkaido", lat: 42.804, lon: 140.687, nearestIntlAirport: "New Chitose (CTS)", priceUSD: 75, carRentalPrice: 60, publicTransitPrice: 35, taxiPrice: 180 },
  { name: "Rusutsu", country: "Japan", location: "Hokkaido", lat: 42.744, lon: 140.898, nearestIntlAirport: "New Chitose (CTS)", priceUSD: 75, carRentalPrice: 60, publicTransitPrice: 35, taxiPrice: 180 },
  { name: "Hakuba", country: "Japan", location: "Nagano Prefecture", lat: 36.696, lon: 137.857, nearestIntlAirport: "Tokyo Haneda (HND)", priceUSD: 60, carRentalPrice: 60, publicTransitPrice: 35, taxiPrice: 180 },
  { name: "Nozawa Onsen", country: "Japan", location: "Nagano Prefecture", lat: 36.842, lon: 138.447, nearestIntlAirport: "Tokyo Haneda (HND)", priceUSD: 55, carRentalPrice: 60, publicTransitPrice: 35, taxiPrice: 180 },
  { name: "Appi Kogen", country: "Japan", location: "Iwate Prefecture", lat: 40.002, lon: 140.970, nearestIntlAirport: "Tokyo Haneda (HND)", priceUSD: 50, carRentalPrice: 60, publicTransitPrice: 35, taxiPrice: 180 },
  { name: "Furano", country: "Japan", location: "Hokkaido", lat: 43.324, lon: 142.354, nearestIntlAirport: "New Chitose (CTS)", priceUSD: 60, carRentalPrice: 60, publicTransitPrice: 35, taxiPrice: 180 },
  { name: "Hakuba Happo-One", country: "Japan", location: "Nagano Prefecture", lat: 36.702, lon: 137.838, nearestIntlAirport: "Tokyo Haneda (HND)", priceUSD: 60, carRentalPrice: 60, publicTransitPrice: 35, taxiPrice: 180 },
  { name: "Hakuba Iwatake", country: "Japan", location: "Nagano Prefecture", lat: 36.719, lon: 137.859, nearestIntlAirport: "Tokyo Haneda (HND)", priceUSD: 55, carRentalPrice: 60, publicTransitPrice: 35, taxiPrice: 180 },

  // --- Oceania: New Zealand & Australia ---
  { name: "Coronet Peak", country: "New Zealand", location: "Queenstown", lat: -45.019, lon: 168.678, nearestIntlAirport: "Queenstown Airport (ZQN)", priceUSD: 100, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 200 },
  { name: "Cardrona", country: "New Zealand", location: "Wanaka", lat: -44.792, lon: 169.110, nearestIntlAirport: "Queenstown Airport (ZQN)", priceUSD: 100, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 200 },
  { name: "The Remarkables", country: "New Zealand", location: "Queenstown", lat: -45.053, lon: 168.812, nearestIntlAirport: "Queenstown Airport (ZQN)", priceUSD: 100, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 200 },
  { name: "Perisher", country: "Australia", location: "Kosciuszko National Park", lat: -36.401, lon: 148.403, nearestIntlAirport: "Sydney Kingsford Smith (SYD)", priceUSD: 150, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 200 },
  { name: "Thredbo", country: "Australia", location: "Kosciuszko National Park", lat: -36.507, lon: 148.287, nearestIntlAirport: "Sydney Kingsford Smith (SYD)", priceUSD: 150, carRentalPrice: 80, publicTransitPrice: 45, taxiPrice: 200 },

  // --- South America ---
  { name: "Portillo", country: "Chile", location: "Valparaíso Region", lat: -32.832, lon: -70.125, nearestIntlAirport: "Santiago Arturo Merino Benítez (SCL)", priceUSD: 80, carRentalPrice: 50, publicTransitPrice: 25, taxiPrice: 120 },
  { name: "Valle Nevado", country: "Chile", location: "Santiago Metropolitan Region", lat: -33.349, lon: -70.248, nearestIntlAirport: "Santiago Arturo Merino Benítez (SCL)", priceUSD: 75, carRentalPrice: 50, publicTransitPrice: 25, taxiPrice: 120 },
  { name: "Cerro Catedral", country: "Argentina", location: "San Carlos de Bariloche", lat: -41.171, lon: -71.439, nearestIntlAirport: "San Carlos de Bariloche (BRC)", priceUSD: 70, carRentalPrice: 50, publicTransitPrice: 25, taxiPrice: 120 },
  { name: "El Colorado", country: "Chile", location: "Santiago Metropolitan Region", lat: -33.350, lon: -70.292, nearestIntlAirport: "Santiago Arturo Merino Benítez (SCL)", priceUSD: 70, carRentalPrice: 50, publicTransitPrice: 25, taxiPrice: 120 }
];