export type RiskLevel = "Low" | "Caution" | "High" | "Critical";

export interface AnalysisResult {
  risk_level: RiskLevel;
  signals: string[];
  explanation: string;
  safe_actions: string[];
}