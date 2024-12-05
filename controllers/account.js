const db = require('../db/queries');
const bcrypt = require('bcryptjs');

function dashboard(req, res) {
  res.render('index', { title: 'Account Dashboard', main: 'partials/account' });
}

function membershipGet(req, res) {
  const membership = req.user.membership;

  if (membership == 'elite') {
    res.render('index', {
      title: 'Membership Status',
      main: 'partials/join-club-response',
      joined: true,
    });
  } else {
    res.render('index', {
      title: 'Membership Status',
      main: 'partials/join-club-form',
    });
  }
}

async function membershipPost(req, res) {
  let joined = false;
  if (req.body.passcode === 'secretclub') {
    await db.updateMembership(req.user.id);
    joined = true;
  }
  res.render('index', {
    title: 'Membership Status',
    main: 'partials/join-club-response',
    joined,
  });
}

function changePasswordGet(req, res) {
  res.render('index', {
    title: 'Change Password',
    main: 'partials/change-password-form',
  });
}

async function changePasswordPost(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = {
    id: req.user.id,
    password: hashedPassword,
  };
  await db.updatePassword(user);
  res.redirect('/account');
}

function editProfileGet(req, res) {
  res.render('index', {
    title: 'Edit Profile',
    main: 'partials/edit-profile-form',
    user: req.user,
  });
}

async function editProfilePost(req, res) {
  const user = {
    id: req.user.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
  };
  await db.updateUser(user);
  res.redirect('/account');
}

function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/log-in');
    });
  });
}

module.exports = {
  dashboard,
  membershipGet,
  membershipPost,
  changePasswordGet,
  changePasswordPost,
  editProfileGet,
  editProfilePost,
  logout,
};
