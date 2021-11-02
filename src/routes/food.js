'use strict';

const express = require('express');

const { Food } = require('../models/index');

const foodRouter = express.Router();


foodRouter.get('/getFoodList', getFoodList); 
foodRouter.get('/getFood/:id', getFood); 
foodRouter.post('/createFood', createFood); 
foodRouter.put('/updateFood/:id', updateFood); 
foodRouter.delete('/deleteFood/:id', deleteFood); 

async function getFoodList(req, res) {
    const allFood = await Food.findAll();
    res.status(200).json(allFood);

}

async function getFood(req, res) {
    const id = parseInt(req.params.id); 
    const food = await Food.findOne({
        where: {
            id: id
        }
    });
    res.status(200).json(food);
}

async function createFood(req, res) {
    const obj = req.body;
    let food = await Food.create(obj);
    res.status(201).json(food);

}

async function updateFood(req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;
    let foundPerson = await Food.findOne({ where: { id: id } });
    const updatedFood = await foundPerson.update(obj);
    res.status(201).json(updatedFood);
}

async function deleteFood(req, res) {
    const id = parseInt(req.params.id);
    const deletedFood = await Food.destroy({ where: { id } });
    res.status(204).json(deletedFood);
}


module.exports = foodRouter;