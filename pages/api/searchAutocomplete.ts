// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { data } = await axios.get(
    `https://duckduckgo.com/ac/?q=${req.query.query}&kl=wt-wt`,
  );

  res.status(200).json(data);
}
