import {validationrResult} from' express-validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import crypto from 'crypto'

import {User} from '../models/user'
import { Account} from '../models/account'
import {Seller} from '../models/seller'
import { validationResult } from 'express-validator';


const AuthController = {
    signupUser: (req, res,next) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const error = new Error('Validation Failed, Please provide correct details');
            error.ststusCode = 400;
            error.errrors = errors.array();
            throw error;
        }
        
        const email = req.ody.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName
        const password= req.body.password;
        const role = req.body.role;
        let token;

        if(role !== 'ROLE_USER'){
            const error = new error(
                'Signing up as a user sould have a role of ROLE_USER'
            );
            error.statudCode= 500;
            throw error;
        }

        bcrypt
        .hash(password, 12)
        .then((hashedPassword)=>{
            token = crypto.randomBytes(32).toString('hex');

            const account = new Account({
                role: role,
                email: email,
                password: hashedPassword,
                accountVerifyToken: token,
                accountVerifyTokenExpiration: Date.now() + 3600000,
            });
            return account.save();
        })
        .then((savedAccount) =>{
            const user = User({
                firstName : firstName,
                lastName: lastName,  
                account: savedAccount,
            })
        })

    }
    

}