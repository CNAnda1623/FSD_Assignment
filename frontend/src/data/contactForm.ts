import { z } from "zod";

export const contactFormSchema = z.object({
  role: z.string().min(1, "Please select your role"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().min(1, "Please select your country/region"),
  city: z.string().min(1, "City is required"),
  termsAccepted: z.literal(true, {
    message: "You must agree to the Terms of Use",
  }),
  newsletter: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const roleOptions = [
  "Installer",
  "Distributor",
  "Business Owner",
  "Homeowner",
  "EPC Contractor",
  "Other",
];

export const countryOptions = [
  "India",
  "Germany",
  "Australia",
  "United States",
  "United Kingdom",
  "Japan",
  "Brazil",
  "Other",
];
