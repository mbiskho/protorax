class JsonResponse {
    constructor(status, data, message) {
      this.status = status;
      this.data = data;
      this.message = message;
    }
  
    send(res) {
      res.json({
        status: this.status,
        data: this.data,
        message: this.message,
      });
    }
  }
  
  module.exports = JsonResponse;
  