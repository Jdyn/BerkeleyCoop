export function dateRange(startDate: string, endDate: string): string {
  const startUTCDate = new Date(startDate);
  const endUTCDate = new Date(endDate);

  const startDateString = startUTCDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
  });

  const endDateString = endUTCDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
  });

  return `${startDateString} - ${endDateString}`;
}

export function formatEventStatus(startDateStr: string, endDateStr: string): string {
  const now = new Date();
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const startDifference = startDate.getTime() - now.getTime();
  const endDifference = endDate.getTime() - now.getTime();

  const startSeconds = Math.floor(Math.abs(startDifference) / 1000);
  const startMinutes = Math.floor(startSeconds / 60);
  const startHours = Math.floor(startMinutes / 60);
  const startDays = Math.floor(startHours / 24);

  const endSeconds = Math.floor(Math.abs(endDifference) / 1000);
  const endMinutes = Math.floor(endSeconds / 60);
  const endHours = Math.floor(endMinutes / 60);
  const endDays = Math.floor(endHours / 24);

  if (startDifference < 0) {
    if (endDays > 0) {
      return `Ending in ${endDays} days from now`;
    } else if (endHours > 0) {
      return `Ending in ${endHours} hours from now`;
    } else {
      return "Ending soon";
    }
  } else {
    if (startDays > 0) {
      return `Starting in ${startDays} days from now`;
    } else if (startHours > 0) {
      return `Starting in ${startHours} hours from now`;
    } else {
      return "Starting soon";
    }
  }
}

export function isStarted(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  return date.getTime() < now.getTime();
}
