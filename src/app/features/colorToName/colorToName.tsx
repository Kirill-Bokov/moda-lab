const colorMap: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  blue: "#0000ff",
  green: "#00ff00",
  yellow: "#ffff00",
  gray: "#808080",
  brown: "#8b4513",
}

export function colorNameToCss(name?: string): string {
  if (!name) return "transparent"
  return colorMap[name.toLowerCase()] ?? name
}
