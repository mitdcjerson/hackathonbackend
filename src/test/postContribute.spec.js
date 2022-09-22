const postContribute = require("./postContribute");

describe("postContribute",()=>{
    xit("should return 1 if post contribute created",async()=>{
        //Arrange
        const info = { 
            text: "Bong bong marco is vice president", 
            type: 0
        };
        //Act
        const result = await postContribute(info);
        // console.log("result posts",result);
        //Assert
        expect(result).toStrictEqual({ text: 'Bong bong marco is vice president', result: "FAKE" });
    });

});