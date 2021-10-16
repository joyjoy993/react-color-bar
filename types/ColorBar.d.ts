import React from 'react';
import { TooltipProps } from 'react-tooltip';
declare type Tooltip = {
    text: React.ReactNode;
    props?: TooltipProps;
};
declare type Legend = {
    label: React.ReactNode;
    value: React.ReactNode;
    tooltip?: Tooltip;
    icon?: React.ReactNode;
    rowContainerStyle?: React.CSSProperties;
    labelContainerStyle?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    valueStyle?: React.CSSProperties;
};
export declare type Data = {
    value: number;
    color: string;
    tooltip?: Tooltip;
    legend?: Legend;
};
interface Props {
    data: Data[];
    rootStyle?: React.CSSProperties;
    barContainerStyle?: React.CSSProperties;
    legendContainerStyle?: React.CSSProperties;
}
declare const ColorBar: ({ data, rootStyle, barContainerStyle, legendContainerStyle, }: Props) => JSX.Element;
export default ColorBar;
