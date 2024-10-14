import { og } from "@hubbo/next";

export const GET = async (request: Request, props: { params: { hash: string } }) => {
  return og.serveImage(props.params.hash);
};
