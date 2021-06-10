/**
 * @api {post} /api/register 1. Register
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} fullname User fullname
 * @apiParam {Date} dateOfBirth User date of birth
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *    {
 *      "fullname": "Mario Randrianomearisoa",
 *      "dateOfBirth": "04-30-1997",
 *      "email": "mario@gmail.com",
 *      "password": "Mario22"
 *    }
 *
 * @apiSuccess (201) {String} success Status of the request
 * @apiSuccess (201) {String} message message response
 * @apiSuccess (201) {Object} data User's information saved inside database
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 CREATED
 *    {
 *      "success": "true",
 *      "message": "register success, a confirmation mail was sent into mario@gmail.com",
 *      "data": {
 *        "picture": "https://gravatar.com/avatar/b3e777382401ad75437b74ff9252e5e1",
 *        "role": "user",
 *        "_id": "60b1e54d0d67fa1a16b4894e",
 *        "fullname": "Mario Randrianomearisoa",
 *        "email": "mario@gmail.com",
 *        "dateOfBirth": "1999-04-29T21:00:00.000Z",
 *        "createdAt": "2021-05-29T06:55:09.554Z",
 *        "updatedAt": "2021-05-29T06:55:09.554Z"
 *      }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 409 (conflict) Duplicated account
 *    {
 *      "success": "false",
 *      "message": "An account with email: ${_email} is already exists"
 *    }
 *
 *    HTTP/1.1 400 (bar request) some random error, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 422 (unprocessable entity) Missing or wrong param format
 *    {
 *      "success": "false",
 *      "message": "Params error"
 *      "errors": []
 *    }
 *
 */

/**
 * @api {post} /api/login 2. Login
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *    {
 *      "email": "mario@gmail.com",
 *      "password": "Mario22"
 *    }
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccess (200) {Object} data User's information saved inside database
 * @apiSuccess (200) {Object} tokens object of generated tokens (access_token)
 * @apiDescription After login success, a HttpOnly cookie with name "refresh_token" is generated
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "User logged in successfully",
 *      "data": {
 *        "picture": "",
 *        "role": "user",
 *        "_id": "60b1e54d0d67fa1a16b4894e",
 *        "fullname": "Mario Randrianomearisoa",
 *        "email": "mario@gmail.com",
 *        "dateOfBirth": "1999-04-29T21:00:00.000Z",
 *        "createdAt": "2021-05-29T06:55:09.554Z",
 *        "updatedAt": "2021-05-29T06:55:09.554Z",
 *      },
 *     "tokens": {
 *        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc0NzM5LCJleHAiOjE2MjIyNzY1Mzl9.8128o5Mli7wYrGHwyGE8Lrmg7ZnJH48HW_Ag_sSp278"
 *      }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 409 (conflict) account registered with Oauth
 *    {
 *      "success": "false",
 *      "message": "Please login using your social creds"
 *    }
 *
 *    HTTP/1.1 400 (bad request) some random error, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 422 (unprocessable entity) Missing or wrong param format
 *    {
 *      "success": "false",
 *      "message": "Params error"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 401 (unauthorized) wrong password or email
 *    {
 *      "success": "false",
 *      "message": "Wrong email or password"
 *    }
 *
 *    HTTP/1.1 401 (unauthorized) account not confirmed yet
 *    {
 *      "success": "false",
 *      "message": "email not confirmed"
 *    }
 *
 *    HTTP/1.1 404 (not found) user not found
 *    {
 *      "success": "false",
 *      "message": "user not found, maybe not registered"
 *    }
 *
 */

/**
 * @api {get} /api/refresh-token 3. Refresh token
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Generate new access-token, cookie with name "refresh_token" is needed
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccess (200) {String} accessToken new generated access token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "new tokens generated",
 *      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc1NzY4LCJleHAiOjE2MjIyNzc1Njh9.Id4cqo3nGhYq3oFQFGXeB-QgCj4bInT4MykovqwSL_0"
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 401 (Unauthorized) Some error random error during jwt validation, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 400 (bad request) some random error, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 401 (Unauthorized) Refresh token not stored inside redis database
 *    {
 *      "success": "false",
 *      "message": "Logged out, try to login"
 *    }
 *
 *    HTTP/1.1 401 (Unauthorized) Refresh token not the same that the stored inside redis database
 *    {
 *      "success": "false",
 *      "message": "Wrong token, please login"
 *    }
 *
 *    HTTP/1.1 401 (Unauthorized) User not registered
 *    {
 *      "success": "false",
 *      "message": "User not registered"
 *    }
 *
 *     HTTP/1.1 422 (unprocessable entity) Missing cookie
 *    {
 *      "success": "false",
 *      "message": "Params error"
 *      "errors": []
 *    }
 *
 */

/**
 * @api {get} /api/logout 4. Logout
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription To logout, it blacklist the access token provided in the header
 *
 * @apiHeader {String} Authorization access-token generated during login or new Token
 * @apiHeaderExample {json} Input
 *    {
 *      "Authorization": "Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc0NzM5LCJleHAiOjE2MjQ4NjY3Mzl9.0Cf_vzs8wwvb3sGg0REFGg7di192QC0cH19X5omdXbk"
 *    }
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "user logged out"
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 400 (Bad request) Some random error during jwt validation, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 401 (Unauthorized) Already logged out (access token blacklisted)
 *    {
 *      "success": "false",
 *      "message": "you are logged out, please login again"
 *    }
 *
 *    HTTP/1.1 401 (Unauthorized) User not registered
 *    {
 *      "success": "false",
 *      "message": "User not registered"
 *    }
 *
 *    HTTP/1.1 401 (Unauthorized) Invalid session
 *    {
 *      "success": "false",
 *      "message": "Invalid session"
 *    }
 *
 */

