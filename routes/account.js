const { Router } = require('express');
const router = Router();
const controller = require('../controllers/account');

router.get('/', controller.dashboard);
router.get('/profile', controller.profile);
router.get('/membership', controller.membership);
router.get('/log-out', controller.logout);

module.exports = router;
