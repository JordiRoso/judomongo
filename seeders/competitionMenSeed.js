const CompetitionMen = require('./models/CompetitionMen');

const competitionMenSeed = [
  {
    "name": "Catalunya",
    "location": "Barcelona",
    "gender": "male",
    "category": "senior",
    "year":"2022",
    "results": [
      {
        "weight": -81,
        "position": 1,
        "name": "ejemplo",
        "club": "tropera"
      },
      {
        "weight": -81,
        "position": 2,
        "name": "ejemplo2",
        "club": "tropera"
      },{
        "weight": -81,
        "position": 3,
        "name": "putota",
        "club": "tropera"
      }
    ]
  }
];

CompetitionMen.create(competitionMenSeed)
  .then(() => console.log('Seed data inserted'))
  .catch((err) => console.log(err));
