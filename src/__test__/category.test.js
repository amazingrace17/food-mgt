import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from './__utils/testDb.js';
import categoryMock from './__utils/categoryMock.js';
import userMock from './__utils/userMock.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());

let user = 
beforeEach(async () => {
  const newUser = await request
    .post('/users/register')
    .set('Content-Type', 'application/json')
    .send(userMock.completeData)
    ;
    // console.log('newUser.body.data', newUser.body.data);
  
  const { id: userId, verifyToken } = newUser.body.data;

  // Verify account
  const verifiedUser = await request
    .post('/users/'+ userId +'/verify/'+ verifyToken )
    .set('Content-Type', 'application/json')
    ;
    const { _id: verifiedUserId } = verifiedUser.body.data;
    // console.log(verifiedUserId, 'verifiedUser.body.data', verifiedUser.body.data);

  // Login attempt on creating account
  user = await request
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .send(userMock.loginData)
    ;
    // console.log(user.body.data);

  return user;
});

describe('GET /categories/', () => {
  it('should get a list of categories', async () => {
    const { token } = user.body.data;
    const response = await request
      .get('/categories/')
      .set('Authorization', token)
      ;
    const categoryId = response.body.data;
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Categories retrieved');
    expect(response.body).toHaveProperty("data");
  });
})

describe('GET /categories/:id', () => {
  it('should get a single category', async () => {

    const { token } = user.body.data;
    const response = await request
      .get('/categories/')
      .set('Authorization', token)
      ;
    const categoryId = response.body.data;
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Categories retrieved');
    expect(response.body).toHaveProperty("data");
  });
})

describe("POST /categories/", () => {
  it("should add a new category", async () => {
    // // Make 'user' an Admin User
    // user.body.data.role = 'admin';

    // // Create a new Admin User
    // let admUser = await request
    //   .post('/users/register')
    //   .set('Content-Type', 'application/json')
    //   .send({
    //     _id: "617a814139e6234bb0f7af30",
    //     username: "admuser",
    //     firstname: "User",
    //     lastname: "Admin",
    //     email: "admuser@test.com",
    //     phone: "07078923456",
    //     password: "admuser123",
    //     confirmPassword: "admuser123",
    //     role: "normal",
    //   })
    //   ;
    //   console.log('admUser.body.data', admUser.body.data);

    // const { id: admUserId, verifyToken } = admUser.body.data;

    // // Verify account
    // const verifiedAdminUser = await request
    //   .post('/users/'+ admUserId +'/verify/'+ verifyToken )
    //   .set('Content-Type', 'application/json')
    //   ;
    //   const { _id: verifiedAdminUserId } = verifiedAdminUser.body.data;
    //   console.log(verifiedAdminUserId, 'verifiedAdminUser.body.data', verifiedAdminUser.body.data);

    // // Update to Admin User
    // updatedAdmUser = await request
    //   .put('/admins/new/'+ verifiedUserId )
    //   .set('Content-Type', 'application/json')
    //   ;
    //   console.log('updatedAdmUser.body.data', updatedAdmUser.body.data);
    //   console.log(admUserId, verifiedUserId, updatedAdmUser.body.data);

    // // Login attempt on creating account
    // admUser = await request
    //   .post('/users/login')
    //   .set('Content-Type', 'application/json')
    //   .send({
    //     email: 'admuser',// 'admuser@test.com',
    //     password: 'admuser123'
    //   })
    //   ;
    //   console.log(admUser.body.data);

    //   //...
    // const { token } = admUser.body.data;
    
    const { token } = user.body.data;
    const response = await request
      .post('/categories/')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(categoryMock.fullDetails)
      ;
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Category added successfully");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("description");
  })
})

describe("PUT /categories/:id", () => {
  it("should update a category", async () => {
  
    const { token } = user.body.data;
    const category = await request
      .post('/categories/')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(categoryMock.fullDetails)
      ;
    const categoryId = category.body.data._id

    const response = await request
      .put('/categories/' + categoryId)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(categoryMock.updatedDetails)
      ;
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("Success");
    expect(response.body.message).toBe("Category updated successfully");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data.name).toBe(categoryMock.updatedDetails.name);
    expect(response.body.data.description).toBe(categoryMock.updatedDetails.description);
  })
})
    
describe ("DELETE /categories/:id", () => {
  it('should delete a category', async ()=>{
  
    const { token } = user.body.data;
    const category = await request
      .post('/categories/')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(categoryMock.fullDetails)
      ;
      const categoryId = category.body.data._id

    const res = await request
      .delete('/categories/' + categoryId)
      .set('Authorization', token)
      ;
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Category deleted");
  })
})
