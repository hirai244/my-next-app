import z from "zod";

export const applicationSchema = z.object({
  jobId: z.coerce.number("IDが不正です").int("IDは整数である必要があります。"),
});
export type ApplicationValues = z.infer<typeof applicationSchema>;
