'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var registrationCtrlStub = {
  index: 'registrationCtrl.index',
  show: 'registrationCtrl.show',
  create: 'registrationCtrl.create',
  update: 'registrationCtrl.update',
  destroy: 'registrationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var registrationIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './registration.controller': registrationCtrlStub
});

describe('Registration API Router:', function () {

  it('should return an express router instance', function () {
    expect(registrationIndex).to.equal(routerStub);
  });

  describe('GET /api/registrations', function () {

    it('should route to registration.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'registrationCtrl.index')).to.have.been.calledOnce;
    });
  });

  describe('GET /api/registrations/:id', function () {

    it('should route to registration.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'registrationCtrl.show')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/registrations', function () {

    it('should route to registration.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'registrationCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/registrations/:id', function () {

    it('should route to registration.controller.update', function () {
      expect(routerStub.put.withArgs('/:id', 'registrationCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/registrations/:id', function () {

    it('should route to registration.controller.update', function () {
      expect(routerStub.patch.withArgs('/:id', 'registrationCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/registrations/:id', function () {

    it('should route to registration.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'registrationCtrl.destroy')).to.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
