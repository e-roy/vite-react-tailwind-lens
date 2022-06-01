import { v4 as uuidv4 } from "uuid";

// @ts-ignore
import IPFSNetwork from "./ipfsNetwork";

const client = new IPFSNetwork();

type uploadIpfsProps = {
  payload: {
    name: string;
    description: string;
    content: string;
    media: any[];
  };
};

export const uploadIpfs = async ({ payload }: uploadIpfsProps) => {
  const result = await client.add(
    JSON.stringify({
      version: "1.0.0",
      metadata_id: uuidv4(),
      description: payload.description,
      content: payload.content,
      external_url: null,
      image: payload.media.length > 0 ? payload.media[0]?.item : null,
      imageMimeType: payload.media.length > 0 ? payload.media[0]?.type : null,
      name: payload.name,
      attributes: [],
      media: payload.media || [],
      appId: "template-app",
    })
  );

  return result;
};
