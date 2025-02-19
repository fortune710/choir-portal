import { NextResponse } from "next/server";
import { getMembers, addMember } from "../services/membersService";



export async function GET(){
    try {
        const members = await getMembers()
        return NextResponse.json({success:true,  data: members})
    } catch (error) {
        return NextResponse.json({success:false, error: error}, {status: 500})
    } 
}
export async function POST(req: Request){
    try{
      const body = await req.json()
      const newMember = await addMember(body)
      return NextResponse.json({success:true, data: newMember})
    }catch (error) {
        return NextResponse.json({ success:false, error: error}, {status: 400})
    }
}