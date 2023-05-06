import {setToken, getToken, simpleFetch} from '../src/utils/utilFunctions';

test("get Token test", () => {
    expect(getToken()).toBe("");
});

test("set token test", () => {
    setToken("tokenTest");
    expect(getToken()).toBe("tokenTest");
})



