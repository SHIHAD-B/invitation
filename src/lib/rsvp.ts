import { z } from "zod";

export const rsvpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Please enter your name")
      .max(80, "Name is too long"),
    attending: z.boolean({
      error: "Please choose whether you will attend",
    }),
    guestCount: z.number().int().min(1).max(20).optional(),
    message: z.string().trim().max(600, "Message is too long"),
  })
  .superRefine((value, ctx) => {
    if (value.attending && (value.guestCount == null || value.guestCount < 1)) {
      ctx.addIssue({
        code: "custom",
        path: ["guestCount"],
        message: "Please add the number of guests",
      });
    }
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;

export type RsvpRecord = {
  id: string;
  name: string;
  attending: boolean;
  guestCount?: number;
  message: string;
  createdAt: string;
};

export function fieldErrorsFromZod(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fields[key]) {
      fields[key] = issue.message;
    }
  }
  return fields;
}
