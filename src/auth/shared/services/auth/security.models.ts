export interface userCredentials{
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  email: string,
  phonenumber: string,
  roles: [],


}

export interface authenticationResponse{
  id: string;
  token: string;
}

export interface userDTO{
  username: string;
  password: string;
}

export interface mealDto {
  name: string,
  ingredients: string[]
}
export interface mealsDto {
  name: string,
  ingredients: ingredientsDto[]
}
export interface  ingredientsDto{
  name: string
}
