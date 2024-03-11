import { isElementActive } from "./util";
import React from "react";
import styles from "./SidePanel.module.css";
import clsx from "clsx";
import { TimelineContext, TimelineContextType } from "./Timeline";
import { ChevronRight } from "react-feather";
import Select from "../shared/Select";

function SidePanel() {
  const {
    scenarioLogs,
    hoveredElement,
    setHoveredElement,
    selectedElement,
    setSelectedElement,
  } = React.useContext(TimelineContext) as TimelineContextType;
  const [selectedTab, setSelectedTab] = React.useState("osThreads");
  const [isOpen, setIsOpen] = React.useState(true);
  const allThreads = [...new Set(scenarioLogs.map((l) => l.osThread))];
  const allVirtualThreads = [
    ...new Set(
      scenarioLogs.map((l) => l.virtualThread).filter((l) => l !== "none")
    ),
  ];
  const allCoroutines = [
    ...new Set(
      scenarioLogs.map((l) => l.coroutine).filter((l) => l !== "none")
    ),
  ];
  const allRequests = [
    ...new Set(
      scenarioLogs.map((l) => l.activityId).filter((l) => l !== "none")
    ),
  ];
  return (
    <div className={clsx(styles.sidePanel, !isOpen && styles.closed)}>
      <button className={styles.openClose} onClick={() => setIsOpen(!isOpen)}>
        <div className={clsx(styles.iconWrapper, !isOpen && styles.iconFlip)}>
          <ChevronRight size={18} />
        </div>
      </button>
      <div className={clsx(styles.wrapper, !isOpen && styles.closed)}>
        <div
          className={clsx(
            styles.sidePanelContent,
            !isOpen && styles.contentClosed
          )}
        >
          <div className={styles.tabs}>
            <button
              className={clsx(
                styles.tab,
                selectedTab === "osThreads" && styles.tabActive
              )}
              onClick={() => {
                setSelectedTab("osThreads");
              }}
            >
              OS Threads
            </button>
            <button
              className={clsx(
                styles.tab,
                selectedTab === "virtualThreads" && styles.tabActive
              )}
              onClick={() => {
                setSelectedTab("virtualThreads");
              }}
            >
              Virtual Threads
            </button>
            <button
              className={clsx(
                styles.tab,
                selectedTab === "coroutines" && styles.tabActive
              )}
              onClick={() => {
                setSelectedTab("coroutines");
              }}
            >
              Coroutines
            </button>
            <button
              className={clsx(
                styles.tab,
                selectedTab === "requests" && styles.tabActive
              )}
              onClick={() => {
                setSelectedTab("requests");
              }}
            >
              Requests
            </button>
          </div>
          <div className={styles.select}>
            <Select
              id={"tabs"}
              value={selectedTab}
              onChange={(e) =>
                setSelectedTab(e.currentTarget.getAttribute("value") as string)
              }
            >
              <option value="osThreads">OS Threads</option>
              <option value="virtualThreads">Virtual Threads</option>
              <option value="coroutines">Coroutines</option>
              <option value="requests">Requests</option>
            </Select>
          </div>

          <div className={styles.tabContent}>
            {selectedTab === "osThreads" && (
              <ul>
                {allThreads.map((t) => {
                  const isThreadActive = isElementActive(
                    hoveredElement,
                    selectedElement,
                    "osThread",
                    t
                  );
                  return (
                    <li key={t}>
                      <button
                        className={clsx(
                          styles.sidePanelButton,
                          isThreadActive && styles.sidePanelButtonActive
                        )}
                        onMouseOverCapture={() => {
                          setHoveredElement({
                            type: "osThread",
                            id: t,
                          });
                        }}
                        onMouseOut={() => {
                          setHoveredElement({});
                        }}
                        onClick={() =>
                          setSelectedElement({
                            type: "osThread",
                            id: t,
                          })
                        }
                      >
                        {t}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {selectedTab === "virtualThreads" && (
              <ul>
                {allVirtualThreads.map((t) => {
                  const isVirtualThreadActive = isElementActive(
                    hoveredElement,
                    selectedElement,
                    "virtualThread",
                    t
                  );
                  return (
                    <li key={t}>
                      <button
                        className={clsx(
                          styles.sidePanelButton,
                          isVirtualThreadActive && styles.sidePanelButtonActive
                        )}
                        onMouseOverCapture={() => {
                          setHoveredElement({
                            type: "virtualThread",
                            id: t,
                          });
                        }}
                        onMouseOut={() => {
                          setHoveredElement({});
                        }}
                        onClick={() =>
                          setSelectedElement({
                            type: "virtualThread",
                            id: t,
                          })
                        }
                      >
                        {t}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {selectedTab === "coroutines" && (
              <ul>
                {allCoroutines.map((t) => {
                  const isCoroutineActive = isElementActive(
                    hoveredElement,
                    selectedElement,
                    "coroutine",
                    t
                  );
                  return (
                    <li key={t}>
                      <button
                        className={clsx(
                          styles.sidePanelButton,
                          isCoroutineActive && styles.sidePanelButtonActive
                        )}
                        onMouseOverCapture={() => {
                          setHoveredElement({
                            type: "coroutine",
                            id: t,
                          });
                        }}
                        onMouseOut={() => {
                          setHoveredElement({});
                        }}
                        onClick={() =>
                          setSelectedElement({
                            type: "coroutine",
                            id: t,
                          })
                        }
                      >
                        {t}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {selectedTab === "requests" && (
              <ul>
                {allRequests.map((t) => {
                  const isRequestActive = isElementActive(
                    hoveredElement,
                    selectedElement,
                    "request",
                    t
                  );
                  return (
                    <li key={t}>
                      <button
                        className={clsx(
                          styles.sidePanelButton,
                          isRequestActive && styles.sidePanelButtonActive
                        )}
                        onMouseOverCapture={() => {
                          setHoveredElement({
                            type: "request",
                            id: t,
                          });
                        }}
                        onMouseOut={() => {
                          setHoveredElement({});
                        }}
                        onClick={() =>
                          setSelectedElement({
                            type: "request",
                            id: t,
                          })
                        }
                      >
                        {t}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
