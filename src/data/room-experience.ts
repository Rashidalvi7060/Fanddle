import type { Room } from "@/data/rooms";

type Audience = { people: string[]; reason: string };

const audiences: Record<string, Audience> = {
  "Financial Challenges & Money": {
    people: ["People finding their footing with money", "People navigating changing incomes", "People sharing practical lessons", "People supporting family finances"],
    reason: "Money pressure can make every next step feel harder. This room creates space to compare experiences, ask practical questions and think through your options with people who understand the subject.",
  },
  "Career, Jobs & Professional Growth": {
    people: ["People exploring their next career move", "Job seekers and career changers", "People learning new workplace skills", "Professionals sharing lessons from experience"],
    reason: "Career decisions rarely follow a straight line. This room brings together people navigating similar choices, setbacks and changes in direction.",
  },
  "Business, Startups & Entrepreneurship": {
    people: ["Founders working through real decisions", "People building small businesses", "Entrepreneurs learning as they go", "Operators sharing hard-won lessons"],
    reason: "Building something can be exciting and isolating at the same time. This room makes room for honest questions, practical exchange and perspectives from people on their own paths.",
  },
  "Sales, Marketing & Customer Growth": {
    people: ["People building customer relationships", "Independent businesses and makers", "Marketers testing new approaches", "Sales professionals sharing what they learn"],
    reason: "Reaching the right people takes experimentation. This room is for sharing what you are trying, what you are learning and where you feel stuck.",
  },
  "Relationships & Social Life": {
    people: ["People navigating changing relationships", "People looking for a stronger sense of belonging", "People learning about boundaries and trust", "People sharing personal experience"],
    reason: "Relationships can be difficult to make sense of alone. This room offers a respectful place to talk through social situations and hear different lived perspectives.",
  },
  "Family & Personal Challenges": {
    people: ["People working through family decisions", "Caregivers and parents", "People balancing competing responsibilities", "People sharing lessons from family life"],
    reason: "The challenges closest to home can be the hardest to discuss. This room brings together people with varied family experiences, without judgement or a promise of easy answers.",
  },
  "Emotional Wellbeing & Life Transitions": {
    people: ["People moving through a life transition", "People navigating stress and uncertainty", "People sharing their own coping practices", "People looking for peer understanding"],
    reason: "Change, stress and difficult seasons can feel isolating. This peer space makes room for honest conversation and shared experience; it is not a substitute for professional care.",
  },
  "Legal Guidance & Everyday Rights": {
    people: ["People trying to understand everyday processes", "People comparing practical experiences", "People seeking general information", "People sharing helpful next steps"],
    reason: "Legal and administrative situations can be confusing. This room is a place to compare general experiences and questions, not a substitute for advice from a qualified lawyer.",
  },
  "Education, Skills & Learning": {
    people: ["Students at different stages", "People learning something new", "People changing direction or retraining", "Educators and peer learners"],
    reason: "Learning paths are rarely identical. This room helps people exchange study approaches, lessons and encouragement as they work toward their own goals.",
  },
  "Confidence & Personal Growth": {
    people: ["People practising new skills", "People working through self-doubt", "Students and early-career professionals", "People reflecting on personal growth"],
    reason: "Personal growth can feel hard to measure when you are doing it alone. This room brings together people sharing questions, practice and perspectives on change.",
  },
  "Health Questions & Finding Support": {
    people: ["People navigating care and daily routines", "Caregivers and family supporters", "People sharing lived experience", "People looking for practical peer support"],
    reason: "Health situations often come with practical questions as well as personal ones. This room is for sharing lived experience and navigation ideas, not for replacing qualified medical care.",
  },
  "Creativity, Projects & Collaboration": {
    people: ["Independent creators and makers", "People developing a personal project", "Potential collaborators", "People sharing constructive feedback"],
    reason: "Creative work grows through momentum, feedback and connection. This room gives people space to share what they are making, ask questions and find fresh perspectives.",
  },
};

export function roomExperience(room: Room) {
  const topic = room.title.toLowerCase();
  const audience = audiences[room.category];

  return {
    reason: audience?.reason ?? `Some challenges around ${topic} are easier to explore with other perspectives. This room makes space for people to share what they are learning and ask honest questions.`,
    activities: [
      `Share a challenge connected to ${topic}`,
      `Ask for perspectives on your situation`,
      `Learn from experiences related to ${topic}`,
      `Talk through possible next steps`,
      `Offer support when you have relevant experience`,
      `Build connections around a shared subject`,
    ],
    takeaways: [
      `Different perspectives on ${topic}`,
      `Experiences from people navigating similar questions`,
      `Practical ideas to consider at your own pace`,
      `A place for focused conversation about ${room.category.toLowerCase()}`,
      `Opportunities to both ask for and offer peer support`,
    ],
    people: audience?.people ?? [
      `People interested in ${topic}`,
      `People sharing relevant experiences`,
      "People asking questions and exploring options",
      "People who want to contribute thoughtfully",
    ],
  };
}