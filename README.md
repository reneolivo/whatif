# whatif
A promise based programming pattern
-------

The goal of **whatIf** is to write readable, self explanatory code by leveraging
the power of promises.

**whatIf** can accept a function, a boolean, or a promise as a parameter. It
returns a Promise like object. Aside from `.then(success, failure, progress)`,
the whatIf object also supports `.otherwise(failure)`, and
`.butWhatIf(whatIfCondition)`.

### examples

**Functions as parameters:**
```
whatIf(theUserLogins)
.then(redirectTheUserToTheDashboard)
.otherwise(displayAnErrorMessage);
```

**Executed functions:**
```
whatIf(theUserIs('admin'))
.then(displayAdminMenu);
```

**Logical operators:**
```
whatif(theThemeColor === 'red')
.then(displayTheRedDashboard)
.butWhatIf(theThemeColor === 'blue')
.then(displayTheBlueDashboard)
.otherwise(displayTheGreenDashboard);
```

**Promises:**
```
whatIf(weFetchTheDashboardData())
.then(displayTheDashboardData)
.otherwise(displayAnErrorMessage);
```
