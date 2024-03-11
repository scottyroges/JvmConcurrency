import styles from "./InfoBox.module.css";
import React from "react";
import { TimelineContext, TimelineContextType } from "./Timeline";
import { ScenarioLogType } from "@/domains/scenarioLog";
import { Element, RelativeTimes, onlyUnique } from "./util";

function getInfoBoxForOsThread(
  element: Element,
  scenarioLogs: ScenarioLogType[]
) {
  const relativeTimes = new RelativeTimes(scenarioLogs);
  const logs = scenarioLogs
    .filter((i) => i.osThread === element.id)
    .sort((i) => i.startTime);
  return (
    <>
      <div className={styles.firstSection}>
        <p>
          <span className={styles.label}>Thread name:</span>
          {element.id}
        </p>
        <p>
          <span className={styles.label}>Starts At:</span>
          {relativeTimes.dateToRelative(logs[0]?.startTime || 0)}ms
        </p>
        <p>
          <span className={styles.label}>Ends At:</span>
          {relativeTimes.dateToRelative(logs[logs.length - 1]?.startTime || 0)}
          ms
        </p>
      </div>
      <div className={styles.secondSection}>
        <p>
          <span className={styles.label}>Number of statements executed:</span>
          {logs.length}
        </p>
        <p>
          <span className={styles.label}>
            Number of statements executed in virtual thread:
          </span>
          {
            logs.filter(
              (i) => i.virtualThread !== undefined && i.virtualThread !== "none"
            ).length
          }
        </p>
        <p>
          <span className={styles.label}>
            Number of statements executed in coroutine:
          </span>
          {
            logs.filter(
              (i) => i.coroutine !== undefined && i.coroutine !== "none"
            ).length
          }
        </p>
      </div>
    </>
  );
}

function getInfoBoxForVirtualThread(
  element: Element,
  scenarioLogs: ScenarioLogType[]
) {
  const relativeTimes = new RelativeTimes(scenarioLogs);
  const logs = scenarioLogs
    .filter((i) => i.virtualThread === element.id)
    .sort((i) => i.startTime);
  return (
    <>
      <div className={styles.firstSection}>
        <p>
          <span className={styles.label}>Virtual thread name:</span>
          {element.id}
        </p>
        <p>
          <span className={styles.label}>Starts At:</span>
          {relativeTimes.dateToRelative(logs[0]?.startTime || 0)}ms
        </p>
        <p>
          <span className={styles.label}>Ends At:</span>
          {relativeTimes.dateToRelative(logs[logs.length - 1]?.startTime || 0)}
          ms
        </p>
      </div>
      <div className={styles.secondSection}>
        <p>
          <span className={styles.label}>Number of statements executed:</span>
          {logs.length}
        </p>
        <p>
          <span className={styles.label}>
            Number of threads executed across:
          </span>
          {
            logs
              .filter((i) => i.osThread !== undefined && i.osThread !== "none")
              .map((i) => i.osThread)
              .filter(onlyUnique).length
          }
        </p>
        <p>
          <span className={styles.label}>
            Number of statements executed in coroutine:
          </span>
          {
            logs.filter(
              (i) => i.coroutine !== undefined && i.coroutine !== "none"
            ).length
          }
        </p>
      </div>
    </>
  );
}

function getInfoBoxForCoroutines(
  element: Element,
  scenarioLogs: ScenarioLogType[]
) {
  const relativeTimes = new RelativeTimes(scenarioLogs);
  const logs = scenarioLogs
    .filter((i) => i.coroutine === element.id)
    .sort((i) => i.startTime);
  return (
    <>
      <div className={styles.firstSection}>
        <p>
          <span className={styles.label}>Coroutine name:</span>
          {element.id}
        </p>
        <p>
          <span className={styles.label}>Starts At:</span>
          {relativeTimes.dateToRelative(logs[0]?.startTime || 0)}ms
        </p>
        <p>
          <span className={styles.label}>Ends At:</span>
          {relativeTimes.dateToRelative(logs[logs.length - 1]?.startTime || 0)}
          ms
        </p>
      </div>
      <div className={styles.secondSection}>
        <p>
          <span className={styles.label}>Number of statements executed:</span>
          {logs.length}
        </p>
        <p>
          <span className={styles.label}>
            Number of threads executed across:
          </span>
          {
            logs
              .filter((i) => i.osThread !== undefined && i.osThread !== "none")
              .map((i) => i.osThread)
              .filter(onlyUnique).length
          }
        </p>
        <p>
          <span className={styles.label}>
            Number of statements executed in virtual thread:
          </span>
          {
            logs.filter(
              (i) => i.virtualThread !== undefined && i.virtualThread !== "none"
            ).length
          }
        </p>
      </div>
    </>
  );
}

