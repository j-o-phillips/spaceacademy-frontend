import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { getUserProfileFunc } from "../controllers/userProfile";
import { useProfileContext } from "../context/ProfileContext";

import "../assets/css/CardDetails.css";

const CardDetails = () => {
  const auth_token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  if (!auth_token) {
    navigate("/");
  }

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [messageCount, setMessageCount] = useState(0);
  const { cardId, categoryId, planetName } = useParams();
  const { profileData, setProfileData } = useProfileContext();

  let count = -1;

  useEffect(() => {
    const getQuestions = async (questionCardId) => {
      const auth_token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/learn/categories/${categoryId}/${cardId}`,
        {
          headers: {
            Authorization: "Token " + auth_token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error in the response");
      }

      const result = await response.json();
      setQuestions(result.data);
    };

    getQuestions();
  }, []);

  const handleSubmitAnswer = async (questionId) => {
    const auth_token = localStorage.getItem("auth_token");
    const data = {
      choice: answers[questionId],
    };

    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/learn/categories/${categoryId}/${cardId}/${questionId}/`,
      {
        method: "POST",
        headers: {
          Authorization: "Token " + auth_token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("An error in the response");
    }

    const result = await response.json();

    switch (result.message) {
      case "Answer already given":
        setMessageCount(1);
        break;
      case "correct":
        setMessageCount(2);
        break;
      case "incorrect":
        setMessageCount(3);
        break;
    }
  };

  const handleUnlockDatacard = async () => {
    const auth_token = localStorage.getItem("auth_token");
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/learn/categories/submit/${categoryId}/${cardId}`,
      {
        headers: {
          Authorization: "Token " + auth_token,
        },
      }
    );
    if (!response.ok) {
      throw new Error("An error in the response");
    }

    const result = await response.json();
    if (result.message === "Answer all the questions") {
      setMessageCount(4);
      return;
    }

    //refresh credits and exp
    const profile = await getUserProfileFunc(auth_token);
    setProfileData(profile);

    navigate(`/map/${planetName}`);
  };

  const handleOnChange = (key, newValue) => {
    setAnswers((prevObject) => {
      const updatedObject = { ...prevObject };
      updatedObject[key] = newValue;
      return updatedObject;
    });
  };

  return (
    <>
      <div className="accordion-container">
        <h3 className="my-5">
          Answer all the questions to unlock the datacard
        </h3>
        <div>
          <Accordion className="accordion">
            {questions.map((question) => {
              count += 1;

              return (
                <Accordion.Item
                  className="acoordion-item"
                  eventKey={count}
                  key={question.id}
                >
                  <Accordion.Header className="accordion-header">
                    <div>{question.content}</div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="accordion-body-container">
                      <div className="accordion-body">
                        <div className="d-flex flex-wrap">
                          <div className="accordion-input">
                            <input
                              type="radio"
                              id="choice_one"
                              value={question.choice_one}
                              name={question.id}
                              onChange={() =>
                                handleOnChange(question.id, question.choice_one)
                              }
                            />
                            <label>{question.choice_one}</label>
                          </div>
                          <div className="accordion-input">
                            <input
                              type="radio"
                              id="choice_two"
                              value={question.choice_two}
                              name={question.id}
                              onChange={() =>
                                handleOnChange(question.id, question.choice_two)
                              }
                            />
                            <label>{question.choice_two}</label>
                          </div>
                          <div className="accordion-input">
                            <input
                              type="radio"
                              id="choice_three"
                              value={question.choice_three}
                              name={question.id}
                              onChange={() =>
                                handleOnChange(
                                  question.id,
                                  question.choice_three
                                )
                              }
                            />
                            <label>{question.choice_three}</label>
                          </div>
                          <div className="accordion-input">
                            <input
                              type="radio"
                              id="choice_four"
                              value={question.choice_four}
                              name={question.id}
                              onChange={() =>
                                handleOnChange(
                                  question.id,
                                  question.choice_four
                                )
                              }
                            />
                            <label>{question.choice_four}</label>
                          </div>
                        </div>
                      </div>
                      <button
                        className="button"
                        onClick={() => {
                          handleSubmitAnswer(question.id);
                        }}
                      >
                        <div>Submit Answer</div>
                      </button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
          <div className="unlock-datacard-container">
            <button className="button my-3" onClick={handleUnlockDatacard}>
              <div className="button-txt">Unlock Datacard</div>
            </button>
          </div>
        </div>
      </div>
      {messageCount === 1 && (
        <div className="alert d-flex flex-column align-items-center justify-content-around">
          <h4>Looks like you've already answered this question...</h4>
          <button className="button" onClick={() => setMessageCount(0)}>
            <div className="button-txt">Close</div>
          </button>
        </div>
      )}
      {messageCount === 2 && (
        <div className="alert d-flex flex-column align-items-center justify-content-around">
          <h4>That's correct!</h4>
          <button className="button" onClick={() => setMessageCount(0)}>
            <div className="button-txt">Close</div>
          </button>
        </div>
      )}
      {messageCount === 3 && (
        <div className="alert d-flex flex-column align-items-center justify-content-around">
          <h4>Sorry that's incorrect.</h4>
          <button className="button" onClick={() => setMessageCount(0)}>
            <div className="button-txt">Close</div>
          </button>
        </div>
      )}
      {messageCount === 4 && (
        <div className="alert d-flex flex-column align-items-center justify-content-around">
          <h4>Answer ALL the questions to unlock the datacard</h4>
          <button className="button" onClick={() => setMessageCount(0)}>
            <div className="button-txt">Close</div>
          </button>
        </div>
      )}
    </>
  );
};

export default CardDetails;
