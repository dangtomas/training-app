import { createContext } from "react";

const UpdateContext = createContext<() => void>(function () {});
export default UpdateContext;
