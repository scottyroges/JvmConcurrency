import { ScenarioLogType } from "@/domains/scenarioLog";

export type Element = {
  type?: string; //osThread, virtualThread, coroutine, message, request
  id?: string;
};

export function isElementActive(
  hoveredElement: Element,
  selectedElement: Element,
  type: string,
  id: string
) {
  let isHovered = false;
  if (hoveredElement.type === type && hoveredElement.id === id) {
    isHovered = true;
  }

  let isSelected = false;
  if (selectedElement.type === type && selectedElement.id === id) {
    isSelected = true;
  }
  return isHovered || isSelected;
}

export class RelativeTimes {
  scenarioLogs: ScenarioLogType[];
  startTime: number;
  endTime: number;
  totalTime: number;

  constructor(scenarioLogs: ScenarioLogType[]) {
    this.scenarioLogs = scenarioLogs;
    this.startTime = scenarioLogs[0]?.timestamp.valueOf() || 0;
    this.endTime =
      scenarioLogs[scenarioLogs.length - 1]?.timestamp.valueOf() || 0;
    this.totalTime = this.endTime - this.startTime;
  }

  dateToRelative(dateEpoch: number) {
    return dateEpoch - this.startTime;
  }
}

export class TimelineRelativeTimes {
  relativeTimes: RelativeTimes;
  scenarioLogs: ScenarioLogType[];
  startTime: number;
  endTime: number;
  totalTime: number;
  scale: number;
  segments: number;

  constructor(scenarioLogs: ScenarioLogType[], scale: number) {
    this.relativeTimes = new RelativeTimes(scenarioLogs);
    this.scenarioLogs = scenarioLogs;
    this.startTime = this.relativeTimes.startTime;
    this.endTime = this.relativeTimes.endTime;
    this.totalTime = this.relativeTimes.totalTime;
    this.scale = scale;
    this.segments = Math.ceil(this.totalTime / this.scale);
    // console.log({ totalTime: this.totalTime, scale, segments: this.segments });
  }

  dateToSegment(dateEpoch: number) {
    const proportion =
      this.relativeTimes.dateToRelative(dateEpoch) / this.totalTime;
    const segment = Math.floor(proportion * this.segments);
    // console.log({ time: dateEpoch - this.startTime, proportion, segment });
    return segment;
  }
}

export function range(start: number, end: number, step = 1) {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
}

export function onlyUnique(value: any, index: number, array: any[]) {
  return array.indexOf(value) === index;
}
