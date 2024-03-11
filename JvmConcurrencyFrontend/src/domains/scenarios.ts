import scenario1 from "@assets/scenarios/1/scenario-1.txt";
import scenario2 from "@assets/scenarios/2/scenario-2.txt";
import scenario3 from "@assets/scenarios/3/scenario-3.txt";
import scenario4 from "@assets/scenarios/4/scenario-4.txt";
import scenario5 from "@assets/scenarios/5/scenario-5.txt";
import scenario6 from "@assets/scenarios/6/scenario-6.txt";
import scenario7 from "@assets/scenarios/7/scenario-7.txt";
import scenario8 from "@assets/scenarios/8/scenario-8.txt";
import scenario9 from "@assets/scenarios/9/scenario-9.txt";
import scenario10 from "@assets/scenarios/10/scenario-10.txt";
import scenario11 from "@assets/scenarios/11/scenario-11.txt";
import scenario12 from "@assets/scenarios/12/scenario-12.txt";
import scenario13 from "@assets/scenarios/13/scenario-13.txt";
import scenario1Markdown from "@assets/scenarios/1/scenario-1-md.txt";
import scenario2Markdown from "@assets/scenarios/2/scenario-2-md.txt";
import scenario3Markdown from "@assets/scenarios/3/scenario-3-md.txt";
import scenario4Markdown from "@assets/scenarios/4/scenario-4-md.txt";
import scenario5Markdown from "@assets/scenarios/5/scenario-5-md.txt";
import scenario6Markdown from "@assets/scenarios/6/scenario-6-md.txt";
import scenario7Markdown from "@assets/scenarios/7/scenario-7-md.txt";
import scenario8Markdown from "@assets/scenarios/8/scenario-8-md.txt";
import scenario9Markdown from "@assets/scenarios/9/scenario-9-md.txt";
import scenario10Markdown from "@assets/scenarios/10/scenario-10-md.txt";
import scenario11Markdown from "@assets/scenarios/11/scenario-11-md.txt";
import scenario12Markdown from "@assets/scenarios/12/scenario-12-md.txt";
import scenario13Markdown from "@assets/scenarios/13/scenario-13-md.txt";
// import scenarioTesting from "@assets/scenarios/scenario-testing.txt";
// import scenarioTestingMarkdown from "@assets/scenarios/scenario-testing-md.txt";

export type ScenarioType = {
  id: string;
  name: string;
  description: string[];
  file: string;
  markdown: string | null;
};

const scenarios: ScenarioType[] = [
  {
    id: "io-operations",
    name: "I/O Operations",
    description: [
      "controller - OS threads",
      "client - java http client blocking",
      "network call in series",
    ],
    file: scenario1,
    markdown: scenario1Markdown,
  },
  {
    id: "threads",
    name: "Threads",
    description: [
      "controller - OS threads",
      "client - java http client blocking",
      "network call in parallel with thread pool",
    ],
    file: scenario2,
    markdown: scenario2Markdown,
  },
  {
    id: "unbound-thread-pool",
    name: "Unbound Thread Pool",
    description: [
      "controller - OS threads",
      "client - java http client blocking",
      "network call in parallel",
      "unbound thread pool",
    ],
    file: scenario3,
    markdown: scenario3Markdown,
  },
  {
    id: "fixed-thread-pool",
    name: "Fixed Thread Pool",
    description: [
      "controller - OS threads",
      "client - java http client blocking",
      "network call in parallel",
      "fixed thread pool",
    ],
    file: scenario4,
    markdown: scenario4Markdown,
  },
  {
    id: "virtual-thread-pool",
    name: "Virtual Thread Pool",
    description: [
      "controller - OS threads",
      "client - java http client blocking",
      "network call in parallel",
      "virtual thread pool",
    ],
    file: scenario5,
    markdown: scenario5Markdown,
  },
  {
    id: "coroutines-blocking",
    name: "Coroutines - Blocking",
    description: [
      "controller - OS threads",
      "client - java http client blocking",
      "network call in parallel",
      "coroutines",
    ],
    file: scenario6,
    markdown: scenario6Markdown,
  },
  {
    id: "coroutines-non-blocking",
    name: "Coroutines - Non Blocking",
    description: [
      "controller - OS threads",
      "client - java http client non blocking",
      "network call in parallel",
      "coroutines",
    ],
    file: scenario7,
    markdown: scenario7Markdown,
  },
  {
    id: "ktor",
    name: "Ktor",
    description: [
      "controller - OS threads",
      "client - ktor http client suspending",
      "network call in parallel",
      "coroutines",
    ],
    file: scenario8,
    markdown: scenario8Markdown,
  },
  {
    id: "request-thread-pool",
    name: "Request Thread Pool",
    description: [
      "controller - OS threads (50 requests)",
      "client - java http client blocking",
      "network call in parallel",
      "virtual thread pool",
    ],
    file: scenario9,
    markdown: scenario9Markdown,
  },
  {
    id: "spring-boot-virtual-threads",
    name: "Spring Boot Virtual Threads",
    description: [
      "controller - Virtual threads (50 requests)",
      "client - java http client blocking",
      "network call in parallel",
      "virtual thread pool",
    ],
    file: scenario10,
    markdown: scenario10Markdown,
  },
  {
    id: "virtual-threads-and-coroutines",
    name: "Virtual Threads and Coroutines",
    description: [
      "controller - OS threads",
      "client - java http client non blocking",
      "network call in parallel",
      "virtual thread pool dispatcher for coroutines",
    ],
    file: scenario11,
    markdown: scenario11Markdown,
  },
  {
    id: "virtual-threads-cancellation",
    name: "Virtual Threads Cancellation",
    description: [
      "controller - OS threads",
      "client - java http client non blocking",
      "network call in parallel",
      "virtual thread pool cancelations",
    ],
    file: scenario12,
    markdown: scenario12Markdown,
  },
  {
    id: "coroutines-cancellation",
    name: "Coroutines Cancellation",
    description: [
      "controller - OS threads",
      "client - java http client non blocking",
      "network call in parallel",
      "coroutines cancelations",
    ],
    file: scenario13,
    markdown: scenario13Markdown,
  },
  // {
  //   id: "testing",
  //   name: "Testing",
  //   description: ["testing"],
  //   file: scenarioTesting,
  //   markdown: scenarioTestingMarkdown,
  // },
];

export default scenarios;
