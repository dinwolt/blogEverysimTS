import React from "react";

type TabsProps = {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mx-auto w-full mb-14 ">
      <div className="w-full flex mb-8 flex-col items-center">
        <div className="flex w-full sm:w-[30rem] md:w-[40rem] lg:w-[50rem] border border-gray-300 bg-gray-200 rounded-lg overflow-x-auto">
          <div className="flex gap-x-1 px-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`relative px-4 py-2 text-sm font-medium text-center transition-colors overflow-hidden whitespace-nowrap ${activeTab === tab
                    ? "bg-white text-black border border-gray-300"
                    : "bg-gray-200 text-gray-600 border-l border-gray-300 hover:bg-gray-300"
                  }`}
                onClick={() => onTabChange(tab)}
              >
                <div className="relative group">
                  <span>{tab}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
