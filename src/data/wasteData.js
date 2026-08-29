// EcoGuide - Household Waste Database (52 items)
// Categories used: 'wet' (Organic), 'dry' (Non-recyclable/Dry paper), 'recyclable' (Recyclable Dry), 'e-waste' (Electronics/Hazardous components)

export const wasteItems = [
  // WET / ORGANIC WASTE (13 items)
  {
    id: "banana-peel",
    name: "Banana Peel",
    aliases: ["banana", "peel", "fruit", "skin", "organic", "food"],
    category: "wet",
    icon: "🍌",
    description: "Organic fruit leftover that decomposes quickly and naturally.",
    whatToDo: [
      "Place directly in your home compost bin if available.",
      "Dispose of in the green wet-waste municipal collection bin.",
      "Remove any plastic stickers or labels first."
    ],
    avoid: [
      "Do not throw it inside a plastic bag into the wet bin.",
      "Avoid mixing it with dry paper or plastic wrappers."
    ],
    environmentalImpact: "Composting turns it into nutrient-rich soil. If sent to a landfill inside a sealed plastic bag, it decomposes without oxygen and produces methane, a harmful greenhouse gas.",
    bestOption: "Home Composting / Organic Collection",
    municipalNote: false
  },
  {
    id: "vegetable-peels",
    name: "Vegetable Peels",
    aliases: ["vegetable", "peel", "carrot", "potato", "onion", "skin", "scrap", "food"],
    category: "wet",
    icon: "🥕",
    description: "Raw leftovers from vegetable preparation.",
    whatToDo: [
      "Add to your kitchen composting system.",
      "Put in the wet/organic waste container."
    ],
    avoid: [
      "Do not mix with plastic wrappers, rubber bands, or twist ties."
    ],
    environmentalImpact: "Returns valuable nutrients back to the earth. Landfilling organic waste contributes to municipal landfill overload and methane emission.",
    bestOption: "Composting",
    municipalNote: false
  },
  {
    id: "fruit-waste",
    name: "Fruit Waste",
    aliases: ["fruit", "apple", "orange", "seeds", "rotten fruit", "scraps", "food"],
    category: "wet",
    icon: "🍓",
    description: "Spoiled, rotten fruits or leftover seeds and cores.",
    whatToDo: [
      "Compost at home or use organic collection.",
      "Remove non-biodegradable price tags/stickers."
    ],
    avoid: [
      "Do not leave in open bags where they attract pests in dry waste heaps."
    ],
    environmentalImpact: "Readily decomposes and produces fertile organic manure, avoiding synthetic fertilizer usage.",
    bestOption: "Composting",
    municipalNote: false
  },
  {
    id: "food-scraps",
    name: "Food Scraps (Cooked)",
    aliases: ["food", "rice", "curry", "leftovers", "meal", "cooked food", "roti", "bread"],
    category: "wet",
    icon: "🍲",
    description: "Cooked leftover meals, plate scrapings, and stale food.",
    whatToDo: [
      "Drain excess liquid before throwing into the wet waste bin.",
      "Feed to compost pile (avoid adding excessive oil or meat if it attracts pests at home)."
    ],
    avoid: [
      "Do not throw liquid curries or soups directly into the bin without draining.",
      "Do not dispose of inside plastic zip bags."
    ],
    environmentalImpact: "Organic food waste represents high water and resource investment; diverting it to compost preserves landfill capacity.",
    bestOption: "Wet Waste Collection / Composting",
    municipalNote: true
  },
  {
    id: "tea-leaves",
    name: "Tea Leaves & Used Tea Dust",
    aliases: ["tea", "leaves", "chai", "tea powder", "filter", "cup"],
    category: "wet",
    icon: "🍃",
    description: "Used tea leaves or powder from brewing.",
    whatToDo: [
      "Rinse out milk and sugar if possible, then add directly to plants or compost pile.",
      "Discard in the wet waste container."
    ],
    avoid: [
      "If using tea bags, ensure they do not have plastic/nylon netting or metal staples before composting."
    ],
    environmentalImpact: "Highly nitrogen-rich, making it an excellent natural fertilizer for plants.",
    bestOption: "Home Composting / Soil Additive",
    municipalNote: false
  },
  {
    id: "coffee-grounds",
    name: "Coffee Grounds",
    aliases: ["coffee", "grounds", "powder", "espresso", "filter", "spent coffee"],
    category: "wet",
    icon: "☕",
    description: "Spent coffee grounds from filters or espresso machines.",
    whatToDo: [
      "Sprinkle directly into garden soil to improve acidity.",
      "Place in wet waste compost bin."
    ],
    avoid: [
      "Do not put coffee pods or plastic capsules in the wet waste. Capsules go to special recycling."
    ],
    environmentalImpact: "Adds organic material and repels pests naturally in gardens.",
    bestOption: "Soil Enrichment / Composting",
    municipalNote: false
  },
  {
    id: "garden-waste",
    name: "Garden Waste (Leaves & Twigs)",
    aliases: ["garden", "grass", "leaves", "twigs", "flowers", "weeds", "branches", "plants"],
    category: "wet",
    icon: "🌱",
    description: "Lawn clippings, dry leaves, small branches, and wilted flowers.",
    whatToDo: [
      "Use as dry brown material in compost piles (balances wet green kitchen waste).",
      "Give to municipal garden waste collector."
    ],
    avoid: [
      "Do not mix with plastic flower pots, synthetic ropes, or stone pebbles."
    ],
    environmentalImpact: "Provides crucial carbon content for balanced composting processes.",
    bestOption: "Mulching / Garden Composting",
    municipalNote: true
  },
  {
    id: "egg-shells",
    name: "Eggshells",
    aliases: ["egg", "eggshell", "shells", "breakfast"],
    category: "wet",
    icon: "🥚",
    description: "Crushed shells from raw or boiled eggs.",
    whatToDo: [
      "Crush them to speed up decomposition and add to the compost.",
      "Discard with wet kitchen waste."
    ],
    avoid: [
      "Avoid tossing whole; crushing helps decomposers break them down faster."
    ],
    environmentalImpact: "Supplies calcium carbonate to the soil, boosting plant structural growth.",
    bestOption: "Home Composting",
    municipalNote: false
  },
  {
    id: "coconut-shell",
    name: "Coconut Shell",
    aliases: ["coconut", "shell", "nariyal", "coir", "husk"],
    category: "wet",
    icon: "🥥",
    description: "Hard outer shell and husk of coconuts.",
    whatToDo: [
      "Dispose in organic/wet waste stream, or reuse for gardening crafts.",
      "Chop into small pieces if adding to home compost (takes a long time to break down)."
    ],
    avoid: [
      "Avoid mixing with recyclables, as it is fully organic."
    ],
    environmentalImpact: "Biodegradable, but because of its density, it decomposes slowly. Often shredded into garden coir.",
    bestOption: "Shredding / Organic Collection",
    municipalNote: true
  },
  {
    id: "stale-bread",
    name: "Stale Bread & Bakery Items",
    aliases: ["bread", "roti", "bakery", "cake", "biscuit", "rotten food"],
    category: "wet",
    icon: "🍞",
    description: "Molded bread, dry rotis, biscuits, or cakes.",
    whatToDo: [
      "Place in wet waste bin or home compost."
    ],
    avoid: [
      "Do not discard the plastic wrapper along with the bread into the organic bin."
    ],
    environmentalImpact: "Decomposes rapidly, adding organic substance to soil.",
    bestOption: "Composting",
    municipalNote: false
  },
  {
    id: "nutshells",
    name: "Nutshells (Peanuts, Walnuts)",
    aliases: ["nuts", "peanuts", "walnut", "shells", "almond", "pista"],
    category: "wet",
    icon: "🥜",
    description: "Hard shells from various nuts.",
    whatToDo: [
      "Add to wet waste bin or compost heap (crushed)."
    ],
    avoid: [
      "Do not mix with salt packets or plastic dry nut packaging."
    ],
    environmentalImpact: "Slowly adds carbon structure and aerates the compost heap.",
    bestOption: "Composting",
    municipalNote: false
  },
  {
    id: "used-flowers",
    name: "Used Flowers & Garlands",
    aliases: ["flower", "garland", "pooja flowers", "temple waste", "rose", "marigold"],
    category: "wet",
    icon: "🌸",
    description: "Wilted flowers from decorations or festivals.",
    whatToDo: [
      "Remove thread, plastic strings, or metallic wires first.",
      "Place flowers in the wet/organic bin or compost."
    ],
    avoid: [
      "Do not throw the synthetic threads or decorative plastic ribbons into the compost."
    ],
    environmentalImpact: "Flowers are 100% biodegradable. Removing plastic threads avoids microplastic contamination in compost.",
    bestOption: "Organic Composting",
    municipalNote: false
  },
  {
    id: "hair-nails",
    name: "Hair & Nail Clippings",
    aliases: ["hair", "nails", "clippings", "organic waste"],
    category: "wet",
    icon: "✂️",
    description: "Human or pet hair and nail trimmings.",
    whatToDo: [
      "Put in the wet waste compost bin (they decompose slowly but are fully organic)."
    ],
    avoid: [
      "Do not mix with plastic adhesive bandages or cotton pads containing synthetic fibers."
    ],
    environmentalImpact: "Contains nitrogen and keratin which eventually break down in soil.",
    bestOption: "Compost Bin",
    municipalNote: false
  },

  // DRY WASTE - NON-RECYCLABLE / MIXED (12 items)
  {
    id: "used-tissue",
    name: "Used Tissue & Paper Napkins",
    aliases: ["tissue", "napkin", "paper towel", "soiled paper", "toilet paper", "wet tissue"],
    category: "dry",
    icon: "🧻",
    description: "Soiled or wet paper tissues and kitchen towels.",
    whatToDo: [
      "Place in the non-recyclable dry waste bin.",
      "If contaminated with chemicals or oils, it must go to mixed municipal waste."
    ],
    avoid: [
      "Do not put in the recyclable paper bin. Soiled fibers cannot be recycled.",
      "Do not compost if it has oily residue or chemical cleansers."
    ],
    environmentalImpact: "Fibers are too short and soiled to recover for paper recycling. Landfilling is usually necessary.",
    bestOption: "Municipal Mixed Waste Bin",
    municipalNote: true
  },
  {
    id: "medicine-packaging",
    name: "Medicine Blister Packs",
    aliases: ["medicine", "tablet", "pill", "blister", "foil", "strip", "pharma"],
    category: "dry",
    icon: "💊",
    description: "Plastic and foil combined packaging for pills and capsules.",
    whatToDo: [
      "Empty any unused pills (take old medicines to authorized pharmacy return programs).",
      "Place the empty blister pack in the dry/mixed waste bin."
    ],
    avoid: [
      "Do not mix with clean paper recycling, as it is a composite material (plastic + metal).",
      "Do not throw liquid medicines down the sink."
    ],
    environmentalImpact: "Blister packs are complex composite plastics fused with metal foil, making them extremely difficult to recycle. Special disposal prevents chemical run-off.",
    bestOption: "Mixed Dry Waste / Pharmacy Take-Back",
    municipalNote: true
  },
  {
    id: "broken-ceramic",
    name: "Broken Ceramic Cups & Plates",
    aliases: ["ceramic", "plate", "cup", "mug", "porcelain", "china", "broken clay", "pottery"],
    category: "dry",
    icon: "🍽️",
    description: "Chipped or broken ceramic cups, plates, tiles, or clay items.",
    whatToDo: [
      "Wrap carefully in thick newspaper to prevent injury to waste handlers.",
      "Place in the mixed dry waste bin."
    ],
    avoid: [
      "Do not mix with glass bottles in the recycling bin. Ceramics melt at different temperatures and ruin glass batches."
    ],
    environmentalImpact: "Non-biodegradable and cannot be recycled in municipal glass streams. Wrapping secures safety for collection staff.",
    bestOption: "Secured Dry Waste Bin",
    municipalNote: false
  },
  {
    id: "cigarette-butts",
    name: "Cigarette Butts",
    aliases: ["cigarette", "butt", "smoke", "tobacco", "ash"],
    category: "dry",
    icon: "🚬",
    description: "Spent cigarette filters containing toxic chemicals.",
    whatToDo: [
      "Ensure the butt is completely extinguished.",
      "Place in the non-recyclable dry waste bin."
    ],
    avoid: [
      "Never throw onto streets or down drains. Rainwater washes them into water systems."
    ],
    environmentalImpact: "Filters are made of cellulose acetate (a plastic) and hold toxic heavy metals, polluting waterways and poisoning aquatic life.",
    bestOption: "Non-recyclable Dry Waste",
    municipalNote: false
  },
  {
    id: "diapers-pads",
    name: "Sanitary Pads & Diapers",
    aliases: ["diaper", "pad", "sanitary", "napkin", "pampers", "hygiene", "menstrual"],
    category: "dry",
    icon: "👶",
    description: "Used baby diapers and feminine hygiene products.",
    whatToDo: [
      "Wrap securely in paper or bags provided by the manufacturer.",
      "Place in the sanitary/hazardous dry waste bin according to local rules."
    ],
    avoid: [
      "Never flush down the toilet, as they clog sewage lines.",
      "Do not put in wet waste or recyclable paper streams."
    ],
    environmentalImpact: "Contains plastics, super-absorbent gels, and human fluids. They require dedicated sanitary landfilling or incinerators.",
    bestOption: "Sanitary/Mixed Waste Collection",
    municipalNote: true
  },
  {
    id: "dust-sweepings",
    name: "Floor Sweepings & Dust",
    aliases: ["dust", "sweepings", "dirt", "broom", "vacuum bag"],
    category: "dry",
    icon: "🧹",
    description: "Dirt and dust swept from the floor.",
    whatToDo: [
      "Put in the non-recyclable dry waste bin.",
      "Tightly bag it so dust doesn't fly around during transit."
    ],
    avoid: [
      "Do not dump loose into the bin as it disperses in air.",
      "Do not mix into organic compost if it contains plastic microfibers or carpet dust."
    ],
    environmentalImpact: "Consists of dirt, skin cells, pet dander, and microplastics. Cannot be recycled.",
    bestOption: "Non-recyclable Dry Waste",
    municipalNote: false
  },
  {
    id: "soiled-aluminum-foil",
    name: "Soiled Aluminum Foil & Food Wrappers",
    aliases: ["foil", "aluminum wrapper", "chips packet", "kurkure", "silver foil", "oily foil"],
    category: "dry",
    icon: "🌯",
    description: "Foil heavily stained with grease, cheese, or spices.",
    whatToDo: [
      "If it can be washed clean, do so and recycle it. Otherwise, place in dry waste.",
      "Fold oily sides inward."
    ],
    avoid: [
      "Do not put greasy, cheese-covered foil into the clean metal recycling bin."
    ],
    environmentalImpact: "Grease ruins chemical recycling processes. Soiled foil ends up in municipal dry trash.",
    bestOption: "Non-recyclable Dry Waste (if unwashed)",
    municipalNote: true
  },
  {
    id: "broken-mirror-glass",
    name: "Broken Mirror & Window Glass",
    aliases: ["mirror", "window glass", "broken glass", "flat glass", "sharp glass"],
    category: "dry",
    icon: "🪞",
    description: "Flat glass sheets, mirrors, or light bulb shards.",
    whatToDo: [
      "Wrap in thick cardboard or newspapers to shield handlers.",
      "Place in the dry waste bin (clearly labeled if possible)."
    ],
    avoid: [
      "Do not place in standard bottle-glass recycling container. Flat glass is treated with chemical finishes that disrupt bottle recycling."
    ],
    environmentalImpact: "Chemical coatings in mirrors (silvering) prevent standard glass furnace integration.",
    bestOption: "Secured Dry Waste Bin",
    municipalNote: true
  },
  {
    id: "rubber-bands",
    name: "Rubber Bands",
    aliases: ["rubber", "band", "elastic", "office supply"],
    category: "dry",
    icon: "🎗️",
    description: "Elastic bands made of natural or synthetic rubber.",
    whatToDo: [
      "Try to reuse them for packaging or bundling.",
      "If broken, discard in dry waste."
    ],
    avoid: [
      "Do not put in wet waste as they take years to degrade.",
      "Do not put in recyclable plastic bins."
    ],
    environmentalImpact: "Synthetic rubber doesn't biodegrade easily. Reusing is highly encouraged.",
    bestOption: "Reuse / Dry Waste Bin",
    municipalNote: false
  },
  {
    id: "tetrapak-soiled",
    name: "Soiled Juice/Milk Carton (Tetra Pak)",
    aliases: ["tetra pak", "carton", "juice box", "milk box", "paper bottle", "composite carton"],
    category: "dry",
    icon: "🧃",
    description: "Multi-layered paper-plastic-foil carton used for drinks, unrinsed.",
    whatToDo: [
      "If you can rinse and dry it, place in Recyclable Waste.",
      "If dirty and smelly, place in dry mixed waste."
    ],
    avoid: [
      "Do not throw wet milk cartons with residual liquid in the paper bin (causes mold)."
    ],
    environmentalImpact: "Composites require special hydrapulper machinery to separate layers. Clean cartons are recycled; dirty ones go to trash.",
    bestOption: "Recyclable (if rinsed) / Dry Waste (if dirty)",
    municipalNote: true
  },
  {
    id: "old-toothbrush",
    name: "Plastic Toothbrush",
    aliases: ["toothbrush", "brush", "oral hygiene", "teeth"],
    category: "dry",
    icon: "🪥",
    description: "Old plastic toothbrushes with nylon bristles.",
    whatToDo: [
      "Repurpose for cleaning tile grouting or shoes.",
      "Discard in the dry waste bin."
    ],
    avoid: [
      "Do not place in plastic recycling. Composite plastics and small sizes are sorted out by machines."
    ],
    environmentalImpact: "Non-recyclable due to fused materials (rubber handles, nylon bristles, plastic bases). Takes 400+ years to degrade.",
    bestOption: "Repurpose / Dry Waste",
    municipalNote: false
  },
  {
    id: "used-bandages",
    name: "Used Bandages & Band-aids",
    aliases: ["bandage", "bandaid", "plaster", "medical tape", "first aid"],
    category: "dry",
    icon: "🩹",
    description: "Used medical dressings or sticky bandages.",
    whatToDo: [
      "Put in dry waste, preferably wrapped in sanitary bag."
    ],
    avoid: [
      "Do not place in wet waste or recyclable bin. Sanitary hazard."
    ],
    environmentalImpact: "Contains adhesive chemical binders and potential biological fluids.",
    bestOption: "Sanitary Dry Waste Bin",
    municipalNote: false
  },

  // RECYCLABLE WASTE (14 items)
  {
    id: "plastic-bottle",
    name: "Plastic Drinking Bottle (PET)",
    aliases: ["plastic bottle", "pet bottle", "water bottle", "soda bottle", "coke bottle", "plastic"],
    category: "recyclable",
    icon: "🍼",
    description: "Clear plastic bottles typically labeled with a recycling code 1 (PET).",
    whatToDo: [
      "Empty any remaining liquid and rinse.",
      "Crush the bottle flat to save space in transport.",
      "Screw the cap back on (or recycle it separately based on local rules).",
      "Place in the recycling/dry waste bin."
    ],
    avoid: [
      "Do not leave half-filled water bottles in the bin.",
      "Never burn plastic bottles; this releases carcinogenic fumes."
    ],
    environmentalImpact: "PET is highly recyclable and can be spun into polyester fiber for clothing or made into new bottles. Recycling saves 60% of the energy of virgin plastic production.",
    bestOption: "Recycling Collection Bin",
    municipalNote: true
  },
  {
    id: "plastic-container",
    name: "Plastic Container (HDPE/PP)",
    aliases: ["plastic container", "shampoo bottle", "tupperware", "dabba", "jug", "detergent bottle", "plastic"],
    category: "recyclable",
    icon: "🧴",
    description: "Rigid plastic bottles used for detergent, shampoo, or food containers (Recycling code 2 or 5).",
    whatToDo: [
      "Rinse out soap or food residues thoroughly.",
      "Discard plastic pumps (which have metal springs) in dry waste, but keep bottle for recycling.",
      "Place in recycling bin."
    ],
    avoid: [
      "Do not toss with heavy chemical residues."
    ],
    environmentalImpact: "HDPE and PP are sturdy plastics with high recycling market value, frequently remolded into pipes, crates, and garden tools.",
    bestOption: "Recycling Collection Bin",
    municipalNote: true
  },
  {
    id: "newspaper",
    name: "Newspaper & Flyers",
    aliases: ["newspaper", "paper", "news", "flyer", "magazines", "raddi"],
    category: "recyclable",
    icon: "📰",
    description: "Printed newspaper sheets and thin paper flyers.",
    whatToDo: [
      "Keep dry and tie in stacks if possible.",
      "Place in the paper recycling bin, or sell to local scrap dealers (raddi-wala)."
    ],
    avoid: [
      "Do not mix with greasy food wrappers or oil-soaked papers.",
      "Avoid getting the paper wet, as it spoils fiber structure."
    ],
    environmentalImpact: "Paper fibers can be recycled 5 to 7 times before wearing down. Divesting from landfills reduces organic decomposition which forms greenhouse gases.",
    bestOption: "Paper Recycling / Scrap Dealer",
    municipalNote: false
  },
  {
    id: "cardboard-box",
    name: "Cardboard Box & Packaging",
    aliases: ["cardboard", "box", "amazon packaging", "carton", "paper box", "kraft"],
    category: "recyclable",
    icon: "📦",
    description: "Corrugated brown cardboard shipping boxes and cereal paperboard boxes.",
    whatToDo: [
      "Flatten the boxes to conserve storage and transport space.",
      "Remove excessive adhesive tape and shipping labels if easily done.",
      "Place in the cardboard recycling container."
    ],
    avoid: [
      "Do not recycle greasy pizza boxes (the grease contaminates the pulp mixture). Put greasy parts in dry waste."
    ],
    environmentalImpact: "Cardboard is highly reusable and biodegradable, but recycling it uses far less water and power than cutting down new trees.",
    bestOption: "Cardboard Recycling Bin",
    municipalNote: false
  },
  {
    id: "aluminum-can",
    name: "Aluminum Beverage Can",
    aliases: ["aluminum can", "soda can", "coke can", "beer can", "metal can", "tin can", "cola can"],
    category: "recyclable",
    icon: "🥫",
    description: "Lightweight metal cans containing beverages.",
    whatToDo: [
      "Empty contents completely.",
      "Rinse slightly to prevent flies and odors.",
      "Crush down to save space (optional). Place in metal recycling."
    ],
    avoid: [
      "Do not toss cans containing leftover soda or juice."
    ],
    environmentalImpact: "Aluminum can be recycled indefinitely without losing quality. Recycling saves 95% of the energy needed to mine raw bauxite ore.",
    bestOption: "Metal Recycling",
    municipalNote: false
  },
  {
    id: "glass-bottle",
    name: "Glass Bottle & Jar",
    aliases: ["glass bottle", "glass jar", "glass", "beer bottle", "jam jar", "sauce bottle"],
    category: "recyclable",
    icon: "🍾",
    description: "Clear or colored glass bottles used for food, beverages, and sauces.",
    whatToDo: [
      "Rinse out food or drink residues.",
      "Remove metal caps (metal lids can be recycled separately in the metal bin).",
      "Place in glass recycling."
    ],
    avoid: [
      "Do not throw in broken drinking glasses, window glass, or Pyrex dishes (they have different melting temperatures).",
      "Do not break them on purpose in public bins."
    ],
    environmentalImpact: "Glass is 100% recyclable and can be melted down repeatedly. Recycled cullet melts at lower heat, saving energy.",
    bestOption: "Glass Recycling Bin",
    municipalNote: true
  },
  {
    id: "steel-can",
    name: "Steel / Tin Food Can",
    aliases: ["steel can", "tin can", "food can", "soup can", "metal container"],
    category: "recyclable",
    icon: "🥫",
    description: "Canned food containers made of tin-plated steel.",
    whatToDo: [
      "Empty and rinse clean.",
      "Place lid inside the can to protect handlers from sharp edges.",
      "Add to metal recycling."
    ],
    avoid: [
      "Do not mix with hazardous chemical cans (like paint cans) unless verified."
    ],
    environmentalImpact: "Steel is the most recycled material on earth. Melting scrap saves steel mills significant resources.",
    bestOption: "Metal Recycling Bin",
    municipalNote: false
  },
  {
    id: "paper-packaging",
    name: "Clean Paper Packaging",
    aliases: ["paper packaging", "paper bag", "flour bag", "envelope", "mail", "paper"],
    category: "recyclable",
    icon: "✉️",
    description: "Clean envelopes, paper bags, and dry packaging sleeves.",
    whatToDo: [
      "Ensure there are no plastic bubble wraps inside.",
      "Place in the paper recycling bin."
    ],
    avoid: [
      "Do not recycle envelopes with plastic windows unless the plastic film is removed."
    ],
    environmentalImpact: "Recycling preserves forest ecosystems and uses less chemical bleaching.",
    bestOption: "Paper Recycling",
    municipalNote: false
  },
  {
    id: "milk-packet",
    name: "Milk Packets & Pouches",
    aliases: ["milk packet", "milk pouch", "dairy bag", "plastic bag", "milk plastic"],
    category: "recyclable",
    icon: "🥛",
    description: "Soft plastic pouches used for milk, yogurt, or oil packaging.",
    whatToDo: [
      "Cut the packet cleanly on three sides (try not to cut off small plastic corners, as they escape recycling machines).",
      "Rinse out milk residue and let it dry.",
      "Put in the dry plastic recycling bin."
    ],
    avoid: [
      "Do not throw unrinsed milk bags into the bin. Stale milk spoils other waste and creates extreme odors."
    ],
    environmentalImpact: "LDPE film is recyclable when clean. Cut pieces are melted into polymer pellets.",
    bestOption: "Clean Plastic Film Recycling",
    municipalNote: true
  },
  {
    id: "plastic-bag-clean",
    name: "Clean Plastic Grocery Bags",
    aliases: ["plastic bag", "carry bag", "shopping bag", "grocery bag", "polythene"],
    category: "recyclable",
    icon: "🛍️",
    description: "Thin, clean, dry plastic shopping carry bags.",
    whatToDo: [
      "Gather multiple bags inside one bag to prevent them flying away.",
      "Drop off at local plastic bag collection drop-offs or dry recycling bins."
    ],
    avoid: [
      "Do not mix dirty, wet bags or bags with food crumbs into the recycling."
    ],
    environmentalImpact: "Thin plastics clog sorting machinery at recycling plants. Clean bags are bundled and processed separately into plastic timber.",
    bestOption: "Dedicated Film Plastic Recycling",
    municipalNote: true
  },
  {
    id: "metal-bottle-cap",
    name: "Metal Bottle Caps & Lids",
    aliases: ["metal cap", "bottle cap", "lid", "crown cap", "beer cap"],
    category: "recyclable",
    icon: "🪙",
    description: "Metal caps from glass bottles or jars.",
    whatToDo: [
      "Collect them inside an empty metal can and pinch it closed (prevents small caps from falling through sorting screens).",
      "Recycle with metal waste."
    ],
    avoid: [
      "Do not throw loose in recycling as they slip through cracks in machinery."
    ],
    environmentalImpact: "Made of high-grade steel or aluminum, highly valuable in metal recycling streams.",
    bestOption: "Metal Recycling (in a container)",
    municipalNote: false
  },
  {
    id: "magazines",
    name: "Magazines & Catalogues",
    aliases: ["magazine", "catalogue", "glossy paper", "brochure", "booklet"],
    category: "recyclable",
    icon: "📖",
    description: "Glossy paper magazines with heavy ink coatings.",
    whatToDo: [
      "Place in paper recycling bin."
    ],
    avoid: [
      "Do not mix with damp items."
    ],
    environmentalImpact: "Glossy clay coatings are separated at paper mills during pulping. Fully recyclable.",
    bestOption: "Paper Recycling",
    municipalNote: false
  },
  {
    id: "office-paper",
    name: "Office Paper & Notebooks",
    aliases: ["office paper", "printer paper", "notebook", "letter", "document", "notes"],
    category: "recyclable",
    icon: "📝",
    description: "White and colored sheets of writing paper.",
    whatToDo: [
      "Remove any metal paperclips or plastic spiral bindings.",
      "Place in paper recycling or donate notebooks if partially blank."
    ],
    avoid: [
      "Do not recycle highly shredded paper in standard bins (shredding shortens fibers). Recycle shredded paper in bags if allowed."
    ],
    environmentalImpact: "High-grade office paper fetches premium prices at recycling centers because of its strong fibers.",
    bestOption: "Paper Recycling Bin",
    municipalNote: false
  },
  {
    id: "egg-carton-paper",
    name: "Paper Egg Carton",
    aliases: ["egg carton", "paper carton", "molded pulp", "egg tray"],
    category: "recyclable",
    icon: "🥚",
    description: "Molded grey pulp packaging for eggs.",
    whatToDo: [
      "Place in paper recycling, or tear and add to garden compost.",
      "Ensure no cracked egg residue is on the carton."
    ],
    avoid: [
      "Do not recycle if heavily smeared with egg yolk."
    ],
    environmentalImpact: "Molded pulp is already recycled paper. It biodegrades extremely fast in composting.",
    bestOption: "Paper Recycling or Composting",
    municipalNote: false
  },

  // E-WASTE / HAZARDOUS / SPECIAL CARE (13 items)
  {
    id: "mobile-phone",
    name: "Old Mobile Phone",
    aliases: ["mobile phone", "phone", "smartphone", "android", "iphone", "cellphone", "old phone"],
    category: "e-waste",
    icon: "📱",
    description: "Unusable or obsolete mobile phones containing electronics and batteries.",
    whatToDo: [
      "Back up and erase your personal data first.",
      "Remove the SIM card and external memory card.",
      "Take it to an authorized e-waste collection center or look for electronics retailer take-back kiosks."
    ],
    avoid: [
      "Never discard a mobile phone in the regular garbage bin.",
      "Do not incinerate or smash the device, as batteries can leak or explode."
    ],
    environmentalImpact: "Phones contain toxic heavy metals (lead, mercury, cadmium) that leach into soil. They also house precious metals (gold, silver, copper) which can be recovered, saving mining stress.",
    bestOption: "Authorized E-Waste Collection Center",
    municipalNote: true
  },
  {
    id: "mobile-charger",
    name: "Mobile Charger & Power Adapter",
    aliases: ["mobile charger", "charger", "adapter", "plug", "power block", "cables"],
    category: "e-waste",
    icon: "🔌",
    description: "Wall adapters and plugs used to charge mobile devices.",
    whatToDo: [
      "Bundle the wire neatly.",
      "Drop off in e-waste bins at electronic stores or municipal centers."
    ],
    avoid: [
      "Do not throw in dry waste. The plastic casing is fused with circuit copper."
    ],
    environmentalImpact: "Prevents toxic flame retardant plastics and copper wiring from ending up in landfill soils.",
    bestOption: "E-Waste Collection Bin",
    municipalNote: false
  },
  {
    id: "usb-cable",
    name: "USB Cable & Cord",
    aliases: ["usb cable", "cable", "cord", "wire", "charging wire", "connector"],
    category: "e-waste",
    icon: "🔌",
    description: "Charging and data transfer cables.",
    whatToDo: [
      "Wrap the cord tightly.",
      "Place with electronic accessories in the e-waste collection bin."
    ],
    avoid: [
      "Do not burn cords to get copper (hazardous to health and environment).",
      "Do not put in plastic recycling."
    ],
    environmentalImpact: "Cables contain copper conductors and PVC jackets. Specialized e-waste processors strip these materials cleanly.",
    bestOption: "E-Waste / Cable Recycling Bin",
    municipalNote: false
  },
  {
    id: "keyboard",
    name: "Computer Keyboard",
    aliases: ["keyboard", "computer accessory", "peripheral", "keys"],
    category: "e-waste",
    icon: "⌨️",
    description: "Plastic mechanical or membrane computer keyboards.",
    whatToDo: [
      "Drop off at e-waste drop points.",
      "If working, donate to a community center or school."
    ],
    avoid: [
      "Do not discard with plastic bottles or mixed dry waste."
    ],
    environmentalImpact: "Contains plastics and electronic contact membranes that do not biodegrade.",
    bestOption: "E-Waste Recycling / Donation",
    municipalNote: false
  },
  {
    id: "mouse",
    name: "Computer Mouse",
    aliases: ["mouse", "computer mouse", "peripheral", "clicker"],
    category: "e-waste",
    icon: "🖱️",
    description: "Wired or wireless computer navigation mouse.",
    whatToDo: [
      "Remove batteries from wireless models (recycle battery separately).",
      "Dispose of the mouse at electronic recycling depot."
    ],
    avoid: [
      "Do not throw with standard household trash."
    ],
    environmentalImpact: "Small circuits and plastic housing are reclaimed by e-waste processors.",
    bestOption: "E-Waste Collection Bin",
    municipalNote: false
  },
  {
    id: "earphones",
    name: "Earphones & Headphones",
    aliases: ["earphones", "headphones", "earbuds", "headset", "airpods"],
    category: "e-waste",
    icon: "🎧",
    description: "Wired earphones or wireless bluetooth earbuds.",
    whatToDo: [
      "Take to electronics recycling box.",
      "Clean out any wax if donating working headsets."
    ],
    avoid: [
      "Do not throw in dry trash, especially wireless ones containing tiny rechargeable lithium batteries."
    ],
    environmentalImpact: "Bluetooth earbuds have glued-in micro lithium batteries. Standard disposal can cause landfill fires if crushed.",
    bestOption: "E-Waste Collection Point",
    municipalNote: true
  },
  {
    id: "battery-alkaline",
    name: "AA / AAA Battery (Alkaline)",
    aliases: ["battery", "alkaline battery", "dry cell", "aa battery", "aaa battery", "remote battery", "pencil cell"],
    category: "e-waste",
    icon: "🔋",
    description: "Single-use household dry cells used in remotes, toys, and clocks.",
    whatToDo: [
      "Store old batteries in a dry plastic container at home until you have a small batch.",
      "Take to dedicated battery collection points (often found at local supermarkets, libraries, or e-waste collection boxes)."
    ],
    avoid: [
      "Never throw batteries into wet or dry trash bins.",
      "Do not throw in fire; they can burst and release highly toxic chemicals."
    ],
    environmentalImpact: "Contains manganese dioxide and zinc. While modern batteries have less mercury, chemical leakage still contaminates groundwater. Special recycling extracts metals.",
    bestOption: "Dedicated Battery Recycling Box",
    municipalNote: true
  },
  {
    id: "rechargeable-battery",
    name: "Rechargeable Lithium Battery",
    aliases: ["rechargeable battery", "lithium battery", "li-ion battery", "camera battery", "powerbank"],
    category: "e-waste",
    icon: "🔋",
    description: "Rechargeable batteries from cameras, powerbanks, or tools.",
    whatToDo: [
      "Cover the terminals with tape to prevent short circuits.",
      "Bring to an electronics retail collection point or specialized e-waste collection site."
    ],
    avoid: [
      "Do not throw in household bins. They present severe fire hazards in standard waste trucks."
    ],
    environmentalImpact: "Highly toxic elements (cobalt, lithium, nickel). Critical materials are retrieved through chemical recovery.",
    bestOption: "E-Waste / Specialized Battery Depot",
    municipalNote: true
  },
  {
    id: "laptop",
    name: "Old Laptop Computer",
    aliases: ["laptop", "computer", "notebook pc", "old computer", "macbook"],
    category: "e-waste",
    icon: "💻",
    description: "Discarded, broken, or outdated laptop computers.",
    whatToDo: [
      "Wipe all hard drives clean of personal information.",
      "Take to electronics recycler or trade in if it has monetary value."
    ],
    avoid: [
      "Never put a laptop in the domestic garbage wheelie bin."
    ],
    environmentalImpact: "Contains toxic flame retardants, leaded solder, glass, and lithium-polymer battery cells. Recycling diverts harmful materials from soils.",
    bestOption: "Authorized E-Waste Collection / Trade-In",
    municipalNote: true
  },
  {
    id: "computer-components",
    name: "Computer Components (RAM, Motherboards)",
    aliases: ["computer components", "ram", "motherboard", "hard drive", "cpu", "graphics card", "gpu", "circuit"],
    category: "e-waste",
    icon: "📟",
    description: "Internal PC parts, circuit boards, and expansion cards.",
    whatToDo: [
      "Keep dry and transport in boxes to e-waste recycling facilities."
    ],
    avoid: [
      "Do not mix with metal tins or plastics, as circuits are highly complex composite assemblies."
    ],
    environmentalImpact: "Contains toxic components along with valuable gold and palladium platings.",
    bestOption: "E-Waste Processing Center",
    municipalNote: false
  },
  {
    id: "old-remote",
    name: "Television / AC Remote",
    aliases: ["old remote", "remote", "tv remote", "ac remote", "controller"],
    category: "e-waste",
    icon: "🎛️",
    description: "Plastic remote controllers.",
    whatToDo: [
      "Pop out the batteries (alkaline batteries go to battery recycle boxes).",
      "Send the plastic remote shell to e-waste recycling."
    ],
    avoid: [
      "Do not trash the remote with batteries still inside."
    ],
    environmentalImpact: "Prevents toxic rubber keypads and silicon boards from landfill leaching.",
    bestOption: "E-Waste Collection (Batteries removed)",
    municipalNote: false
  },
  {
    id: "light-bulb",
    name: "Fluorescent Light Bulb / CFL",
    aliases: ["light bulb", "bulb", "cfl", "fluorescent", "tube light", "led bulb"],
    category: "e-waste",
    icon: "💡",
    description: "Energy-saving CFL bulb or long tube lights.",
    whatToDo: [
      "Handle carefully to avoid breakage.",
      "Take to hazardous waste or specialized bulb drop-off centers (retail hardware stores sometimes accept them)."
    ],
    avoid: [
      "Do not throw in glass recycling bins.",
      "Avoid breathing in vapor if a CFL breaks. Open windows immediately."
    ],
    environmentalImpact: "CFLs contain trace mercury gas. Proper processing neutralizes the mercury before glass extraction.",
    bestOption: "Hazardous / Household Special Waste Center",
    municipalNote: true
  },
  {
    id: "thermocol-packaging",
    name: "Thermocol / EPS Foam Packaging",
    aliases: ["thermocol", "foam packaging", "styrofoam", "eps", "cushioning foam"],
    category: "e-waste",
    icon: "📦",
    description: "White expanded polystyrene packaging blocks.",
    whatToDo: [
      "Keep clean and dry.",
      "Check if local drop-offs take EPS (some clean blocks are accepted). Otherwise, place in dry mixed waste."
    ],
    avoid: [
      "Do not mix with paper or cardboard recycling."
    ],
    environmentalImpact: "Extremely voluminous, takes up massive landfill volume, and breaks into microscopic white beads that animals ingest.",
    bestOption: "Check Local Guidance / Non-recyclable Dry Waste",
    municipalNote: true
  }
];
