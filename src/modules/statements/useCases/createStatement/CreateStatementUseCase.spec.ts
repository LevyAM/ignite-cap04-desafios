import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Create Statements", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able to create a new deposit", async () => {
    enum OperationType {
      DEPOSIT = "deposit",
      WITHDRAW = "withdraw",
    }
    const userDTO: ICreateUserDTO = {
      name: "username",
      email: "email@test.com",
      password: "12345",
    };

    const user = await createUserUseCase.execute(userDTO);

    const statement = await createStatementUseCase.execute({
      user_id: user.id as string,
      description: "deposit test",
      amount: 100,
      type: "deposit" as OperationType,
    });

    expect(statement).toHaveProperty("user_id");
    expect(statement).toHaveProperty("description");
    expect(statement).toHaveProperty("amount");
    expect(statement.amount).toEqual(100);
    expect(statement.description).toEqual("deposit test");
    expect(statement.type).toEqual("deposit test");
  });

  //   it("should not be able to create a user with an already used email", async () => {
  //     await expect(async () => {
  //       await createUserUseCase.execute({
  //         name: "User",
  //         email: "user@test.com",
  //         password: "12345",
  //       });
  //       await createUserUseCase.execute({
  //         name: "User1",
  //         email: "user@test.com",
  //         password: "12345",
  //       });
  //     }).rejects.toBeInstanceOf(AppError);
  //   });
});
