// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  try {
    // console.log(req.body);
    console.log(req.body.image);
    console.log("name is " + req.body.name);
    return res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(404).json({ status: "error" });
  }
}
