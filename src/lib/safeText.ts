export const safeText = (value: string | undefined | null) =>
  value && value.trim() !== "" ? value : "-";
