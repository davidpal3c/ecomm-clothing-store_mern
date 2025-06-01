// covers user registration and login

describe('Auth API', () => {
  it('should register a new user', () => {
    cy.request('POST', '/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('token');
    });
  });

  it('should login an existing user', () => {
    cy.request('POST', '/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token');
    });
  });
});