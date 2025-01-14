import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '../../constants/enums'

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  phone:string
  address:string
  password: string
  CitizenID: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  username?: string
  avatar?: string
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  phone:string
  address:string
  password: string
  CitizenID:string
  created_at: Date
  updated_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  username: string
  avatar: string

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.name = user.name || ''
    this.email = user.email
    this.date_of_birth = user.date_of_birth || new Date()
    this.phone =user.phone
    this.address =user.address
    this.password = user.password
    this.CitizenID =user.CitizenID
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified //mac dinh =0
    this.avatar = user.avatar || ''
    this.username = user.username || ''
  }
}
