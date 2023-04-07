import { format, parseISO } from "date-fns";

export function formatCellDate(row: any, columnName: string) {
  return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
}
