/**
 * @api {post} /api/users/info 10. Update user's info
 * @apiGroup User
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
