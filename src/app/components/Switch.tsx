import React from 'react';
import { Switch } from '@headlessui/react';

export type SwitchProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  name?: string;
  legend?: string;
  icon?: React.ReactNode;
};

const SwitchComponent: React.FC<SwitchProps> = ({ enabled, onChange, name, legend, icon }) => {
  return (
    <div className="flex items-center space-x-2 text-grayCustom">
      {icon && <span className="w-5 h-5 text-primary">{icon}</span>}
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${enabled ? 'bg-primary' : 'bg-gray-300'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </Switch>
      {name && <span className="text-sm font-medium text-grayCustom">{name}</span>}
      {legend && <span className="text-xs text-grayCustom">{legend}</span>}
    </div>
  );
};

export default SwitchComponent;
