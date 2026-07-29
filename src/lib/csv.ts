export type CsvRow = Record<string, string>;

export function parseCsv(input: string): CsvRow[] {
  const rows: string[][] = [];
  let currentField = "";
  let currentRow: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    if (char === "\"") {
      if (inQuotes && nextChar === "\"") {
        currentField += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      currentRow.push(currentField);
      currentField = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      currentRow.push(currentField);
      rows.push(currentRow);
      currentField = "";
      currentRow = [];
      continue;
    }

    currentField += char;
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  const [headers = [], ...dataRows] = rows.filter((row) =>
    row.some((field) => field.length > 0)
  );

  return dataRows.map((row) =>
    headers.reduce<CsvRow>((record, header, index) => {
      record[header] = row[index] ?? "";
      return record;
    }, {})
  );
}

export function stringifyCsv(rows: CsvRow[], headers: string[]): string {
  const escapedRows = [
    headers,
    ...rows.map((row) => headers.map((header) => escapeCsvValue(row[header] ?? "")))
  ];

  return escapedRows.map((row) => row.join(",")).join("\r\n").concat("\r\n");
}

function escapeCsvValue(value: string): string {
  const normalizedValue = value.replaceAll("\"", "\"\"");
  return `"${normalizedValue}"`;
}
