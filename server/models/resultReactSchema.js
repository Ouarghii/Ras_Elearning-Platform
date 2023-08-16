const mongoose=require("mongoose")

const resultReactSchema=mongoose.Schema({
    username:{
        type:String
    },
    result:{
        type:Array,
        default:[]
    },
    attemps:{type:Number,default:0},
    points:{type:Number,default:0},
    achived:{type:String,default:""},
    createdAt:{type:Date,default:Date.now}
})

const resultReact=mongoose.model('ResultReact',resultReactSchema)
module.exports=resultReact