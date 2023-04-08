import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET || "hgcjytfuytdyrcdfyjfxhgfjfhdf"
// console.log(secret);
// CHECKING FUNCTIONS
export const hasToken = async (req) => {
  const token = await getToken({ req, secret })
  if(!token){
    return false
  }
  return token
}

export const isAdmin = async (req) => {
  const token = await getToken({ req, secret })
  if(!token || token.user.role !== 'admin'){
    return false
  }
  return true
}

// API MIDDLEWARE
export const hasTokenMiddleware = async (req, res, next) => {
  const token = await getToken({ req, secret })
  if(!token){
    return res.status(401).json({message: 'Not Allowed - Not logged in'})
  }
  next()
  return token
  // console.log(token.user._id);
}
export const isAdminMiddleware = async (req, res, next) => {
  const token = await getToken({ req, secret })
  if(!token || token.user.role !== 'admin'){
    return res.status(401).json({message: 'Not Allowed - Not logged in'})
  }
  next()
}


