import { createParamDecorators } from "./param.factory";

export const Body = createParamDecorators('body');
export const Headers = createParamDecorators('headers');
export const Param = createParamDecorators('param');
export const Query = createParamDecorators('query');