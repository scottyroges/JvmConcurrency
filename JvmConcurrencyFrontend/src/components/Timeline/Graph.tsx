import React from "react";
import styles from "./Graph.module.css";
import { TimelineRelativeTimes, isElementActive, range } from "./util";
import { TimelineContext, TimelineContextType } from "./Timeline";
import clsx from "clsx";
import { ScenarioLogType } from "@/domains/scenarioLog";
import useMediaQuery from "@/hooks/useMediaQuery";

function getOsThreads(scenarioLogs: ScenarioLogType[]) {
  const osThreads: { [Key: string]: any } = {};
  let counter = 1;
  for (let x = 0; x < scenarioLogs.length; x++) {
    const log = scenarioLogs[x];
    if (!osThreads[log.osThread]) {
      osThreads[log.osThread] = {
        index: counter++,
        startTime: log.timestamp.valueOf(),
      };
    }
  }
  return osThreads;
}

function colOffset(col: number) {
  return col + 1;
}

function rowOffset(row: number) {
  return row + 2; //there two rows on top for the markings
}

function Graph() {
  const {
    scenarioLogs,
    hoveredElement,
    setHoveredElement,
    selectedElement,
    setSelectedElement,
  } = React.useContext(TimelineContext) as TimelineContextType;

  const isMobileMediaQuery = useMediaQuery("(max-width: 37.5rem)");
  const [scale] = React.useState(500); // milliseconds
  const [zoomFactor, setZoomFactor] = React.useState(
    isMobileMediaQuery ? 0.4 : 0.7
  );

  if (scenarioLogs.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.fallback}></div>
      </div>
    );
  }

  const relativeTimes = new TimelineRelativeTimes(scenarioLogs, scale);
  const threads = getOsThreads(scenarioLogs);
  return (
    <div className={styles.wrapper}>
      <div className={styles.zoom}>
        <button onClick={() => setZoomFactor(zoomFactor - zoomFactor * 0.1)}>
          -
        </button>
        <button onClick={() => setZoomFactor(zoomFactor + zoomFactor * 0.1)}>
          +
        </button>
      </div>
      <div
        className={styles.timelineGraph}
        style={
          {
            "--zoom-scale-factor": zoomFactor,
            gridTemplateColumns: `20px repeat(${relativeTimes.segments}, ${
              550 * zoomFactor
            }px) 20px`,
            gridTemplateRows: `20px 20px repeat(${
              Object.values(threads).length
            }, min-content) 20px`,
          } as React.CSSProperties
        }
      >
        {Object.entries(threads).map(([key, value]) => {
          const isActive = isElementActive(
            hoveredElement,
            selectedElement,
            "osThread",
            key
          );
          return (
            <div
              key={key}
              className={clsx(styles.osThread, isActive && styles.osActive)}
              style={{
                gridRow: rowOffset(value.index),
                gridColumn: `${colOffset(
                  relativeTimes.dateToSegment(value.startTime) + 1
                )} / ${colOffset(relativeTimes.segments + 1)}`,
              }}
            ></div>
          );
        })}
        {Object.entries(threads).map(([key, value]) => {
          const threadLogs = scenarioLogs.filter((l) => l.osThread === key);
          return (
            <div
              key={key}
              data-type="osThread"
              className={styles.messageWrapper}
              style={{
                gridTemplateColumns: `subgrid`,
                gridTemplateRows: `repeat(${threadLogs.length}, auto)`,
                gridRow: rowOffset(value.index),
                gridColumn: `${colOffset(1)} / ${colOffset(
                  relativeTimes.segments + 1
                )}`,
              }}
              onMouseOverCapture={(e) => {
                if (e.currentTarget.dataset.type !== "osThread") {
                  return;
                }
                setHoveredElement({
                  type: "osThread",
                  id: key,
                });
              }}
              onMouseOut={() => {
                setHoveredElement({});
              }}
              onClick={() => {
                setSelectedElement({
                  type: "osThread",
                  id: key,
                });
              }}
            >
              {threadLogs.map((log, i) => {
                return (
                  <Message
                    key={log.id}
                    row={i + 1}
                    startCol={relativeTimes.dateToSegment(log.startTime) + 1}
                    endCol={relativeTimes.dateToSegment(log.startTime) + 1}
                    scenarioLog={log}
                  />
                );
              })}
            </div>
          );
        })}

        {range(0, relativeTimes.segments + 1).map((i) => {
          const value = i * scale;
          return (
            <div
              key={value}
              className={styles.timeMark}
              style={{
                gridRow: `1`,
                gridColumn: `${colOffset(i + 1)}`,
              }}
            >
              {value}ms
            </div>
          );
        })}

        {threads &&
          range(0, relativeTimes.segments + 2).map((i) => {
            return (
              <div
                key={i}
                className={styles.markings}
                style={{
                  gridRow: `${2} / ${
                    rowOffset(Object.values(threads).length + 1) + 1
                  }`,
                  gridColumn: `${colOffset(i)}`,
                }}
              ></div>
            );
          })}
      </div>
    </div>
  );
}

