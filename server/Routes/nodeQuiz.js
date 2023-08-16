const express = require('express');
const { getQuestionNode, insertQuestionNode, dropQuestionsNode, getResultNode, storeResultNode, dropResultNode } = require('../controllers/nodeQuizController');
const router = express.Router();

/** Questions Node Routes */
router.get('/questionsNode', getQuestionNode);
router.post('/questionsNode', insertQuestionNode);
router.delete('/questionsNode', dropQuestionsNode);

router.get('/resultNode', getResultNode);
router.post('/resultNode', storeResultNode);
router.delete('/resultNode', dropResultNode);

module.exports = router;
