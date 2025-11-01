import { EmptyColumnsCountProps } from "@/lib/types";

export default function EmptyTable({colspan}: EmptyColumnsCountProps) {
    return (
        <tr>
            <td colSpan={colspan} className="text-center py-4">
            No Data Available
            </td>
        </tr>
    )
}