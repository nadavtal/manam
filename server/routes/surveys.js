
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');

//SURVEY ROUTES
app.post("/surveys", function(req, res){
  console.log('creating new surveys', req.body);
  const survey = req.body
  // const values = createProjectsArray([project])[0]
  // console.log(values)
  var q = `INSERT INTO surveys (
    BID,
    survey_type,
    Survey_date,
    surveyor,
    company,
    entire_structure,
    immediate_attention,
    survey_purpose,
    Near_by_structures,
    traffic_on,
    height_limit,
    load_limit,
    other_limit,
    partial_traffic,
    supported_structure,
    CPI_AVG,
    CPI_CRIT,
    Next_survey_date,
    next_survey_type,
    Pre_survey,
    SCS_AVG,
    SCS_CRIT,
    Revision,
    Revised_By,
    remarks)
    VALUES (
    ${survey.BID},
    "${survey.survey_type}",
    now(),
    "${survey.surveyor}",
    "${survey.company}",
    "${survey.entire_structure}",
    "${survey.immediate_attention}",
    "${survey.survey_purpose}",
    "${survey.Near_by_structures}",
    "${survey.traffic_on}",
    "${survey.height_limit}",
    "${survey.load_limit}",
    "${survey.other_limit}",
    "${survey.partial_traffic}",
    "${survey.supported_structure}",
    ${survey.CPI_AVG},
    ${survey.CPI_CRIT},
    now(),
    "${survey.next_survey_type}",
    now(),
    ${survey.SCS_AVG},
    ${survey.SCS_CRIT},
    "${survey.Revision}",
    "${survey.Revised_By}",
    "${survey.remarks}");
    `;

  console.log(q)
  connection.query(q, function (error, result) {
  if (error) throw error;

  res.send({result, newSurveyId: result.insertId});
  });
 });
 app.get("/surveys/:id", function(req, res){
  //  console.log(req.params)
  console.log('getting survey')
  var q = 'SELECT * FROM surveys WHERE id = ' + req.params.id;
  // connection.query(q, function (error, results) {
  // if (error) throw error;
  // // console.log(results)
  // res.send(results);
  // });
 });


