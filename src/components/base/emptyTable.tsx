import { Dataicon } from "@/lib/static/icons";
import { EmptyColumnsCountProps } from "@/lib/types";
import Image from "next/image";

export default function EmptyTable({colspan}: EmptyColumnsCountProps) {
    return (
        <tr className="h-full">
            <td colSpan={colspan} className="text-center py-24">
                <div className="flex flex-col align-middle items-center">
                    <Image src={Dataicon} alt="Data Icon" width={20} height={20} />
                    <p>No Data Available</p>
                </div>
            </td>
        </tr>
    )
}