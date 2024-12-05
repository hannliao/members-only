const { Router } = require('express');
const router = Router();
const controller = require('../controllers/message');

router.get('/', controller.createMessageGet);
router.post('/', controller.createMessagePost);
router.post('/:id', controller.deleteMessagePost);

module.exports = router;
