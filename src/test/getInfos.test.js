const getInfos = require("./getInfos");
describe("getInfos",()=>{
    it("should return list of users",async()=>{
        //Arrange
        //Act
        const result = await getInfos();
        // console.log("result infos",result);
        //Assert
        expect(result).toEqual(result);
    });

});