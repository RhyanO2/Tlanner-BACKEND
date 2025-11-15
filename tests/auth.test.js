// import { describe, it, expect, vi } from "vitest";
// import userModel from "../src/models/authModel";

// vi.mock("../src/config/database", () => {
//   return {
//     default: {
//       query: vi.fn(),
//     },
//   };
// });

// describe("RegisterUser", () => {
//   it("deve registrar um usuário corretamente", async () => {
//     const db = (await import("../src/config/database")).default;
//     db.query.mockResolvedValue([{ affectedRows: 1 }]);

//     const result = await userModel.RegisterUser({
//       name: "Rhyan",
//       email: "teste@teste.com",
//       password: "123"
//     });

//     expect(result).toBe("Usuário Criado!");
//     expect(db.query).toHaveBeenCalledTimes(1);
//   });
// });
