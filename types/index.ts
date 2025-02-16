import { z } from "zod";
import { insertAnalysisSchema } from "@/lib/validators";


export type AnalysisStatus = "PENDING" | "COMPLETED" | "FAILED";

export type Analysis = z.infer<typeof insertAnalysisSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
