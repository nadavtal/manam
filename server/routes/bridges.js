
var express = require('express');
var app = module.exports = express();
var multer = require('multer');
const DIR = './uploads';
const connection = require('../db.js');

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({storage: storage});
//BRIDGES ROUTES
app.get("/bridges", function(req, res){
  console.log('getting bridges')
  var q = 'SELECT * FROM tbl_bridges';
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
 });
app.post("/bridges", function(req, res){
  console.log('creating new bridge', req.body);
  const bridge = req.body
  // const values = createProjectsArray([bridge])[0]
  // console.log(values)
  var q = `INSERT INTO tbl_bridge_list
          (name, bridge_type, bridge_type_code, structure_name, road, road_station, inspection_classification, description, organization_id, year_built,
            region, general_length, max_span_length, spans, max_width, foundations, lat, lon, x, y, status, image_url, cad_model_id, project_id)
           VALUES ( '${bridge.name}', '${bridge.bridge_type}', '${bridge.bridge_type_code}', '${bridge.structure_name}', '${bridge.road}', ${bridge.road_station},
           '${bridge.inspection_classification}', '${bridge.description}', ${bridge.organization_id}, ${bridge.year_built}, '${bridge.region}',
           ${bridge.general_length}, ${bridge.max_span_length}, ${bridge.spans}, ${bridge.max_width}, '${bridge.foundations}', ${bridge.lat},
           ${bridge.lon}, ${bridge.x}, ${bridge.y}, '${bridge.status}', '${bridge.image_url}', ${bridge.cad_model_id ? bridge.cad_model_id : null}, ${bridge.project_id})`;
           console.log(q)
  connection.query(q, function (error, result) {
    console.log(result)
    if (error) res.send(error);
    else res.send({result, newBridgeId: result.insertId});
    });
 });
