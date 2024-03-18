import scenarioIoOperations from "@assets/scenarios/io-operations/scenario-io-operations.txt";
import scenarioThreads from "@assets/scenarios/threads/scenario-threads.txt";
import scenarioUnboundThreadPool from "@assets/scenarios/unbound-thread-pool/scenario-unbound-thread-pool.txt";
import scenarioFixedThreadPool from "@assets/scenarios/fixed-thread-pool/scenario-fixed-thread-pool.txt";
import scenarioVirtualThreadPool from "@assets/scenarios/virtual-thread-pool/scenario-virtual-thread-pool.txt";
import scenarioCoroutinesBlocking from "@assets/scenarios/coroutines-blocking/scenario-coroutines-blocking.txt";
import scenarioCoroutinesNonBlocking from "@assets/scenarios/coroutines-non-blocking/scenario-coroutines-non-blocking.txt";
import scenarioKtor from "@assets/scenarios/ktor/scenario-ktor.txt";
import scenarioRequestThreadPool from "@assets/scenarios/request-thread-pool/scenario-request-thread-pool.txt";
import scenarioSpringBootVirtualThreads from "@assets/scenarios/spring-boot-virtual-threads/scenario-spring-boot-virtual-threads.txt";
import scenarioVirtualThreadsAndCoroutines from "@assets/scenarios/virtual-threads-and-coroutines/scenario-virtual-threads-and-coroutines.txt";
import scenarioVirtualThreadsCancellation from "@assets/scenarios/virtual-threads-cancellation/scenario-virtual-threads-cancellation.txt";
import scenarioCoroutinesCancellation from "@assets/scenarios/coroutines-cancellation/scenario-coroutines-cancellation.txt";
import scenarioIoOperationsMarkdown from "@assets/scenarios/io-operations/scenario-io-operations-md.txt";
import scenarioThreadsMarkdown from "@assets/scenarios/threads/scenario-threads-md.txt";
import scenarioUnboundThreadPoolMarkdown from "@assets/scenarios/unbound-thread-pool/scenario-unbound-thread-pool-md.txt";
import scenarioFixedThreadPoolMarkdown from "@assets/scenarios/fixed-thread-pool/scenario-fixed-thread-pool-md.txt";
import scenarioVirtualThreadPoolMarkdown from "@assets/scenarios/virtual-thread-pool/scenario-virtual-thread-pool-md.txt";
import scenarioCoroutinesBlockingMarkdown from "@assets/scenarios/coroutines-blocking/scenario-coroutines-blocking-md.txt";
import scenarioCoroutinesNonBlockingMarkdown from "@assets/scenarios/coroutines-non-blocking/scenario-coroutines-non-blocking-md.txt";
import scenarioKtorMarkdown from "@assets/scenarios/ktor/scenario-ktor-md.txt";
import scenarioRequestThreadPoolMarkdown from "@assets/scenarios/request-thread-pool/scenario-request-thread-pool-md.txt";
import scenarioSpringBootVirtualThreadsMarkdown from "@assets/scenarios/spring-boot-virtual-threads/scenario-spring-boot-virtual-threads-md.txt";
import scenarioVirtualThreadsAndCoroutinesMarkdown from "@assets/scenarios/virtual-threads-and-coroutines/scenario-virtual-threads-and-coroutines-md.txt";
import scenarioVirtualThreadsCancellationMarkdown from "@assets/scenarios/virtual-threads-cancellation/scenario-virtual-threads-cancellation-md.txt";
import scenarioCoroutinesCancellationMarkdown from "@assets/scenarios/coroutines-cancellation/scenario-coroutines-cancellation-md.txt";
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
    file: scenarioIoOperations,
    markdown: scenarioIoOperationsMarkdown,
  },
  {
    id: "threads",
    name: "Threads",
    description: [
      "controller - OS threads",
      "client - java http client blocking",
      "network call in parallel with thread pool",
    ],
    file: scenarioThreads,
    markdown: scenarioThreadsMarkdown,
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
    file: scenarioUnboundThreadPool,
    markdown: scenarioUnboundThreadPoolMarkdown,
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
    file: scenarioFixedThreadPool,
    markdown: scenarioFixedThreadPoolMarkdown,
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
    file: scenarioVirtualThreadPool,
    markdown: scenarioVirtualThreadPoolMarkdown,
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
    file: scenarioCoroutinesNonBlocking,
    markdown: scenarioCoroutinesNonBlockingMarkdown,
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
    file: scenarioCoroutinesBlocking,
    markdown: scenarioCoroutinesBlockingMarkdown,
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
    file: scenarioKtor,
    markdown: scenarioKtorMarkdown,
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
    file: scenarioRequestThreadPool,
    markdown: scenarioRequestThreadPoolMarkdown,
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
    file: scenarioSpringBootVirtualThreads,
    markdown: scenarioSpringBootVirtualThreadsMarkdown,
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
    file: scenarioVirtualThreadsAndCoroutines,
    markdown: scenarioVirtualThreadsAndCoroutinesMarkdown,
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
    file: scenarioVirtualThreadsCancellation,
    markdown: scenarioVirtualThreadsCancellationMarkdown,
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
    file: scenarioCoroutinesCancellation,
    markdown: scenarioCoroutinesCancellationMarkdown,
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
