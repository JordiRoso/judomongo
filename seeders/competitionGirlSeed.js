const CompetitionMen = require('./models/CompetitionMen');

const competitionMenSeed = [
  {
    "name": "Catalunya",
    "location": "Barcelona",
    "gender": "female",
    "category": "senior",
    "year":"2022",
    "results": [
      {
        "weight": -57,
        "position": 1,
        "name": "ejemplo",
        "club": "tropera"
      },
      {
        "weight": -57,
        "position": 2,
        "name": "ejemplo2",
        "club": "tropera"
      },{
        "weight": -57,
        "position": 3,
        "name": "putota",
        "club": "tropera"
      }
    ]
  }
];

CompetitionGirl.create(competitionMenSeed)
  .then(() => console.log('Seed data inserted'))
  .catch((err) => console.log(err));
