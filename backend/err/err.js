

export const giveRes = (req,res,status,mess,data = null,succ) => {
  return res.status(status).json({
    "message":mess,
    "success":succ,
    data
  })
};