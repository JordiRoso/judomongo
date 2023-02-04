import  {Schema, model} from "mongoose";

const WeightSchema = new Schema(
    {
        Weight_male:{
            type:Number,
            required:true
        },
        Weight_female:{
            type:Number,
            required:true
        },


    }
);

const Weight = model("weights", WeightSchema);

export default Weight;