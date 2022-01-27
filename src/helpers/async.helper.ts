export const asyncForEach = async (array, callback) => {
    // let data = {};
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index);
    }
};