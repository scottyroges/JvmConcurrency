import Markdown from "react-markdown";
import styles from "./Analysis.module.css";
import useReadMarkdown from "@/hooks/useReadMarkdown";
import TableOfContent from "./TableOfContent";

function Analysis({ selectedScenarioId }: { selectedScenarioId: string }) {
  const markdown = useReadMarkdown(selectedScenarioId);
  return (
    <>
      <h2 id="analysis" className={styles.heading}>
        Analysis
      </h2>
      <div className={styles.wrapper}>
        <TableOfContent selectedScenarioId={selectedScenarioId} />
        <div className={styles.spacer}></div>
        <Markdown className={styles.markdown}>{markdown}</Markdown>
      </div>
    </>
  );
}

export default Analysis;
