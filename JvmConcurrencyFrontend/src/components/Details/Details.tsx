import useReadScenarioLog from "@/hooks/useReadScenarioLog";
import Timeline from "../Timeline/Timeline";
import styles from "./Details.module.css";

function Details({ selectedScenarioId }: { selectedScenarioId: string }) {
  const scenarioLogs = useReadScenarioLog(selectedScenarioId);
  return (
    <div className={styles.wrapper}>
      <Timeline scenarioLogs={scenarioLogs} />
    </div>
  );
}

export default Details;
