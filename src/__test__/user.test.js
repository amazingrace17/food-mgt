import supertest from 'supertest';

import app from '../server.js';
import * as dbMock from './__utils/testDb.js';
import userMock from './__utils/userMock.js';

const request = supertest(app);

beforeAll(async () => {
  await dbMock.connect();
  jest.setTimeout(30000);
});
afterEach(async () => {
  await dbMock.clearDatabase();
  jest.setTimeout(30000);
});
afterAll(async () => await dbMock.disconnectDB());

// USER REGISTRATION
describe("POST /users/register", () => {
  describe("user registration is successful", () => {
    it("when registration succeeds", async () => {
      const response = await request
                              .post('/users/register')
                              .set('Content-Type', 'application/json')
                              .send(userMock.completeData)
                              ;
                              
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("user registration successful");
      expect(response.body.data).toHaveProperty("username");
      expect(response.body.data).toHaveProperty("email");
      expect(response.body.data).toHaveProperty("phone");
      expect(response.body.data).toHaveProperty("role"); 
    })
  })

  describe("user registration fails", () => {

    it("when a required field is not filled", async () => {
      const response = await request
                              .post('/users/register')
                              .set('Content-Type', 'application/json')
                              .send(userMock.incompleteRequiredData);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("failed");
      expect(response.body.message).toBe("username field is required");
    })

    it("when given passwords don't match", async () => {
      const response = await request
                              .post('/users/register')
                              .set('Content-Type', 'application/json')
                              .send(userMock.diffPasswords);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("failed");
      expect(response.body.message).toBe("Passwords do not match");
    })

    it("when user already exists in the db", async () => {
      // First register user to simulate existing account
      await request.post('/users/register')
                   .set('Content-Type', 'application/json')
                   .send(userMock.completeData);

      // Trying to register again with same email
      const response = await request
                              .post('/users/register')
                              .set('Content-Type', 'application/json')
                              .send(userMock.completeData);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("failed");
      expect(response.body.message).toBe("username 'johndoe' is taken or a user with email 'johndoe@test.com' already exists");
    })
  })
})

// LOGIN
describe("POST /users/login", () => {
  describe("user login is successful", () => {
    it("when user login succeeds", async () => {
      // Register new user
      await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              // Login attempt on creating account
              const response = await request
                          .post('/users/login')
                          .set('Content-Type', 'application/json')
                          .send(userMock.loginData);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("login successful");
      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data.token).toMatch("Bearer");
    })
  })

  describe("user LOGIN fails", () => {
    it("when required fields aren't filled", async () => {
      // Register new user
      await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              // Login attempt on creating account
              const response = await request
                              .post('/users/login')
                              .set('Content-Type', 'application/json')
                              .send(userMock.incompleteLoginData)
      
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("failed");
      expect(response.body.message).toBe("enter your email/username and password!");
    })

    it("when given email doesn't exist in db", async () => {
      const response = await request
                              .post('/users/login')
                              .set('Content-Type', 'application/json')
                              .send(userMock.incorrectLoginEmail);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("failed");
      expect(response.body.message).toBe("record not found");
      // expect(response.body.message).toBe("Email or password incorrect");
    });

    it("when given password doesn't match user's in the db", async () => {
      // First register user to simulate existing account
      await request.post('/users/register')
                  .set('Content-Type', 'application/json')
                  .send(userMock.completeData);

                  // Login attempt with different password
                  const loginResponse = await request
                              .post('/users/login')
                              .set('Content-Type', 'application/json')
                              .send(userMock.incorrectLoginPassword);

      expect(loginResponse.statusCode).toBe(400);
      expect(loginResponse.body.status).toBe("failed");
      expect(loginResponse.body.message).toBe("incorrect email/username or password");
    })
  })
})

// VERIFY USER ACCOUNT BY VERIFICATION TOKEN
describe("POST /users/:id/verify/:token", () => {
  describe("account verification successful", () => {
    it("when token and userID are correct", async () => {
      // Register new user
      const user = await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);
              const { id: userId, verifyToken } = user.body.data;
              
              // Verify account
              const response = await request
                      .post('/users/'+ userId +'/verify/'+ verifyToken )
                      .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toHaveProperty("isVerified");
      expect(response.body.data.isVerified).toBe(true);
      expect(response.body.data.verifyToken).toBe('');
    })
  })

  describe("account verification by token fails", () => {
    it("when token is invalid", async () => {
      // Register new user
      const user = await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              const { id: userId } = user.body.data;
              const invalidToken = 'a9d5f8758af261aa6a733a7c0faace451b035fac2e0b9bae4955e8622128ff18';
              
              // Verify account
              const response = await request
                      .post('/users/'+ userId +'/verify/'+ invalidToken )
                      .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(405);
      expect(response.body.status).toBe("failed");
      expect(response.body.message).toBe("invalid verification token");
    })

    it("when user is not found", async () => {
      // Register new user
      const user = await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              const { id: userId, verifyToken } = user.body.data;
              const invalidUserId = '617a87af301413934bb0fe62';
      
              // Verify account
              const response = await request
                      .post('/users/'+ invalidUserId +'/verify/'+ verifyToken )
                      .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("failed");
      expect(response.body.message).toBe("user not found");
    })

    it("when user is already verified", async () => {
      // Register new user
      const user = await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              const { id: userId, verifyToken } = user.body.data;
              
              // Verify account
              await request
                      .post('/users/'+ userId +'/verify/'+ verifyToken )
                      .set('Content-Type', 'application/json');
              
              // Re-Verify account
              const response = await request
                      .post('/users/'+ userId +'/verify/'+ verifyToken )
                      .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(410);
      expect(response.body.status).toBe("failed");
      expect(response.body.message).toBe("invalid token: user is already verified");
    })
    
  })
})


