export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarColor: string;
  companyLogo: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "sarah-chen",
    quote:
      "DevForge shipped our auth flow in under two hours. The kits are clean, well documented, and actually production-ready.",
    name: "Sarah Chen",
    role: "Engineering Lead",
    company: "Nexora",
    avatarColor: "#f59e0b",
    companyLogo: "Nexora",
  },
  {
    id: "ajay-patel",
    quote:
      "The AI assistant is a game changer. It helped us integrate a payment system in one afternoon with almost zero boilerplate.",
    name: "Ajay Patel",
    role: "CTO at Sylica",
    company: "Sylica",
    avatarColor: "#10b981",
    companyLogo: "Sylica",
  },
  {
    id: "darek-zun",
    quote:
      "Finally, a place where I can trust the code I copy into my projects. DevForge saves us days on every launch.",
    name: "Darek Zun",
    role: "Senior Frontend Engineer",
    company: "Kraft Studio",
    avatarColor: "#3b82f6",
    companyLogo: "Kraft",
  },
];
