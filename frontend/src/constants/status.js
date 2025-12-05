import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  QuestionIcon,
} from "../components/icons";

export const STATUS_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  QUESTION: "question",
};


export const STATUS_PRESETS = {
  [STATUS_TYPES.SUCCESS]: {
    color: "green",
    textClass: "text-green-600",
    buttonClass: "bg-green-600",
    borderColor: "#16a34a",
    title: "Success",
    icon: SuccessIcon,
  },
  [STATUS_TYPES.ERROR]: {
    color: "red",
    textClass: "text-red-600",
    buttonClass: "bg-red-600",
    borderColor: "#dc2626",
    title: "Message",
    icon: ErrorIcon,
  },
  [STATUS_TYPES.WARNING]: {
    color: "yellow",
    textClass: "text-yellow-600",
    buttonClass: "bg-yellow-600",
    borderColor: "#ca8a04",
    title: "Warning",
    icon: WarningIcon,
  },
  [STATUS_TYPES.INFO]: {
    color: "blue",
    textClass: "text-blue-600",
    buttonClass: "bg-blue-600",
    borderColor: "#2563eb",
    title: "Information",
    icon: InfoIcon,
  },
  [STATUS_TYPES.QUESTION]: {
    color: "blue",
    textClass: "text-blue-600",
    buttonClass: "bg-blue-600",
    borderColor: "#2563eb",
    title: "Confirmation",
    icon: QuestionIcon,
  },
};
