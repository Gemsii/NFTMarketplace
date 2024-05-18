// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// contract for mint, setting token uri, NFT owner...
contract NFT is ERC721URIStorage {
    uint256 private _ids = 0;

    constructor() ERC721("Gema NFTs", "Gema NFTs") {}
    
    // Need event in order to use Graph (for search,  pagination...) which uses events to build up database
    event NFTTransferEvent(uint256 tokenID, address to, string tokenURI);

    // All actions that change the state return transaction
    function createNFT(string calldata tokenURI) public returns(uint256) {
        _ids++;
        _safeMint(msg.sender, _ids);
        _setTokenURI(_ids, tokenURI);
        emit NFTTransferEvent(_ids, msg.sender, tokenURI);
        return _ids;
    }
}

struct NFTListing {
    uint256 price;
    address seller;
}

// contract for buying, selling NFTs, listing NFTs, transfer ownership...
contract NFTMarket is ERC721URIStorage {
    mapping(uint256 => NFTListing) private _listings;

    address private _owner;

    constructor() ERC721("Gema NFT Marketplace", "Gema NFT Marketplace") {
        _owner = msg.sender;
    }

    // Need event in order to use Graph (for search,  pagination...) which uses events to build up database
    event NFTTransferEvent(uint256 tokenID, address to, uint256 price);

    // listNFT that you own for sale
    function listNFT(uint256 tokenID, uint256 price) public {
        require(price > 0, "NFTMarket: price must be greater than 0");

        // Only owner can transfer the ownership of token
        // If sender who initiated transaction is not owner of this token this will revert
        approve(address(this), tokenID);

        transferFrom(msg.sender, address(this), tokenID);
        _listings[tokenID] = NFTListing(price, msg.sender);

        emit NFTTransferEvent(tokenID, address(this), price);
    }

    // buyNFT that is listed for sale
    function buyNFT(uint tokenID) public payable {
        // Check if token is listed to sale
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: NFT not listed for sale");

        // Check that amount of 'money' sent is equal to price
        require(msg.value == listing.price, "NFTMarket: incorrect price");
        transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);

        // We take % of NFT sell, rest stay on contract
        payable(msg.sender).transfer(listing.price * 95 / 100);

        emit NFTTransferEvent(tokenID, msg.sender, 0);
    }

    // cancelListing
    function cancelListing(uint256 tokenID) public {
        // Check if token is listed to sale
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: NFT not listed for sale");
        require(listing.seller == msg.sender, "NFTMarket: You are not owner of this NFT");
        transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        emit NFTTransferEvent(tokenID, msg.sender, 0);
    }

    function clearListing(uint256 tokenID) private {
        _listings[tokenID].price = 0;
        _listings[tokenID].seller = address(0);
    }

    // Delete this after
    function withdrawFunds() public {
        require(msg.sender == _owner, "NFTMarket: You are not owner of this contract");
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "NFTMarket: Contract balance is zero, cannot tranfer");
        payable (msg.sender).transfer(contractBalance);
    }
}