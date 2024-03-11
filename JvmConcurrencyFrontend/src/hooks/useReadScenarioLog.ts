import { ScenarioLogType } from "@/domains/scenarioLog";
import scenarios from "@/domains/scenarios";
import moment from "moment";
import React from "react";

function useReadScenarioLog(selectedScenarioId: string) {
  const [scenarioLog, setScenarioLog] = React.useState<ScenarioLogType[]>([]);
  const fileName =
    scenarios.find((s) => s.id === selectedScenarioId)?.file || "";
  if (fileName.length === 0) {
    throw Error("Scenario has no file");
  }
  React.useEffect(() => {
    async function getFile() {
      const file = await fetch(fileName);
      const text = await file.text();
      const logs = text
        .split("\n")
        .filter((s) => s.length > 0)
        .map((s) => {
          const obj = JSON.parse(s);
          const log = {
            ...obj,
            id: crypto.randomUUID(),
            timestamp: moment(
              obj.timestamp,
              "YYYY-MM-DDTHH:mm:ss.SSSZ"
            ).toDate(),
          };
          return log;
        });

      setScenarioLog(
        logs.map((log, i) => {
          if (i >= logs.length - 1) {
            return {
              ...log,
              startTime: log.timestamp.valueOf(),
              endTime: log.timestamp.valueOf(),
            };
          }
          const newLog = {
            ...log,
            startTime: log.timestamp.valueOf(),
            endTime: logs[i + 1].timestamp.valueOf(),
          };
          return newLog;
        })
      );
    }
    getFile();
  }, [selectedScenarioId]);

  return scenarioLog;
}

export default useReadScenarioLog;
