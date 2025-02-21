import { NextResponse } from "next/server";
import {  addUser } from "../services/usersService";




export async function POST(req: Request){
    try{
      const body = await req.json()
      const newMember = await addUser(body)
      return NextResponse.json({success:true, data: newMember})
    }catch (error) {
        return NextResponse.json({ success:false, error: error}, {status: 400})
    }
}