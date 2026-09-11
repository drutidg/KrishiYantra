/**
 * Transparent Rule-Based ETA Calculator
 * Formula: Estimated wait = (people ahead * avg processing time) / active counters
 */
export interface ETAParams {
  peopleAhead: number;
  avgProcessMins?: number;
  activeCounters?: number;
}

export function calculateETA({
  peopleAhead,
  avgProcessMins = 5,
  activeCounters = 2,
}: ETAParams): { minutes: number; label: string } {
  if (peopleAhead <= 0) {
    return {
      minutes: 0,
      label: 'Your turn is next! Please proceed to the counter.',
    };
  }

  const counters = Math.max(1, activeCounters);
  const avgTime = Math.max(2, avgProcessMins);

  const rawMinutes = Math.ceil((peopleAhead * avgTime) / counters);

  return {
    minutes: rawMinutes,
    label: `Estimated wait: ~${rawMinutes} min (based on ${peopleAhead} ahead, ${counters} active counters)`,
  };
}
