import scenarios, { ScenarioType } from "@/domains/scenarios";
import styles from "./Scenarios.module.css";
import clsx from "clsx";
import React from "react";

function Scenarios({ selectedScenarioId }: { selectedScenarioId: string }) {
  const selectedRef = React.useRef<HTMLAnchorElement>();
  React.useEffect(() => {
    function scrollTo(el: any) {
      const elLeft = el.offsetLeft;
      el.parentNode.scrollLeft = elLeft - el.offsetWidth / 2;
    }
    scrollTo(selectedRef.current);
  }, [selectedRef]);
  return (
    <div>
      <div className={styles.scenariosWrapper}>
        {scenarios.map((s) => (
          <Scenario
            key={s.id}
            forwardRef={selectedRef}
            selected={s.id === selectedScenarioId}
            scenario={s}
          />
        ))}
      </div>
    </div>
  );
}

function Scenario({
  selected,
  scenario,
  forwardRef,
}: {
  selected: boolean;
  scenario: ScenarioType;
  forwardRef: any;
}) {
  const refProp = selected ? { ref: forwardRef } : {};
  return (
    <a
      {...refProp}
      href={`/${scenario.id}`}
      className={clsx(styles.box, selected && styles.selected)}
    >
      <div>{scenario.name}</div>
    </a>
  );
}

export default Scenarios;
