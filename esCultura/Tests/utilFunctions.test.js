import {setToken, getToken, simpleFetch} from '../src/utils/utilFunctions';

test("get Token test", () => {
    expect(getToken()).toBe("");
});

test("set token test", () => {
    setToken("tokenTest");
    expect(getToken()).toBe("tokenTest");
})

//representa que es lo que retorna el fetch
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        codi:  20191011001
    })
}))

test("simple fetch get", () => {
    setToken("4399aea952484e30ad0208cd72bf64a083c9b8c4");
    simpleFetch("esdeveniments/?limit=1", "GET", "").then((data) => {
        expect(data.codi).toBe(20191011001);
    });
})


test("simple fetch post", () => {
    setToken("4399aea952484e30ad0208cd72bf64a083c9b8c4");
    simpleFetch("seguiments/", "POST", {
        "seguidor": 1,
        "seguit": 2
    }).then((data) => {
        expect(data.codi).toBe(20191011001);
    });
})

