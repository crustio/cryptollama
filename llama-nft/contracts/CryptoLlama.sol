// contracts/DungeonsAndDragonsCharacter.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/evm-contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CryptoLlama is ERC721, ChainlinkClient, Ownable {
    using SafeMath for uint256;
    using Strings for string;

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    address private oracle;
    bytes32 private jobId;
    address public LinkToken;
    // rinkeby: 0x01BE23585060835E02B77ef475b0Cc51aA1e0709a

    struct Character {
        string cid;
        string name;
    }

    Character[] public characters;

    mapping(bytes32 => string) requestToCharacterName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => uint256) requestToTokenId;

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Rinkeby
     * Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     */
    constructor(address _Oracle, address _LinkToken, bytes32 _keyhash, bytes32 _JobId)
    public
    ERC721("CryptoLlama", "C&L")
    {
        
        LinkToken = _LinkToken;
        keyHash = _keyhash;
        oracle = _Oracle;
        jobId = _JobId;
        fee = 0.1 * 10**18; // 0.1 LINK
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) public
    {
        uint256 strength = (randomNumber % 100);
        uint256 dexterity = ((randomNumber % 10000) / 100 );
        uint256 constitution = ((randomNumber % 1000000) / 10000 );
        uint256 intelligence = ((randomNumber % 100000000) / 1000000 );
        uint256 wisdom = ((randomNumber % 10000000000) / 100000000 );
        uint256 charisma = ((randomNumber % 1000000000000) / 10000000000);
        uint256 experience = 0;

        string obj = '{' + '"strength": ' + strength + ',' + '"dexterity": ' + dexterity + ',' + '"constitution": ' + constitution + ',' + '"intelligence": ' + intelligence + ',' + '"wisdom": ' + wisdom + '"charisma": ' + charisma + '}';
    	Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fullfillCid.selector);
        req.add('text_for_file', obj);
        req.add('text_for_file_name', requestToCharacterName[requestId] + '.json');

        sendChainlinkRequestTo(oracle, req, fee);
    }

    function fullfillCid(bytes32 _requestId, string memory _result) public recordChainlinkFulfillment(_requestId) {
        uint256 newId = characters.length;
        characters.push(
            Character(
                _result,
                requestToCharacterName[_requestId]
            )
        );

        _safeMint(requestToSender[_requestId], newId);
    }

    function getLevel(uint256 tokenId) public view returns (uint256) {
        return sqrt(characters[tokenId].experience);
    }

    function getNumberOfCharacters() public view returns (uint256) {
        return characters.length;
    }

    function getCharacterOverView(uint256 tokenId)
    public
    view
    returns (
        string memory,
        uint256,
        uint256,
        uint256
    )
    {
        return (
        characters[tokenId].name,
        characters[tokenId].strength + characters[tokenId].dexterity + characters[tokenId].constitution + characters[tokenId].intelligence + characters[tokenId].wisdom + characters[tokenId].charisma,
        getLevel(tokenId),
        characters[tokenId].experience
        );
    }

    function getCharacterStats(uint256 tokenId)
    public
    view
    returns (
        uint256,
        uint256,
        uint256,
        uint256,
        uint256,
        uint256,
        uint256
    )
    {
        return (
        characters[tokenId].strength,
        characters[tokenId].dexterity,
        characters[tokenId].constitution,
        characters[tokenId].intelligence,
        characters[tokenId].wisdom,
        characters[tokenId].charisma,
        characters[tokenId].experience
        );
    }

    function sqrt(uint256 x) internal view returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
