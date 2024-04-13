
module.exports = removeDuplicateURLs = (objectsArray)=> {
    const seenURLs = {};
    return objectsArray.filter(obj => {
        if (!seenURLs[obj['Map Url']]) {
            seenURLs[obj['Map Url']] = true;
            return true;
        }
        return false;
    });
}