
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import config from "@/amplify_outputs.json";
import { cookies } from "next/headers";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const getAuthUser = async () => {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getFetchUserAttr = async () => {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchUserAttributes(contextSpec),
    });
    return currentUser;
  } catch (err) {
    // console.log(err);
    return false;
  }
};