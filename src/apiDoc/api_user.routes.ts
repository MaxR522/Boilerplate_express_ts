/**
 * @api {patch} /api/users/:id/info 1. Update user's info
 * @apiGroup User Info
 * @apiVersion 1.0.0
 * @apiDescription Request to update user's info
 *
 * @apiHeader {String} Authorization access-token generated during login or new Token
 * @apiHeaderExample {json} Input
 *    {
 *      "Authorization": "Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc0NzM5LCJleHAiOjE2MjQ4NjY3Mzl9.0Cf_vzs8wwvb3sGg0REFGg7di192QC0cH19X5omdXbk"
 *    }
 *
 * @apiParam {String} fullname User's fullname (not mandatory)
 * @apiParam {Date} dateOfBirth User's dateOfBirth (not mandatory)
 * @apiParamExample {json} Input
 *    {
 *      "fullname": "Mario Randrianomearisoa",
 *      "dateOfBirth": "04-30-1997"
 *    }
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "user updated successfully",
 *      "data": {
 *        "_id": "60d07290cef95054ed365729",
 *        "fullname": "Mario Randrianomearisoa",
 *        "dateOfBirth": "1997-04-29T21:00:00.000Z",
 *        "email": "ranjamario@gmail.com"
 *      }
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
 *     HTTP/1.1 401 (Unauthorized) logged out (access token blacklisted)
 *    {
 *      "success": "false",
 *      "message": "you are logged out, please login again"
 *    }
 *
 */

/**
 * @api {get} /api/users/:id 2. Show user's info
 * @apiGroup User Info
 * @apiVersion 1.0.0
 * @apiDescription Request to show single user's info
 *
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {string} data Object with the user's info
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "data": {
 *        "_id": "60d07290cef95054ed365729",
 *        "fullname": "Mario Randrianomearisoa",
 *        "dateOfBirth": "1997-04-29T21:00:00.000Z",
 *        "email": "ranjamario@gmail.com",
 *        "role": "user",
 *        "picture": "https://gravatar.com/avatar/e621f1906ca44fa197b8e09662c60042",
 *        "createdAt": "2021-06-21T11:21:12.984Z",
 *        "updatedAt": "2021-06-21T11:21:12.984Z"
 *      }
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
 *    HTTP/1.1 404 (not found) user not found
 *    {
 *      "success": "false",
 *      "message": "user not found, maybe not registered"
 *    }
 *
 */

/**
 * @api {get} /api/users/all 3. Show all user's info
 * @apiGroup User Info
 * @apiVersion 1.0.0
 * @apiDescription Request to show all user's info
 *
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {string} data Array of Object with the user's info
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "data": [{
 *        "_id": "60d07290cef95054ed365729",
 *        "fullname": "Mario Randrianomearisoa",
 *        "dateOfBirth": "1997-04-29T21:00:00.000Z",
 *        "email": "ranjamario@gmail.com",
 *        "role": "user",
 *        "picture": "https://gravatar.com/avatar/e621f1906ca44fa197b8e09662c60042",
 *        "createdAt": "2021-06-21T11:21:12.984Z",
 *        "updatedAt": "2021-06-21T11:21:12.984Z"
 *      }]
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
 *    HTTP/1.1 404 (not found) user not found
 *    {
 *      "success": "false",
 *      "message": "user not found, maybe not registered"
 *    }
 *
 */

/**
 * @api {delete} /api/users/:id 4. Delete user's accoutn by user
 * @apiGroup User Info
 * @apiVersion 1.0.0
 * @apiDescription Request to delete user's account by the user himself
 *
 * @apiHeader {String} Authorization access-token generated during login or new Token
 * @apiHeaderExample {json} Input
 *    {
 *      "Authorization": "Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc0NzM5LCJleHAiOjE2MjQ4NjY3Mzl9.0Cf_vzs8wwvb3sGg0REFGg7di192QC0cH19X5omdXbk"
 *    }
 *
 * @apiParam {String} password User's current password (mandatory)
 * @apiParam {String} id User's id (mandatory)
 * @apiParamExample {json} Input
 *    {
 *      "password": "Password2"
 *    }
 *
 * @apiSuccess (200) {String} success Status of the request
 * @apiSuccess (200) {String} message message response
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "true",
 *      "message": "user deleted with success",
 *      "data": {
 *        "_id": "60d07290cef95054ed365729",
 *        "fullname": "Mario Randrianomearisoa",
 *        "dateOfBirth": "1997-04-29T21:00:00.000Z",
 *        "email": "ranjamario@gmail.com"
 *      }
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
 *     HTTP/1.1 401 (Unauthorized) logged out (access token blacklisted)
 *    {
 *      "success": "false",
 *      "message": "you are logged out, please login again"
 *    }
 *
 */
