const Button = ({setFeedback, feedbackAttribute, text}) => {
    const increaseFeedbackCount = (setFeedback, feedbackAttribute) => () => {
      setFeedback(feedbackAttribute + 1)
    }
      
    return(
      <button onClick={increaseFeedbackCount(setFeedback, feedbackAttribute)}>{text}</button>
    )
}

export default Button;