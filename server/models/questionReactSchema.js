const mongoose=require("mongoose")

const questionReactSchema=mongoose.Schema({
    questions:{
        type:Array,
        default:[]
    },
    answers:{
        type:Array,
        default:[]
    },
    createAt:{
        type:Date, 
        default:Date.now
    }
})


const questionsReact=mongoose.model('QuestionReact',questionReactSchema)
module.exports=questionsReact