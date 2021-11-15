import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from './__utils/testDb.js';
import subCategoryMock from './__utils/subCategoryMock.js';
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

describe('GET /subcategories/', () => {
  it('should get a list of categories', async () => {

    const { token } = user.body.data;
    const response = await request
      .get('/subcategories/')
      .set('Authorization', token)
      ;
    const subcategoryId = response.body.data;
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Subcategories retrieved');
    expect(response.body).toHaveProperty("data");
  });
})

describe('GET /subcategories/:id', () => {
  it('should get a single subcategory', async () => {

    const { token } = user.body.data;
    const response = await request
      .get('/subcategories/')
      .set('Authorization', token)
      ;
    const subcategoryId = response.body.data;
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Subcategories retrieved');
    expect(response.body).toHaveProperty("data");
  });
})

describe("POST /subcategories/", () => {
  it("should add a new subcategory", async () => {

    // Logged in as an Admin User
    const { token: adminToken } = user.body.data;
    const response = await request
      .post('/subcategories/')
      .set('Authorization', adminToken)
      .set('Content-Type', 'application/json')
      .send(subCategoryMock.fullDetails)
      ;
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Subcategory added successfully");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("description");
  })
})

describe("PUT /subcategories/:id", () => {
  it("should update a subcategory", async () => {
  
    const { token: adminToken } = user.body.data;
    const subcategory = await request
      .post('/subcategories/')
      .set('Authorization', adminToken)
      .set('Content-Type', 'application/json')
      .send(subCategoryMock.fullDetails)
      ;
    const subcategoryId = subcategory.body.data._id

    const response = await request
      .put('/subcategories/' + subcategoryId)
      .set('Authorization', adminToken)
      .set('Content-Type', 'application/json')
      .send(subCategoryMock.updatedDetails)
      ;
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("Success");
    expect(response.body.message).toBe("Subcategory updated successfully");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data.name).toBe(subCategoryMock.updatedDetails.name);
    expect(response.body.data.description).toBe(subCategoryMock.updatedDetails.description);
  })
})
    
describe ("DELETE /subcategories/:id", () => {
  it('should delete a subcategory', async ()=>{
  
    const { token: adminToken } = user.body.data;
    const subcategory = await request
      .post('/subcategories/')
      .set('Authorization', adminToken)
      .set('Content-Type', 'application/json')
      .send(subCategoryMock.fullDetails)
      ;
      const subcategoryId = subcategory.body.data._id

    const res = await request
      .delete('/subcategories/' + subcategoryId)
      .set('Authorization', adminToken)
      ;
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Subcategory deleted");
  })
})
