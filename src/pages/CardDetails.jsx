import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import "../assets/css/CardDetails.css";

const CardDetails = () => {
  const [questions, setQuestions] = useState([]);
  const { cardId, categoryId } = useParams();
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
      console.log(result.data);
    };

    getQuestions();
  }, []);

  const handleSubmitAnswers = async (e) => {
    console.log(e.target);
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

    console.log(result);
  };

  return (
    <div className="accordion-container">
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
                      <div className="accordion-input">
                        <input
                          type="radio"
                          id="choice_one"
                          value={question.choice_one}
                        />
                        <label>{question.choice_one}</label>
                      </div>
                      <div className="accordion-input">
                        <input
                          type="radio"
                          id="choice_two"
                          value={question.choice_two}
                        />
                        <label>{question.choice_two}</label>
                      </div>
                      <div className="accordion-input">
                        <input
                          type="radio"
                          id="choice_three"
                          value={question.choice_three}
                        />
                        <label>{question.choice_three}</label>
                      </div>
                      <div className="accordion-input">
                        <input
                          type="radio"
                          id="choice_four"
                          value={question.choice_four}
                        />
                        <label>{question.choice_four}</label>
                      </div>
                    </div>
                    <button type="submit" onClick={handleSubmitAnswers}>
                      <div>Submit Answer</div>
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
        <div className="unlock-datacard-container">
          <button className="unlock-datacard" onClick={handleUnlockDatacard}>
            <div>Unlock Datacard</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
