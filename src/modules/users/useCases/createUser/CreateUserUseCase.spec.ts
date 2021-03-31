import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "UserTest",
      email: "user@test.com",
      password: "1234",
    });

    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("password");
    expect(user.name).toEqual("UserTest");
    expect(user.email).toEqual("user@test.com");
  });

  it("should not be able to create an already existing user", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "UserTest",
        email: "user@test.com",
        password: "1234",
      });
      await createUserUseCase.execute({
        name: "UserTest",
        email: "user@test.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
