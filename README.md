# whatif
A promise based programming pattern
-------

The goal of whatif is to write readable, self explanatory code by leveraging promises.


### examples 


```
whatif(theUserLogsIn)
.then(theUserIsRedirectedToTheDashboard)
.otherwise(theUserSeesAnErrorMessage);

function theUserLogsIn {
  let hash = hashMyPassword(req.body.password);

  return db.user.findOne({
    username: req.body.username,
    password: hash
  });
}

function theUserIsRedirectedToTheDashboard(user) {
  req.session.user = user;
  res.redirect('/dashboard');
}

function theUserSeesAnErrorMessage() {
  res.send(500, 'could not login');
}
```
