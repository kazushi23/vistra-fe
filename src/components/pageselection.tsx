'use client';

import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface PageProps {
    page: number;
    count: number;
    pageSize: number;
    setPage: Dispatch<SetStateAction<number>>;
}

export default function PageSelection({page, count, pageSize, setPage}: PageProps) {
    const [totPages, setTotPages] = useState<number>(0)
    useEffect(() => {
        console.log(Math.ceil(count/pageSize))
        setTotPages(Math.ceil(count/pageSize))
    }, [])
    return (
        <div className="flex space-x-4 items-center">
            <Image
                className="cursor-pointer"
                onClick={() => setPage(prev => prev - 1)}
                src={(page === 1) ? "/left-arrow-disabled-icon.svg" : "/left-arrow-icon.svg" }
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
                className="cursor-pointer"
                onClick={() => setPage(prev => prev + 1)}
                src={(page === totPages) ? "/right-arrow-disabled-icon.svg" : "/right-arrow-icon.svg" }
                alt="Right Select Icon"
                width={12}
                height={12}
                priority
            />
        </div>
    )
}