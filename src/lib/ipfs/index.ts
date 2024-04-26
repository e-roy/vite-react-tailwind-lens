import { v4 as uuidv4 } from "uuid";
import IPFSNetwork from "./ipfsNetwork";

const projectId = import.meta.env.VITE_PROD_INFURA_PROJECT_ID;
const apiSecret = import.meta.env.VITE_PROD_INFURA_API_SECRET;

type UploadIpfsProps = {
  payload: {
    name: string;
    description: string;
    content: string;
    media: any[];
  };
};

export const uploadIpfs = async ({ payload }: UploadIpfsProps) => {
  if (!projectId || !apiSecret) {
    throw new Error("Infura project ID or API secret is missing");
  }

  const client = new IPFSNetwork(projectId, apiSecret);

  const metadata = {
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
  };

  try {
    const result = await client.add(JSON.stringify(metadata));
    return result;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};
