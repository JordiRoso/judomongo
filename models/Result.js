import mongoose, {Schema, model} from "mongoose";

const ResultSchema = new Schema(
     {
        competition:{
            type: mongoose.Shema.Types.ObjectId,
            ref: "Competition"
        },
        competitor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competitor"
        },
        position:{
            type: Number,
            rrequired: true
        }
       

    }
);

const Result = model("results", ResultSchema);

export default Result;
