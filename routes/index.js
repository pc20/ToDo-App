const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')


router.use(express.static('assets'));

router.get('/',homeController.home);

// THIS IS URL FOR CREATING THE TASK IN DATABASE
router.post('/create-todo', homeController.create);

// THIS IS DELETE URL FOR SINGLE TASK FROM DATABASE USING CROSS BUTTON
router.get('/delete_todo_single', homeController.delete);

// THIS IS URL TO DELETE THE ITEM FROM DATABASE USING DELETE BUTTON
router.post('/delete-todo', homeController.delete_many);


module.exports = router;