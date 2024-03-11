import scenarios from "@/domains/scenarios";
import React from "react";

function useReadMarkdown(selectedScenarioId: string) {
  const [markdown, setMarkdown] = React.useState<string>("");
  const fileName =
    scenarios.find((s) => s.id === selectedScenarioId)?.markdown || "";
  if (fileName.length === 0) {
    throw Error("Scenario has no file");
  }
  React.useEffect(() => {
    async function getFile() {
      const file = await fetch(fileName);
      const text = await file.text();

      setMarkdown(text);
    }
    getFile();
  }, [selectedScenarioId]);

  return markdown;
}

export default useReadMarkdown;
