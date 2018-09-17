import { SECRET_KEY } from '../config/config';
import jwt_decode from 'jwt-decode';


export default function(token, user){
  // Decoding the token does not need a secret key.
  // jwt_decode will work for as long as the token is base64url encoded,
  // and it is since it's generated using PyJWT.
  const payload = jwt_decode(token);
  console.log("PAYLOAD DECODED", payload, user);
  return payload.id == user.id;
}
