import  {Schema, model} from "mongoose";

const CompetitionGirlSchema = new Schema({
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
    required: false 
},
  
  gender: 
  { 
    type: String, 
    required: true, 
    default: "female" 
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
        // enum: [-48,-52,-57,-63,-70,-78,78],
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

const CompetitionGirl = model("competitiongirls", CompetitionGirlSchema);

export default CompetitionGirl;