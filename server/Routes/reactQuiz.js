
const express = require('express');
const { getQuestionReact, insertQuestionReact, dropQuestionsReact, getResultReact, storeResultReact, dropResultReact } = require('../controllers/reactQuizController');
const router=express.Router()



/** Questions React Routes */
router.get('/questionsReact',getQuestionReact)
router.post('/questionsReact',insertQuestionReact)
router.delete('/questionsReact',dropQuestionsReact)

router.get('/resultReact',getResultReact)
router.post('/resultReact',storeResultReact)
router.delete('/resultReact',dropResultReact)






module.exports=router