/**
 * @api {get} /api/revoke-token 5. Revoke refresh token
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Make refresh token invalid, cookie with name "refresh_token" is needed
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccess (200) {Number} data redis response after successfuly delete refresh token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "Refresh token revoked successfully",
 *      "data": 1
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 401 (Unauthorized) Some error random error during jwt validation, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 400 (bad request) some random error, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 401 (Unauthorized) Refresh token not stored inside redis database
 *    {
 *      "success": "false",
 *      "message": "Logged out, try to login"
 *    }
 *
 *    HTTP/1.1 401 (Unauthorized) Refresh token not the same that the stored inside redis database
 *    {
 *      "success": "false",
 *      "message": "Wrong token, please login"
 *    }
 *
 *      HTTP/1.1 422 (unprocessable entity) Missing cookie
 *    {
 *      "success": "false",
 *      "message": "Params error"
 *      "errors": []
 *    }
 *
 */

/**
 * @api {post} /api/confirm/send 6. Resend confirmation email
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Resend confirmation token
 *
 * @apiParam {String} email user's email
 * @apiParamExample {json} Input
 *    {
 *      "email": "mario@gmail.com"
 *    }
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccess (200) {Number} data user's email
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "A new confirmation email has been sent to: mario@gmail.com",
 *      "data": {email: "mario@gmail.com"}
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 400 (Unauthorized) Some error random error, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 404 (not found) user not registered
 *    {
 *      "success": "false",
 *      "message": "user not found, maybe not registered"
 *    }
 *
 *    HTTP/1.1 409 (conflict) account already confirmed
 *    {
 *      "success": "false",
 *      "message": "Your account is already confirmed"
 *    }
 *
 *    HTTP/1.1 422 (unprocessable entity) Missing or wrong param format
 *    {
 *      "success": "false",
 *      "message": "Params error"
 *      "errors": []
 *    }
 *
 */

/**
 * @api {post} /api/password/reset 7. Reset password
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Request to reset user's password in case of forgotten password by example
 *
 * @apiParam {String} email User email
 * @apiParamExample {json} Input
 *    {
 *      "email": "mario@gmail.com"
 *    }
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccess (200) {Object} data User's information
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "A password reset instruction have been sent to the email: mario@gmail.com",
 *      "data": {email: "mario@gmail.com"}
 *    }
 * @apiErrorExample {json} List error
 *
 *    HTTP/1.1 400 (bad request) some random error, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 422 (unprocessable entity) Missing or wrong param format
 *    {
 *      "success": "false",
 *      "message": "Params error"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 404 (not found) user not found
 *    {
 *      "success": "false",
 *      "message": "user not found, maybe not registered"
 *    }
 *
 */

/**
 * @api {post} /api/password/change 8. change reset password
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Request to change password after the user request changment
 *
 * @apiParam {String} email User email
 * @apiParam {String} newPassword User new password
 * @apiParamExample {json} Input
 *    {
 *      "email": "mario@gmail.com",
 *      "newPassword": "MaxR522"
 *    }
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "Your password was changed successfully"
 *    }
 * @apiErrorExample {json} List error
 *
 *    HTTP/1.1 400 (bad request) some random error, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 422 (unprocessable entity) Missing or wrong param format
 *    {
 *      "success": "false",
 *      "message": "Params error"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 403 (forbiden) time to allow password change expired
 *    {
 *      "success": "false",
 *      "message": "You are not allowed to perform this action, try to make new request again"
 *    }
 *
 *    HTTP/1.1 404 (not found) user not found
 *    {
 *      "success": "false",
 *      "message": "user not found, maybe not registered"
 *    }
 *
 */

/**
 * @api {post} /api/password/modify 9. modify password
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Request to modify password after login
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password current User's password
 * @apiParam {String} newPassword User new password
 * @apiParamExample {json} Input
 *    {
 *      "email": "mario@gmail.com",
 *      "password": "MaxR522",
 *      "newPassword": "Mario22"
 *    }
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "Your password was changed successfully"
 *    }
 * @apiErrorExample {json} List error
 *
 *    HTTP/1.1 400 (bad request) some random error, specified inside errors property
 *    {
 *      "success": "false",
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 422 (unprocessable entity) Missing or wrong param format
 *    {
 *      "success": "false",
 *      "message": "Params error"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 403 (forbiden) wrong current password
 *    {
 *      "success": "false",
 *      "message": "wrong password"
 *    }
 *
 *    HTTP/1.1 404 (not found) user not found
 *    {
 *      "success": "false",
 *      "message": "user not found, maybe not registered"
 *    }
 *
 *     HTTP/1.1 401 (Unauthorized) logged out (access token blacklisted)
 *    {
 *      "success": "false",
 *      "message": "you are logged out, please login again"
 *    }
 *
 */
