import jwt, { SignOptions } from 'jsonwebtoken'

export const signToken = ({
  payload,
  privatekey,
  options = {
    algorithm: 'RS256'
  }
}: {
  payload: string | Buffer | object //kiểu dử liệu của từng tham số
  privatekey: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    //Promises là một cách để đại diện cho một giá trị trong tương lai, có thể là một giá trị thành công(resolve) hoặc một lỗi(reject).
    jwt.sign(payload, privatekey, options, (error, token) => {
      //khi chạy xong jwt.sign thì mới chạy (error, token) là một function nó nhận giá trị nếu thành công thì gán giá trị token cho resolve và ngược lại lổi thì reject cho err
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}
export const verifyToken = ({//hàm giải mã token
  token,
  secretOrPublickey
}: {
  token: string
  secretOrPublickey: string
}) => {
  return new Promise<string | object>((resolve, reject) => {
    jwt.verify(token, secretOrPublickey, (error, decoded) => {
      if (error) {
        return reject(error) //nếu token gửi lên thiếu hoặc sai thì return lổi
      }
      resolve(decoded as string | object)
    })
  })
}
