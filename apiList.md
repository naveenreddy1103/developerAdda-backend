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
  - get /connections
  - get /request/received
  - get /feed   


  status=["interested","ignored","accepted","rejected"]