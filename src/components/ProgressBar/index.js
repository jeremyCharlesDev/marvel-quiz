import React, {Fragment} from 'react'

const ProgressBar = ({idQuestion, maxQuestion}) => {

    const actualQuestion = idQuestion +1;
    const getPercent = (totalQuestions, questionId) => {
        return (100 / totalQuestions) * questionId;
    }

    const progressPercent = getPercent(maxQuestion, actualQuestion);

    return (
        <Fragment>
            <div className="percentage">
                <div className="progressPercent">Question: {actualQuestion}/{maxQuestion}</div>
                <div className="progressPercent">Progression: {progressPercent}%</div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange" style={{width: `${progressPercent}%`}}></div>
            </div>
        </Fragment>
    )
}

export default React.memo(ProgressBar)
