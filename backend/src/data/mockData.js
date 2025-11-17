const mockTables = [
  {
    title: "Top Programming Languages 2024",
    headers: ["Language", "Popularity", "Use Case", "Difficulty"],
    rows: [
      ["JavaScript", "95%", "Web Development", "Easy"],
      ["Python", "92%", "AI/ML, Data Science", "Easy"],
      ["Java", "85%", "Enterprise Apps", "Medium"],
      ["TypeScript", "78%", "Large Scale Apps", "Medium"],
      ["Go", "65%", "Cloud Services", "Medium"]
    ]
  },
  {
    title: "E-commerce Sales Data",
    headers: ["Product", "Sales", "Revenue", "Rating"],
    rows: [
      ["Laptop", "1,234", "$1,234,000", "4.5"],
      ["Smartphone", "2,567", "$1,800,000", "4.7"],
      ["Headphones", "4,321", "$432,000", "4.3"],
      ["Smartwatch", "1,890", "$567,000", "4.6"],
      ["Tablet", "987", "$345,000", "4.4"]
    ]
  },
  {
    title: "Monthly Website Traffic",
    headers: ["Month", "Visitors", "Page Views", "Bounce Rate"],
    rows: [
      ["January", "45,000", "120,000", "35%"],
      ["February", "52,000", "145,000", "32%"],
      ["March", "61,000", "178,000", "28%"],
      ["April", "58,000", "165,000", "30%"],
      ["May", "67,000", "198,000", "26%"]
    ]
  },
  {
    title: "Employee Performance Metrics",
    headers: ["Department", "Employees", "Avg Performance", "Retention Rate"],
    rows: [
      ["Engineering", "120", "4.2/5", "92%"],
      ["Sales", "85", "4.0/5", "88%"],
      ["Marketing", "45", "4.3/5", "90%"],
      ["HR", "30", "4.1/5", "95%"],
      ["Finance", "40", "4.4/5", "93%"]
    ]
  },
  {
    title: "Project Timeline Overview",
    headers: ["Project", "Status", "Progress", "Deadline"],
    rows: [
      ["Mobile App", "In Progress", "75%", "Dec 2024"],
      ["Website Redesign", "Completed", "100%", "Oct 2024"],
      ["API Integration", "In Progress", "60%", "Jan 2025"],
      ["Data Migration", "Planning", "20%", "Mar 2025"],
      ["Security Audit", "In Progress", "45%", "Feb 2025"]
    ]
  }
];

const mockInfoTexts = [
  "Based on the data analysis, we can see a clear upward trend in the metrics. This indicates positive growth and strong performance across all categories.",
  "The information shows interesting patterns that suggest seasonal variations. It's important to consider these trends when making strategic decisions.",
  "According to the latest statistics, there's been significant improvement in key performance indicators. This data reflects the effectiveness of recent initiatives.",
  "The analysis reveals important insights about user behavior and preferences. These findings can help optimize future strategies and resource allocation.",
  "Current data suggests that market conditions are favorable for expansion. The metrics demonstrate consistent growth and stable performance indicators.",
  "Looking at the comparative analysis, we observe notable differences between various segments. This information is crucial for targeted decision-making.",
  "The trends indicate a strong correlation between user engagement and conversion rates. These insights can guide our optimization efforts.",
  "Historical data comparison shows remarkable progress over the past quarter. The consistent improvement pattern suggests effective strategy implementation."
];

module.exports = {
  mockTables,
  mockInfoTexts,
  getRandomTable: () => mockTables[Math.floor(Math.random() * mockTables.length)],
  getRandomInfo: () => mockInfoTexts[Math.floor(Math.random() * mockInfoTexts.length)]
};