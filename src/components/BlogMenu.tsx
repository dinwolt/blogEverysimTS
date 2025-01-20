import { FormattedMessage } from "gatsby-plugin-intl";
import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";

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
        <div className="md:mr-10">
            <div className="flex flex-row md:items-center justify-center">
                <div className="overflow-x-auto scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-gray-400 hover:scrollbar-track-gray-200 mb-4 md:mb-0 md:mr-4 pr-12 md:pr-0">
                    <div className="inline-flex">
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

                <div className="relative md:static">
                    <div className="absolute right-0 top-0 md:relative md:right-auto md:top-auto">
                        <div
                            className="inline-flex items-center cursor-pointer"
                            onMouseEnter={() => setSortOpen(true)}
                            onMouseLeave={() => setSortOpen(false)}
                        >
                            <StaticImage
                                src="../../static/images/sort-icon.png"
                                alt="sort-icon"
                                className="w-10 h-10"
                            />
                        </div>

                        <div
                            className={`absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 transition-transform duration-300 z-50 ${
                                sortOpen
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-95 pointer-events-none"
                            }`}
                            onMouseEnter={() => setSortOpen(true)}
                            onMouseLeave={() => setSortOpen(false)}
                        >
                            <div className="flex flex-col gap-4 p-4">
                                {sorts.map((sort, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={sort === activeSort}
                                            onChange={() => setSort(sort)}
                                            className="hidden peer"
                                        />
                                        <span className="w-4 h-4 border-2 border-gray-400 rounded-sm peer-checked:bg-brandHighlight peer-checked:border-blue-500 transition-colors duration-200"></span>
                                        <span>
                                            <FormattedMessage id={sort} />
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogMenu;
