export type RiskLevel = "Low" | "Caution" | "High" | "Critical";

export interface AnalysisResult {
  risk_level: RiskLevel;
  signals: string[];
  explanation: string;
  safe_actions: string[];
  signal_labels?: Record<string, string>;
}

export interface ExampleMessage {
  id: string;
  category: string;
  title: string;
  riskHint: RiskLevel;
  text: string;
}
