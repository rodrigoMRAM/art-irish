// src/utils/getBootstrapColor.js
export const bootstrapColors = [
  "primary",
  "success",
  "info",
  "warning",
  "danger",
];

export function getColorById(id) {
  const n = Number(id) || 0;
  const idx = n % bootstrapColors.length;
  return bootstrapColors[idx];
}
