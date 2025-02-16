import { z } from "zod";
import { insertAnalysisSchema } from "@/lib/validators";

export type Analysis = z.infer<typeof insertAnalysisSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
