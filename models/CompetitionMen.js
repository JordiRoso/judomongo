import  {Schema, model} from "mongoose";

const CompetitionMenSchema = new Schema({
  name: 
  { 
    type: String, 
    required: true 
},
year: 
  { 
    type: String, 
    required: true 
},
  location: 
  { 
    type: String, 
    required: true 
},
  
  gender: 
  { 
    type: String, 
    required: true, 
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
        type: Number,
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
        }
    }
]
      
    
});

const CompetitionMen = model("competitionmens", CompetitionMenSchema);

export default CompetitionMen;