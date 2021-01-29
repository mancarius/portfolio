import React from 'react';
import shortid from 'shortid';

const SvgWave = (props) => {

    const is_top = props.position === "top";
    const dropshadow_id = 'dropshadow' + shortid.generate;
    const d = {
        top: "M0,96L60,117.3C120,139,240,181,360,192C480,203,600,181,720,160C840,139,960,117,1080,117.3C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
        bottom: "M0,96L60,117.3C120,139,240,181,360,192C480,203,600,181,720,160C840,139,960,117,1080,117.3C1200,117,1320,139,1380,149.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z",
    }
    const filter = {
        height: {
            top: '110%',
            bottom: '130%'
        }
    }
    const feGaussianBlur = {
        stdDeviation: {
            top: 5,
            bottom: 20
        }
    }
    const feOffset = {
        dx: {
            top: 0,
            bottom: 0
        },
        dy: {
            top: -5,
            bottom: 10
        }
    }
    const feFuncA = {
        slope: {
            top: 0.1,
            bottom: 0.5
        }
    }

    return (
        <svg className="svg-wave bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
            preserveAspectRatio="none">
            <defs xmlns="http://www.w3.org/2000/svg">
                <filter id={ dropshadow_id } height={is_top ? filter.height.top : filter.height.bottom}>
                    <feGaussianBlur in="SourceAlpha" stdDeviation={is_top ? feGaussianBlur.stdDeviation.top : feGaussianBlur.stdDeviation.bottom} />
                    <feOffset dx={is_top ? feOffset.dx.top : feOffset.dx.bottom} dy={is_top ? feOffset.dy.top : feOffset.dy.bottom} result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope={is_top ? feFuncA.slope.top : feFuncA.slope.bottom} />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <path filter={ 'url(#' + dropshadow_id + ')' }
                d={ props.position === "top" ? d.top : d.bottom }>
            </path>
        </svg>
    );
}

export default SvgWave;