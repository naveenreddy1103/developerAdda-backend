  # APIList

  ## AuthRouter:-
  - post /signup
  - post /login
  - post /logout

  ## ProfileROuter
  - get /profile/view
  - patch /profile/edit
  - patch /profile/password

  ## connectionRequestRouter
  - post /request/send/:interested or ignored/:touserId
  
  - post /request/review/:accepted or rejected/:requestId

  ## userRouters
   - get /user/request/received
  - get /connections
  - get /feed   


  status=["interested","ignored","accepted","rejected"]