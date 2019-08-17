const PaginatedResults = require('../../server/bll/models/paginatedResults');
module.exports.paginateResults = function(results, pageNumber, resultsPerPage){
    var totalResults = results.length - 1;
    var startIndex = 0;
    var endIndex = 0;

    var numberOfPages = Math.ceil(totalResults / resultsPerPage);

    if((pageNumber - 1) != 0 && totalResults > resultsPerPage) {
        startIndex =  (pageNumber - 1) * resultsPerPage + 1
    }
    endIndex = startIndex + resultsPerPage;
    let pagedResults = results.slice(startIndex, endIndex)
    let nextPage = pageNumber + 1;
    let prevPage = pageNumber - 1
    let hasNextPage =  nextPage <= numberOfPages;
    let hasPrevPage = prevPage > 0;
    if(!hasNextPage) {
        nextPage = -1;
    }
    return new PaginatedResults(pagedResults, 
                                numberOfPages,
                                totalResults, 
                                nextPage, 
                                prevPage,
                                startIndex, 
                                endIndex, 
                                hasNextPage,
                                hasPrevPage
                            );
    
}

