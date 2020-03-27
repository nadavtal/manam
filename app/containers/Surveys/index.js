const surveys = (props) => {


  props.surveys.map(survey => {
    console.log(suvey)
    return (
      <div>
        {survey.projectId}
      </div>
    )
  })
}
