// 'use server';

// import { PinataSDK } from 'pinata';

// export async function pinata() {
//   return new PinataSDK({
//     pinataJwt: `${process.env.PINATA_JWT}`,
//     pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
//   });
// }

'server only';

import { PinataSDK } from 'pinata';

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});
