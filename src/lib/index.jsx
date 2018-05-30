import React from 'react';
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { styles } from './style/color-bar.style.js';

const ColorBar = ({ data, rootStyle, barContainerStyle, legendContainerStyle,
    legendRowContainerStyle, legendRowTitleContainerStyle, legendRowTitleStyle,
    legendRowBodyStyle, tooltipType, tooltipPosition, tooltipStyle,
}) => {
    // fix bug that tooltip doesn't disappear when scrolling on mobile
    // https://github.com/wwayne/react-tooltip/issues/203#issuecomment-337394513
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const tooltipDisappearEvent = isMobile ? 'touchstart' : undefined;

    ReactTooltip.rebuild();
    const sum = data.reduce((a, b) => ({value: a.value + b.value})).value;
    let colorBarSections = [];
    let legendRows = [];
    let colorBarTooltips = [];
    data.forEach((d, i) => {
        colorBarSections.push(
            <div
                data-tip
                data-for={`color-bar-tooltip-${i}`}
                key={i}
                style={{
                    backgroundColor: d.color,
                    height: '100%',
                    display: 'inline-block',
                    width: `${d.value / sum * 100}%`,
                }}>
            </div>
        );
        legendRows.push(
            <div key={i}
                style={Object.assign({},styles.legendRowContainer, legendRowContainerStyle)}>
                <div style={Object.assign({}, styles.legendRowTitleContainer, legendRowTitleContainerStyle)}>
                    <svg viewBox={'0 0 120 120'}
                        style={{
                            width: 12,
                            height: 12,
                            fill: d.color,
                        }}>
                        <circle
                            cx={60}
                            cy={60}
                            r={50}/>
                    </svg>
                    <span style={Object.assign({}, styles.legendRowTitle, legendRowTitleStyle)}>
                        {d.legendLabel}
                    </span>
                </div>
                <span style={Object.assign({}, styles.legendRowBody, legendRowBodyStyle)}>
                    {d.legendValue}
                </span>
            </div>
        );
        if(d.tooltip) {
            colorBarTooltips.push(
                <ReactTooltip
                    key={i}
                    style={tooltipStyle}
                    id={`color-bar-tooltip-${i}`}
                    type={tooltipType || 'info'}
                    place={tooltipPosition || 'bottom'}
                    globalEventOff={tooltipDisappearEvent} >
                    <span>
                        {d.tooltip}
                    </span>
                </ReactTooltip>
            )
        }
    });
    return (
        <div style={rootStyle}>
            {colorBarTooltips}
            <div style={Object.assign({},styles.colorBarSectionsContainer, barContainerStyle)}>
                {colorBarSections}
            </div>
            <div style={Object.assign({},styles.legendContainer, legendContainerStyle)}>
                {legendRows}
            </div>
        </div>
    );
}

ColorBar.propTypes = {
    data: PropTypes.array.isRequired,
    rootStyle: PropTypes.object,
    barContainerStyle: PropTypes.object,
    legendContainerStyle: PropTypes.object,
    legendRowContainerStyle: PropTypes.object,
    legendRowTitleContainerStyle: PropTypes.object,
    legendRowTitleStyle: PropTypes.object,
    legendRowBodyStyle: PropTypes.object,
    tooltipType: PropTypes.string,
    tooltipPosition: PropTypes.string,
    tooltipStyle: PropTypes.object,
}

export default ColorBar;
