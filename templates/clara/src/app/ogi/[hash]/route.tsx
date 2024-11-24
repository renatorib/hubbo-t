import { ogi } from "@hubbo/next";

export const GET = async (request: Request, props: { params: { hash: string } }) => {
  return ogi.serveImage(props.params.hash);
};
