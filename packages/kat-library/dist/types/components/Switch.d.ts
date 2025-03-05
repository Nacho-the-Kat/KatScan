import React from 'react';
export type SwitchProps = {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    name?: string;
    legend?: string;
    icon?: React.ReactNode;
};
declare const SwitchComponent: React.FC<SwitchProps>;
export default SwitchComponent;
