import React from "react";

type TabsProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap mx-auto w-full mb-14 items-center justify-center">
      
          
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`m-2 px-4 py-2 text-sm font-medium text-center rounded-2xl transition-colors overflow-hidden  ${activeTab === tab
                    ? "bg-brandSecondary dark:bg-brandHighlight text-white "
                    : "bg-brandLight text-black border-gray-300 hover:bg-brandSecondary dark:hover:bg-brandHighlight hover:text-white"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                <div className="relative group">
                  <span>{tab}</span>
                </div>
              </button>
            ))}
          
        
   
    </div>
  );
};

export default Tabs;
