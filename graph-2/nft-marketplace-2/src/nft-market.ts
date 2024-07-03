import { NFTTransferEvent as NFTTransferEventEvent } from "../generated/NFTMarket/NFTMarket"
import { NFTTransferEvent } from "../generated/schema"

export function handleNFTTransferEvent(event: NFTTransferEventEvent): void {
  let entity = new NFTTransferEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenAddress = event.params.tokenAddress
  entity.tokenID = event.params.tokenID
  entity.from = event.params.from
  entity.to = event.params.to
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
