'use strict'
//This model class is not a schema in mongoose, just simply a response format for paginated results
module.exports = class PaginatedResults {
        constructor(results, page_cnt, results_cnt, next_page, prev_page, results_start_idx, 
                results_end_idx, hasNextPage, hasPrevPage) {
                    this.results = results;
                    this.page_cnt = page_cnt;
                    this.results_cnt = results_cnt;
                    this.next_page = next_page;
                    this.prev_page = prev_page;
                    this.results_start_idx = results_start_idx;
                    this.results_end_idx = results_end_idx;
                    this.hasNextPage = hasNextPage;
                    this.hasPrevPage = hasPrevPage;
        }
}
