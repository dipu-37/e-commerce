


class QueryBuilder {
    constructor(modelQuery, query) {
      this.modelQuery = modelQuery;
      this.query = query;
    }
  
    search(SearchableField) {
      const searchTerm = this?.query?.searchTerm;
      if (searchTerm) {
        this.modelQuery = this.modelQuery.find({
          $or: SearchableField.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
          })),
        });
      }
      return this;
    }
  
    filter() {
      const queryObj = { ...this.query };
      const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
      excludeFields.forEach((element) => {
        delete queryObj[element];
      });
  
      this.modelQuery = this.modelQuery.find(queryObj);
      return this;
    }
  
    sort() {
      const sort = this?.query?.sort || "-createdAt";
      this.modelQuery = this.modelQuery.sort(sort);
      return this;
    }
  
    paginate() {
      const page = Number(this?.query?.page) || 1;
      const limit = Number(this?.query?.limit) || 10;
      const skip = (page - 1) * limit;
  
      this.modelQuery = this.modelQuery.skip(skip).limit(limit);
      return this;
    }
  
    fields() {
      const fields = (this.query?.fields)?.split(',')?.join(' ') || "-__v";
      this.modelQuery = this.modelQuery.select(fields);
      return this;
    }
  
    async countTotal() {
      const totalQueries = this.modelQuery.getFilter();
      const total = await this.modelQuery.model.countDocuments(totalQueries);
      const page = Number(this?.query?.page) || 1;
      const limit = Number(this?.query?.limit) || 10;
      const totalPage = Math.ceil(total / limit);
  
      return {
        page,
        limit,
        total,
        totalPage,
      };
    }
  }
  
  export default QueryBuilder;
  