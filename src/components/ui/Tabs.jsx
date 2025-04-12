import { useState } from 'react';

export function Tabs({ 
  tabs, 
  defaultTab = 0,
  onChange,
  variant = 'default',
  className = '',
  tabListClassName = '',
  tabPanelClassName = '',
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Handle tab change
  const handleTabChange = (index) => {
    setActiveTab(index);
    
    if (onChange) {
      onChange(index);
    }
  };
  
  // Tab variants
  const variants = {
    default: {
      container: 'border-b border-gray-200',
      tabList: 'flex space-x-8',
      tab: {
        base: 'py-4 px-1 text-sm font-medium border-b-2 -mb-px',
        active: 'border-primary text-primary',
        inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
      },
      panel: 'py-4',
    },
    pills: {
      container: '',
      tabList: 'flex space-x-2 p-1 bg-gray-100 rounded-lg',
      tab: {
        base: 'py-2 px-4 text-sm font-medium rounded-md',
        active: 'bg-white text-primary shadow',
        inactive: 'text-gray-500 hover:text-gray-900',
      },
      panel: 'py-4',
    },
    boxed: {
      container: 'border border-gray-200 rounded-lg',
      tabList: 'flex border-b border-gray-200',
      tab: {
        base: 'py-3 px-4 text-sm font-medium',
        active: 'bg-white text-primary border-b-2 border-primary',
        inactive: 'bg-gray-50 text-gray-500 hover:text-gray-700',
      },
      panel: 'p-4 bg-white rounded-b-lg',
    },
    vertical: {
      container: 'flex',
      tabList: 'flex flex-col space-y-2 mr-4 w-1/4',
      tab: {
        base: 'py-2 px-3 text-sm font-medium rounded-md text-left',
        active: 'bg-primary text-white',
        inactive: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      },
      panel: 'flex-1',
    },
  };
  
  // Get the styles for the selected variant
  const variantStyle = variants[variant] || variants.default;
  
  return (
    <div className={className}>
      <div className={variantStyle.container}>
        {/* Tab list */}
        <div className={`${variantStyle.tabList} ${tabListClassName}`} role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tab-panel-${index}`}
              id={`tab-${index}`}
              className={`
                ${variantStyle.tab.base}
                ${activeTab === index ? variantStyle.tab.active : variantStyle.tab.inactive}
              `}
              onClick={() => handleTabChange(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab panels */}
        <div className={`${variantStyle.panel} ${tabPanelClassName}`}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              role="tabpanel"
              id={`tab-panel-${index}`}
              aria-labelledby={`tab-${index}`}
              className={activeTab === index ? 'block' : 'hidden'}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}