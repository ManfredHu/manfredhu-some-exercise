interface User {
  name: string;
  age: number;
}

type Func = (user: User, a: number) => void;

type Param = Parameters<Func>; // Param = User
// type AA = Parameters<string>; // string
