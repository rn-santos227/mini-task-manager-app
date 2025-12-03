export function transformTask(task) {
  if (!task) return null;

  const {
    _id,
    id,
    title = "",
    description = "",
    startDate = "",
    endDate = "",
    completed = false,
    active = true,
  } = task;

  return {
    id: id || _id,
    title,
    description,
    startDate,
    endDate,
    completed,
    active,
  };
}

export function transformTaskList(response) {
  const list =
    response?.tasks || response?.data || (Array.isArray(response) ? response : []);
  return Array.isArray(list) ? list.map(transformTask).filter(Boolean) : [];
}

export function transformSingleTask(response) {
  const task = response?.task || response?.data || response;
  return transformTask(task);
}
