import scenarios from "@/domains/scenarios";
import React from "react";

function usePathScenario(): string {
  const passedInPath = window.location.pathname.split("/")[1];
  const scenario = scenarios.find((s) => s.id === passedInPath);
  const [selectedScenarioId] = React.useState(
    scenario !== undefined ? scenario.id : scenarios[0].id
  );

  return selectedScenarioId;
}

export default usePathScenario;
