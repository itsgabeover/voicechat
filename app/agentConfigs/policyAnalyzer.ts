import { AgentConfig } from "@/types";
import { injectTransferTools } from "./utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAnalysisBySlug } from "@/lib/actions/analysis.actions";

// Define agents
const policyAnalyzer: AgentConfig = {
  name: "Policy Analyst",
  publicDescription: "Agent that can chat with your policy", // Context for the agent_transfer tool
  instructions: "Respond to user queries about their policy",
  tools: [],
};


// add the transfer tool to point to downstreamAgents
const agents = injectTransferTools([policyAnalyzer]);

export default agents;