app.get("/bridges/:id", function(req, res){
  console.log(req.params);
  const id = req.params.id
  console.log('getting bridge')
  var q = 'SELECT * FROM tbl_bridge_list WHERE bid = ' + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.put("/bridges/:id", function(req, res){
  console.log('updating bridge', req.body);
  const bridge = req.body;
  if (bridge.main_image) {

  }
  updateBridge(bridge, req.params.id, res)


});

app.get("/bridges/:id/processes", function(req, res){
  console.log(req.params);
  const id = req.params.id
  console.log('getting bridge processes')
  var q = 'SELECT * FROM tbl_processes WHERE bid = ' + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.get("/bridges/:id/tasks", function(req, res){
  console.log(req.params);
  const id = req.params.id
  console.log('getting bridge processes')
  var q = 'SELECT * FROM tbl_tasks WHERE bid = ' + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.get("/bridges/:id/spans", function(req, res){
  console.log('getting bridge spans', req.params)
  console.log(req.params);
  const id = req.params.id
  var q = 'SELECT * FROM tbl_bridge_spans WHERE bid = ' + req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.post("/bridges/:id/spans", function(req, res){
  console.log('creating new bridge spans', req.body);
  const spans = req.body;
  // var q = `INSERT INTO tbl_bridge_spans (bid, structure_type_id, name, description, span_order, total_spans, spans_area, span_status) VALUES ?`;
  var q = `INSERT INTO tbl_bridge_spans (bid, structure_type_id, name, span_order) VALUES ?`;
  const values = convertObjArrayToArray(spans)
  connection.query(q, [values], function(err, result) {
    if (err) res.send(err);

    res.send(result);
  });

});
app.get("/bridges/:id/elements", function(req, res){
  // console.log(req.params);
  const id = req.params.id
  console.log('getting bridge spans')
  var q = 'SELECT * FROM tbl_bridge_elements WHERE bid = ' + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.post("/bridges/:id/elements", function(req, res){
  console.log('creating new bridge elements', req.body);
  const elemets = req.body;
  // var q = `INSERT INTO tbl_bridge_spans (bid, structure_type_id, name, description, span_order, total_spans, spans_area, span_status) VALUES ?`;
  var q = `INSERT INTO tbl_bridge_elements (bid, span_id, object_id) VALUES ?`;
  const values = convertObjArrayToArray(elemets)
  console.log(values)
  connection.query(q, [values], function(err, result) {
    if (err) res.send(err);

    res.send(result);
  });

});

const updateElementQuery = (element, objectId) => {
  console.log(element)
  const q = `UPDATE tbl_bridge_elements
  SET span_id = ${element.span_id},
      element_group_id = ${element.element_group_id ? element.element_group_id: null},
      element_type_id = ${element.element_type_id ? element.element_type_id: null},
      sub_element_order = ${element.sub_element_order ? element.sub_element_order: null},
      description = '${element.description}',
      importance = '${element.importance}',
      primary_unit = '${element.primary_unit}',
      primary_quantity = ${element.primary_quantity ? element.primary_quantity: null},
      secondary_unit = '${element.secondary_unit}',
      secondary_quantity = ${element.secondary_quantity ? element.secondary_quantity: null},
      detailed_evaluation_required = '${element.detailed_evaluation_required}',
      remarks = '${element.remarks}',
      view_position = '${element.view_position}',
      last_updated = now(),
      updated_by = 'Nadav Almagor',
      default_view_data = '${element.default_view_data}'
  WHERE object_id = ${objectId};`
  return q
}
app.put("/bridges-elements/:id", function(req, res){
  console.log('updating element', req.body);
  const element = req.body;
  const q = updateElementQuery(element, req.params.id)
  // `UPDATE tbl_bridge_elements
  // SET span_id = ${element.span_id},
  //     element_group_id = ${element.element_group_id ? element.element_group_id: null},
  //     element_type_id = ${element.element_type_id ? element.element_type_id: null},
  //     sub_element_order = ${element.sub_element_order ? element.sub_element_order: null},
  //     description = '${element.description}',
  //     importance = '${element.importance}',
  //     primary_unit = '${element.primary_unit}',
  //     primary_quantity = ${element.primary_quantity ? element.primary_quantity: null},
  //     secondary_unit = '${element.secondary_unit}',
  //     secondary_quantity = ${element.secondary_quantity ? element.secondary_quantity: null},
  //     detailed_evaluation_required = '${element.detailed_evaluation_required}',
  //     remarks = '${element.remarks}',
  //     view_position = '${element.view_position}',
  //     last_updated = now(),
  //     updated_by = 'Nadav Almagor',
  //     default_view_data = '${element.default_view_data}'
  // WHERE object_id = ${req.params.id};`


  connection.query(q, function(err, result) {
    if (err) res.send(err);

    res.send(result);
  });


});
app.put("/bridges-elements", function(req, res){
  console.log('updating elements', req.body);
  // console.log(req.params)
  const elements = req.body;
  const keys = Object.keys(elements[0]).join(',');
  // const values = convertObjArrayToValues(elements)
  console.log(elements);
  let queries = '';

  elements.forEach(function (element) {
    queries += updateElementQuery(element, element.object_id)
  });

  // connection.query(queries, defered.makeNodeResolver());
  // console.log('Values', values)
  // var q = `INSERT INTO tbl_bridge_elements (${keys}) VALUES (1,1,1),(2,2,3),(3,9,3),(4,10,12)
  // ON DUPLICATE KEY UPDATE Col1=VALUES(Col1),Col2=VALUES(Col2);`;
  // console.log(q)

  // console.log(q)
  connection.query(queries, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });


});
app.put("/bridges-spans/:id", function(req, res){
  console.log('updating span', req.body);
  console.log(req.params)
  const span = req.body;
  var q = `UPDATE tbl_bridge_spans
  SET name = '${span.name}',
      structure_type_id = ${span.structure_type_id ? span.structure_type_id: null},
      description = '${span.description}',
      span_order = ${span.span_order},
      total_spans = ${span.total_spans ? span.total_spans: null},
      span_area = ${span.span_area ? span.span_area: null},
      status = '${span.status}'
  WHERE id = ${req.params.id};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });


});


app.get("/bridges-models/:id", function(req, res){
  console.log(req.params);
  const id = req.params.id
  console.log('getting bridge models')
  var q = 'SELECT * FROM tbl_bridge_models WHERE bid = ' + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});
app.post("/bridges-models", function(req, res){
  console.log('creating new bridge model', req.body);
  const model = req.body
  // const values = createProjectsArray([bridge])[0]
  // console.log(values)
  var q = `INSERT INTO tbl_bridge_models
          (model_part, models_task_id, bid, date_created, created_by, last_update, updated_by, status, name, url,
            type, remarks, calibration_data, ion_id)
           VALUES (${model.model_part ? model.model_part : null}, ${model.models_task_id}, ${model.bid}, now(), '${model.created_by}', now(),
           '${model.created_by}', '${model.status}', '${model.name}', '${model.url}', '${model.type}',
           '${model.remarks}', '${model.calibration_data}', ${model.ion_id ? model.ion_id : null})`;
           console.log(q)
  connection.query(q, function (error, result) {
    console.log(result)
    if (error) res.send(error);
    else res.send({model, newBridgeModelId: result.insertId});
    });
 });

 app.put("/bridges-models/:id", function(req, res){
  console.log('updating model', req.body);
  const model = req.body;
  var q = `UPDATE tbl_bridge_models
  SET model_part = ${model.model_part},
      last_update = now(),
      updated_by = '${model.updated_by}',
      status = '${model.status}',
      name = '${model.name}',
      url = '${model.url}',
      type = '${model.type}',
      remarks = '${model.remarks}',
      calibration_data = '${model.calibration_data}',
      ion_id = ${model.ion_id}
  WHERE id = ${model.id};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });


});


 function updateBridge(bridge, bridgeId, res) {
  var q = `UPDATE tbl_bridge_list
  SET name = '${bridge.name}',
      bridge_type = '${bridge.bridge_type}',
      bridge_type_code = '${bridge.bridge_type_code}',
      structure_name = '${bridge.structure_name}',
      road = '${bridge.road}',
      road_station = ${bridge.road_station},
      inspection_classification = '${bridge.inspection_classification}',
      description = '${bridge.description}',
      year_built = ${bridge.year_built},
      region = '${bridge.region}',
      general_length = ${bridge.general_length},
      max_span_length = ${bridge.max_span_length},
      spans = ${bridge.spans},
      max_width = ${bridge.max_width},
      foundations = '${bridge.foundations}',
      lat = ${bridge.lat},
      lon = ${bridge.lon},
      x = ${bridge.x},
      y = ${bridge.y},
      status = '${bridge.status}',
      image_url = '${bridge.image_url}',
      cad_model_id = ${bridge.cad_model_id ? bridge.cad_model_id : null}
  WHERE bid = ${bridgeId};`

  // console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });
}

function convertObjArrayToArray(array) {
  let finalArr = [];
  array.map(obj => finalArr.push(Object.values(obj)))
  return finalArr
}
function convertObjArrayToValues(array) {
  let final = ''
  array.map(obj => {
    let item = JSON.stringify(Object.values(obj))
    item = item.substring(1, item.length-1);
    // console.log(item)
    // console.log(item2)
    const str = `(${item})`
    // console.log(str)

  })
  return final
}

