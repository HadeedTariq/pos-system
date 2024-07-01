import { connect } from 'mongoose';

export async function connectToDb() {
  try {
    const uri = process.env.MONGODB_URI;

    await connect(uri.toString());
    console.log('connected to db');
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
}
