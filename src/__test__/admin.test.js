import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from './__utils/testDb.js';
import adminMock from './__utils/adminMock.js';
import userMock from './__utils/userMock.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());

let user = 
beforeEach(async () => {

  // Register User as AN ADMIN
  userMock.completeData.role = 'admin';
  const newUser = await request
    .post('/users/register')
    .set('Content-Type', 'application/json')
    .send(userMock.completeData)
    ;
  const { id: userId, verifyToken } = newUser.body.data;

  // Verify Account
  const verifiedUser = await request
    .post('/users/'+ userId +'/verify/'+ verifyToken )
    .set('Content-Type', 'application/json')
    ;

  // Log Into Account
  user = await request
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .send(userMock.loginData)
    ;

  return user;
});

describe("POST /admins/new/:id", () => {
  it("should add a new admin", async () => {
    // Logged in as an Admin User
    const { token: adminToken } = user.body.data;

    // Create a new Admin User
    let admUser = await request
      .post('/users/register')
      .set('Content-Type', 'application/json')
      .send(adminMock.completeData)
      ;
    const { id: admUserId, verifyToken } = admUser.body.data;

    // Verify account
    const verifiedAdminUser = await request
      .post('/users/'+ admUserId +'/verify/'+ verifyToken )
      .set('Content-Type', 'application/json')
      ;
      const { _id: verifiedAdminUserId } = verifiedAdminUser.body.data;

    // Update to Admin User
    const response = await request
      .put('/admins/new/'+ verifiedAdminUserId )
      .set('Authorization', adminToken)
      .set('Content-Type', 'application/json')
      ;
    
    const firstName = adminMock.completeData.firstname;
    const lastName = adminMock.completeData.lastname;
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe(firstName +" "+ lastName +" is now an ADMIN");
    expect(response.body.data).toHaveProperty("role");
    expect(response.body.data.isVerified).toBe(true);
    expect(response.body.data.role).toBe("admin");
  })
})
