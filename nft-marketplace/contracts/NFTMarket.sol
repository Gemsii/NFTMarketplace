// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// contract for mint, setting token uri, NFT owner...
contract NFT is ERC721URIStorage {
    uint256 private _ids = 0;

    constructor() ERC721("Gema NFTs", "Gema NFTs") {}
    
    // Need event in order to use Graph (for search,  pagination...) which uses events to build up database
    event NFTTransferEvent(uint256 tokenID, address from, address to, string tokenURI);

    // All actions that change the state return transaction
    function createNFT(string calldata tokenURI) public returns(uint256) {
        _ids++;
        _safeMint(msg.sender, _ids);
        _setTokenURI(_ids, tokenURI);
        emit NFTTransferEvent(_ids, address(0), msg.sender, tokenURI);
        return _ids;
    }
}

struct NFTListing {
    uint256 price;
    address seller;
}

// contract for buying, selling NFTs, listing NFTs, transfer ownership...
contract NFTMarket {
    mapping(address => mapping(uint256 => NFTListing)) private _listings;

    address private _owner;

    constructor() {
        _owner = msg.sender;
    }

    // Need event in order to use Graph (for search,  pagination...) which uses events to build up database
    event NFTTransferEvent(address tokenAddress, uint256 tokenID, address from, address to, uint256 price);

    // listNFT that you own for sale
    function listNFT(address tokenAddress, uint256 tokenID, uint256 price) public {
        require(price > 0, "NFTMarket: price must be greater than 0");

        // Only owner can transfer the ownership of token
        // If sender who initiated transaction is not owner of this token this will revert
        // User must first approve marketplace contract to transfer that token on their behalf
        _listings[tokenAddress][tokenID] = NFTListing(price, msg.sender);
        IERC721(tokenAddress).transferFrom(msg.sender, address(this), tokenID);

        emit NFTTransferEvent(tokenAddress, tokenID, msg.sender, address(this), price);
    }

    // buyNFT that is listed for sale
    function buyNFT(address tokenAddress, uint tokenID) public payable {
        // Check if token is listed to sale
        NFTListing memory listing = _listings[tokenAddress][tokenID];
        require(listing.price > 0, "NFTMarket: NFT not listed for sale");

        // Check that amount of 'money' sent is equal to price
        require(msg.value == listing.price, "NFTMarket: incorrect price");

        // Transfering token from marketplace contract to buyer
        clearListing(tokenAddress, tokenID);
        IERC721(tokenAddress).transferFrom(address(this), msg.sender, tokenID);

        // We take % of NFT sell, rest stay on contract
        payable(listing.seller).transfer(listing.price * 95 / 100);

        emit NFTTransferEvent(tokenAddress, tokenID, address(this), msg.sender, 0);
    }

    // Cancel listing
    function cancelListing(address tokenAddress, uint256 tokenID) public {
        // Check if token is listed to sale
        NFTListing memory listing = _listings[tokenAddress][tokenID];
        require(listing.price > 0, "NFTMarket: NFT not listed for sale");
        require(listing.seller == msg.sender, "NFTMarket: You are not owner of this NFT");

        clearListing(tokenAddress, tokenID);
        IERC721(tokenAddress).transferFrom(address(this), msg.sender, tokenID);
        
        emit NFTTransferEvent(tokenAddress, tokenID, address(this), msg.sender, 0);
    }

    function clearListing(address tokenAddress, uint256 tokenID) private {
        _listings[tokenAddress][tokenID].price = 0;
        _listings[tokenAddress][tokenID].seller = address(0);
    }

    function withdrawFunds() public {
        require(msg.sender == _owner, "NFTMarket: You are not owner of this contract");
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "NFTMarket: Contract balance is zero, cannot tranfer");
        payable(msg.sender).transfer(contractBalance);
    }
}