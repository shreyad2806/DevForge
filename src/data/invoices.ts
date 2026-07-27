export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  invoiceNumber: string;
}

export interface BillingSummary {
  plan: string;
  status: "Active" | "Inactive";
  description: string;
  price: string;
  billingCycle: string;
  nextBillingDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  daysLeft: number;
  totalDue: string;
  paymentMethod: string;
  paymentLastFour: string;
  billingEmail: string;
  tags: string[];
}

export interface UsageItem {
  id: string;
  label: string;
  value: string;
  limit: string;
  percent: number;
  icon: string;
  iconColor: string;
}

export const billingSummary: BillingSummary = {
  plan: "Pro Plan",
  status: "Active",
  description: "For professional developers and growing teams.",
  price: "$19.00",
  billingCycle: "Monthly",
  nextBillingDate: "Jun 20, 2024",
  currentPeriodStart: "May 20, 2024",
  currentPeriodEnd: "Jun 20, 2024",
  daysLeft: 31,
  totalDue: "$19.00",
  paymentMethod: "visa",
  paymentLastFour: "4242",
  billingEmail: "shreya@example.com",
  tags: [
    "100+ Premium Kits",
    "Unlimited Workspaces",
    "AI Assistant (20/day)",
    "Priority Support",
  ],
};

export const usageItems: UsageItem[] = [
  {
    id: "ai-requests",
    label: "AI Assistant Requests",
    value: "156",
    limit: "600",
    percent: 26,
    icon: "Bot",
    iconColor: "text-purple-400",
  },
  {
    id: "premium-kits",
    label: "Premium Kits Added",
    value: "28",
    limit: "Unlimited",
    percent: 0,
    icon: "Box",
    iconColor: "text-blue-400",
  },
  {
    id: "workspaces",
    label: "Workspaces",
    value: "4",
    limit: "Unlimited",
    percent: 0,
    icon: "Folder",
    iconColor: "text-emerald-400",
  },
  {
    id: "storage",
    label: "Storage Used",
    value: "12.4 GB",
    limit: "100 GB",
    percent: 12,
    icon: "Cloud",
    iconColor: "text-sky-400",
  },
];

export const invoices: Invoice[] = [
  {
    id: "inv-1",
    date: "May 20, 2024",
    amount: "$19.00",
    status: "Paid",
    invoiceNumber: "INV-2024-05-120",
  },
  {
    id: "inv-2",
    date: "Apr 20, 2024",
    amount: "$19.00",
    status: "Paid",
    invoiceNumber: "INV-2024-04-120",
  },
  {
    id: "inv-3",
    date: "Mar 20, 2024",
    amount: "$19.00",
    status: "Paid",
    invoiceNumber: "INV-2024-03-120",
  },
  {
    id: "inv-4",
    date: "Feb 20, 2024",
    amount: "$19.00",
    status: "Paid",
    invoiceNumber: "INV-2024-02-120",
  },
  {
    id: "inv-5",
    date: "Jan 20, 2024",
    amount: "$19.00",
    status: "Paid",
    invoiceNumber: "INV-2024-01-120",
  },
];
