import algosdk from "algosdk";
import { ALGOD_SERVER, ALGOD_PORT, ALGOD_TOKEN } from "../config/index.js";

export function getAlgodClient() {
  return new algosdk.Algodv2(ALGOD_TOKEN || "", ALGOD_SERVER, ALGOD_PORT || "");
}
