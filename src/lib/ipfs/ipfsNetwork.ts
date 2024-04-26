export default class IPFSNetwork {
  private endpoint: URL;
  private headers: Record<string, string>;

  constructor(projectId: string, apiSecret: string) {
    this.endpoint = new URL(
      `https://ipfs.infura.io:5001/api/v0/add?project_id=${projectId}`
    );
    this.headers = {
      Authorization: `Basic ${Buffer.from(`${projectId}:${apiSecret}`).toString(
        "base64"
      )}`,
    };
  }

  async storeBlob(blob: Blob): Promise<string> {
    if (blob.size === 0) {
      throw new Error("Content size is 0, make sure to provide some content");
    }

    const formData = new FormData();
    formData.append("file", blob);

    const request = await fetch(this.endpoint.toString(), {
      method: "POST",
      headers: this.headers,
      body: formData,
    });

    const result = await request.json();

    if (request.ok) {
      return result.Hash;
    } else {
      throw new Error(`Error while uploading to IPFS Network`);
    }
  }

  async add(content: string): Promise<string> {
    if (content.length === 0) {
      throw new Error("Content is empty, make sure to provide some content");
    }

    const formData = new FormData();
    formData.append("file", new Blob([content]), "data.json");

    const request = await fetch(this.endpoint.toString(), {
      method: "POST",
      headers: this.headers,
      body: formData,
    });

    const result = await request.json();

    if (request.ok) {
      return result.Hash;
    } else {
      throw new Error(`Error while uploading to IPFS Network`);
    }
  }
}
