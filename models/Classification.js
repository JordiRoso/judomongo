import  {Schema, model} from "mongoose";

const ClassificationSchema= new Schema(
    {
        competition:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Competition"
        },
        weight:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Weight"
        },
        competitor1:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Competitor"
        },
        competitor2:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Competitor"
        },
        competitor3:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Competitor"
        },
        puesto1:{
            type:Number,
            required:true
        },
        puesto2:{
            type:Number,
            required:true
        },
        puesto3:{
            type:Number,
            required:true
        },

    }
);

const Classification = model("classifications", ClassificationSchema);

export default Classification;