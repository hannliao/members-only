const { Router } = require('express');
const router = Router();
const controller = require('../controllers/message');

router.get('/', controller.get);
router.post('/', controller.post);

module.exports = router;
