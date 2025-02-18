import { AllAgentConfigsType } from "@/types";
import frontDeskAuthentication from "./frontDeskAuthentication";
import customerServiceRetail from "./customerServiceRetail";
import simpleExample from "./simpleExample";
import policyAnalyzer from "./policyAnalyzer"

export const allAgentSets: AllAgentConfigsType = {
  frontDeskAuthentication,
  customerServiceRetail,
  simpleExample,
  policyAnalyzer,
};

export const defaultAgentSetKey = "policyAnalyzer";
