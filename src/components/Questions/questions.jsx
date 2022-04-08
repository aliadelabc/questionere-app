import React, { useState, useEffect } from "react";
//css
import "./questions.css";
//components
import CircularProgress from "@mui/material/CircularProgress";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";

//axios
import axios from "axios";
import Check from "../Type/checkBox";
import Summery from "../Summery/summery";
const Questions = ({ lightMode }) => {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [correctQuestion, setCorrectQuestion] = useState("");
  const [rightAnswers, setRightAnswers] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState([]);
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handleChange = (value) => {
    setCorrectQuestion(value);
    setAnswered(true);
  };
  const handleScore = () => {
    let i = 0;
    let score = 0;
    while (i !== rightAnswers.length) {
      if (rightAnswers[i] === answer[i]) {
        score++;
      }
      i++;
    }
    console.log(score, rightAnswers.length);
    return score;
  };
  const handleSubmit = () => {
    setAnswer(answer.concat([correctQuestion]));
    handleNextStep();
  };
  useEffect(() => {
    setAnswered(false);
    const fetchQuestions = async () => {
      setLoading(true);
      const res = await axios.get("https://opentdb.com/api.php?amount=1");
      setQuestions(res.data.results);
      setAllQuestions(
        res.data.results[0].incorrect_answers?.concat([
          res.data.results[0].correct_answer,
        ])
      );
      setRightAnswers(
        rightAnswers.concat([res.data.results[0].correct_answer])
      );
      setLoading(false);
    };
    fetchQuestions();
  }, [step]);
  return (
    <div className="questions">
      {step < 4 ? (
        questions?.length > 0 ? (
          <div
            className="question"
            style={{
              backgroundColor: lightMode ? "#282c34" : "white",
              color: lightMode ? "white" : "black",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {" "}
                <b>Category: </b>
                {questions[0]?.category}
              </span>
              <span>
                {" "}
                <b>Difficulty: </b>
                <b
                  style={{
                    color:
                      questions[0]?.difficulty === "easy"
                        ? "green"
                        : questions[0]?.difficulty === "medium"
                        ? "#ffbf00"
                        : "red",
                  }}
                >
                  {" "}
                  {questions[0]?.difficulty?.toUpperCase()}
                </b>
              </span>
            </div>
            <div>
              <h2 style={{ textAlign: "start", marginTop: 50 }}>
                Question {step}:
              </h2>
              <h4>{questions[0]?.question}</h4>
            </div>
            <div>
              {questions[0]?.type === "boolean" ? (
                <FormControl>
                  {allQuestions?.map((answer, i) => (
                    <RadioGroup name="radio-buttons-group" key={i}>
                      <FormControlLabel
                        key={i}
                        value={answer}
                        control={
                          <Radio onChange={() => handleChange(answer)} />
                        }
                        defaultChecked={false}
                        label={capitalize(answer)}
                      />
                    </RadioGroup>
                  ))}
                </FormControl>
              ) : (
                <FormGroup>
                  {allQuestions?.map((answer, i) => (
                    <Check
                      key={i}
                      value={answer}
                      label={answer}
                      handleChange={handleChange}
                    />
                  ))}
                </FormGroup>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Button
                style={{ marginRight: 20 }}
                variant="contained"
                onClick={handleSubmit}
                disabled={!answered || loading}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={50} />
          </div>
        )
      ) : (
        <Summery score={handleScore} lightMode={lightMode} />
      )}
    </div>
  );
};

export default Questions;
