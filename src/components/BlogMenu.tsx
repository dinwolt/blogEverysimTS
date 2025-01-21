import { FormattedMessage } from "gatsby-plugin-intl";
import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import {
    ArrowsUpDownIcon

} from "@heroicons/react/24/solid";

type MenuProps = {
    tags: string[];
    activeTag: string;
    setActiveTag: (tag: string) => void;
    sorts: string[];
    activeSort: string;
    setSort: (sort: string) => void;
};

const BlogMenu: React.FC<MenuProps> = ({
    tags,
    activeTag,
    setActiveTag,
    sorts,
    activeSort,
    setSort,
}) => {
    const [sortOpen, setSortOpen] = useState(false);

    return (
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-row items-center justify-center">
                <div className="w-full md:w-auto overflow-x-auto scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-gray-400 hover:scrollbar-track-gray-200 ">
                    <div className="inline-flex justify-center">
                        {tags.map((tab) => (
                            <button
                                key={tab}
                                className={`m-2 px-4 py-2 text-sm font-medium text-center rounded-2xl transition-colors whitespace-nowrap ${
                                    activeTag === tab
                                        ? "bg-brandSecondary text-white"
                                        : "bg-brandLight text-black border-gray-300 hover:bg-brandSecondary hover:text-white"
                                }`}
                                onClick={() => setActiveTag(tab === activeTag ? "" : tab)}
                            >
                                <span>{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    {/* Sort Icon */}
                    <div
                        className="inline-flex items-center justify-center cursor-pointer"
                        onClick={() => setSortOpen(!sortOpen)}
                    >
                        <ArrowsUpDownIcon className="w-8 h-8 sm:w-10 sm:h-10 text-brandHighlight" />
                    </div>

                    {/* Dropdown */}
                    {sortOpen && (
                        <div
                            className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
                        >
                            <div className="flex flex-col gap-4 p-4">
                                {sorts.map((sort, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            name="sort"
                                            checked={sort === activeSort}
                                            onChange={() => setSort(sort === activeSort ? "" : sort)}
                                            className="hidden peer"
                                        />
                                        <span className="w-4 h-4 border-2 border-gray-400 rounded-sm peer-checked:bg-brandHighlight peer-checked:border-blue-500 transition-colors duration-200"></span>
                                        <span>
                                        <FormattedMessage id={sort}/></span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogMenu;
