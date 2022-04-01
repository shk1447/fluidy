module.exports = {
  get: {
    /**
      * Document 리스트를 가져가기 위한 API
      * @route GET /docs/list
      * @group Document - Operations about document
      * @returns {object} 200 - An array of document info
      * @returns {Error}  default - Unexpected error
    */
    list: function(req,res,next) {
      res.status(200).send()
    }
  },
  post: {
    /**
      * Document를 추가하기 위한 API
      * @route GET /docs/add
      * @group Document - Operations about document
      * @returns {object} 200 - An array of document info
      * @returns {Error}  default - Unexpected error
    */
    add: function(req,res,next) {
      res.status(200).send()
    }
  },
  put : {
    /**
      * Document를 수정하기 위한 API
      * @route PUT /docs/modify
      * @group Document - Operations about space
      * @returns {object} 200 - An array of document info
      * @returns {Error}  default - Unexpected error
    */
    modify: function(req,res,next) {
      res.status(200).send()
    }
  },
  delete: {
    /**
      * Document를 삭제하기 위한 API
      * @route DELETE /docs/remove
      * @group Document - Operations about document
      * @returns {object} 200 - An array of document info
      * @returns {Error}  default - Unexpected error
    */
    remove: function(req,res,next) {
      res.status(200).send()
    }
  }
}