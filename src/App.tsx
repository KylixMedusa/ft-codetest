import React, { useState } from "react";
import "./App.scss";
import Options from "./Components/Options/Options";
const json = require("./questions.json");

const App: React.FC = () => {
  const questions: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[] = json;

  const [qNo, setqNo] = useState(1);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [judgement, setJudgement] = useState("");
  const [random, setRandom] = useState(Math.floor(Math.random() * 4) + 1);
  const [points, setPoints] = useState(0);

  function resetRandom() {
    setRandom(Math.floor(Math.random() * 4) + 1);
  }

  const generateStars = (val: string) => {
    let stars: any = [];
    let highlight = (
      <span className="star highlight">
        <svg xmlns="http://www.w3.org/2000/svg" width="21px" height="20px">
          <path
            d="M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855
      l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z"
          />
        </svg>
      </span>
    );
    let star = (
      <span className="star">
        <svg xmlns="http://www.w3.org/2000/svg" width="21px" height="20px">
          <path
            d="M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855
      l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z"
          />
        </svg>
      </span>
    );
    if (val === "hard") {
      stars.push(highlight);
      stars.push(highlight);
      stars.push(highlight);
      stars.push(star);
      stars.push(star);
    } else if (val === "medium") {
      stars.push(highlight);
      stars.push(highlight);
      stars.push(star);
      stars.push(star);
      stars.push(star);
    } else {
      stars.push(highlight);
      stars.push(star);
      stars.push(star);
      stars.push(star);
      stars.push(star);
    }
    return stars;
  };

  function submit(val: boolean) {
    setQuestionsAnswered(questionsAnswered + 1);
    if (val) {
      setPoints(points + 1);
      setJudgement("Correct!");
    } else {
      setJudgement("Sorry!");
    }
  }

  function nextQuestion() {
    if (qNo < questions.length) {
      resetRandom();
      setJudgement("");
      setqNo(qNo + 1);
    }
  }

  function restart() {
    setPoints(0);
    setqNo(1);
    setJudgement("");
    setQuestionsAnswered(0);
    resetRandom();
  }

  return (
    <div className="container">
      <div
        className="progress-bar"
        style={{ width: `${(qNo * 100) / questions.length}%` }}
      ></div>
      <div className="wrapper">
        <h1>
          Question {qNo} of {questions.length}
        </h1>
        <small>{decodeURIComponent(questions[qNo - 1].category)}</small>
        <div className="stars">
          {generateStars(questions[qNo - 1].difficulty)}
        </div>
        <h3 className="question">
          {decodeURIComponent(questions[qNo - 1].question)}
        </h3>
        <Options
          type={questions[qNo - 1].type}
          correctAns={decodeURIComponent(questions[qNo - 1].correct_answer)}
          incorrectAns={questions[qNo - 1].incorrect_answers}
          submit={submit}
          random={random}
        ></Options>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column", marginTop:"30px"}}>
          {judgement !== "" ? <h2>{judgement}</h2> : null}
          {judgement !== "" ? (
            qNo < questions.length ? (
              <button className="button-primary" onClick={nextQuestion}>
                Next Question
              </button>
            ) : (
              <button className="button-primary" onClick={restart}>
                Restart
              </button>
            )
          ) : null}
        </div>
      </div>
      <div className="status-wrapper">
        <div className="flex">
          <p>
            Score:{" "}
            {(points * 100) / questionsAnswered
              ? (points * 100) / questionsAnswered
              : 0}
            %
          </p>
          <p>
            Max Score:{" "}
            {((points + (questions.length - questionsAnswered)) * 100) / questions.length}
            %
          </p>
        </div>
        <div className="status-tracker">
          <div
            className="main"
            style={{ width: `${(points * 100) / questionsAnswered}%` }}
          ></div>
          <div
            className="low"
            style={{ width: `${(points * 100) / questions.length}%` }}
          ></div>
          <div
            className="high"
            style={{
              width: `${
                ((points + (questions.length - questionsAnswered)) * 100) /
                questions.length
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