function Message({
  row,
  startCol,
  endCol,
  scenarioLog,
}: {
  row: number;
  startCol: number;
  endCol: number;
  scenarioLog: ScenarioLogType;
}) {
  const {
    hoveredElement,
    setHoveredElement,
    selectedElement,
    setSelectedElement,
  } = React.useContext(TimelineContext) as TimelineContextType;
  const hasVirtualThread = scenarioLog.virtualThread !== "none";
  const isActiveVirtualThread = isElementActive(
    hoveredElement,
    selectedElement,
    "virtualThread",
    scenarioLog.virtualThread
  );

  const hasCoroutine = scenarioLog.coroutine !== "none";
  const isActiveCoroutine = isElementActive(
    hoveredElement,
    selectedElement,
    "coroutine",
    scenarioLog.coroutine
  );

  const isActiveMessage =
    isElementActive(
      hoveredElement,
      selectedElement,
      "message",
      scenarioLog.id
    ) ||
    isElementActive(
      hoveredElement,
      selectedElement,
      "request",
      scenarioLog.activityId
    );

  return (
    <div
      className={styles.message}
      style={{
        gridRow: `${row}`,
        gridColumn: `${startCol} / ${endCol}`,
      }}
    >
      <div
        data-type="virtualThread"
        className={clsx(
          styles.virtualThreadWrapper,
          hasVirtualThread && styles.vtThreadNonActive,
          isActiveVirtualThread && styles.vtActive
        )}
        onMouseOverCapture={(e) => {
          if (e.currentTarget.dataset.type !== "virtualThread") {
            return;
          }
          if (hasVirtualThread) {
            setHoveredElement({
              type: "virtualThread",
              id: scenarioLog.virtualThread,
            });
          }
        }}
        onMouseOut={() => {
          setHoveredElement({});
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (hasVirtualThread) {
            setSelectedElement({
              type: "virtualThread",
              id: scenarioLog.virtualThread,
            });
          }
        }}
      >
        <div
          data-type="coroutine"
          className={clsx(
            styles.coroutineWrapper,
            hasCoroutine && styles.coroutineNonActive,
            isActiveCoroutine && styles.cActive
          )}
          onMouseOverCapture={(e) => {
            if (e.currentTarget.dataset.type !== "coroutine") {
              return;
            }
            if (hasCoroutine) {
              setHoveredElement({
                type: "coroutine",
                id: scenarioLog.coroutine,
              });
            }
          }}
          onMouseOut={() => {
            setHoveredElement({});
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (hasCoroutine) {
              setSelectedElement({
                type: "coroutine",
                id: scenarioLog.coroutine,
              });
            }
          }}
        >
          <div
            data-type="message"
            className={clsx(
              styles.messageText,
              isActiveMessage && styles.messageActive
            )}
            onMouseOverCapture={(e) => {
              if (e.currentTarget.dataset.type !== "message") {
                return;
              }
              setHoveredElement({
                type: "message",
                id: scenarioLog.id,
              });
            }}
            onMouseOut={() => {
              setHoveredElement({});
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedElement({
                type: "message",
                id: scenarioLog.id,
              });
            }}
          >
            {scenarioLog.message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
