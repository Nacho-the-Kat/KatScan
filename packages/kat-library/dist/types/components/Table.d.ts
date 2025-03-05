import { ColumnDef } from "@tanstack/react-table";
interface TableProps<T extends object> {
    columns: ColumnDef<T, unknown>[];
    data: T[];
    summaryText?: string;
    subText?: string;
}
declare const Table: <T extends object>({ columns, data, summaryText, subText }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
