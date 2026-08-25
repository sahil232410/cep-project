// EcoGuide - Community Engagement Project (CEP) Survey Data
// IMPORTANT: These figures are DEMO PLACEHOLDERS representing initial student surveys.
// Students should replace these placeholder numbers with their actual research and survey results.

export const communitySurveyData = {
  // Metadata about the survey size
  metadata: {
    title: "Community Waste Awareness & Segregation Survey",
    targetLocation: "Local Residential Colony & College Campus",
    dateConducted: "August 2026",
    peopleSurveyed: 150, // [REPLACE WITH ACTUAL NUMBER OF PEOPLE SURVEYED]
    targetAudience: "Residents, Students, and Local Shopkeepers"
  },

  // Survey questions with response statistics (Yes / No counts)
  // [REPLACE RESPONSE VALUES WITH YOUR ACTUAL SURVEY RESULTS]
  questions: [
    {
      id: "q1",
      questionText: "Do you segregate waste regularly at home?",
      yesCount: 52, 
      noCount: 98,
      yesPercentage: 35, // (52 / 150) * 100
      insight: "Most households dump dry food packaging and organic leftovers into the same trash bag, ruining potential paper/cardboard recycling."
    },
    {
      id: "q2",
      questionText: "Do you know what 'e-waste' stands for?",
      yesCount: 90,
      noCount: 60,
      yesPercentage: 60,
      insight: "While many recognize the term 'electronic waste', they are unaware of the dangerous toxic heavy metals inside."
    },
    {
      id: "q3",
      questionText: "Do you know how batteries should be disposed of?",
      yesCount: 30,
      noCount: 120,
      yesPercentage: 20,
      insight: "A vast majority (80%) discard old pencil cell batteries and chargers directly in household trash or dump them in open community heaps."
    },
    {
      id: "q4",
      questionText: "Do you know which plastic types are recyclable (PET 1, HDPE 2, etc.)?",
      yesCount: 45,
      noCount: 105,
      yesPercentage: 30,
      insight: "People generally recognize plastic bottles as recyclable, but throw thin carry bags and oily takeout containers into the recycling heap indiscriminately."
    },
    {
      id: "q5",
      questionText: "Would you use a web/mobile guide to identify waste categories?",
      yesCount: 135,
      noCount: 15,
      yesPercentage: 90,
      insight: "A large percentage of the community (90%) expressed willingness to segregate if given access to a quick, clear search guide like EcoGuide."
    }
  ],

  // Common community observations recorded during the field visits
  // [REPLACE WITH YOUR ACTUAL GROUP OBSERVATIONS]
  observations: [
    {
      id: "obs-1",
      title: "Mixed Garbage Dumps",
      description: "Observed community municipal bins overflowing with mixed organic food leftovers, plastic bottles, glass shards, and old cables piled together."
    },
    {
      id: "obs-2",
      title: "Open Burning of Dry Waste",
      description: "Noticed local sweepers burning piles of dry leaves mixed with plastic bags on roadsides during early morning hours, creating thick black smoke."
    },
    {
      id: "obs-3",
      title: "E-waste Accumulation in Homes",
      description: "Many residents report holding drawers full of old chargers, cables, and broken headphones simply because they don't know where to safely dump them."
    }
  ],

  // Key findings summarized from the data
  // [REPLACE WITH YOUR CEP REPORT FINDINGS]
  keyFindings: [
    "Lack of separation at the source: High willingness but low practice due to lack of separate bins and clear knowledge.",
    "Hazardous items in normal trash: Items like light bulbs, expired medicines, and AA cells are routinely mixed into domestic garbage bins.",
    "Recyclables contamination: Clean cardboard and newspapers are often soiled by liquid kitchen wastes, reducing their commercial recycling value."
  ],

  // Knowledge gaps identified
  // [REPLACE WITH YOUR PROJECT ASSESSMENT]
  knowledgeGaps: [
    {
      gap: "Battery & Chemicals Hazard",
      explanation: "Residents do not realize that heavy metals leak out of household cells, entering local drinking water tables."
    },
    {
      gap: "Clean vs Dirty Recyclables",
      explanation: "General understanding is 'plastic is plastic'. The community is unaware that dirty/oily containers cannot be processed by recycling mills."
    },
    {
      gap: "E-Waste Recycling Pipelines",
      explanation: "No clear information on where the nearest authorized electronics collection points or retail buyback centers are located."
    }
  ],

  // Action plan and learnings section
  learnings: {
    whatWeLearned: "We learned that the primary barrier to waste segregation is not lack of interest, but rather convenience and clear information. When residents are presented with a simple, searchable directory showing exactly which bin an item goes into, they are 80% more likely to follow proper protocols. Furthermore, municipal rules are frequently misunderstood, emphasizing the need for accessible local instructions.",
    communityImpactGoal: "By distributing EcoGuide to residential groups and housing committees, we aim to raise the home segregation rate from the current mock baseline of 35% to over 60% within three months."
  }
};
