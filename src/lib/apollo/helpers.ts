// @ts-ignore
import omitDeep from "omit-deep";
import { utils } from "ethers";

export const prettyJSON = (message: string, obj: string) => {
  console.log(message, JSON.stringify(obj, null, 2));
};

export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const omit = (object: any, name: string) => {
  return omitDeep(object, name);
};

export const splitSignature = (signature: any) => {
  return utils.splitSignature(signature);
};
