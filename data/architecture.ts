export type ArchitectureNodeData = {
  id: string;
  label: string;
  description: string;
  /** Bullet responsibilities — only the four agents get this richer detail. */
  responsibilities?: string[];
};

export const TRUNK_TOP: ArchitectureNodeData[] = [
  {
    id: "user",
    label: "User",
    description: "Submits a task or bug report to fix or implement.",
  },
  {
    id: "application",
    label: "Application",
    description:
      "The React frontend where tasks are submitted and pull requests are reviewed.",
  },
  {
    id: "fastapi",
    label: "FastAPI",
    description:
      "The Python backend that receives requests and coordinates the agent pipeline.",
  },
  {
    id: "langgraph",
    label: "LangGraph",
    description: "Orchestrates the multi-agent workflow as a stateful graph.",
  },
];

export const AGENTS: ArchitectureNodeData[] = [
  {
    id: "planner",
    label: "Planner",
    description: "Understands the task and creates an execution plan.",
    responsibilities: [
      "Understanding the task",
      "Creating execution steps",
      "Managing workflow state",
      "Coordinating downstream agents",
    ],
  },
  {
    id: "coder",
    label: "Coder",
    description: "Writes or edits the code for the current step.",
    responsibilities: [
      "Applies the planner's execution steps",
      "Writes or edits the relevant files",
      "Hands off to the tester once a step is complete",
    ],
  },
  {
    id: "tester",
    label: "Tester",
    description: "Runs the project's test suite against the change.",
    responsibilities: [
      "Runs the test suite against the change",
      "Reports pass/fail results back to the graph",
      "Triggers the debugger on failure",
    ],
  },
  {
    id: "debugger",
    label: "Debugger",
    description: "Diagnoses failing tests and proposes a fix.",
    responsibilities: [
      "Diagnoses the failing test",
      "Proposes a fix",
      "Hands control back to the coder",
      "The loop repeats until tests pass",
    ],
  },
];

export const TRUNK_BOTTOM: ArchitectureNodeData[] = [
  {
    id: "tools",
    label: "Tools",
    description:
      "Sandbox actions the agents can call: running tests, editing files, and querying the repository.",
  },
  {
    id: "github",
    label: "GitHub",
    description:
      "Where the final pull request is opened for human review, via OAuth and MCP.",
  },
];
