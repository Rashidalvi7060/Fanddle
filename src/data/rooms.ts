export type Room = {
  id: string;
  number: number;
  title: string;
  category: string;
  description: string;
};

type Group = { category: string; blurb: string; titles: string[] };

export const ROOM_CAPACITY = 1000;
export const TOTAL_ROOMS = 200;
export const FOUNDING_PLACES = ROOM_CAPACITY * TOTAL_ROOMS;

/**
 * Confirmed registrations. Must come from real backend data.
 * null = no registration system connected yet; UI must not show a member count.
 */
export const CONFIRMED_REGISTRATIONS: number | null = null;

const groups: Group[] = [
  {
    category: "Financial Challenges & Money",
    blurb: "For people working through money pressure and looking for practical experience.",
    titles: [
      "Debt & Repayment Pressure",
      "Budgeting on an Unstable Income",
      "Saving & Emergency Funds",
      "Loans, EMIs & Credit Questions",
      "Investing Basics & Common Mistakes",
      "Income Loss & Financial Recovery",
      "Money Conversations at Home",
      "Freelance & Irregular Earnings",
      "Insurance & Financial Protection",
      "Credit Scores & Rebuilding Credit",
      "Taxes for Individuals",
      "Retirement Planning",
      "Supporting Family Financially",
      "Medical Bills & Unexpected Costs",
      "Side Income Ideas",
      "Avoiding Financial Scams",
      "Buying or Renting a Home",
    ],
  },
  {
    category: "Career, Jobs & Professional Growth",
    blurb: "For people navigating work, hiring, and the next step in a career.",
    titles: [
      "Job Search & Applications",
      "Interviews & Offers",
      "Career Change & Switching Fields",
      "Workplace Conflict & Difficult Managers",
      "Promotions, Reviews & Pay Talks",
      "Layoffs & Starting Again",
      "Remote & Hybrid Work Realities",
      "First Jobs & Early Career",
      "Leadership & Managing People",
      "Resumes & LinkedIn Profiles",
      "Working Abroad",
      "Returning After a Career Break",
      "Government & Public Sector Jobs",
      "Mid-career Uncertainty",
      "Mentorship & Finding Guidance",
      "Gig Work & Contract Roles",
      "Work-life Balance",
    ],
  },
  {
    category: "Business, Startups & Entrepreneurship",
    blurb: "For founders and operators sharing what actually worked and what did not.",
    titles: [
      "Starting From Zero",
      "Finding the First Customers",
      "Funding & Investor Conversations",
      "Cash Flow & Survival Months",
      "Co-founders & Partnerships",
      "Hiring the First Team",
      "Scaling Operations",
      "Closing, Pivoting & Starting Over",
      "Small Shops & Local Business",
      "Validating a Business Idea",
      "Suppliers & Manufacturing",
      "E-commerce & Online Stores",
      "Family Business Transitions",
      "Franchises & Licensing",
      "Restaurants & Food Business",
      "Bootstrapping Without Investors",
      "Founder Stress & Isolation",
    ],
  },
  {
    category: "Sales, Marketing & Customer Growth",
    blurb: "For people whose work depends on reaching and keeping customers.",
    titles: [
      "Cold Outreach & Pipelines",
      "Pricing & Negotiation",
      "Brand & Positioning",
      "Content & Audience Building",
      "Paid Ads & Performance",
      "Retention & Customer Care",
      "Agencies & Client Work",
      "Selling Without a Network",
      "B2B Sales Cycles",
      "Social Media for Small Business",
      "Handling Rejection in Sales",
      "Partnerships & Referrals",
      "SEO & Being Found Online",
      "Events & Offline Marketing",
      "Product Launches",
      "Customer Complaints & Reviews",
    ],
  },
  {
    category: "Relationships & Social Life",
    blurb: "For questions about the people around you.",
    titles: [
      "Dating & Meeting People",
      "Long-term Partnership Struggles",
      "Breakups & Separation",
      "Friendship & Loneliness",
      "Trust & Boundaries",
      "Long-distance & Migration",
      "Social Anxiety & Belonging",
      "Community & Making New Circles",
      "Moving to a New City",
      "Toxic Relationships",
      "Reconnecting With Old Friends",
      "Neighbours & Shared Living",
      "Cultural & Interfaith Relationships",
      "Divorce & Rebuilding",
      "Being an Introvert",
      "Workplace Friendships",
      "Forgiveness & Reconciliation",
    ],
  },
  {
    category: "Family & Personal Challenges",
    blurb: "For the situations closest to home.",
    titles: [
      "Parenting Questions",
      "Caring for Ageing Parents",
      "Family Expectations & Pressure",
      "Marriage & In-Law Dynamics",
      "Siblings & Inheritance",
      "Single Parents",
      "Household Finances Together",
      "Relocation & Family Decisions",
      "Parenting Teenagers",
      "New Parents",
      "Children With Special Needs",
      "Fertility & Adoption",
      "Blended Families",
      "Family Conflict & Estrangement",
      "Elder Care Logistics",
      "Raising Kids Abroad",
      "Balancing Career & Family",
    ],
  },
  {
    category: "Emotional Wellbeing & Life Transitions",
    blurb: "Peer support, not treatment. Professional help is encouraged where needed.",
    titles: [
      "Burnout & Exhaustion",
      "Anxiety in Daily Life",
      "Low Periods & Motivation",
      "Grief & Loss",
      "Identity & Big Life Changes",
      "Recovery & Habits",
      "Sleep, Stress & Routine",
      "Starting Therapy: Questions",
      "Turning 30, 40, 50",
      "Retirement & Purpose",
      "Feeling Stuck",
      "Coping With Uncertainty",
      "Loss of a Pet",
      "Mindfulness & Calm",
      "Overthinking",
      "Starting Over After a Setback",
      "Quarter-life Questions",
    ],
  },
  {
    category: "Legal Guidance & Everyday Rights",
    blurb: "General information from experience. Not a substitute for a qualified lawyer.",
    titles: [
      "Rental & Housing Disputes",
      "Employment Rights & Contracts",
      "Consumer Complaints",
      "Property & Documentation",
      "Family & Civil Matters",
      "Small Business Compliance",
      "Online Fraud & Reporting",
      "Understanding Legal Paperwork",
      "Wills & Succession",
      "Immigration & Visas",
      "Intellectual Property Basics",
      "Debt Recovery & Notices",
      "Road Accidents & Claims",
      "Finding the Right Lawyer",
      "Data Privacy Rights",
      "Neighbour & Society Disputes",
    ],
  },
  {
    category: "Education, Skills & Learning",
    blurb: "For students, late learners and people retraining.",
    titles: [
      "Exams & Study Strategy",
      "Choosing a Course or Degree",
      "Studying Abroad",
      "Scholarships & Education Costs",
      "Learning to Code",
      "Design & Creative Skills",
      "Languages & Communication Skills",
      "Learning Later in Life",
      "Competitive Exam Preparation",
      "Online Courses That Are Worth It",
      "Data & Analytics Skills",
      "Trades & Vocational Skills",
      "Dropping Out & Alternative Paths",
      "Teaching & Tutoring",
      "Research & Higher Studies",
      "Learning Disabilities & Support",
      "AI Tools & New Skills",
    ],
  },
  {
    category: "Confidence & Personal Growth",
    blurb: "For the skills nobody formally teaches.",
    titles: [
      "Speaking Up & Public Speaking",
      "Self-worth & Confidence",
      "Difficult Conversations",
      "Discipline & Follow-through",
      "Time & Attention",
      "Personal Brand & Visibility",
      "Handling Criticism",
      "Rebuilding After Failure",
      "Decision Making",
      "Goal Setting That Works",
      "Imposter Feelings",
      "Saying No",
      "Habits & Routines",
      "Fear of Failure",
      "Finding Your Direction",
      "Emotional Intelligence",
    ],
  },
  {
    category: "Health Questions & Finding Support",
    blurb: "Lived experience and navigation help. Always consult qualified professionals.",
    titles: [
      "Navigating Diagnosis & Care",
      "Chronic Conditions & Daily Life",
      "Fitness & Movement",
      "Food, Nutrition & Habits",
      "Caregiving & Hospital Logistics",
      "Medical Costs & Insurance Claims",
      "Finding Reliable Specialists",
      "Recovery & Rehabilitation",
      "Women's Health Questions",
      "Living With Disability",
      "Weight & Body Image",
      "Quitting Smoking & Alcohol",
      "Back, Joint & Posture Pain",
      "Diabetes & Lifestyle",
      "Heart Health",
      "Second Opinions",
      "Healthy Ageing",
    ],
  },
  {
    category: "Creativity, Projects & Collaboration",
    blurb: "For makers looking for collaborators, feedback and momentum.",
    titles: [
      "Finding Collaborators",
      "Writing & Publishing",
      "Music, Film & Performance",
      "Side Projects That Ship",
      "Creator Economy & Monetisation",
      "Feedback & Critique",
      "Open Projects & Volunteering",
      "Photography & Visual Art",
      "Podcasting & Audio",
      "Game Development",
      "Crafts & Handmade Goods",
      "Fashion & Design",
      "Social Impact Projects",
      "Hackathons & Build Weekends",
      "Creative Block",
      "Building in Public",
    ],
  },
];

function buildRooms(): Room[] {
  const rooms: Room[] = [];
  let n = 0;
  for (const group of groups) {
    for (const title of group.titles) {
      n += 1;
      rooms.push({
        id: String(n).padStart(3, "0"),
        number: n,
        title,
        category: group.category,
        description: group.blurb,
      });
    }
  }
  return rooms;
}

export const rooms: Room[] = buildRooms();

export const categories: string[] = groups.map((g) => g.category);

export function getRoom(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}
