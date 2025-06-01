
cy.request({
  method: 'POST',
  url: '/cart',
  body: { productId: 'abc123', quantity: 2 },
  headers: {
    Authorization: `Bearer ${YOUR_JWT_TOKEN}`
  }
})

describe('Products API', () => {
  it('should get all products', () => {
    cy.request('/products').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should return a product by ID', () => {
    const testId = '665d1e456fd94cc40c11a5c1';                              // using valid ID in DB
    cy.request(`/products/${testId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_id', testId);
    });
  });
});

