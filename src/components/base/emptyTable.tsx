import { EmptyColumnsCount } from "@/lib/types";

export default function EmptyTable({colspan}: EmptyColumnsCount) {
    return (
        <tr>
            <td colSpan={colspan} className="text-center py-4">
            No Data Available
            </td>
        </tr>
    )
}