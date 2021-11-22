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

    // Logged in as an Admin User
    const { token: adminToken } = user.body.data;
    const response = await request
      .post('/categories/')
      .set('Authorization', adminToken)
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
  
    const { token: adminToken } = user.body.data;
    const category = await request
      .post('/categories/')
      .set('Authorization', adminToken)
      .set('Content-Type', 'application/json')
      .send(categoryMock.fullDetails)
      ;
    const categoryId = category.body.data._id

    const response = await request
      .put('/categories/' + categoryId)
      .set('Authorization', adminToken)
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
  
    const { token: adminToken } = user.body.data;
    const category = await request
      .post('/categories/')
      .set('Authorization', adminToken)
      .set('Content-Type', 'application/json')
      .send(categoryMock.fullDetails)
      ;
      const categoryId = category.body.data._id

    const res = await request
      .delete('/categories/' + categoryId)
      .set('Authorization', adminToken)
      ;
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Category deleted");
  })
})
