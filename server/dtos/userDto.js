class UserDto {
  email;
  id;
  role;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.role = model.role.join(",");
    this.isActivated = model.isActivated;
  }
}

module.exports = UserDto;
