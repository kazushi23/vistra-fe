'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { PageProps } from "@/lib/types/table.types";
import { LeftArrowDisabledIcon, LeftArrowIcon, RightArrowDisabledIcon, RightArrowIcon } from "@/lib/static/icons";


export default function PageSelection({page, count, pageSize, setPage}: PageProps) {
    const [totPages, setTotPages] = useState<number>(1)

    useEffect(() => {
        const pages: number = Math.ceil(count/pageSize)
        if (pages > 0) {
            setTotPages(pages)
        }
    }, [pageSize, count])

    function prevPage() {
        if (page === 1) {
            return
        }
        setPage((prev: number) => prev - 1)
    }

    function nextPage() {
        console.log(totPages, page)
        if (page === totPages) {
            return
        }
        setPage((prev: number) => prev + 1)
    }

    return (
        <div className="flex space-x-8 items-center">
            <Image
                className={(page === 1) ? "cursor-not-allowed" : "cursor-pointer"}
                onClick={prevPage}
                src={(page === 1) ? LeftArrowDisabledIcon: LeftArrowIcon}
                alt="Left Select Icon"
                width={12}
                height={12}
                priority
            />
            {
                [...Array(totPages).keys()].map(n => {
                    const pageNum = n + 1;
                    return <p key={pageNum} onClick={() => setPage(pageNum)}
                    className={`text-sm cursor-pointer font-semibold ${pageNum === page ? "text-[#2322bb]" : "text-gray-400"}`}
                    >{pageNum}</p>
                })
            }
            <Image
                className={(page === totPages) ? "cursor-not-allowed" : "cursor-pointer"}
                onClick={nextPage}
                src={(page === totPages) ? RightArrowDisabledIcon: RightArrowIcon }
                alt="Right Select Icon"
                width={12}
                height={12}
                priority
            />
        </div>
    )
}