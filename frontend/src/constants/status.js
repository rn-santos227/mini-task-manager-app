import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from "../components/icons";

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
    icon: SuccessIcon,
  },
  [STATUS_TYPES.ERROR]: {
    color: "red",
    title: "Error",
    icon: ErrorIcon,
  },
  [STATUS_TYPES.WARNING]: {
    color: "yellow",
    title: "Warning",
    icon: WarningIcon,
  },
  [STATUS_TYPES.INFORMATION]: {
    color: "blue",
    title: "Information",
    icon: InfoIcon,
  },
};
