
module.exports = removeDuplicateURLs = (objectsArray)=> {
    // Create an object to keep track of seen URLs
    const seenURLs = {};
    // Filter out objects with duplicate URLs
    return objectsArray.filter(obj => {
        if (!seenURLs[obj['Map Url']]) {
            // If URL hasn't been seen, mark it as seen and keep the object
            seenURLs[obj['Map Url']] = true;
            return true;
        }
        // If URL has been seen, discard the object
        return false;
    });
}