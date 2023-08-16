const express=require('express')
const QuestionsReact=require('../models/questionReactSchema')
const ResultReact=require('../models/resultReactSchema')
const { questionsReact, answersCorrect } = require('../data/reactdata');


/*get all react questions */
const getQuestionReact=async(req,res)=>{
    try {
        const q=await QuestionsReact.find()
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

/*insert all react questions */
const insertQuestionReact = async (req, res) => {
    try {
      const questionReact = await QuestionsReact.insertMany({
        questions: questionsReact,
        answers: answersCorrect,
      });
      console.log(questionReact)
      res.json({ msg: "Data Saved Successfully ...!" });
    } catch (error) {
      res.json({ error });
    }
  };
/* Delete all the question*/ 
const dropQuestionsReact=async(req,res)=>{
    try {
       await QuestionsReact.deleteMany()
       res.json({msg:"Questions Deleted Successfully ...!"})
    } catch (error) {
        res.json({error})
    }
}

/*get react results */
const getResultReact=async(req,res)=>{
    try {
        const r=await ResultReact.find()
        res.json(r)
    } catch (error) {
        res.json({error})
    }
}

/*store react questions */
const storeResultReact = async (req, res) => {
    try {
      const { username, result, attempts, points, achived } = req.body;
      
      if (!username || !result) {
        return res.status(400).json({ error: 'Username and result data are required.' });
      }
      
      const newResult = await ResultReact.create({
        username,
        result,
        attempts,
        points,
        achived
      });
  
      res.status(201).json({ msg: 'Result Saved Successfully', data: newResult });
     } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while saving the result.' });
      }
  };
  


/* Delete all the question*/ 
const dropResultReact=async(req,res)=>{
    try {
        await ResultReact.deleteMany()
        res.json({msg:'Result Deleted Successfully...!'})
    } catch (error) {
        res.json({error})
    }
}

module.exports={
    getQuestionReact,insertQuestionReact,dropQuestionsReact,getResultReact,storeResultReact,dropResultReact
}