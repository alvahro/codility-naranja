'use strict';

const express = require('express');
const app = express();
app.use(express.json());

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.

// usando mi propio IDE y entorn

// uso de console.log para debuggear debido a tiempo y a que codiliti no brinda debugging tools.

var candidates = []

app.post('/candidates', function(req, res) {
  // console.log(req.body)
  if (Object.getOwnPropertyNames(req.body).length == 0) {
    // console.log('empty parameters')
    return res.sendStatus(400)
  }
  var newCandidate = req.body
  candidates.push(newCandidate)
  // console.log(candidates)
  res.sendStatus(200)
});

app.get('/candidates/search', function(req, res) {
  // request invalid
  // console.log(req.query)

  //
  if (Object.getOwnPropertyNames(req.query).length == 0) {
    // console.log('empty parameters')
    return res.sendStatus(400) // 5xx errors must not be returned
  }
  // No candidates exists at all
  if (candidates.length === 0) {
    // console.log('No candidates stored')
    return res.sendStatus(404)
  }

  var sarchSkills = req.query.skills.split(',')
  // console.log('typeof of varibale sarchSkills is: ' + typeof sarchSkills)
  // console.log(sarchSkills)

  function matchSkills(candidate) {
    console.log('typeof of varibale cadidate.skills in filter is: ' + typeof candidate.skills)
    console.log(candidate.skills);
    console.log('La variable sarchSkills en filter context es:')
    console.log(sarchSkills)
    // return candidate.skills.includes(sarchSkills)

    const intersection = sarchSkills.filter(element => candidate.skills.includes(element));

    console.log('The interction or match of skills for this candidate is:')
    console.log(intersection)

    candidate.matchedSkills = intersection
    candidate.matchedSkillsL = intersection.length

    return intersection.length > 0
  }

  var result = candidates.filter(matchSkills)

  // no candidates matches
  if (result.length === 0) {
    return res.sendStatus(404)
  }

  console.log('The result is:')
  console.log(result)

  var mostSkills = 0;
  var mostSkillsKey = 0;
  for (var i = 0; i < result.length; i++) {
    if (result[i].matchedSkillsL > mostSkills){
      mostSkills = result[i].matchedSkillsL;
      mostSkillsKey = i;
    }
  }

  res.end(JSON.stringify(result[mostSkillsKey]));
});

app.listen(process.env.HTTP_PORT || 3000);

