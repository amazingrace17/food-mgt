import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import crypto from 'crypto'

import { User } from '../models/User.js'
import { Account } from '../models/Account.js'
import { Seller } from '../models/Seller.js'
import { validationResult } from 'express-validator';


const AuthController = {
    signupUser: (req, res,next) =>{}
}

export default AuthController;