export function getTrigram(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "???";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 3).toUpperCase();
  }

  return parts
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}
