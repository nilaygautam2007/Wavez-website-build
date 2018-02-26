'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var kryptxCtrlStub = {
  index: 'kryptxCtrl.index',
  show: 'kryptxCtrl.show',
  create: 'kryptxCtrl.create',
  update: 'kryptxCtrl.update',
  destroy: 'kryptxCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var kryptxIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './kryptx.controller': kryptxCtrlStub
});

describe('Kryptx API Router:', function () {

  it('should return an express router instance', function () {
    expect(kryptxIndex).to.equal(routerStub);
  });

  describe('GET /api/kryptxs', function () {

    it('should route to kryptx.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'kryptxCtrl.index')).to.have.been.calledOnce;
    });
  });

  describe('GET /api/kryptxs/:id', function () {

    it('should route to kryptx.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'kryptxCtrl.show')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/kryptxs', function () {

    it('should route to kryptx.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'kryptxCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/kryptxs/:id', function () {

    it('should route to kryptx.controller.update', function () {
      expect(routerStub.put.withArgs('/:id', 'kryptxCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/kryptxs/:id', function () {

    it('should route to kryptx.controller.update', function () {
      expect(routerStub.patch.withArgs('/:id', 'kryptxCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/kryptxs/:id', function () {

    it('should route to kryptx.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'kryptxCtrl.destroy')).to.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
