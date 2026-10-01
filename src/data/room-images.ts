import bills from "@/assets/card-bills.jpg";
import career from "@/assets/card-career.jpg";
import business from "@/assets/card-business.jpg";
import emergency from "@/assets/card-emergency.jpg";
import hero from "@/assets/hero.jpg";
import idea from "@/assets/idea.jpg";
import problem from "@/assets/problem.jpg";
import door from "@/assets/door.jpg";

const byCategory: Record<string, string> = {
  "Financial Challenges & Money": bills,
  "Career, Jobs & Professional Growth": career,
  "Business, Startups & Entrepreneurship": business,
  "Sales, Marketing & Customer Growth": idea,
  "Relationships & Social Life": hero,
  "Family & Personal Challenges": problem,
  "Emotional Wellbeing & Life Transitions": door,
  "Legal Guidance & Everyday Rights": problem,
  "Education, Skills & Learning": idea,
  "Confidence & Personal Growth": career,
  "Health Questions & Finding Support": emergency,
  "Creativity, Projects & Collaboration": hero,
};

export function roomImage(category: string): string {
  return byCategory[category] ?? hero;
}
