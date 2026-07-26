

export const giveRes = (req,res,status,mess,data = null) => {
  return res.status(status).json({
    "message":mess,
    data
  })
};