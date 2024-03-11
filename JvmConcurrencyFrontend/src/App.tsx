import styles from "./App.module.css";
import Header from "@/components/Header/Header";
import Scenarios from "@/components/Scenario/Scenarios";
import Details from "./components/Details/Details";
import Analysis from "./components/Analysis/Analysis";
import usePathScenario from "./hooks/usePathScenario";

function App() {
  const selectedScenarioId = usePathScenario();
  return (
    <>
      <Header />

      <main>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>JVM Concurrency</h1>
          <Scenarios selectedScenarioId={selectedScenarioId} />
          <Details selectedScenarioId={selectedScenarioId} />
          <Analysis selectedScenarioId={selectedScenarioId} />
        </div>
        <div className={styles.mobileWrapper}>
          <h1 className={styles.heading}>JVM Concurrency</h1>
          <Analysis selectedScenarioId={selectedScenarioId} />
          <Details selectedScenarioId={selectedScenarioId} />
        </div>
      </main>
    </>
  );
}

export default App;
