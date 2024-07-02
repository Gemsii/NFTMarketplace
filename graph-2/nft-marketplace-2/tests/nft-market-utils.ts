import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { NFTTransferEvent } from "../generated/NFTMarket/NFTMarket"

export function createNFTTransferEventEvent(
  tokenAddress: Address,
  tokenID: BigInt,
  from: Address,
  to: Address,
  price: BigInt
): NFTTransferEvent {
  let nftTransferEventEvent = changetype<NFTTransferEvent>(newMockEvent())

  nftTransferEventEvent.parameters = new Array()

  nftTransferEventEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  nftTransferEventEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  nftTransferEventEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  nftTransferEventEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  nftTransferEventEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftTransferEventEvent
}
