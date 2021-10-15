import React from 'react';
import ReactTooltip, { TooltipProps } from 'react-tooltip';

const defaultStyles = {
  rowContainerStyle: {
    padding: '5px 0',
    display: 'block',
  },
  labelContainerStyle: {
    display: 'inline-block',
    fontSize: 14,
  },
  labelStyle: {
    fontSize: 14,
    color: '#999',
    paddingLeft: 5,
  },
  valueStyle: {
    float: 'right' as 'right',
    fontSize: 14,
    color: '#333',
    fontWeight: 600,
  },
  legendContainer: {
    display: 'block',
    float: 'left' as 'left',
    boxSizing: 'border-box' as 'border-box',
    width: '100%',
  },
  colorBarSectionsContainer: {
    display: 'flex',
    borderRadius: 5,
    overflow: 'hidden',
    height: 10,
    width: '100%',
  },
};

const defaultLegendIcon = (color: any) => (
  <svg
    viewBox="0 0 120 120"
    style={{
      width: 12,
      height: 12,
      fill: color,
    }}
  >
    <circle
      cx={60}
      cy={60}
      r={50}
    />
  </svg>
);

type Tooltip = {
  text: React.ReactNode;
  props?: TooltipProps;
}

type Legend = {
  label: React.ReactNode;
  value: React.ReactNode;
  tooltip?: Tooltip;
  icon?: React.ReactNode;
  rowContainerStyle?: React.CSSProperties;
  labelContainerStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
}

export type Data = {
  value: number;
  color: string;
  tooltip?: Tooltip
  legend?: Legend;
}

interface Props {
  data: Data[];
  rootStyle?: React.CSSProperties;
  barContainerStyle?: React.CSSProperties;
  legendContainerStyle?: React.CSSProperties;
}

const ColorBar = ({
  data,
  rootStyle,
  barContainerStyle,
  legendContainerStyle,
}: Props) => {
  // fix bug that tooltip doesn't disappear when scrolling on mobile
  // https://github.com/wwayne/react-tooltip/issues/203#issuecomment-337394513
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const tooltipDisappearEvent = isMobile ? 'touchstart' : undefined;

  ReactTooltip.rebuild();
  const sum = data.reduce((total, obj) => obj.value + total, 0);
  const colorBarSections: React.ReactNode[] = [];
  const legendRows: React.ReactNode[] = [];

  data.forEach((d: Data, i: number) => {
    colorBarSections.push(
      <div
        key={i}
        data-tip
        data-for={`color-bar-tooltip-${i}`}
        style={{
          backgroundColor: d.color,
          height: '100%',
          display: 'inline-block',
          width: `${(d.value / sum) * 100}%`,
        }}
      >
        {
          d.tooltip
          && (
            <ReactTooltip
              id={`color-bar-tooltip-${i}`}
              globalEventOff={tooltipDisappearEvent}
              {...d.tooltip.props}
            >
              <span>
                {d.tooltip.text}
              </span>
            </ReactTooltip>
          )
        }
      </div>,
    );
    if (d.legend) {
      legendRows.push(
        <div
          key={i}
          data-tip
          data-for={`legend-tooltip-${i}`}
          style={({ ...defaultStyles.rowContainerStyle, ...d.legend.rowContainerStyle })}
        >
          <div style={({
            ...defaultStyles.labelContainerStyle,
            ...d.legend.labelContainerStyle,
          })}
          >
            {d.legend.icon || defaultLegendIcon(d.color)}
            <span style={({ ...defaultStyles.labelStyle, ...d.legend.labelStyle })}>
              {d.legend.label}
            </span>
          </div>
          <span style={({ ...defaultStyles.valueStyle, ...d.legend.valueStyle })}>
            {d.legend.value}
          </span>
          {
            d.legend.tooltip
            && (
              <ReactTooltip
                id={`legend-tooltip-${i}`}
                globalEventOff={tooltipDisappearEvent}
                {...d.legend.tooltip.props}
              >
                <span>
                  {d.legend.tooltip.text}
                </span>
              </ReactTooltip>
            )
          }
        </div>,
      );
    }
  });

  return (
    <div style={rootStyle}>
      <div style={({ ...defaultStyles.colorBarSectionsContainer, ...barContainerStyle })}>
        {colorBarSections}
      </div>
      <div style={({ ...defaultStyles.legendContainer, ...legendContainerStyle })}>
        {legendRows}
      </div>
    </div>
  );
};

export default ColorBar;
