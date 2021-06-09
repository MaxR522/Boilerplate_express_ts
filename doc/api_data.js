define({ "api": [
  {
    "type": "get",
    "url": "/api/logout",
    "title": "4. Logout",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>To logout, it blacklist the access token provided in the header</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>access-token generated during login or new Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Authorization\": \"Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc0NzM5LCJleHAiOjE2MjQ4NjY3Mzl9.0Cf_vzs8wwvb3sGg0REFGg7di192QC0cH19X5omdXbk\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Status of the request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"true\",\n  \"message\": \"user logged out\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 400 (Bad request) Some random error during jwt validation, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 401 (Unauthorized) Already logged out (access token blacklisted)\n{\n  \"success\": \"false\",\n  \"message\": \"you are logged out, please login again\"\n}\n\nHTTP/1.1 401 (Unauthorized) User not registered\n{\n  \"success\": \"false\",\n  \"message\": \"User not registered\"\n}\n\nHTTP/1.1 401 (Unauthorized) Invalid session\n{\n  \"success\": \"false\",\n  \"message\": \"Invalid session\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apiDoc/api_auth.routes.ts",
    "groupTitle": "User",
    "name": "GetApiLogout"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "2. Login",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"mario@gmail.com\",\n  \"password\": \"Mario22\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Status of the request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message response</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User's information saved inside database</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "tokens",
            "description": "<p>object of generated tokens (access_token and refresh token)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"true\",\n  \"message\": \"User logged in successfully\",\n  \"data\": {\n    \"picture\": \"\",\n    \"role\": \"user\",\n    \"_id\": \"60b1e54d0d67fa1a16b4894e\",\n    \"fullname\": \"Mario Randrianomearisoa\",\n    \"email\": \"mario@gmail.com\",\n    \"dateOfBirth\": \"1999-04-29T21:00:00.000Z\",\n    \"createdAt\": \"2021-05-29T06:55:09.554Z\",\n    \"updatedAt\": \"2021-05-29T06:55:09.554Z\",\n  },\n \"tokens\": {\n    \"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc0NzM5LCJleHAiOjE2MjIyNzY1Mzl9.8128o5Mli7wYrGHwyGE8Lrmg7ZnJH48HW_Ag_sSp278\",\n    \"refreshToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc0NzM5LCJleHAiOjE2MjQ4NjY3Mzl9.0Cf_vzs8wwvb3sGg0REFGg7di192QC0cH19X5omdXbk\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 409 (conflict) account registered with Oauth\n{\n  \"success\": \"false\",\n  \"message\": \"Please login using your social creds\"\n}\n\nHTTP/1.1 400 (bad request) some random error, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 422 (unprocessable entity) Missing or wrong param format\n{\n  \"success\": \"false\",\n  \"message\": \"Params error\"\n  \"errors\": []\n}\n\nHTTP/1.1 401 (unauthorized) wrong password or email\n{\n  \"success\": \"false\",\n  \"message\": \"Wrong email or password\"\n}\n\nHTTP/1.1 401 (unauthorized) account not confirmed yet\n{\n  \"success\": \"false\",\n  \"message\": \"email not confirmed\"\n}\n\nHTTP/1.1 404 (not found) user not found\n{\n  \"success\": \"false\",\n  \"message\": \"user not found, maybe not registered\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apiDoc/api_auth.routes.ts",
    "groupTitle": "User",
    "name": "PostApiLogin"
  },
  {
    "type": "post",
    "url": "/api/refresh_token",
    "title": "3. Refresh token",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Generate new access-token when the old access-token expired</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>refresh token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc0NzM5LCJleHAiOjE2MjQ4NjY3Mzl9.0Cf_vzs8wwvb3sGg0REFGg7di192QC0cH19X5omdXbk\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Status of the request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message response</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>new generated access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"true\",\n  \"message\": \"new tokens generated\",\n  \"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc1NzY4LCJleHAiOjE2MjIyNzc1Njh9.Id4cqo3nGhYq3oFQFGXeB-QgCj4bInT4MykovqwSL_0\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 401 (Unauthorized) Some error random error during jwt validation, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 400 (bad request) some random error, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 401 (Unauthorized) Refresh token not stored inside redis database\n{\n  \"success\": \"false\",\n  \"message\": \"Logged out, try to login\"\n}\n\nHTTP/1.1 401 (Unauthorized) Refresh token not the same that the stored inside redis database\n{\n  \"success\": \"false\",\n  \"message\": \"Wrong token, please login\"\n}\n\nHTTP/1.1 401 (Unauthorized) User not registered\n{\n  \"success\": \"false\",\n  \"message\": \"User not registered\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apiDoc/api_auth.routes.ts",
    "groupTitle": "User",
    "name": "PostApiRefresh_token"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "1. Register",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullname",
            "description": "<p>User fullname</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dateOfBirth",
            "description": "<p>User date of birth</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"fullname\": \"Mario Randrianomearisoa\",\n  \"dateOfBirth\": \"04-30-1997\",\n  \"email\": \"mario@gmail.com\",\n  \"password\": \"Mario22\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Status of the request</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message response</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User's information saved inside database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"success\": \"true\",\n  \"message\": \"register success, a confirmation mail was sent into mario@gmail.com,\n  \"data\": {\n    \"picture\": \"https://gravatar.com/avatar/b3e777382401ad75437b74ff9252e5e1\",\n    \"role\": \"user\",\n    \"_id\": \"60b1e54d0d67fa1a16b4894e\",\n    \"fullname\": \"Mario Randrianomearisoa\",\n    \"email\": \"mario@gmail.com\",\n    \"dateOfBirth\": \"1999-04-29T21:00:00.000Z\",\n    \"createdAt\": \"2021-05-29T06:55:09.554Z\",\n    \"updatedAt\": \"2021-05-29T06:55:09.554Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 409 (conflict) Duplicated account\n{\n  \"success\": \"false\",\n  \"message\": \"An account with email: ${_email} is already exists\"\n}\n\nHTTP/1.1 400 (bar request) some random error, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 422 (unprocessable entity) Missing or wrong param format\n{\n  \"success\": \"false\",\n  \"message\": \"Params error\"\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apiDoc/api_auth.routes.ts",
    "groupTitle": "User",
    "name": "PostApiRegister"
  },
  {
    "type": "post",
    "url": "/api/resend_confirmation",
    "title": "6. Resend confirmation email",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Resend confirmation token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"mario@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Status of the request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message response</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>user's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"true\",\n  \"message\": \"A new confirmation email has been sent to: mario@gmail.com\",\n  \"data\": {email: \"mario@gmail.com\"}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 400 (Unauthorized) Some error random error, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 404 (not found) user not registered\n{\n  \"success\": \"false\",\n  \"message\": \"user not found, maybe not registered\"\n}\n\nHTTP/1.1 409 (conflict) account already confirmed\n{\n  \"success\": \"false\",\n  \"message\": \"Your account is already confirmed\"\n}\n\nHTTP/1.1 422 (unprocessable entity) Missing or wrong param format\n{\n  \"success\": \"false\",\n  \"message\": \"Params error\"\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apiDoc/api_auth.routes.ts",
    "groupTitle": "User",
    "name": "PostApiResend_confirmation"
  },
  {
    "type": "post",
    "url": "/api/reset_password",
    "title": "7. Reset password",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Request to reset user's password in case of forgotten password by example</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"mario@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Status of the request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message response</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>User's information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"true\",\n  \"message\": \"A password reset instruction have been sent to the email: mario@gmail.com\",\n  \"data\": {email: \"mario@gmail.com\"}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "\nHTTP/1.1 400 (bad request) some random error, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 422 (unprocessable entity) Missing or wrong param format\n{\n  \"success\": \"false\",\n  \"message\": \"Params error\"\n  \"errors\": []\n}\n\nHTTP/1.1 404 (not found) user not found\n{\n  \"success\": \"false\",\n  \"message\": \"user not found, maybe not registered\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apiDoc/api_auth.routes.ts",
    "groupTitle": "User",
    "name": "PostApiReset_password"
  },
  {
    "type": "post",
    "url": "/api/reset_password/change_password",
    "title": "8. change reset password",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Request to change password after the user request changment</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User new password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"mario@gmail.com\",\n  \"newPassword\": \"MaxR522\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Status of the request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"true\",\n  \"message\": \"Your password was changed successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "\nHTTP/1.1 400 (bad request) some random error, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 422 (unprocessable entity) Missing or wrong param format\n{\n  \"success\": \"false\",\n  \"message\": \"Params error\"\n  \"errors\": []\n}\n\nHTTP/1.1 403 (forbiden) time to allow password change expired\n{\n  \"success\": \"false\",\n  \"message\": \"You are not allowed to perform this action, try to make new request again\"\n}\n\nHTTP/1.1 404 (not found) user not found\n{\n  \"success\": \"false\",\n  \"message\": \"user not found, maybe not registered\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apiDoc/api_auth.routes.ts",
    "groupTitle": "User",
    "name": "PostApiReset_passwordChange_password"
  },
  {
    "type": "post",
    "url": "/api/revoke",
    "title": "5. Revoke refresh token",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Make refresh token invalid</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>refresh token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIxZTU0ZDBkNjdmYTFhMTZiNDg5NGUiLCJlbWFpbCI6Im1hcmlvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIyMjc0NzM5LCJleHAiOjE2MjQ4NjY3Mzl9.0Cf_vzs8wwvb3sGg0REFGg7di192QC0cH19X5omdXbk\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Status of the request</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message response</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>redis response after successfuly delete refresh token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"true\",\n  \"message\": \"Refresh token revoked successfully\",\n  \"data\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 401 (Unauthorized) Some error random error during jwt validation, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 400 (bad request) some random error, specified inside errors property\n{\n  \"success\": \"false\",\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 401 (Unauthorized) Refresh token not stored inside redis database\n{\n  \"success\": \"false\",\n  \"message\": \"Logged out, try to login\"\n}\n\nHTTP/1.1 401 (Unauthorized) Refresh token not the same that the stored inside redis database\n{\n  \"success\": \"false\",\n  \"message\": \"Wrong token, please login\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apiDoc/api_auth.routes.ts",
    "groupTitle": "User",
    "name": "PostApiRevoke"
  }
] });
