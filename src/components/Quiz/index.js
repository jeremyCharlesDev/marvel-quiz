import React, { Component } from 'react'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import { QuizMarvel } from '../quizMarvel'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';
import { FaChevronRight } from 'react-icons/fa';


toast.configure();

const initialState = {
    quizLevel: 0,
    maxQuestion: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisable: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false,
    quizEnd: false,
    percent: null
}

const levelNames = ["debutant", "confirme", "expert"];

class Quiz extends Component {

    constructor(props) {
        super(props)
        this.state = initialState;
        this.storedDataRef = React.createRef();
    }
    

    loadQuestions = (level) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level];
        // console.log(fetchedArrayQuiz.length);
        if(fetchedArrayQuiz.length >= this.state.maxQuestion){
            
            this.storedDataRef.current = fetchedArrayQuiz;

            const newArray = fetchedArrayQuiz.map( ({answer, ...keepRest}) => keepRest);

            this.setState({ storedQuestions: newArray });
        }
    }

    showToastMsg = pseudo => {
        if(!this.state.showWelcomeMsg){

            this.setState({ showWelcomeMsg: true })

            toast.warn(`Bienvenue ${pseudo}, et bonne chance !`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        }
    }

    componentDidMount(){
        this.loadQuestions(levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState){
        const {
            maxQuestion,
            storedQuestions,
            idQuestion,
            score,
            quizEnd } = this.state;

        if((storedQuestions !== prevState.storedQuestions) && storedQuestions.length){
            // console.log(this.state.storedQuestions[0].question);
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options
            })
        }

        if((idQuestion !== prevState.idQuestion) && storedQuestions.length){
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
                userAnswer: null,
                btnDisable: true
            })
        }

        if(quizEnd !== prevState.quizEnd){
            // console.log(this.state.score);
            const gradePercent = this.getPercentage(maxQuestion, score);
            this.gameOver(gradePercent);
        }

        if(this.props.userData.pseudo !== prevProps.userData.pseudo){
            this.showToastMsg(this.props.userData.pseudo)
        }
    }

    submitAnswer = (selectedAndswer) => {
        this.setState({
            userAnswer: selectedAndswer,
            btnDisable: false
        })
    }

    nextQuestion = () => {
        if(this.state.idQuestion === this.state.maxQuestion -1){
            //END
            this.setState({ quizEnd: true })
        } else {
            this.setState(prevState => ({ idQuestion: prevState.idQuestion +1 }))
        }

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
        
        if(this.state.userAnswer === goodAnswer){
            this.setState((prevState) => ({
                score: prevState.score + 1
            }))

            toast.success('Bravo + 1', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Raté 0', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    gameOver = (percent) => {

        if (percent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel +1,
                percent: percent
            })
        } else {
            this.setState({
                percent: percent
            })
        }
    }

    loadLevelQuestions = (param) => {
        this.setState({...initialState, quizLevel: param});
        this.loadQuestions(levelNames[param]);
    }

    render() {

        const {
        quizLevel,
        maxQuestion,
        question,
        options,
        idQuestion,
        btnDisable,
        userAnswer,
        score,
        quizEnd,
        percent } = this.state;


        // const {pseudo} = this.props.userData;

        const displayOptions = options.map((option, index) => {
            return (
                <p key={index} 
                onClick={() => this.submitAnswer(option)}
                className={`answerOptions ${userAnswer === option ? "selected": null}`}><FaChevronRight/> {option}</p>
            )
        })

        const btnText = idQuestion < maxQuestion -1 ? "Suivant" : "Terminer";

        return quizEnd ? (
            <QuizOver 
                ref={this.storedDataRef}
                levelNames={levelNames}
                score={score}
                maxQuestions={maxQuestion}
                quizLevel={quizLevel}
                percent={percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        )
        :
        (
            <>
                <Levels levelNames={levelNames} quizLevel={quizLevel}/>
                <ProgressBar idQuestion={idQuestion} maxQuestion={maxQuestion}/>
                <h2>{question}</h2>
                {displayOptions}
                <button 
                    onClick={this.nextQuestion}
                    disabled={btnDisable} 
                    className="btnSubmit">
                    {btnText}
                </button>
            </>
        )
    }
}

export default Quiz