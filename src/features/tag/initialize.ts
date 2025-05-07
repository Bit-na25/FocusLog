import { SetterOrUpdater } from "recoil";
import { defaultTags } from "./default";

export const initializeTagState = (set: SetterOrUpdater<string[]>) => {
  set(defaultTags);
};
