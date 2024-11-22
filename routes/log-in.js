const { Router } = require('express');
const router = Router();
const controller = require('../controllers/log-in');

router.get('/', controller.loginUserGet);
router.post('/', controller.loginUserPost);

module.exports = router;
