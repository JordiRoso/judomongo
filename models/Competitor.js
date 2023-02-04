import  {Schema, model} from "mongoose";

const CompetitorSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        junior:{
            type:String,
            required:true
        },
        senior:{
            type:String,
            required:true
        },
        female:{
            type:String,
            required:true
        },
        male:{
            type:String,
            required:true
        },
        weight_female:{
            type:String,
            required:true
        },
        weight_male:{
            type:String,
            required:true
        }

    }
);


const Competitor = model("competitors", CompetitorSchema);

export default Competitor;