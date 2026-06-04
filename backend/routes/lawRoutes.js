const express = require('express');
const {
  createLaw,
  getAllLaws,
  getLawById
} = require('../controllers/lawController');

const router = express.Router();

router.route('/').post(createLaw).get(getAllLaws);
router.route('/:id').get(getLawById);

module.exports = router;
