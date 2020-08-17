import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal';

const Levels = ({quizLevel, levelNames}) => {

    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const quizSteps = levelNames.map( level => ( {title: level.toUpperCase()} ));
        setLevels(quizSteps)
    }, [levelNames]);
    // console.log(levels);

    return (
        <div className="levelsContainer" style={{background: "transparent"}}>
            <Stepper 
                steps={ levels } 
                activeStep={ quizLevel } 
                circleTop={0} 
                activeTitleColor={"#d31017"} 
                activeColor={"#d31017"} 
                completeTitleColor={"#757575"} 
                completeColor={"#E0E0E0"}
                size={50}
                completeBarColor={"#E0E0E0"}
                barStyle={"dashed"}
                circleFontSize={20}
                />
        </div>
    )
}

export default React.memo(Levels)
