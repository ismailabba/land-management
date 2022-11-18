//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//interface calls externally accessible functions  of a contract
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract LandManagement is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenids; 


    constructor() ERC721 ("Land Management", "Land"){}#


    function mint(string memory tokenURI) public returns(uint256){
        _tokenids.increment();

        uint256 newItemId = _tokenids.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);


        return newItemId;
    }

    fucntion totalSupply() public view returns (uint256){
        return _tokenids.current();
    }
 


}
