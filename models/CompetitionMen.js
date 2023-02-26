import  {Schema, model} from "mongoose";

const CompetitionMenSchema = new Schema({
  name: 
  { 
    type: String, 
    required: false
},
year: 
  { 
    type: String, 
    required: false
},
  location: 
  { 
    type: String, 
    required: false
},
  
  gender: 
  { 
    type: String, 
    required: false, 
    default: "male" 
},
  category: 
  { 
    type: String,
    enum: ['senior', 'junior'],
    required: true 
},
results: 
[
    {
      weight: {
        type: String,
        required: true,
        enum: [-60,-66,-73,-81,-90,-100,100],
      },
      position: 
        {
          type: Number,
          required: true
        },
        name: 
        {
          type: String,
          required: true
        },
        club: 
        {
          type: String,
          required: false
        }
    }
]
      
    
});

const CompetitionMen = model("competitionmens", CompetitionMenSchema);

export default CompetitionMen;