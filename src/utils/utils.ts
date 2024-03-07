import * as bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

export const prismaClient = new PrismaClient()

export const utils = {
  isJSON: (data: string) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return false
    }
    return true
  },
  getTime: () => {
    const date = new Date()
    const time = date.getTime()
    return time
  },
  generateSalt: (rounds: number, value: string) => {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync(rounds)
      bcrypt.hash(value, salt, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
  },
  compareHash: (value: string, hash: string) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(value, hash, (err, result): boolean | any => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },
}