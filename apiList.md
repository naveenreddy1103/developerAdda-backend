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
  - post /request/send/interested/:userId
  - post /request/send/ignored/:userId
  - post /request/review/accepted/:requestId
  - post /request/review/reject/:requestId

  ## userRouters
  - get /connections
  - get /request/received
  - get /feed   


  status=["intersted","ignored","accepcted","rejected"]