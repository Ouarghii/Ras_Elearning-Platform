const express = require('express');
const QuestionsNode = require('../models/questionNodeSchema'); // Change the import to your Node-specific schema
const ResultsNode = require('../models/resultNodeSchema'); // Change the import to your Node-specific schema

const { questionsNode, answersCorrectNode } = require('../data/nodedata'); // Change the import to your Node-specific data

const router = express.Router();

/* Get all node questions */
const getQuestionNode = async (req, res) => {
    try {
        const questions = await QuestionsNode.find();
        console.log('Fetched questions:', questions);
        res.json(questions);
    } catch (error) {
        console.log('Error fetching questions:', error);
        res.json({ error });
    }
};


/* Insert all node questions */
const insertQuestionNode = async (req, res) => {
    try {
        const questionNode = await QuestionsNode.insertMany({
            questions: questionsNode,
            answers: answersCorrectNode,
        });
        console.log(questionNode);
        res.json({ msg: "Data Saved Successfully ...!" });
    } catch (error) {
        res.json({ error });
    }
};

/* Delete all node questions */
const dropQuestionsNode = async (req, res) => {
    try {
        await QuestionsNode.deleteMany();
        res.json({ msg: "Questions Deleted Successfully ...!" });
    } catch (error) {
        res.json({ error });
    }
}

/* Get node quiz results */
const getResultNode = async (req, res) => {
    try {
        const results = await ResultsNode.find();
        res.json(results);
    } catch (error) {
        res.json({ error });
    }
}

/* Store node quiz results */
const storeResultNode = async (req, res) => {
    try {
        const { username, result, attempts, points, achieved } = req.body;

        if (!username || !result) {
            return res.status(400).json({ error: 'Username and result data are required.' });
        }

        const newResult = await ResultsNode.create({
            username,
            result,
            attempts,
            points,
            achieved
        });

        res.status(201).json({ msg: 'Result Saved Successfully', data: newResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the result.' });
    }
};

/* Delete all node quiz results */
const dropResultNode = async (req, res) => {
    try {
        await ResultsNode.deleteMany();
        res.json({ msg: 'Result Deleted Successfully...!' });
    } catch (error) {
        res.json({ error });
    }
}

module.exports={
    getQuestionNode,insertQuestionNode,dropQuestionsNode,getResultNode,storeResultNode,dropResultNode
}
