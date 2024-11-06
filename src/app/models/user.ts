export class User {
  Id_Usuario: number;
  Username: string;
  Email: string;
  Password: string;

  constructor(
    Id_Usuario: number,
    Username: string,
    Email: string,
    Password: string,
  ) {
    this.Id_Usuario = Id_Usuario;
    this.Username = Username;
    this.Email = Email;
    this.Password = Password;
  }
}
