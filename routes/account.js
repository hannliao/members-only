const { Router } = require('express');
const router = Router();
const controller = require('../controllers/account');

router.get('/', controller.dashboard);
router.get('/membership', controller.membershipGet);
router.post('/membership', controller.membershipPost);
router.get('/profile/password', controller.changePasswordGet);
router.post('/profile/password', controller.changePasswordPost);
router.get('/profile', controller.editProfileGet);
router.post('/profile', controller.editProfilePost);
router.get('/log-out', controller.logout);

module.exports = router;
