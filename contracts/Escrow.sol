//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract Escrow {
    
    address public nftAddress;
    address payable public seller;
    //address payable public agent;
    address public directorGeneral;
    address public surveyorGeneral;
    address public lender;

    constructor(
        address _nftAddress,
        address payable _seller,
        address _directorGeneral,
        address _surveyorGeneral, 
        address _lender
    ){
        nftAddress = _nftAddress;
        seller = _seller;
        directorGeneral = _directorGeneral;
        surveyorGeneral = _surveyorGeneral;
        lender = _lender;
    }
    
}
