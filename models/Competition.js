import  {Schema, model} from "mongoose";

const CompetitionSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        year:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        state:{
            type:Boolean,
            default:false
        },
        junior:{
            type:Boolean,
            default:false
        },
        senior:{
            type:Boolean,
            default:false
        },
        male:{
            type:Boolean,
            default:false
        },
        female:{
            type:Boolean,
            default:false

        },
        weight_male:{
            type:Number,
            default:0
        },
        weight_female:{
            type:Number,
            default:0
        },

    }
);

const Competition = model("competitions", CompetitionSchema);

export default Competition;