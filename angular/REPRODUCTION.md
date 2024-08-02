

I have added:
  - a protected route `/protected`.
  -a guard that uses Capacitor.browser if the user isn't logged in

In app.component.ts there are 3 samples of the code for handling the callback redirect. 

Uncomment to try the different behaviours. 

Testing:

- deploy to ios
- open the link [mypagesdebug://protected](mypagesdebug://protected) to access a protected deep link 
- login with dummy@fake.com / Justatest_

## Working version

If the code is working you will end up on `/protected`. 

The logs will show that isAuthenticated is true when the guard runs.

The broken versions show this error in the logs:

`{"message":"Unable to display URL","errorMessage":"Unable to display URL"}`

And the logs show that isAuthenticated is false when the guard runs.