function getInfoBoxForMessage(
  element: Element,
  scenarioLogs: ScenarioLogType[]
) {
  const relativeTimes = new RelativeTimes(scenarioLogs);
  const log = scenarioLogs.find((i) => i.id === element.id);
  return (
    <div className={styles.messageWrapperVertical}>
      <div className={styles.messageWrapperHorizontal}>
        <div className={styles.firstSection}>
          <p>
            <span className={styles.label}>Id:</span>
            {log?.id}
          </p>
          <p>
            <span className={styles.label}>Url:</span>
            {log?.url}
          </p>
          <p>
            <span className={styles.label}>Starts at:</span>
            {relativeTimes.dateToRelative(log?.startTime || 0)}ms
          </p>
        </div>
        <div className={styles.secondSection}>
          <p>
            <span className={styles.label}>Thread:</span>
            {log?.thread}
          </p>
          <p>
            <span className={styles.label}>Virtual Thread:</span>
            {log?.virtualThread}
          </p>
          <p>
            <span className={styles.label}>Coroutine:</span>
            {log?.coroutine}
          </p>
          <p>
            <span className={styles.label}>Activity Id:</span>
            {log?.activityId}
          </p>
        </div>
      </div>

      <p className={styles.message}>
        <span className={styles.label}>Message:</span>
        {log?.message}
      </p>
    </div>
  );
}

function getInfoBoxForRequest(
  element: Element,
  scenarioLogs: ScenarioLogType[]
) {
  const relativeTimes = new RelativeTimes(scenarioLogs);
  const logs = scenarioLogs
    .filter((i) => i.activityId === element.id)
    .sort((i) => i.startTime);
  return (
    <>
      <div className={styles.firstSection}>
        <p>
          <span className={styles.label}>Activity Id:</span>
          {element.id}
        </p>
        <p>
          <span className={styles.label}>Url:</span>
          {logs[0]?.url}ms
        </p>
        <p>
          <span className={styles.label}>Starts At:</span>
          {relativeTimes.dateToRelative(logs[0]?.startTime || 0)}ms
        </p>
        <p>
          <span className={styles.label}>Ends At:</span>
          {relativeTimes.dateToRelative(logs[logs.length - 1]?.startTime || 0)}
          ms
        </p>
      </div>
      <div className={styles.secondSection}>
        <p>
          <span className={styles.label}>Number of statements executed:</span>
          {logs.length}
        </p>
        <p>
          <span className={styles.label}>
            Number of threads executed across:
          </span>
          {
            logs
              .filter((i) => i.osThread !== undefined && i.osThread !== "none")
              .map((i) => i.osThread)
              .filter(onlyUnique).length
          }
        </p>
        <p>
          <span className={styles.label}>
            Number of virtual threads executed across:
          </span>
          {
            logs
              .filter(
                (i) =>
                  i.virtualThread !== undefined && i.virtualThread !== "none"
              )
              .map((i) => i.virtualThread)
              .filter(onlyUnique).length
          }
        </p>
        <p>
          <span className={styles.label}>
            Number of coroutines executed across:
          </span>
          {
            logs
              .filter(
                (i) => i.coroutine !== undefined && i.coroutine !== "none"
              )
              .map((i) => i.coroutine)
              .filter(onlyUnique).length
          }
        </p>
      </div>
    </>
  );
}

function InfoBox() {
  const context = React.useContext(TimelineContext) as TimelineContextType;
  let elementToShow = context.selectedElement;
  if (context.hoveredElement.type) {
    elementToShow = context.hoveredElement;
  }

  let inner;
  switch (elementToShow.type) {
    case "osThread":
      inner = getInfoBoxForOsThread(elementToShow, context.scenarioLogs);
      break;
    case "virtualThread":
      inner = getInfoBoxForVirtualThread(elementToShow, context.scenarioLogs);
      break;
    case "coroutine":
      inner = getInfoBoxForCoroutines(elementToShow, context.scenarioLogs);
      break;
    case "message":
      inner = getInfoBoxForMessage(elementToShow, context.scenarioLogs);
      break;
    case "request":
      inner = getInfoBoxForRequest(elementToShow, context.scenarioLogs);
      break;
    default:
      inner = <div></div>;
  }

  return (
    <div className={styles.infoBox}>
      <div className={styles.scroll}>{inner}</div>
    </div>
  );
}

export default InfoBox;
