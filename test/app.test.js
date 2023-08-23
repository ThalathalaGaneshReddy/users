let chai = require("chai")
let chaiHttp = require("chai-http")
let expect = chai.expect;

chai.use(chaiHttp)

describe("testing api",()=>{
    it("should return 200 for health",(done)=>{
        chai.request("http://localhost:4444")
        .get("/")
        .then((res)=>{
            expect(res).to.have.status(200)
            done()
        })
        .catch((error)=>{
            throw error
        })
    })
    it("should return 200 for add user",(done)=>{
        chai.request("http://localhost:4444")
        .post("/addUser")
        .send({"name":"test user","email":"test@gmail.com","phone":"12345678"})
        .then((res)=>{
            expect(res).to.have.status(200)
            done()
        })
        .catch((error)=>{
            throw error
        })
    })
})


 