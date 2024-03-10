class Notification {
    constructor(id, username, password, name, role, gender, id_school) {
      this.id = id;
      this.username = username
      this.password = password
      this.name = name
      this.role = role
      this.gender = gender
      this.id_school = id_school
    }
  
    spread(data) {
      this.id = data.id;
      this.username = data.username
      this.password = data.password
      this.name = data.name
      this.role  = data.role
      this.gender = data.gender
      this.id_school = data.id_school
    }
  }
  
  module.exports = Notification;