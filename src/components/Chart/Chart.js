import React from 'react';

import BarChart from './BarChart/BarChart';

const chart = ( props ) => {
    return (
        <div>
            <BarChart
                title={props.title}
                labels={props.labels}
                data={props.data} />
        </div>
    )
}

export default chart
