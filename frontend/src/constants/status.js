export const STATUS_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFORMATION: "information",
};

export const STATUS_PRESETS = {
  [STATUS_TYPES.SUCCESS]: {
    color: "green",
    title: "Success",
  },
  [STATUS_TYPES.ERROR]: {
    color: "red",
    title: "Error",
  },
  [STATUS_TYPES.WARNING]: {
    color: "yellow",
    title: "Warning",
  },
  [STATUS_TYPES.INFORMATION]: {
    color: "blue",
    title: "Information",
  },
};
