// fetches all products and one by ID (requires manual ID input)

describe('Product API', () => {
  it('should retrieve all products', () => {
    cy.request('/products').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
    });
  });

  it('should retrieve a single product by ID', () => {
    const testProductId = '665d1e456fd94cc40c11a5c1';                              // using valid product ID in DB
    cy.request(`/products/${testProductId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('_id', testProductId);
    });
  });
});
