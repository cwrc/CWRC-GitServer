const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/app');
const fixtures = require('./fixturesAndMocks/fixtures');
const mocks = require('./fixturesAndMocks/mocks');
const repoFullMocks = require('./fixturesAndMocks/repoFullMocks');
// const prMocks = require('./fixturesAndMocks/prMocks');

chai.should();
chai.use(chaiHttp);

// uncomment the line below to let calls through to Github, and have nock output the results
// to the console, for use in nock.  I've put past nock recordings in /fixturesAndMocks/mocks.js,
//  which nock now returns for calls to GitHub that it intercepts (by virtue of 'requiring' nock
// above.)  See https://github.com/node-nock/nock for full details.
// const nock = require('nock');
// nock.recorder.rec();

describe('CWRCWriter Server Side API', () => {
  // get repo contents using Github recursive option
  describe('GET /repos/:owner/:repo', () => {
    beforeEach(() => {
      mocks.getRepoGetTree();
      mocks.masterBranchSHAs();
    });

    it('returns status code 200', (done) => {
      chai
        .request(server)
        .get(`/github/repos/${fixtures.owner}/${fixtures.testRepo}`)
        .set('cwrc-token', fixtures.githubToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  // get repo contents by 'manually' drilling down through subdirs
  describe('GET github/repos/:owner/:repo/full', () => {
    beforeEach(() => {
      repoFullMocks();
    });

    it('returns status code 200', (done) => {
      chai
        .request(server)
        .get(`/github/repos/${fixtures.owner}/${fixtures.testRepo}/full`)
        .set('cwrc-token', fixtures.githubToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  // get doc
  describe('GET github/repos/${fixtures.owner}/${fixtures.testRepo}/contents', () => {
    beforeEach(() => {
      mocks.getDoc();
    });

    it('returns status code 200', (done) => {
      chai
        .request(server)
        .get(`/github/repos/${fixtures.owner}/${fixtures.testRepo}/contents`)
        .set('cwrc-token', fixtures.githubToken)
        .query({
          branch: 'dev',
          path: 'text.txt',
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  // get repos for given user
  describe('GET github/${fixtures.owner}/repos', () => {
    beforeEach(() => {
      mocks.getReposForGithubUserNock();
    });

    it('returns correctly', (done) => {
      chai
        .request(server)
        .get(`/github/users/${fixtures.owner}/repos`)
        .set('cwrc-token', fixtures.githubToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data[0].owner.login.should.eq(fixtures.owner);
          done();
        });
    });
  });

  // get repos for authenticated user
  describe('GET github/user/repos', () => {
    beforeEach(() => {
      mocks.getReposForAuthenticatedUserNock();
    });

    it('returns correctly', (done) => {
      chai
        .request(server)
        .get('/github/user/repos')
        .set('cwrc-token', fixtures.githubToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data[0].name.should.eq(fixtures.testRepo);
          done();
        });
    });
  });

  // create new repo
  describe.skip('POST /user/repos', () => {
    const data = {
      repo: fixtures.testRepo,
      isPrivate: fixtures.isPrivate,
      description: fixtures.testRepoDescription,
    };

    beforeEach(() => {
      mocks.getCreateGithubRepoNock();
    });

    it('returns correctly', (done) => {
      chai
        .request(server)
        .post('/github/user/repos')
        .set('cwrc-token', fixtures.githubToken)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.owner.should.eq(fixtures.owner);
          res.body.repo.should.eq(fixtures.testRepo);
          done();
        });
    }).timeout(9000);
  });

  // save doc
  describe('PUT github/repos/${fixtures.owner}/${fixtures.testRepo}/doc', () => {
    const data = {
      owner: fixtures.owner,
      repo: fixtures.testRepo,
      content: fixtures.testDoc,
      message: 'some commit message',
      branch: 'dev',
      path: 'text.txt',
    };

    beforeEach(() => {
      mocks.saveDocExistingSHA();
      mocks.saveDoc();
    });

    it('returns correctly', (done) => {
      chai
        .request(server)
        .put(`/github/repos/${fixtures.owner}/${fixtures.testRepo}/doc`)
        .set('cwrc-token', fixtures.githubToken)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.sha.should.exist;
          done();
        });
    });
  });

  // save doc in branch and issue pull request
  // describe.skip('PUT github/repos/${fixtures.owner}/${fixtures.testRepo}/pr', () => {

  // 	const data = {
  // 		owner: fixtures.owner,
  // 		repo: fixtures.testRepo,
  // 		content: fixtures.testDoc,
  // 		message: 'some commit message',
  // 		title: 'a title for the pull request',
  // 		branch: 'dev',
  // 		path: 'text.txt'
  // 	}

  // 	beforeEach( () => {
  // 		prMocks()
  // 	});

  // 	it('returns correctly', (done) => {

  // 		chai.request(server)
  // 			.put(`/github/repos/${fixtures.owner}/${fixtures.testRepo}/pr`)
  // 			.set('cwrc-token', fixtures.githubToken)
  // 			.send(data)
  // 			.end((err, res) => {
  // 				res.should.have.status(200);
  // 				res.body.sha.should.exist
  // 				done();
  // 			});
  // 	}).timeout(9000);
  // });

  // get details for authenticated user
  describe('GET github/users', () => {
    beforeEach(() => {
      mocks.getDetailsForAuthenticatedUserNock();
    });

    it('returns correctly', (done) => {
      chai
        .request(server)
        .get('/github/users')
        .set('cwrc-token', fixtures.githubToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.login.should.eq(fixtures.owner);
          done();
        });
    });
  });

  // search
  describe('GET github/search/code', () => {
    beforeEach(() => {
      mocks.getSearchNock();
    });

    it('returns correctly', (done) => {
      chai
        .request(server)
        .get('/github/search/code')
        .set('cwrc-token', fixtures.githubToken)
        .query({
          q: 'test+repo:lucaju/misc',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.total_count.should.eq(2);
          done();
        });
    });
  });
});
