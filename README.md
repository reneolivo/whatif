# whatif
A conditional-statement based programming pattern
-------

The goal of **whatIf** is to write readable, self explanatory code by writing
code using plain English inside conditional statements.

**whatIf** reduces promises and functions until it gets a values.
If the result is true it will execute the `.then`'s associated to the statement,
if not it will continue to the `.butWhatIf` statements until it finds a matching,
if not it will run the `.otherwise` statement.

### examples

**The basics:**
```
whatIf(theUserLogins)
.then(redirectTheUserToTheDashboard)
.otherwise(displayAnErrorMessage);
```

**You can pass logical operators:**
```
whatif(theThemeColor === 'red')
.then(displayTheRedDashboard)
.butWhatIf(theThemeColor === 'blue')
.then(displayTheBlueDashboard)
.otherwise(displayTheGreenDashboard);
```

**Or even promises:**
```
whatIf(weFetchTheDashboardData())
.then(displayTheDashboardData)
.otherwise(displayAnErrorMessage);
```

### Specifications:
<small><strong>Warning:</strong> these may change in the near future. Not ready for production.</small>

**WhatIf can accept:**
* Boolean values `whatIf(fruit === 'apple')`.
* Function references `whatIf(canEatFruits)`.
* Promises `whatIf(Promises.resolve(true))`.

**Note:** Promises that return an error will be treated as falsy values.
It is recommended to handle errors before passing the promise to `whatIf` or
`.butWhatIf`.

**WhatIf can have multiple conditions in a if, if-else fashion:**
```
whatIf(falseStatement)
.then(thisWillNotExecute)
.butWhatIf(truthfulStatement)
.then(thisWillExecute);
```

**What if can have a default statement, like an else:**
```
whatIf(falseStatement)
.then(thisWillNotExecute)
.butWhatIf(anotherFalseStatement)
.then(thisWillNotExecuteEither)
.otherwise(thisWillExecute);
```

**Can use `.and` instead of `.then`**
```
whatIf(userIsAdmin)
.then(displayAdminMenu)
.and(displayAdminReport);
```
