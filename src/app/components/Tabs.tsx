import React, { useState } from "react";
import { Tab } from "@headlessui/react";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsComponentProps {
  tabs: TabItem[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="relative">
          {/* Regular bottom border */}
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-gray-300 dark:border-gray-700"></div>

          <Tab.List className="flex relative z-10">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none relative
                  ${
                    selected
                      ? "text-teal-500"
                      : "text-gray-700 dark:text-gray-400 hover:text-teal-400"
                  }`
                }
              >
                {({ selected }) => (
                  <div className="relative">
                    {tab.label}
                    {/* Selected indicator (thicker and positioned above the default border) */}
                    {selected && (
                      <div className="absolute left-0 right-0 bottom-[-2px] border-b-4 border-teal-400"></div>
                    )}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>

        {/* Tab Panels (No Wrapper) */}
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={index} className="pt-4">
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabsComponent;
