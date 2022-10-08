import utils from "~/common/lib/utils";
import { Message, MessagePublicKeyOrPromptGet } from "~/types";

import getPublicKey from "./getPublicKey";

const getPublicKeyOrPrompt = async (message: MessagePublicKeyOrPromptGet) => {
  if (!("host" in message.origin)) {
    console.error("error", message.origin);
    return;
  }

  const result = await prompt(message);

  return result;
};

const prompt = async (message: MessagePublicKeyOrPromptGet) => {
  try {
    const response = await utils.openPrompt({
      args: {},
      ...message,
      action: "public/nostr/confirmGetPublicKey",
    });

    const publicKey = await getPublicKey();

    response.data = publicKey;

    return response;
  } catch (e) {
    console.error("getPublicKey cancelled", e);
    if (e instanceof Error) {
      return { error: e.message };
    }
  }
};

export default getPublicKeyOrPrompt;