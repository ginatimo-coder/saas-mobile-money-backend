export class CreateUserDto {
  phoneNumber: string;
  fullName: string;
  pinCode: string; // Le code PIN à 4 ou 6 chiffres choisi par l'utilisateur
}