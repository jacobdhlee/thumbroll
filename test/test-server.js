var chai = require('chai');
var chaiHttp = require('chai-http');
var server = 'http://localhost:3000';
var expect = require('chai').expect;

chai.use(chaiHttp);

describe('Thumbroll', function(){
  it('should list all classes for teacher id 1', function(done){
    chai.request(server)
    .get('/teachers/classes/1')
    .end(function(err,res){
      expect(res).to.have.status(200);
      expect(res.body[2].name).to.deep.equal("Postmodern Gender Theory")
      expect(err).to.be.null;
      done();
    })
  })
})

describe('Thumbroll', function(){
  it('should list all lessons for class id 4', function(done){
    chai.request(server)
    .get('/classes/lessons/4')
    .end(function(err,res){
      expect(res).to.have.status(200);
      expect(res.lesson).to.deep.equal();
      expect(err).to.be.null;
      done();
    })
  })
})

describe('Thumbroll', function(){
  it('should list of poll for lesson id 3', function(done){
    chai.request(server)
    .get('/lessons/3/polls')
    .end(function(err,res){
      console.log(res.body[1])
      expect(res).to.have.status(200);
      expect(res.body[0].type).to.deep.equal('multiChoice');
      expect(res.body[1].type).to.deep.equal('thumbs');
      expect(err).to.be.null;
      done();
    })
  })
})

describe('Thumbroll', function(){
  it('should list class for student id 1', function(done){
    chai.request(server)
    .get('/students/classes/1')
    .end(function(err,res){
      var classes = res.body[0].class
      expect(res).to.have.status(200);
      expect(classes.name).to.deep.equal('CS101');
      expect(err).to.be.null;
      done();
    })
  })
})
// teachers/polls/:lessonId

describe('Thumbroll', function(){
  it('should list class for student id 1', function(done){
    chai.request(server)
    .get('/teachers/polls/3')
    .end(function(err,res){
      expect(res).to.have.status(200);
      expect(res.body[0].type).to.deep.equal('multiChoice');
      expect(res.body[1].type).to.deep.equal('thumbs');
      expect(err).to.be.null;
      done();
    })
  })
})

describe('Thumbroll', function(){
  it('should list lesson for class id 3', function(done){
    chai.request(server)
    .get('/teachers/classes/3/lessons')
    .end(function(err,res){
      expect(res).to.have.status(200);
      expect(res.body[0].name).to.deep.equal('Week 1 - Ancient Egypt');
      expect(res.body[1].name).to.deep.equal('Week 2 - Mongols');
      expect(err).to.be.null;
      done();
    })
  })
})

