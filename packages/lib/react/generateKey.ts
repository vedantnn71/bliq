import { char } from "sivgen";

const generateKey = (id: number) => `${char(16)}-${id}`;

export default generateKey;
