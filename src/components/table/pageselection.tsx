'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { PageProps } from "@/lib/types/table.types";
import { LeftArrowDisabledIcon, LeftArrowIcon, RightArrowDisabledIcon, RightArrowIcon } from "@/lib/static/icons";

// bottom page selection
export default function PageSelection({page, count, pageSize, setPage}: PageProps) {
    const [totPages, setTotPages] = useState<number>(1) // defaults to first page

    // triggers when pagesize or count changes as number of pages need to be updated
    useEffect(() => {
        const pages: number = Math.ceil(count/pageSize) // ceiling to show max number of pages to be selected
        if (pages > 0) {
            setTotPages(pages) // only if there is data, then set the pages
        }
    }, [pageSize, count])
    // go to previous page
    function prevPage(): void {
        if (page === 1) {
            return // disabled if already first page
        }
        setPage((prev: number) => prev - 1) // -= 1
    }
    // go to next page
    function nextPage(): void {
        if (page === totPages) {
            return // disabled if already last page
        }
        setPage((prev: number) => prev + 1) // += 1
    }

    return (
        <div className="flex space-x-8 items-center">
            {/* left arrow */}
            <Image
                className={(page === 1) ? "cursor-not-allowed" : "cursor-pointer"}
                onClick={prevPage}
                src={(page === 1) ? LeftArrowDisabledIcon: LeftArrowIcon}
                alt="Left Select Icon"
                width={12}
                height={12}
                priority
            />
            {/* all pages number display */}
            {
                [...Array(totPages).keys()].map(n => {
                    const pageNum = n + 1;
                    return <p key={pageNum} onClick={() => setPage(pageNum)}
                    className={`text-sm cursor-pointer font-semibold ${pageNum === page ? "text-[#2322bb]" : "text-gray-400"}`}
                    >{pageNum}</p>
                })
            }
            {/* right arrow */}
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