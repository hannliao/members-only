const { Router } = require('express');
const router = Router();
const controller = require('../controllers/sign-up');

router.get('/', controller.createUserGet);
router.post('/', controller.createUserPost);

module.exports = router;
