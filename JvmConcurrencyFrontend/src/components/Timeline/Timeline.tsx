import { ScenarioLogType } from "@/domains/scenarioLog";
import styles from "./Timeline.module.css";
import React from "react";
import InfoBox from "./InfoBox";
import { Element } from "./util";
import SidePanel from "./SidePanel";
import Graph from "./Graph";

export type TimelineContextType = {
  scenarioLogs: ScenarioLogType[];
  hoveredElement: Element;
  setHoveredElement: (t: Element) => void;
  selectedElement: Element;
  setSelectedElement: (t: Element) => void;
};
export const TimelineContext = React.createContext<TimelineContextType | null>(
  null
);

function Timeline({ scenarioLogs }: { scenarioLogs: ScenarioLogType[] }) {
  const [hoveredElement, setHoveredElement] = React.useState<Element>({});
  const [selectedElement, setSelectedElement] = React.useState<Element>({});

  const context = {
    scenarioLogs,
    hoveredElement,
    setHoveredElement,
    selectedElement,
    setSelectedElement,
  };

  return (
    <TimelineContext.Provider value={context}>
      <div className={styles.wrapper}>
        <InfoBox />
        <Graph />
        <SidePanel />
      </div>
    </TimelineContext.Provider>
  );
}

export default Timeline;
