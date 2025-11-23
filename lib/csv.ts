import { note } from "./types";

// Fonction pour convertir un array d’objets → CSV
export function toCSV(data: note[]): string {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]) as (keyof note)[];

  const rows = data.map(obj =>
    headers.map(h => JSON.stringify(obj[h] ?? "")).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

export function downloadCSV(csvData: string, fileName: string = "export.csv"): void {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}