// USER PROFILE
describe("GET /users/:id", () => {
  describe("can access user profile", () => {
    it("when email login succeeds", async () => {
      // Register new user
      const newUser = await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);
              
              const { id: userId, verifyToken } = newUser.body.data;
      
              // Verify account
              const verifiedUser = await request
                      .post('/users/'+ userId +'/verify/'+ verifyToken )
                      .set('Content-Type', 'application/json');

              // Login attempt on creating account
              const user = await request
                                  .post('/users/login')
                                  .set('Content-Type', 'application/json')
                                  .send(userMock.loginData);
              const { _id, token } = user.body.data;
              
              const response = await request
                                .get('/users/' + _id)
                                .set('Authorization', token)

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body).toHaveProperty("data");
    })

    it("when username login succeeds", async () => {
      // Register new user
      const newUser = await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);
              const { id: userId, verifyToken } = newUser.body.data;
      
              // Verify account
              const verifiedUser = await request
                      .post('/users/'+ userId +'/verify/'+ verifyToken )
                      .set('Content-Type', 'application/json');

              // Login attempt on creating account
              const user = await request
                          .post('/users/login')
                          .set('Content-Type', 'application/json')
                          .send(userMock.usernameLoginData);
                          
              const { _id: id, token } = user.body.data;

              const response = await request
                                .get('/users/' + id)
                                .set('Authorization', token)
          
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body).toHaveProperty("data");
    })
  })

  describe("can not access user profile", () => {
    it("when there is incomplete login data", async () => {
      // Register new user
      await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              // Login attempt on creating account
              const user = await request
                                  .post('/users/login')
                                  .set('Content-Type', 'application/json')
                                  .send(userMock.incompleteLoginData);

              // const { username, token } = user.body.data;

              const response = await request
                                .get('/users/username')
                                .set('Authorization', 'token')
          
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("failed");
    })
    
    it("when there is incorrect password", async () => {
      // Register new user
      await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              // Login attempt on creating account
              const user = await request
                                .post('/users/login')
                                .set('Content-Type', 'application/json')
                                .send(userMock.incorrectLoginPassword);

              // const { username, token } = user.body.data;

              const response = await request
                                .get('/users/username')
                                .set('Authorization', 'token')
          
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("failed");
    })
    
    it("when there is incorrect email", async () => {
      // Register new user
      await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              // Login attempt on creating account
              const user = await request
                            .post('/users/login')
                            .set('Content-Type', 'application/json')
                            .send(userMock.incorrectLoginEmail);

              // const { username, token } = user.body.data;

              const response = await request
                                .get('/users/username')
                                .set('Authorization', 'token')
          
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("failed");
    })
    
    it("when there is incomplete username login data", async () => {
      // Register new user
      await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              // Login attempt on creating account
              const user = await request
                        .post('/users/login')
                        .set('Content-Type', 'application/json')
                        .send(userMock.incompleteUsernameLoginData);

              const response = await request
                        .get('/users/username')
                        .set('Authorization', 'token')
  
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("failed");
    })
      
    it("when there is incorrect username password", async () => {
        // Register new user
        await request
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(userMock.completeData);

            // Login attempt on creating account
            const user = await request
                      .post('/users/login')
                      .set('Content-Type', 'application/json')
                      .send(userMock.incorrectUsernameLoginPassword);

            const response = await request
                      .get('/users/username')
                      .set('Authorization', 'token')

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe("failed");
    })

    it("when there is incorrect username", async () => {
      // Register new user
      await request
              .post('/users/register')
              .set('Content-Type', 'application/json')
              .send(userMock.completeData);

              // Login attempt on creating account
              const user = await request
                      .post('/users/login')
                      .set('Content-Type', 'application/json')
                      .send(userMock.incorrectLoginUsername);

              const response = await request
                      .get('/users/username')
                      .set('Authorization', 'token')

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("failed");
    })
  })
})
