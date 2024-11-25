function dashboard(req, res) {
  res.render('index', { title: 'Account Dashboard', main: 'partials/account' });
}

function profile(req, res) {
  res.render('index', {
    title: 'Edit Profile',
    main: 'partials/edit-profile-form',
  });
}

function membership(req, res) {
  res.render('index', {
    title: 'Membership Status',
    main: 'partials/join-club-form',
  });
}

function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}

module.exports = {
  dashboard,
  profile,
  membership,
  logout,
};
