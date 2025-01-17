import { FormattedMessage } from "gatsby-plugin-intl";
import React from "react";
import { useState } from "react";
type MenuProps = {
    tags: string[];
    activeTag: string;
    setActiveTag: (tag: string) => void;
    sorts: string[];
    activeSort: string;
    setSort: (sort: string) => void;
};

const BlogMenu: React.FC<MenuProps> = ({ tags, activeTag, setActiveTag, sorts,activeSort, setSort }) => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    return (
        <div className="grid md:grid-cols-1 grid-cols-2 gap-10 md:mr-10 ">
            <div >
                <h1 className="section-post-title text-black font-bold mb-5 cursor-pointer md:cursor-default text-center"
                onClick={() => setCategoryOpen(!categoryOpen)}>
                    <FormattedMessage id="blog_menu_category" />
                    <span className="md:hidden ml-2">{categoryOpen ? '▲' : '▼'}</span>
                </h1>
                <div className={`flex flex-col gap-4 ${categoryOpen ? 'block' : 'hidden'} md:block`}>
                    {tags.map((tag, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={activeTag === tag}
                                onChange={() => setActiveTag(tag)}
                                className="hidden peer"
                            />
                            <span className="w-4 h-4 border-2 border-gray-400 rounded-sm peer-checked:bg-brandHighlight peer-checked:border-blue-500 transition-colors duration-200"></span>
                            <span className="section-post-subtitle">{tag}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h1 className="section-post-title text-black font-bold mb-5 text-center"
                onClick={() => setSortOpen(!sortOpen)}>
                    
                    <FormattedMessage id="blog_menu_sort" />
                    <span className="md:hidden ml-2">{sortOpen ? '▲' : '▼'}</span>
                
                </h1>
                <div className={`flex flex-col gap-4 ${sortOpen ? 'block' : 'hidden'} md:block`}>
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
    );
};

export default BlogMenu;
