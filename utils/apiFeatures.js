class APIFeatures {
    constructor(query, queryString) { // it means we just created new variables here for this class
        this.query = query; // asign queries to query(Mongoose) variable
        this.queryString = queryString; // asign queries to queryString variable which came from express req
    }

    // Create one method for each Functionalities
    filter() {
        // 1A) Filtering
        // const queryObj = { ...req.query }; // req.query is not availble for this class, so we pass queryString
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]) // remind me: take a look how does it works
        // console.log(req.query, queryObj);

        // 1B) Advance Filtering
        let queryStr = JSON.stringify(queryObj);

        // there are a couple of way to do that but we use a reguler exprestion
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        // let query = Tour.find(JSON.parse(queryStr));
        return this; // it will return whole obj
    }

    sort() {
        // 2) Sorting 
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        //3) Fields Limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v')
        }

        return this;
    }

    paginate() {
        // 4) Pagination
        const page = this.queryString.page * 1 || 1; // page num 1 By Default
        const limit = this.queryString.limit * 1 || 100; // 100 result By Default
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;