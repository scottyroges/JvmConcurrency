import scenarios from "@/domains/scenarios";
import styles from "./TableOfContent.module.css";
import clsx from "clsx";

function TableOfContent({
  selectedScenarioId,
}: {
  selectedScenarioId: string;
}) {
  return (
    <nav className={styles.wrapper}>
      <h3 className={styles.heading}>TABLE OF CONTENTS</h3>
      <ul>
        {scenarios.map((i) => {
          const isActive = selectedScenarioId === i.id;
          return (
            <li
              key={i.id}
              className={clsx(styles.item, isActive && styles.active)}
            >
              <a href={`/${i.id}`}>{i.name}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContent;
