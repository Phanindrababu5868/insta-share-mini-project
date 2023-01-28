import './index.css'

const SomethingWentWrongCard = props => {
  const {retryFunction} = props

  const onClickRetry = () => {
    retryFunction()
  }
  return (
    <div className="something-image-container">
      <img
        className="something-image"
        src="https://res.cloudinary.com/dpj2drryk/image/upload/v1652192522/Group_7522_fehjyb.png"
        alt="failure view"
      />
      <p className="something-text">Something went wrong. Please try again</p>
      <button className="try-again-button" type="button" onClick={onClickRetry}>
        Try again
      </button>
    </div>
  )
}

export default SomethingWentWrongCard
