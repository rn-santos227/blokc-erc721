// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => uint256) public tokenPrice;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address to, string memory tokenURI, string memory title, string memory description) external payable {
        if (msg.sender != owner()) {
            require(msg.value >= 100000000000000, "Insufficient fee"); // 0.0001 ether
            payable(owner()).transfer(msg.value);
        }

        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        emit MetadataSet(tokenId, title, description);
    }

    function buy(uint256 tokenId) external payable {
        require(tokenPrice[tokenId] > 0, "Token not for sale");
        require(msg.value >= tokenPrice[tokenId], "Insufficient payment");

        address owner = ownerOf(tokenId);
        _transfer(owner, msg.sender, tokenId);
        payable(owner).transfer(msg.value);
        tokenPrice[tokenId] = 0;
    }

    function sell(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        tokenPrice[tokenId] = price;
    }

    event MetadataSet(uint256 indexed tokenId, string title, string description);
}