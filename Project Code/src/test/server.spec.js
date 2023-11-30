const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const pgp = require('pg-promise')();

const dbTest = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const dbt = pgp(dbTest);
const { assert, expect } = chai;

chai.should();
chai.use(chaiHttp);

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', (done) => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });

  it('positive: /login - Login successful', async () => {
    const uniqueUser = `TestUser_${Date.now()}`;
    const registrationRes = await chai
      .request(server)
      .post('/register')
      .send({ username: uniqueUser, password: 'test' });
  
    expect(registrationRes).to.have.status(200);
    expect(registrationRes.body.status).to.equals('success');
    assert.strictEqual(registrationRes.body.message, 'User registered successfully.');
  
    const loginRes = await chai
      .request(server)
      .post('/login')
      .send({ username: uniqueUser, password: 'test' });
  
    expect(loginRes).to.have.status(200);
    expect(loginRes.body.status).to.equals('success');
    assert.strictEqual(loginRes.body.message, 'Welcome!');
  
    await dbt.none('DELETE FROM users WHERE username = $1', [uniqueUser]);
  });
  
  // it('negative: /login - User not found', async () => {
  //   const nonExistentUser = `NonExistentUser_${Date.now()}`;
  //   const response = await chai
  //     .request(server)
  //     .post('/login')
  //     .send({ username: nonExistentUser, password: 'password' });
  
  //   expect(response).to.have.status(400);
  //   expect(response.body.status).to.equals('error');
  //   assert.strictEqual(response.body.error, 'Incorrect username or password. If you do not have an account, please register.');
  // });
  it('negative: /login - User not found', async () => {
    const nonExistentUser = `NonExistentUser_${Date.now()}`;
    const response = await chai
      .request(server)
      .post('/login')
      .send({ username: nonExistentUser, password: 'password' });
  
    expect(response).to.have.status(400);
    expect(response.body.status).to.equals('error');
    // expect(response.body.message).to.equals('Incorrect username or password. If you do not have an account, please register.');
    expect(response.body.redirect).to.equals('/register'); // Check for relative redirect
  });
  
  it('positive: /register - Successful registration', async () => {
    const uniqueUser = `TestUser_${Date.now()}`;
    const response = await chai
      .request(server)
      .post('/register')
      .send({ username: uniqueUser, password: 'test' });
  
    expect(response).to.have.status(302);
    expect(response.body.status).to.equals('success');
    assert.strictEqual(response.body.message, 'User registered successfully.');
  
    await dbt.none('DELETE FROM users WHERE username = $1', [uniqueUser]);
  });
  
  it('negative: /register - Duplicate username', async () => {
    const duplicateUser = 'DuplicateUser';
    // Register the user once
    const firstRegistration = await chai
      .request(server)
      .post('/register')
      .send({ username: duplicateUser, password: 'password' });
  
    const secondRegistration = await chai
      .request(server)
      .post('/register')
      .send({ username: duplicateUser, password: 'password' });
  
    expect(secondRegistration).to.redirect('/login');
    expect(secondRegistration.body.status).to.equals('error');
    assert.strictEqual(secondRegistration.body.message, 'Registration failed. Username already exists.');
  
    await dbt.none('DELETE FROM users WHERE username = $1', [duplicateUser]);
    });

});
  