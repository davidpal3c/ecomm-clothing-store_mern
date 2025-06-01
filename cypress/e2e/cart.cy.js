// tests cart add functionality (requires login and product ID)

describe('Cart API', () => {
  let token;
  let productId = 'existing-product-id';                                // use valid product ID

  before(() => {
    // login and get token
    cy.request('POST', '/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    }).then((res) => {
      token = res.body.token;
    });
  });

  it('should add a product to the cart', () => {
    cy.request({
      method: 'POST',
      url: '/cart',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        productId: productId,
        quantity: 1
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});