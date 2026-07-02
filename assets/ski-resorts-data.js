/* 
   Expanded Ski Resort Dataset 
   Includes original entries (verified) + 15 new global destinations
*/
window.SKI_RESORTS = [
  // --- North America: Canada ---
  { name: "Whistler Blackcomb", country: "Canada", location: "Whistler, British Columbia", lat: 50.115, lon: -122.957, nearestIntlAirport: "Vancouver International (YVR)" },
  { name: "Lake Louise Ski Resort", country: "Canada", location: "Alberta", lat: 51.416, lon: -116.208, nearestIntlAirport: "Calgary International (YYC)" },
  { name: "Sunshine Village", country: "Canada", location: "Banff, Alberta", lat: 51.078, lon: -115.782, nearestIntlAirport: "Calgary International (YYC)" },
  { name: "Revelstoke", country: "Canada", location: "Revelstoke, British Columbia", lat: 50.998, lon: -118.196, nearestIntlAirport: "Kelowna International (YLW)" },
  { name: "Fernie", country: "Canada", location: "Fernie, British Columbia", lat: 49.501, lon: -115.072, nearestIntlAirport: "Calgary International (YYC)" },
  { name: "Big White", country: "Canada", location: "Big White, British Columbia", lat: 49.713, lon: -118.885, nearestIntlAirport: "Kelowna International (YLW)" },
  { name: "Kicking Horse", country: "Canada", location: "Golden, British Columbia", lat: 51.298, lon: -117.632, nearestIntlAirport: "Calgary International (YYC)" },
  { name: "Mont Tremblant", country: "Canada", location: "Mont-Tremblant, Quebec", lat: 46.212, lon: -74.559, nearestIntlAirport: "Montréal-Trudeau International (YUL)" }, 
  { name: "Sun Peaks", country: "Canada", location: "Sun Peaks, British Columbia", lat: 50.884, lon: -119.882, nearestIntlAirport: "Kamloops Airport (YKA)" }, 

  // --- North America: United States ---
  { name: "Vail", country: "United States", location: "Vail, Colorado", lat: 39.640, lon: -106.374, nearestIntlAirport: "Denver International (DEN)" },
  { name: "Aspen Snowmass", country: "United States", location: "Aspen, Colorado", lat: 39.208, lon: -106.949, nearestIntlAirport: "Denver International (DEN)" },
  { name: "Breckenridge", country: "United States", location: "Breckenridge, Colorado", lat: 39.481, lon: -106.038, nearestIntlAirport: "Denver International (DEN)" },
  { name: "Telluride", country: "United States", location: "Telluride, Colorado", lat: 37.936, lon: -107.821, nearestIntlAirport: "Denver International (DEN)" }, 
  { name: "Jackson Hole", country: "United States", location: "Teton Village, Wyoming", lat: 43.587, lon: -110.827, nearestIntlAirport: "Salt Lake City International (SLC)" },
  { name: "Park City", country: "United States", location: "Park City, Utah", lat: 40.646, lon: -111.498, nearestIntlAirport: "Salt Lake City International (SLC)" },
  { name: "Snowbird", country: "United States", location: "Snowbird, Utah", lat: 40.583, lon: -111.655, nearestIntlAirport: "Salt Lake City International (SLC)" }, 
  { name: "Mammoth Mountain", country: "United States", location: "Mammoth Lakes, California", lat: 37.630, lon: -119.033, nearestIntlAirport: "Reno-Tahoe International (RNO)" },
  { name: "Heavenly", country: "United States", location: "South Lake Tahoe, California/Nevada", lat: 38.935, lon: -119.939, nearestIntlAirport: "Reno-Tahoe International (RNO)" },
  { name: "Palisades Tahoe", country: "United States", location: "Olympic Valley, California", lat: 39.196, lon: -120.235, nearestIntlAirport: "Reno-Tahoe International (RNO)" }, 
  { name: "Big Sky", country: "United States", location: "Big Sky, Montana", lat: 45.283, lon: -111.401, nearestIntlAirport: "Bozeman Yellowstone International (BZN)" },
  { name: "Sun Valley", country: "United States", location: "Ketchum, Idaho", lat: 43.680, lon: -114.353, nearestIntlAirport: "Boise Airport (BOI)" },

  // --- Europe: France ---
  { name: "Chamonix", country: "France", location: "Chamonix-Mont-Blanc", lat: 45.923, lon: 6.869, nearestIntlAirport: "Geneva Airport (GVA)" },
  { name: "Courchevel", country: "France", location: "Les Trois Vallées, Savoie", lat: 45.415, lon: 6.634, nearestIntlAirport: "Geneva Airport (GVA)" },
  { name: "Val Thorens", country: "France", location: "Les Trois Vallées, Savoie", lat: 45.297, lon: 6.580, nearestIntlAirport: "Geneva Airport (GVA)" }, 
  { name: "Val d'Isère", country: "France", location: "Tarentaise, Savoie", lat: 45.448, lon: 6.980, nearestIntlAirport: "Geneva Airport (GVA)" },
  { name: "Tignes", country: "France", location: "Tignes, Savoie", lat: 45.468, lon: 6.965, nearestIntlAirport: "Geneva Airport (GVA)" },

  // --- Europe: Switzerland ---
  { name: "Zermatt", country: "Switzerland", location: "Zermatt, Valais", lat: 46.020, lon: 7.746, nearestIntlAirport: "Geneva Airport (GVA)" },
  { name: "Verbier", country: "Switzerland", location: "Verbier, Valais", lat: 46.099, lon: 7.226, nearestIntlAirport: "Geneva Airport (GVA)" },
  { name: "St. Moritz", country: "Switzerland", location: "St. Moritz, Engadin", lat: 46.492, lon: 9.835, nearestIntlAirport: "Zurich Airport (ZRH)" },
  { name: "Davos Klosters", country: "Switzerland", location: "Davos, Graubünden", lat: 46.793, lon: 9.821, nearestIntlAirport: "Zurich Airport (ZRH)" }, 
  { name: "LAAX", country: "Switzerland", location: "Flims Laax Falera", lat: 46.835, lon: 9.229, nearestIntlAirport: "Zurich Airport (ZRH)" }, 

  // --- Europe: Austria ---
  { name: "St. Anton", country: "Austria", location: "St. Anton am Arlberg", lat: 47.128, lon: 10.264, nearestIntlAirport: "Innsbruck Airport (INN)" },
  { name: "Kitzbühel", country: "Austria", location: "Kitzbühel, Tyrol", lat: 47.446, lon: 12.392, nearestIntlAirport: "Salzburg Airport (SZG)" },
  { name: "Ischgl", country: "Austria", location: "Ischgl, Paznaun", lat: 47.010, lon: 10.324, nearestIntlAirport: "Innsbruck Airport (INN)" },
  { name: "Sölden", country: "Austria", location: "Sölden, Tyrol", lat: 46.965, lon: 11.007, nearestIntlAirport: "Innsbruck Airport (INN)" }, 

  // --- Europe: Italy ---
  { name: "Cortina d'Ampezzo", country: "Italy", location: "Dolomites, Veneto", lat: 46.540, lon: 12.135, nearestIntlAirport: "Venice Marco Polo (VCE)" },
  { name: "Madonna di Campiglio", country: "Italy", location: "Trentino", lat: 46.283, lon: 10.827, nearestIntlAirport: "Verona Villafranca (VRN)" },
  { name: "Val Gardena", country: "Italy", location: "South Tyrol", lat: 46.556, lon: 11.723, nearestIntlAirport: "Innsbruck Airport (INN)" }, 
  { name: "Cervinia", country: "Italy", location: "Aosta Valley", lat: 45.934, lon: 7.629, nearestIntlAirport: "Turin Caselle (TRN)" }, 

  // --- Europe: Other ---
  { name: "Åre", country: "Sweden", location: "Åre, Jämtland", lat: 63.398, lon: 13.080, nearestIntlAirport: "Åre Östersund (OSD)" },
  { name: "Hemsedal", country: "Norway", location: "Hemsedal, Viken", lat: 60.880, lon: 8.530, nearestIntlAirport: "Oslo Gardermoen (OSL)" },
  { name: "Bansko", country: "Bulgaria", location: "Bansko, Pirin", lat: 41.834, lon: 23.488, nearestIntlAirport: "Sofia Airport (SOF)" },
  { name: "Sierra Nevada", country: "Spain", location: "Granada", lat: 37.090, lon: -3.392, nearestIntlAirport: "Malaga Airport (AGP)" },
  { name: "Baqueira-Beret", country: "Spain", location: "Val d'Aran, Catalonia", lat: 42.704, lon: 0.873, nearestIntlAirport: "Barcelona-El Prat (BCN)" },

  // --- Asia: Japan ---
  { name: "Niseko", country: "Japan", location: "Hokkaido", lat: 42.804, lon: 140.687, nearestIntlAirport: "New Chitose (CTS)" },
  { name: "Rusutsu", country: "Japan", location: "Hokkaido", lat: 42.744, lon: 140.898, nearestIntlAirport: "New Chitose (CTS)" }, 
  { name: "Hakuba", country: "Japan", location: "Nagano Prefecture", lat: 36.696, lon: 137.857, nearestIntlAirport: "Tokyo Haneda (HND)" },
  { name: "Nozawa Onsen", country: "Japan", location: "Nagano Prefecture", lat: 36.842, lon: 138.447, nearestIntlAirport: "Tokyo Haneda (HND)" },
  { name: "Appi Kogen", country: "Japan", location: "Iwate Prefecture", lat: 40.002, lon: 140.970, nearestIntlAirport: "Tokyo Haneda (HND)" }, 

  // --- Oceania: New Zealand & Australia ---
  { name: "Coronet Peak", country: "New Zealand", location: "Queenstown", lat: -45.019, lon: 168.678, nearestIntlAirport: "Queenstown Airport (ZQN)" },
  { name: "Cardrona", country: "New Zealand", location: "Wanaka", lat: -44.792, lon: 169.110, nearestIntlAirport: "Queenstown Airport (ZQN)" },
  { name: "The Remarkables", country: "New Zealand", location: "Queenstown", lat: -45.053, lon: 168.812, nearestIntlAirport: "Queenstown Airport (ZQN)" }, 
  { name: "Perisher", country: "Australia", location: "Kosciuszko National Park", lat: -36.401, lon: 148.403, nearestIntlAirport: "Sydney Kingsford Smith (SYD)" },
  { name: "Thredbo", country: "Australia", location: "Kosciuszko National Park", lat: -36.507, lon: 148.287, nearestIntlAirport: "Sydney Kingsford Smith (SYD)" },

  // --- South America ---
  { name: "Portillo", country: "Chile", location: "Valparaíso Region", lat: -32.832, lon: -70.125, nearestIntlAirport: "Santiago Arturo Merino Benítez (SCL)" },
  { name: "Valle Nevado", country: "Chile", location: "Santiago Metropolitan Region", lat: -33.349, lon: -70.248, nearestIntlAirport: "Santiago Arturo Merino Benítez (SCL)" }, 
  { name: "Cerro Catedral", country: "Argentina", location: "San Carlos de Bariloche", lat: -41.171, lon: -71.439, nearestIntlAirport: "San Carlos de Bariloche (BRC)" } 
];