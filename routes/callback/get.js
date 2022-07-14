import got from "got"
export default async (req, res) => {
  console.log(req)
  try {
    await got
      .get(
        "https://hoi-demo-pomerium-trkregf5uq-an.a.run.app/oauth2/callback",
        {
          searchParams: {
            ...req.query,
          },
        }
      )
      .json()
  } catch (error) {
    console.log(error)
  }
  return res.redirect("https://hoi-demo-pomerium-trkregf5uq-an.a.run.app")
}
