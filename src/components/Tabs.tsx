import React from "react";

type TabsProps = {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mx-auto max-w-7xl w-full mb-16">
      <div className="w-full flex mb-8 flex-col items-center">
        <div className="flex h-10 w-full md:w-[50rem] justify-center border border-gray-300 bg-gray-200 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`relative px-4 py-2 flex-1 text-sm font-medium text-center transition-colors overflow-hidden text-ellipsis whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white text-black border border-gray-300"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => onTabChange(tab)}
            >
              {/* Tooltip wrapper */}
              <div className="relative group">
                <span>{tab}</span>

                {/* Tooltip that appears on hover */}
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">
                  {tab}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
